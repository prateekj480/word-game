const words = [
    'sigh',
    'tense',
    'airplane',
    'ball',
    'pies',
    'juice',
    'warlike',
    'bad',
    'north',
    'dependent',
    'steer',
    'silver',
    'highfalutin',
    'superficial',
    'quince',
    'eight',
    'feeble',
    'admit',
    'drag',
    'loving'
];
const displayWord = document.getElementById("word");
const select = document.getElementById("difficulty");
const typeWord = document.getElementById("text");
const scoreEl = document.getElementById("score");
const timer = document.getElementById("time-left");
const toggleDifficulty = document.getElementById("toggle");
const gameContainer = document.getElementById("game-container");

//event listeners
let score = 0;
window.addEventListener("load", () => {
    const selectValue = sessionStorage.getItem("select")
    select.value = `${selectValue}`
    let index = getRandomInt();
    displayWord.textContent = words[index]
    setInterval(() => {
        let timeLeft = +timer.innerText;
        if (timeLeft > 0) {
            timeLeft--;
            timer.innerText = `${timeLeft}`
        } else {
            gameOver();
        }
    }, 1000);
})
typeWord.addEventListener("input", matchWords)
select.addEventListener("change", (e) => {
    sessionStorage.setItem("select", e.target.value)
    window.location.reload();
})
toggleDifficulty.addEventListener("click", changeDifficulty)


//random integer between 0 and 19(both inclusive)
function getRandomInt() {
    return Math.floor(Math.random() * (20));
}

function matchWords(e) {
    if (e.target.value.trim() === displayWord.innerText) {
        difficultyTimer();
        score++;
        scoreEl.innerText = `${score}`
        let index = getRandomInt()
        displayWord.textContent = words[index]
        e.target.value = "";
    } else if (e.target.value.length >= displayWord.innerText.length && e.target.value.trim() !== displayWord.innerText) {
        displayWord.classList.add("incorrect")
        setTimeout(() => {
            displayWord.classList.remove("incorrect")
        }, 200)
    }
}

function difficultyTimer() {
    let timeLeft = +timer.innerText;
    if (select.value === "Easy") {
        timeLeft += 3;
        timer.innerText = `${timeLeft}`
    }
    else if (select.value === "Medium") {
        timeLeft += 2;
        timer.innerText = `${timeLeft}`
    } else {
        timeLeft += 1;
        timer.innerText = `${timeLeft}`
    }
}

let selectIndex = select.selectedIndex;

function changeDifficulty() {
    timer.innerText = '6';
    score = 0;
    scoreEl.innerText = `${score}`
    if (selectIndex < 2) {
        selectIndex += 1;
        select.selectedIndex = selectIndex
    } else {
        selectIndex = 0;
        select.selectedIndex = selectIndex
    }
}

function gameOver() {
    gameContainer.innerHTML = `<h2 class="time-out">Time Ran Out!</h2>
    <h2 class="final-score">Final Score: ${score}</h2>`;
}