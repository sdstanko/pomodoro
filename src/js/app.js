import * as myFunctions from "./modules/functions.js";
import * as settings from "./modules/settings.js";
import * as pomodoro from "./modules/pomodoro.js";

myFunctions.isWebp();


let vh = window.innerHeight * 0.01;
// Then we set the value in the --vh custom property to the root of the document
document.documentElement.style.setProperty('--vh', `${vh}px`);