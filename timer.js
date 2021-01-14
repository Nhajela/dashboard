export const PomoTimer = class {
  constructor(button, time, type = "default") {
    console.log(time)
    this.type = type;
    this.timerBox = document.querySelector(".timer-box");
    this.pomotimer = document.querySelector(".pomo-timer");
    this.daytimer = document.querySelector(".day-timer");
    this.timerText = document.getElementById("timer_pomo_text");
    
    this.time = time * 60 - 1;
    this.defaultTime = time * 60 - 1;


    this.button = button;
    this.timer_running = false;
    this.intervalmethod = null;
    this.beepAudio = new Audio("beep.mp3");

    
    button.addEventListener("click", this.handleClick);
  }

  beep = () => {
    const temp = setInterval(() => {
      this.beepAudio.play();
    }, 1000);

    setTimeout(() => clearInterval(temp), 3000);
  };

  stopTimer = () => {
    this.pauseTimer();
    // reset time so that if someone clicks again, it works
    this.time = this.defaultTime;
    console.log(this.time);
  };
  pauseTimer = () => {
    clearInterval(this.intervalmethod);
    this.timer_running = false;
  };

  showPomoTimer = () => {
    Object.assign(this.timerBox.style, {
      "grid-template-rows": "20% 50% auto",
    });
    Object.assign(this.daytimer.style, { "font-size": "1.7rem" });

    this.pomotimer.style.display = "block";
  };

  hidePomoTimer = () => {
    // hide timer text
    Object.assign(this.timerBox.style, { "grid-template-rows": "70% auto" });
    Object.assign(this.daytimer.style, { "font-size": "2rem" });
    this.pomotimer.style.display = "none";
  };

  pomodoroStart = (time) => {
    console.log(this.type)
    if (this.type=="custom"){
      this.time = Number(document.getElementById("customTime").value)*60 -1
      console.log(this.time,"custom")
    }

    console.log(this.time);
    this.timer_running = true;

    this.showPomoTimer();
    this.intervalmethod = setInterval(async () => {
      var minutes = Math.floor(this.time / 60);
      var seconds = this.time % 60;

      console.log({ minutes, seconds });
      this.timerText.innerText = `${minutes}:${seconds}`;

      if (this.time == 0) {
        this.stopTimer();
        this.beep();
        setTimeout(this.hidePomoTimer, 5000);
      } else {
        //basically a 'for loop' running once every second.
        this.time -= 1;
      }
    }, 1000);
  };

  handleClick = () => {
    console.log("i was clicked");

    if (!this.timer_running) {
      this.pomodoroStart(this.time);
    } else {
      this.pauseTimer();
      alert("timer paused");
    }
  };
};

export const DayTimer = class extends PomoTimer {
  constructor(button, time) {
    super(button, time);
    this.timerText = document.getElementById("timer_day_text");
    this.time = time - 1;
    this.defaultTime = time - 1;
  }

  beep = () => {
    const temp = setInterval(() => {
      this.beepAudio.play();
    }, 1000);

    setTimeout(() => clearInterval(temp), 2000);
  };

  pomodoroStart = (time) => {
    this.timer_running = true;
    const hourinterval = 1000;

    this.intervalmethod = setInterval(async () => {
      this.timerText.innerText = `HOUR ${this.time}`;
      console.log(this.time);
      this.time += 1;
      this.beep();
    }, hourinterval);
  };
};
