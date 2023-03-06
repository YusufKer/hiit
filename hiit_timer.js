
class Timer{
    constructor(timeLeft,div,excercise,nextExcercise){
        this.timeLeft = timeLeft;
        this.div = div;
        this.excercise = excercise;
        this.nextExcercise = nextExcercise;
        this.excerciseCount = 0;
        this.next = this.excerciseCount + 1;
    }
    // decrement = setInterval(()=>{
    //     this.timeLeft--;
    //     this.changeColor();
    //     this.reset(); 
    //     console.log(this.timeleft)
    // },1000)
    decrement(){
        this.timeLeft--;
        this.changeColor();
        this.reset(); 
        this.div.innerHTML = this.timeLeft;
    }
    changeColor(){
        if(this.timeLeft<16){
            this.div.classList.replace("green","red");
            this.beep();
        }
    }
    beep(){
        var context = new AudioContext();
        var o = context.createOscillator();
        o.type = "sine";
        o.connect(context.destination);
        o.start();
        setTimeout(function(){ 
        o.stop();
        }, 100);
    }
    reset(){
        if(this.timeLeft < 1){
            this.timeLeft = 60;
            this.div.classList.replace("red","green");
            this.beep();
            this.excerciseCount ++;
            this.next ++;
            this.excercise.innerHTML = workout[this.excerciseCount];
            this.nextExcercise.innerHTML = workout[this.next];
        }
    }    
}
const nextExcercise = document.querySelector('.next');
const excercise = document.querySelector('.excercise');
const timer = document.querySelector('.timer');
const start_stop = document.querySelector('.start_stop');
const workout = ['Star Jumps','Bicycle Crunches','High Knees','Russian Twists','Mountain Climbers','Lying Leg Raises','In & Out half Burpees','Side to Side Plank','Star Crunches','High Knee Fullout Jog'];
var timeLeft = 65;


session = new Timer(timeLeft,timer,excercise,nextExcercise);

excercise.innerHTML = workout[0];
nextExcercise.innerHTML = workout[1];
timer.innerHTML = session.timeLeft;

start_stop.addEventListener('click',()=> setInterval(()=>session.decrement(),1000))
