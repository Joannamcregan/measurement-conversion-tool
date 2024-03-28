const body = document.querySelector('body');
const modeSelector = document.querySelector("#modeSelector");
const sun = document.querySelector("#sun");
const moon = document.querySelector("#moon");
const next = document.querySelector("#next");
const restart = document.querySelector("#restart");
const input = document.querySelector("#instructionInput");
const output = document.querySelector("#instructionOutput");
const noText = document.querySelector("#no-text-error");
const wrongUnit = document.querySelector("#wrong-unit-error");
const noNumber = document.querySelector("#no-number-error");
const containsFraction = document.querySelector("#fraction-error");
const step1 = document.querySelector("#step1");
const step2 = document.querySelector("#step2");
const inches = document.querySelector("#inches");
const feet = document.querySelector("#feet");
const yards = document.querySelector("#yards");

let isDark = false;

modeSelector.addEventListener('click', toggleDark.bind(this));
next.addEventListener('click', getNext.bind(this));
restart.addEventListener('click', startOver.bind(this));
output.addEventListener('mouseup', setSelection.bind(this));
inches.addEventListener('click', convert.bind(this));

function convert() {
    console.log('called');
}

function setSelection() {
    let selectedText = '';
    if (window.getSelection) {
        selectedText = window.getSelection().toString();
    } else if (document.getSelection) {
        selectedText = document.getSelection().toString();
    } else if (document.selection) {
        selectedText = document.selection.createRange().text;
    }
    if (/m/.test(selectedText) || /meter/.test(selectedText)
        || /cm/.test(selectedText) || /centimeter/.test(selectedText) 
        || /mm/.test(selectedText) || /millimeter/.test(selectedText)){
        wrongUnit.classList.add("hidden");
        if (/\d/.test(selectedText)){
            noNumber.classList.add('hidden');
            if (selectedText.includes('/')){
                containsFraction.classList.remove('hidden');
            } else {
                containsFraction.classList.add('hidden');
                if (/cm/.test(selectedText) || /centimeter/.test(selectedText) 
                || /mm/.test(selectedText) || /millimeter/.test(selectedText)){
                    suggestInches();
                } else {
                    console.log('suggest yards');
                }
            }
        } else {
            noNumber.classList.remove('hidden');
        }
    } else {
        wrongUnit.classList.remove("hidden");
    }
}

function suggestInches(){
    inches.classList.remove('bg-opacity-25');
    feet.classList.remove('bg-opacity-75');
    yards.classList.remove('bg-opacity-75');
    inches.classList.add('bg-opacity-75');
    feet.classList.add('bg-opacity-25');
    yards.classList.add('bg-opacity-25');
}

function getNext(){
    if (input.value.trim()){
        noText.classList.add("hidden");
        output.innerText = input.value;
        step1.classList.add("hidden");
        step2.classList.remove("hidden");
    } else {
        noText.classList.remove("hidden");
    }
}

function startOver(){
    output.innerText = "";
    step2.classList.add("hidden");
    step1.classList.remove("hidden");
}

function toggleDark(){
    // console.log('called');
    if (isDark){
        console.log('it is dark');
        sun.classList.add("hidden");
        moon.classList.remove("hidden");
        body.classList.remove("dark");
        isDark = false;
    } else {
        console.log('it is light');
        moon.classList.add("hidden");
        sun.classList.remove("hidden");
        body.classList.add("dark");
        isDark = true;
    }
}