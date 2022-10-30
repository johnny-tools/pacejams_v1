

const x = document.getElementById("customStride");
  const sel = document.getElementById("flexSwitchCheckDefault");
sel.value = "off";
console.log(sel.value);

function myFunction() {
  if (sel.value == 'off') {
    x.style.display = "block";
    sel.value = "on";
  } else {
    x.style.display = "none";
    sel.value = "off";
    
  }
  console.log(sel.value);
};

//calculating music pace
// 
const paceCalculator = (ev) => {
    ev.preventDefault();
  let firstName = document.getElementById('firstName').value;
 let maleAvePace = .415;
let femaleAvePace = .413;
let feetPerMile = 5280;
let inchesPerMile = 63360;
let mpm = parseInt(document.getElementById('mpm').value);
let height = parseFloat(document.getElementById('height').value);
let stride = parseFloat(document.getElementById('stride').value).toFixed(1);
let gender = document.getElementById('gender').value;
  let maleStride = (height * 12) * maleAvePace;
  let femaleStride = (height * 12) * femaleAvePace;
 
  if (sel.value == 'on') {
      stride = stride; 
} else {
   if (gender == 'male') {
    stride = maleStride.toFixed(1);
  } else {
    stride = femaleStride.toFixed(1);
  }
}

  console.log(stride);
  console.log(height);
  
  let stepsPerMile = inchesPerMile / stride;
  let paceResults = stepsPerMile / mpm;
  paceResults = Math.round(paceResults);
  let splitPaceResults = Math.round(paceResults / 2);
  let maxPace = splitPaceResults + 5;
  
  let resultsMsg = `<p>Hi ${firstName}!<br> Run to the beat of songs within the range of ${splitPaceResults} - ${maxPace} bpm!</p>`;
  
  const results = document.getElementById("results");
results.innerHTML = resultsMsg;
}
 document.addEventListener('DOMContentLoaded', ()=>{
            document.getElementById('btn').addEventListener('click', paceCalculator);
        });



