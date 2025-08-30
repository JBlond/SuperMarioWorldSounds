'use strict';
const keys = document.querySelectorAll('.key');

function playSoundByDataKey(dataKey, source = "unknown") {
    const audio = document.querySelector(`audio[data-key="${dataKey}"]`);
    const key = document.querySelector(`.key[data-key="${dataKey}"]`);

    if (!audio || !key) {
        console.log(dataKey + " no audio (" + source + ")");
        return;
    }

    console.log(dataKey + " " + source + " audio");
    audio.currentTime = 0;
    audio.play();
    key.classList.add('playing');
}

function playWav(event) {
    playSoundByDataKey(event.keyCode, "keydown");
}

function removeTransition(event) {
    if (event.propertyName !== 'transform'){
        return;
    }
    this.classList.remove('playing');
}

// Event listener for CSS-transition
keys.forEach(key => key.addEventListener('transitionend', removeTransition));

// keyboard
window.addEventListener('keydown', playWav);

// click & Touch
keys.forEach(key => {
    function handleInteraction() {
        const dataKey = key.getAttribute("data-key");
        playSoundByDataKey(dataKey, "click/touch");
    }
    key.addEventListener("click", handleInteraction);
    key.addEventListener("touchstart", event => {
        event.preventDefault();
        handleInteraction();
    });
});
