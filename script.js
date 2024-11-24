const start = document.getElementById("start");
const time = document.getElementById("time");
const accuracy = document.getElementById("accuracy");
const hits = document.getElementById("hits");
const misses = document.getElementById("misses");
const accuracyFinish = document.getElementById("accuracyF")
const hitsFinish = document.getElementById("hitsF")
const missesFinish = document.getElementById("missesF")
const game_window = document.querySelector(".window")
const windowInfo = document.querySelector('.window #window-info');
const finish = document.querySelector(".finish");
const block = document.getElementById("block");
let circlesIntervalValue = 1000;


let isStarted = false;
let timerInterval;
let circlesInterval;
let speedCircles;

start.addEventListener("click", function () {
    isStarted = true;
    speedCircles = setInterval(speedRandomCircles, 1000)


    timerInterval = setInterval(timer, 1000);
    accuracyInterval = setInterval(accuracyCount, 500)


    block.remove();
    start.style.display = "none";
});


let hitsValue = 0; 
function randomCircles() {
    const circle = document.createElement("div");
    circle.className = "circle"
    const shades = ['#252525', '#2e2e2e','#080808','#757474', '#f06eff' ,'#5c54eb' ,'#eb546d' ,'#0fbbff','#ff4b0f' ,'#0fff7f','#0f3bff']
    const randomColorNum = randomNum(0, shades.length);
    let randomColor = shades[randomColorNum];
    const {width, height} = game_window.getBoundingClientRect();
    const size = randomNum(20, 60)
    const x = randomNum(60, height - size)
    const y = randomNum(0, width - size)
    circle.style.width = `${size}px`;
    circle.style.height = `${size}px`;
    circle.style.top = `${x}px`
    circle.style.left = `${y}px`
    circle.style.backgroundColor = randomColor;
    circle.style.animation = "circleAppear 3s ease"
    game_window.append(circle);

    let circleTimeout = setTimeout(() => {
        if (circle.parentNode) {
            circle.remove(); // Usuń krąg po czasie
            missesValue++; // Zwiększ liczbę missów
            misses.innerText = `Misses: ${missesValue}`;
        }
    }, 3000);

    circle.addEventListener("click", function() {
        hitsValue++
        hits.innerText = `Hits: ${hitsValue}`
        circle.remove(); // Usuń krąg natychmiast
        clearTimeout(circleTimeout); // Usuń timer po kliknięciu
   })


}

let missesValue = 0;

game_window.addEventListener("click", function(e) {


    if (windowInfo.contains(e.target)) {
        return;
    }

    if (block.contains(e.target)) {
        return;
    }



    if (e.target.classList.contains('circle')) {
        return;
    }

    missesValue++

    misses.innerText = `Misses: ${missesValue}`

})

function randomNum(min, max) {
  return Math.floor(Math.random() * (max - min) + min );

    
}

let seconds = 60;
function timer() {



    seconds--;
    time.innerText = `Time left: 0:${seconds} `

    if (seconds < 10) {
        time.innerText = `Time left: 0:0${seconds} `
    }
     
    if (seconds === 0) {
        clearInterval(timerInterval);
        clearInterval(circlesInterval);
        clearInterval(accuracyInterval);
        hideCircles() 
        game_window.style.display = "none"
        finish.style.display = "inline";
        hitsFinish.innerText = `Hits: ${hitsValue}`
        missesFinish.innerText = `Misses: ${missesValue}`
    }

}

function hideCircles() {

    const circles = document.querySelectorAll(".circle")

    circles.forEach(circle => {
        circle.style.display =  "none";
        circle.remove();
    });

}



function accuracyCount() {
    let accuracyValue = Math.floor(100 * (hitsValue / (hitsValue + missesValue)))


    if (isNaN(accuracyValue)) {
        accuracyValue = 0;
    }

    accuracy.innerText = `Accuracy ${accuracyValue}%`
    accuracyFinish.innerText = `Accuracy: ${accuracyValue}%`





}

function speedRandomCircles() {
    
        if (circlesIntervalValue > 650) {
            circlesIntervalValue -= 10 ;
            console.log(circlesIntervalValue);
            clearInterval(circlesInterval);
            circlesInterval = setInterval(randomCircles, circlesIntervalValue);
        }


    }


