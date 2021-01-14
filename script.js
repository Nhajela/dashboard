const btn = document.querySelector(".startpomo");
const daybtn = document.querySelector(".startday");
const lightbtn = document.querySelector(".startlight");
const customBtntoggle = document.querySelector(".custompomo");
const customForm = document.querySelector(".custom-wrapper");
const custompomoBtn = document.getElementById("customPomobtn");
import { PomoTimer, DayTimer } from "./timer.js";

var customOpen = false;
customBtntoggle.addEventListener("click", () => {
  console.log(customOpen);
  if (!customOpen) {
    customForm.style.display = "block";
    customOpen = true;
  } else {
    customForm.style.display = "none";
    customOpen = false;
  }
});

let pomo = new PomoTimer(btn, 0.05);
let day = new DayTimer(daybtn, 1);
let custom = new PomoTimer(custompomoBtn, 20, "custom");



lightbtn.addEventListener("click",async ()=>{
    
    fetch('http://127.0.0.1:5000/toggle')
    .then(function (response) {
        return response.json();
    }).then(function (data) {
      if (data.light==true){
        lightbtn.innerText="TURN LIGHTS OFF"
        lightbtn.classList.toggle("lighton",true)
      
      }
      else if(data.light==false){
        lightbtn.innerText="TURN LIGHTS ON"
        lightbtn.classList.toggle("lighton",false)
      
      }
      else{
        alert(data.light)
      } 
    });
    
    // console.log(await fetch("http://127.0.0.1:5000/toggle",{mode:"no-cors",Host: "127.0.0.1:5000"}))
    
     
    }
    
    
    )
