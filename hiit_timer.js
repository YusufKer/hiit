class Timer {
  intervalID;
  constructor(timeLeft, div, exercise, nextExercise) {
    this.timeLeft = timeLeft;
    this.div = div;
    this.exercise = exercise;
    this.nextExercise = nextExercise;
    this.exerciseCount = 0;
    this.next = this.exerciseCount + 1;
  }

  decrement() {
    this.timeLeft--;
    this.changeColor();
    this.reset();
    this.div.innerHTML = this.timeLeft;
  }
  changeColor() {
    if (this.timeLeft < 16) {
      this.div.classList.replace("green", "red");
      this.beep();
    }
  }
  beep() {
    var context = new AudioContext();
    var o = context.createOscillator();
    o.type = "sine";
    o.connect(context.destination);
    o.start();
    setTimeout(function () {
      o.stop();
    }, 100);
  }
  reset() {
    if (this.timeLeft < 1) {
      this.timeLeft = 60;
      this.div.classList.replace("red", "green");
      this.beep();
      this.exerciseCount++;
      this.next++;
      this.exercise.innerHTML = workout[this.exerciseCount];
      this.nextExercise.innerHTML = workout[this.next];
    }
  }

  start() {
    this.intervalID = setInterval(() => session.decrement(), 1000);
  }

  stop() {
    clearInterval(this.intervalID);
    this.timeLeft = 65;
    this.div.innerHTML = this.timeLeft;
  }

  pause() {
    clearInterval(this.intervalID);
  }

  updateDisplay() {
    this.div.innerHTML = this.timeLeft;
  }
}
const nextExercise = document.querySelector(".next");
const exercise = document.querySelector(".exercise");
const timer = document.querySelector(".timer");
const startButton = document.querySelector("#start-button");
const stopButton = document.querySelector("#stop-button");

const workout = [
  "Star Jumps",
  "Bicycle Crunches",
  "High Knees",
  "Russian Twists",
  "Mountain Climbers",
  "Lying Leg Raises",
  "In & Out half Burpees",
  "Side to Side Plank",
  "Star Crunches",
  "High Knee Fullout Jog",
];

let timeLeft = 65;
let intervalID;

session = new Timer(timeLeft, timer, exercise, nextExercise);

exercise.innerHTML = workout[0];
nextExercise.innerHTML = workout[1];
timer.innerHTML = session.timeLeft;

startButton.addEventListener("click", () => {
  session.start();
});

stopButton.addEventListener("click", () => {
  session.stop();
});
