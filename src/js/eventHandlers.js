// Event handlers for registered events from eventRegister.js
console.log("Testing, testing, I'm just suggesting. You and I might not be the best thing!"); 

const bottleState = {
    totalWater: 1182.94,
    remainingWater: 1182.94,
    percent: 15,
};

function exitApp()
{
    console.log("does this work?");
    window.electronAPI.closeApp();
}

function minimizeApp()
{
    window.electronAPI.minimizeApp();
}

function activateInfoMenu(event)
{
    if (event.target.checked) {
        window.electronAPI.unfoldInfo();
        document.getElementById("background2").style.visibility = "visible";
        console.log("flip"); 
    } else {
        window.electronAPI.foldInfo();
        document.getElementById("background2").style.visibility = "hidden";
        console.log("flop"); 
    }
}

function openSipMenu()
{
    let sipMenu = document.getElementById("sip-menu");

    sipMenu.style.bottom = "0px";
}

function closeSip()
{
    let sipMenu = document.getElementById("sip-menu");

    sipMenu.style.bottom = "-200px";
}

function sipWater() 
{
    var waterFill = document.getElementById("water-fill");
    const totalLiquid = 1182.94;
    var ml = parseFloat(document.getElementById("sip-amount-input").value);

    if (isNaN(ml))
        ml = 0;

    var currentClip = getComputedStyle(waterFill).clipPath;

    // convert ml to percent
    let percent = ((ml / 1182.94) * (0.85 / 1)) * 100;
    
    // get current percent from regex
    let currentPercent = currentClip.match(/inset\(([\d.]+)%/);
    if (!currentPercent) return;

    let currentTop = parseFloat(currentPercent[1]);

    // add new sip to clip path percent
    let newTop = currentTop + percent;

    // make sure it cant go over 100
    newTop = Math.min(newTop, 100);

    bottleState.remainingWater -= ml;
    bottleState.remainingWater = Math.max(0, bottleState.remainingWater); // prevent negative

    setWaterLevel(newTop, bottleState.remainingWater);
}

function ozToMl(oz)
{
    return (oz * 29.5735);
}

function setWaterLevel(percent, ml)
{
    var waterFill = document.getElementById("water-fill");
    var currentClip = getComputedStyle(waterFill).clipPath;

    // apply the new clip-path css
    waterFill.style.clipPath = `inset(${percent}% 0 0 0)`;

    bottleState.percent = percent;
    bottleState.remainingWater = ml;

    document.getElementById("remaining-number").innerHTML = String(ml.toFixed(1)) + " ml";
}

function getTopToPercent()
{
    var waterFill = document.getElementById("water-fill");
    var currentClip = getComputedStyle(waterFill).clipPath;

    let currentPercent = currentClip.match(/inset\(([\d.]+)%/);
    if (!currentPercent) return;

    let currentTop = parseFloat(currentPercent[1]);

    console.log(currentTop);
    return currentTop * 0.01;
}

function refillWater()
{
    setWaterLevel(15, bottleState.totalWater);
}

setWaterLevel(15, bottleState.totalWater);