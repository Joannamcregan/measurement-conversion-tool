const body = document.querySelector('body');
const modeSelector = document.querySelector("#modeSelector");
const sun = document.querySelector("#sun");
const moon = document.querySelector("#moon");

let isDark = false;

modeSelector.addEventListener('click', toggleDark.bind(this));

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