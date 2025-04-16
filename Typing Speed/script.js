// Sample texts for the typing test
const sampleTexts = [
    "The quick brown fox jumps over the lazy dog. This sentence contains all the letters in the English alphabet.",
    "Programming is the art of telling another human what one wants the computer to do. The programmer, like the poet, works only slightly removed from pure thought-stuff.",
    "The best way to predict the future is to invent it. Computer science is no more about computers than astronomy is about telescopes.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "The most disastrous thing that you can ever learn is your first programming language. The only way to learn a new programming language is by writing programs in it."
];

// DOM elements
const sampleTextElement = document.getElementById('sample-text');
const userInputElement = document.getElementById('user-input');
const startButton = document.getElementById('start-btn');
const resetButton = document.getElementById('reset-btn');
const timeElement = document.getElementById('time');
const wpmElement = document.getElementById('wpm');
const accuracyElement = document.getElementById('accuracy');
const resultsElement = document.getElementById('results');
const finalWpmElement = document.getElementById('final-wpm');
const finalAccuracyElement = document.getElementById('final-accuracy');
const correctCharsElement = document.getElementById('correct-chars');
const incorrectCharsElement = document.getElementById('incorrect-chars');

// Test variables
let timer;
let timeLeft = 60;
let testRunning = false;
let currentText = '';
let startTime;
let correctChars = 0;
let incorrectChars = 0;
let totalKeystrokes = 0;

// Initialize the app
function init() {
    displayRandomText();
    setupEventListeners();
}

// Display a random text for typing
function displayRandomText() {
    const randomIndex = Math.floor(Math.random() * sampleTexts.length);
    currentText = sampleTexts[randomIndex];
    sampleTextElement.innerHTML = '';

    currentText.split('').forEach(char => {
        const span = document.createElement('span');
        span.textContent = char;
        sampleTextElement.appendChild(span);
    });
}

// Set up event listeners
function setupEventListeners() {
    startButton.addEventListener('click', startTest);
    resetButton.addEventListener('click', resetTest);
    userInputElement.addEventListener('input', checkTyping);
}

// Start the typing test
function startTest() {
    if (testRunning) return;

    testRunning = true;
    timeLeft = 60;
    correctChars = 0;
    incorrectChars = 0;
    totalKeystrokes = 0;

    userInputElement.value = '';
    userInputElement.disabled = false;
    userInputElement.focus();

    startButton.classList.add('hidden');
    resetButton.classList.add('hidden');
    resultsElement.classList.add('hidden');

    const spans = sampleTextElement.querySelectorAll('span');
    spans.forEach(span => {
        span.className = '';
    });

    if (spans.length > 0) {
        spans[0].classList.add('current');
    }

    startTime = new Date().getTime();
    timer = setInterval(updateTimer, 1000);

    updateStats();
}

// Update the timer
function updateTimer() {
    timeLeft--;
    timeElement.textContent = timeLeft;

    if (timeLeft <= 0) {
        endTest();
    }
}

// Check user typing against sample text
function checkTyping() {
    if (!testRunning) return;

    const userText = userInputElement.value;
    totalKeystrokes = userText.length;

    const spans = sampleTextElement.querySelectorAll('span');
    spans.forEach(span => {
        span.className = '';
    });

    correctChars = 0;
    incorrectChars = 0;

    for (let i = 0; i < userText.length; i++) {
        if (i >= currentText.length) {
            spans[i].classList.add('incorrect');
            incorrectChars++;
        } else if (userText[i] === currentText[i]) {
            spans[i].classList.add('correct');
            correctChars++;
        } else {
            spans[i].classList.add('incorrect');
            incorrectChars++;
        }
    }

    if (userText.length < currentText.length) {
        spans[userText.length].classList.add('current');
    }

    updateStats();

    if (userText.length >= currentText.length) {
        endTest();
    }
}

// Update WPM and accuracy during the test
function updateStats() {
    const timeElapsed = (60 - timeLeft) || 1;
    const minutes = timeElapsed / 60;
    const words = correctChars / 5;
    const wpm = Math.round(words / minutes);

    const accuracy = totalKeystrokes > 0 
        ? Math.round((correctChars / totalKeystrokes) * 100) 
        : 0;

    wpmElement.textContent = wpm;
    accuracyElement.textContent = accuracy;
}

// End the typing test
function endTest() {
    clearInterval(timer);
    testRunning = false;
    userInputElement.disabled = true;

    const endTime = new Date().getTime();
    const timeElapsed = (endTime - startTime) / 1000; // in seconds
    const minutes = timeElapsed / 60;
    const words = correctChars / 5;
    const wpm = Math.round(words / minutes);

    const accuracy = totalKeystrokes > 0 
        ? Math.round((correctChars / totalKeystrokes) * 100) 
        : 0;

    finalWpmElement.textContent = wpm;
    finalAccuracyElement.textContent = accuracy;
    correctCharsElement.textContent = correctChars;
    incorrectCharsElement.textContent = incorrectChars;

    resultsElement.classList.remove('hidden');
    resetButton.classList.remove('hidden');
}


// Reset the typing test
function resetTest() {
    clearInterval(timer);
    testRunning = false;
    timeLeft = 60;

    timeElement.textContent = timeLeft;
    wpmElement.textContent = '0';
    accuracyElement.textContent = '0';

    userInputElement.value = '';
    userInputElement.disabled = true;

    startButton.classList.remove('hidden');
    resetButton.classList.add('hidden');
    resultsElement.classList.add('hidden');

    displayRandomText();
}

window.onload = init;
