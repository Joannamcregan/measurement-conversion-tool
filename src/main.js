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

var numberPart;
var unitPart;

var selection;
var selectedText;
// var selectionStartNode;
// var selectionEndNode;
var selectionStartIndex;
var selectionLength;
// var selectionEndIndex;

modeSelector.addEventListener('click', toggleDark.bind(this));
next.addEventListener('click', getNext.bind(this));
restart.addEventListener('click', startOver.bind(this));
output.addEventListener('mouseup', setSelection.bind(this));
inches.addEventListener('click', convert.bind(this, 'inches'));
feet.addEventListener('click', convert.bind(this, 'feet'));
yards.addEventListener('click', convert.bind(this, 'yards'));

function convert(convertTo) {
    var newNumber;
    if (unitPart === 'm'){
        if (convertTo === 'inches'){
            newNumber = numberPart * 39.3701;
        } else if (convertTo === 'feet'){
            newNumber = numberPart * 3.28084;
        } else if (convertTo === 'yards'){
            newNumber = numberPart * 1.09361;
        }
    } else if (unitPart === 'cm'){
        if (convertTo === 'inches'){
            newNumber = numberPart * 0.393701;
        } else if (convertTo === 'feet'){
            newNumber = numberPart * 0.0328084;
        } else if (convertTo === 'yards'){
            newNumber = numberPart * 0.0109361;
        }
    } else if (unitPart === 'mm'){
        if (convertTo === 'inches'){
            newNumber = numberPart * 0.0393701;
        } else if (convertTo === 'feet'){
            newNumber = numberPart * 0.00328084;
        } else if (convertTo === 'yards'){
            newNumber = numberPart * 0.00109361;
        }
    }
    if (newNumber === 1){
        if (convertTo === 'inches'){
            replaceMeasurement(newNumber, 'inch');
        } else if (convertTo === 'feet'){
            replaceMeasurement(newNumber, 'foot');
        } else if (convertTo === 'yards'){
            replaceMeasurement(newNumber, 'yard');
        }
    } else {
        replaceMeasurement(newNumber, convertTo);
    }
    clearSuggestion();
}

function setSelection() {
    if (window.getSelection) {
        selection = window.getSelection();
    } else if (document.getSelection) {
        selection = document.getSelection().toString();
    }
    selectedText = selection.toString();
    selectionLength = selectedText.length;
    // selectionStartNode = selection.anchorNode;
    // selectionEndNode = selection.focusNode;
    selectionStartIndex = selection.anchorOffset;
    // selectionEndIndex = selection.focusOffset;
    if (/m/.test(selectedText) || /meter/.test(selectedText)
        || /cm/.test(selectedText) || /centimeter/.test(selectedText) 
        || /mm/.test(selectedText) || /millimeter/.test(selectedText)){
        wrongUnit.classList.add("hidden");
        numberPart = selectedText.replace(/[^0123456789.]/gi, '');
        if (/\d/.test(selectedText)){
            noNumber.classList.add('hidden');
            if (selectedText.includes('/')){
                containsFraction.classList.remove('hidden');
            }else {
                containsFraction.classList.add('hidden');
                if ((/cm/.test(selectedText) || /centimeter/.test(selectedText)) && numberPart >= 30.48){
                    suggestFeet();
                    unitPart = 'cm';
                } else if (/cm/.test(selectedText) || /centimeter/.test(selectedText)){
                    suggestInches();
                    unitPart = 'cm';
                } else if (/mm/.test(selectedText) || /millimeter/.test(selectedText)){
                    suggestInches();
                    unitPart = 'mm';
                } else if ((/m/.test(selectedText) || /meter/.test(selectedText)) && numberPart > 0 && numberPart < 1){
                    suggestFeet();
                    unitPart = 'm'
                }else if (/m/.test(selectedText) || /meter/.test(selectedText)){
                    suggestYards();
                    unitPart = 'm';
                }
            }
        } else {
            noNumber.classList.remove('hidden');
        }
    } else {
        wrongUnit.classList.remove("hidden");
    }
}

function replaceMeasurement(newValue, newUnit){
    let arr = input.value.trim().split('');
    arr.splice(selectionStartIndex, selectionLength, newValue + ' ' + newUnit);
    output.innerText = arr.join('');
}

function clearSuggestion(){
    inches.classList.remove('bg-opacity-75');
    feet.classList.remove('bg-opacity-75');
    yards.classList.remove('bg-opacity-75');
    inches.classList.add('bg-opacity-25');
    feet.classList.add('bg-opacity-25');
    yards.classList.add('bg-opacity-25');
}

function suggestInches(){
    inches.classList.remove('bg-opacity-25');
    feet.classList.remove('bg-opacity-75');
    yards.classList.remove('bg-opacity-75');
    inches.classList.add('bg-opacity-75');
    feet.classList.add('bg-opacity-25');
    yards.classList.add('bg-opacity-25');
    inches.setAttribute('aria-description', 'suggested unit option');
    feet.setAttribute('aria-description', 'unit option');
    yards.setAttribute('aria-description', 'unit option');
}

function suggestFeet(){
    feet.classList.remove('bg-opacity-25');
    inches.classList.remove('bg-opacity-75');
    yards.classList.remove('bg-opacity-75');
    feet.classList.add('bg-opacity-75');
    inches.classList.add('bg-opacity-25');
    yards.classList.add('bg-opacity-25');
    feet.setAttribute('aria-description', 'suggested unit option');
    inches.setAttribute('aria-description', 'unit option');
    yards.setAttribute('aria-description', 'unit option');
}

function suggestYards(){
    yards.classList.remove('bg-opacity-25');
    feet.classList.remove('bg-opacity-75');
    inches.classList.remove('bg-opacity-75');
    yards.classList.add('bg-opacity-75');
    feet.classList.add('bg-opacity-25');
    inches.classList.add('bg-opacity-25');
    yards.setAttribute('aria-description', 'suggested unit option');
    feet.setAttribute('aria-description', 'unit option');
    inches.setAttribute('aria-description', 'unit option');
}

function getNext(){
    if (input.value.trim()){
        noText.classList.add("hidden");
        output.innerText = input.value.trim();
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