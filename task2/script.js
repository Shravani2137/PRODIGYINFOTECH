let [hours, minutes, seconds] = [0, 0, 0];
let display = document.getElementById("display");
let timer = null;
let isRunning = false;

document.getElementById("startStop").onclick = function () {
  if (!isRunning) {
    timer = setInterval(runStopwatch, 1000);
    this.textContent = "Pause";
    isRunning = true;
  } else {
    clearInterval(timer);
    this.textContent = "Start";
    isRunning = false;
  }
};

document.getElementById("reset").onclick = function () {
  clearInterval(timer);
  [hours, minutes, seconds] = [0, 0, 0];
  display.textContent = "00:00:00";
  document.getElementById("startStop").textContent = "Start";
  isRunning = false;
  document.getElementById("laps").innerHTML = "";
};

document.getElementById("lap").onclick = function () {
  if (isRunning) {
    const lapItem = document.createElement("li");
    lapItem.textContent = display.textContent;
    document.getElementById("laps").appendChild(lapItem);
  }
};

function runStopwatch() {
  seconds++;
  if (seconds === 60) {
    seconds = 0;
    minutes++;
  }
  if (minutes === 60) {
    minutes = 0;
    hours++;
  }

  display.textContent =
    (hours < 10 ? "0" + hours : hours) + ":" +
    (minutes < 10 ? "0" + minutes : minutes) + ":" +
    (seconds < 10 ? "0" + seconds : seconds);
}
