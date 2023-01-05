var timerEl = document.querySelector('#timer');
var sec1El = document.getElementById('sec1');
var wrngButton = document.querySelectorAll('.incorrect');
var crctButton = document.querySelectorAll('.correct');
var sec2El = document.getElementById('sec2');
var sec3El = document.getElementById('sec3');
var sec4El = document.getElementById('sec4');
var startEl = document.getElementById('Start');
var qPage = document.getElementById('divsec');
var dispIncorrect = document.getElementById('dispIncorrect');
var dispCorrect = document.getElementById('dispCorrect');


function startQuiz() {
  var qRemaining = 3;
  var timeLeft = 75;
  
  var timeInterval = setInterval(function () {
    timeLeft--;
    timerEl.textContent = 'time:' + timeLeft;
    textContent = timeLeft;
    
    if(timeLeft !== 0 && qRemaining === 0) {
      clearInterval(timeInterval);
    }else if(timeLeft === 0 && qRemaining > 0) {
      clearInterval(timeInterval);
    }
  }, 1000);
  
  function incorrect() {
    timerEl.textcontent = 'Time:' + (timeLeft - 10);
    qRemaining--;
    console.log(qRemaining);
    dispIncorrect.classList.add('show');
    if(qRemaining === 2 && timeLeft !== 0) {
      sec1El.classList.remove('show');
      sec2El.classList.add('show');
    } else if(qRemaining === 1 && timeLeft !== 0) {
      sec2El.classList.remove('show');
      sec3El.classList.add('show')
    } else if (qRemaining === 0 && timeLeft !== 0) {
      sec3El.classList.remove('show');
      sec4El.classList.add('show');
    }
    setTimeout(() => {
      dispIncorrect.classList.remove('show');
    }, 500);
    
  }
  function correct() {
    qRemaining--;
    console.log(qRemaining);
    dispCorrect.classList.add('show');
    if(qRemaining === 2 && timeLeft !== 0) {
      sec1El.classList.remove('show');
      sec2El.classList.add('show');
    } else if(qRemaining === 1 && timeLeft !== 0) {
      sec2El.classList.remove('show');
      sec3El.classList.add('show')
    } else if (qRemaining === 0 && timeLeft !== 0) {
      sec3El.classList.remove('show');
      sec4El.classList.add('show');
    }
    setTimeout(() => {
      dispCorrect.classList.remove('show');
    }, 500);
  }
  
  
  timerEl.textContent = 'Time:' + timeLeft;
  qPage.style.display = 'none';
  sec1El.classList.add('show');
  
  wrngButton.forEach((btn)=> {
    btn.addEventListener("click", incorrect);
  })
  crctButton.forEach((btn2)=> {
    btn2.addEventListener("click", correct);
  })

    // TODO: Use the `setInterval()` method to call a function to be executed every 1000 milliseconds
  }
  

  startEl.addEventListener("click", startQuiz);
  
  
