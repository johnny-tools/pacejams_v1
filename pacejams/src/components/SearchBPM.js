import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container,InputGroup,FormControl,Button,Row,Card,
} from "react-bootstrap";
import { useState, useEffect } from "react";

const CLIENT_ID = "cc9134429c674743814f08bcbf5173ad";
const CLIENT_SECRET = "3b572c5185da443583ca0e22dbcb8740";

function Searchbpm() {
    
    const [searchInput, setSearchInput] = useState("");
    const [accessToken, setAccessToken] = useState("");
    const [tracks, setTracks] = useState([]);
    const [trackIDs, setTrackIDs] = useState([]);
    const [trackTempo, setTrackTempo] = useState([]);
  
  useEffect(() => {
    // API Access Token
    var authParameters = {
      method: 'Post',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: 'grant_type=client_credentials&client_id=' + CLIENT_ID + '&client_secret=' + CLIENT_SECRET
    }
  
    fetch('https://accounts.spotify.com/api/token', authParameters)
      .then(result => result.json())
      .then(data => setAccessToken(data.access_token))
  }, [])
  
    // Search
    async function search() {
      console.log("Search for " + searchInput);
  
      // Get request using search to get the Artist ID
      var searchParameters = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + accessToken
        }
      }

      var getGenre= await fetch('https://api.spotify.com/v1/recommendations/available-genre-seeds' , searchParameters)
      .then(response => response.json())
      .then(data => { return console.log(data) })

      var getPlaylisturl = await fetch('https://api.spotify.com/v1/search?q=' + searchInput + '&type=playlist' , searchParameters)
      .then(response => response.json())
      .then(data => { return data.playlists.items[0].tracks.href })
    console.log(getPlaylisturl)

    var playlistTracks = await fetch(getPlaylisturl, searchParameters)
      .then(response => response.json())
      .then(data => {
        console.log(data)
        setTracks(data.items);
      })
      console.log(tracks);
      
      const getTrackIDs = await tracks.map((track, i)=> {
        return(
         track.track.id
        );
    });
    console.log(getTrackIDs)

    var returnedAudioFeatures = await getTrackIDs.map(ids => fetch ('https://api.spotify.com/v1/audio-features/' + ids , searchParameters)
    .then(response => response.json())
    .then(data => { return console.log(data) }));
    // console.log(trackTempo)
    // console.log(trackIDs)
      
     //   Get request with track ID grab all the audio_features for that track ID
      
    }

   
 
      // Display those albums to the user
    
    return (
      <div className="App">
        <Container>
          <InputGroup className="mb-3" size="lg">
            <FormControl
              placeholder="Search For Artist"
              type="input"
              onKeyPress={(event) => {
                if (event.key == "Enter") {
                  {search()}
                }
              }}
              onChange={(event) => setSearchInput(event.target.value)}
            />
            <Button
              onClick={search}
            >
              Search
            </Button>
          </InputGroup>
        </Container>
  
        {/* <Container>
          <Row className="mx-2 row row-cols-4">
          {tracks.map( (track, i)=> {
            return (
              <Card>
              <Card.Img src={track.images[0].url} />
              <Card.Body>
                <Card.Title>{track.name}</Card.Title>
              </Card.Body>
            </Card>
            )
          })}
            
          </Row>
        </Container> */}
      </div>
    );
  }
  export default Searchbpm;