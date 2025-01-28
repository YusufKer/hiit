class WorkoutTimer {
  
  intervalID;
  audioContext = new (window.AudioContext || window.webkitAudioContext)();
  
  constructor (times,excercises,containers, buttons) {
    
    // TIME 
    this.startTime = times.startTime;
    this.timeLeft = times.startTime;
    this.roundTime = times.roundTime;
    this.breakTime = times.breakTime;
    
    // EXCERCISES
    this.excercises = excercises;
    this.excerciseIndex = 0;
    this.numberOfExcercises = excercises.length;
    
    // CONTAINERS
    this.timerContainer = document.querySelector(containers.timerContainer);
    this.currentExcerciseContainer = document.querySelector(containers.currentExcerciseContainer);
    this.nextExcerciseContainer = document.querySelector(containers.nextExcerciseContainer);

    // SET INITIAL VALUES
    this.timerContainer.innerText = this.startTime;
    this.currentExcerciseContainer.innerText = this.excercises[this.excerciseIndex];
    this.nextExcerciseContainer.innerText = this.excercises[this.excerciseIndex + 1];

    // ADD EVENT LISTENERS TO BUTTONS
    this.startButton = document.querySelector(buttonSelectors.startButton);

    this.startButton.addEventListener("click", () => {
      this.start();
      this.startButton.disabled = true;
    });

    document.querySelector(buttonSelectors.pauseButton).addEventListener("click", () => {
      this.pause();
      this.startButton.disabled = false;
    })

    document.querySelector(buttonSelectors.stopButton).addEventListener("click", () => {
      this.stop();
      this.startButton.disabled = false;
    })
  }

  start(){
    if(this.intervalID) clearInterval(this.intervalID);
    this.intervalID = setInterval(() => {
      this.decrement();
    }, 1000);
  }

  nextExcercise(){
    if(this.excerciseIndex === this.numberOfExcercises - 1){
      this.stop();
      return;
    }

    this.excerciseIndex = this.excerciseIndex + 1;
    this.currentExcerciseContainer.innerText = excercises[this.excerciseIndex];
    
    if(this.excerciseIndex === this.numberOfExcercises) return;
    this.nextExcerciseContainer.innerText = excercises[this.excerciseIndex + 1] || "";

  }

  stop(){
    clearInterval(this.intervalID)
    this.timeLeft = this.startTime;
    this.timerContainer.innerText = this.startTime;
  }

  pause(){
    clearInterval(this.intervalID);
  }

  decrement(){

    this.timeLeft = this.timeLeft - 1;
    
    if(this.timeLeft < this.breakTime + 1){
      // should I really be doing this every time or just on the 15 second mark?
      this.timerContainer.classList.remove("green");
      this.timerContainer.classList.add("red");
      this.beep();
    }

    if(this.timeLeft === 0){
      this.timeLeft = this.roundTime;
      this.nextExcercise();
      this.timerContainer.classList.remove("red");
      this.timerContainer.classList.add("green");
    }

    this.timerContainer.innerText = this.timeLeft;
  }

  beep(frequency = 440, duration = 100, volume = 0.5) {
    // Maybe these constants are better off as part of the class. That way we don't create a new audioContext on every beep?
    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();

    // Set up the oscillator
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(frequency, this.audioContext.currentTime);
    
    // Set up the gain (volume) node
    gainNode.gain.setValueAtTime(volume, this.audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + duration/1000);

    // Connect the nodes
    oscillator.connect(gainNode);
    gainNode.connect(this.audioContext.destination);

    // Start and stop the beep
    oscillator.start(this.audioContext.currentTime);
    oscillator.stop(this.audioContext.currentTime + duration/1000);
  }
}

const buttonSelectors = {
  startButton:"#start-button",
  pauseButton:"#pause-button",
  stopButton:"#stop-button"
}

const containerSelectors = {
  timerContainer:"#excercise-timer",
  currentExcerciseContainer:"#current-excercise",
  nextExcerciseContainer:"#next-excercise"
}

const excercises = [
  "Star Jumps",
  "Bicycle Crunches",
  "High Knees",
  "Russian Twists",
  "Mountain Climbers",
  "Lying Leg Raises",
  "In & Out Half Burpees",
  "Side to Side Plank",
  "Star Crunches",
  "High Knee Full Out Jog"
]

// TODO: Create a times object to allow for customising times. example, startTime, breakTime, roundTime

const times = {
  startTime:15,
  roundTime:10,
  breakTime:5
}

// TODO: Create a backend with an sqlite db to store data such as excercises and time preference
// TODO: Add feature to have different excercises for different days of the week

const session = new WorkoutTimer(times, excercises, containerSelectors, buttonSelectors);
