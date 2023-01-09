// global declarations
var timerEl = document.querySelector('#timer');
var wrngButton = document.querySelectorAll('.incorrect');
var crctButton = document.querySelectorAll('.correct');
var sec1El = document.getElementById('sec1');
var sec2El = document.getElementById('sec2');
var sec3El = document.getElementById('sec3');
var sec4El = document.getElementById('sec4');
var startEl = document.getElementById('Start');
var qPage = document.getElementById('divsec');
var dispIncorrect = document.getElementById('dispIncorrect');
var dispCorrect = document.getElementById('dispCorrect');
var userInput = document.getElementById('btn');
var highScore = document.getElementById('highScore');
var hsLocal = JSON.parse(localStorage.getItem('hsLocal'));
var clearHS = document.getElementById('clearHS');
var disablesubmit = document.getElementById('initials');
var resetQuiz = document.getElementById('resetQuiz');
var viewHS = document.getElementById('viewHighscore');
var timeLeft = 75;
var correctGuesses = 0;
var qRemaining = 3;
var score;
var listofScores = {
  
  initials: [],
  
  newScore: []
  
};

// checks local storage for highscores and updates list with organized scores.
if(hsLocal === null) {
  
  localStorage.setItem('hsLocal', JSON.stringify(listofScores));
  
} else if(hsLocal !== null){
    for(var i = hsLocal.newScore.length; i >= 0; i--) {
      if(hsLocal.newScore[i] < hsLocal.newScore[i + 1]) {
        var tempScore = hsLocal.newScore[i];
        hsLocal.newScore[i] = hsLocal.newScore[i + 1];
        hsLocal.newScore[i + 1] = tempScore;
        
        var tempName = hsLocal.initials[i];
        hsLocal.initials[i] = hsLocal.initials[i + 1];
        hsLocal.initials[i + 1] = tempName;
      }

    }
    for(var x = 0; x < hsLocal.initials.length; x++) {

      listofScores.initials.push(hsLocal.initials[x]);
      listofScores.newScore.push(hsLocal.newScore[x]);

    }
    
  console.log(hsLocal);

}
  
  console.log(listofScores.initials.length);
  // clears list of highscores when button is pressed.
  function clearlist(event) {
    event.preventDefault();
    
  while( highScore.firstChild ){
    highScore.removeChild( highScore.firstChild );
  }
  
  localStorage.clear();
  
}

// Updates the highscore page with your score.
function formSubmission(event) {
  event.preventDefault();
  
  var inputVal = document.getElementById('initials').value;
  
  var li = document.createElement('li');
  
  score = timeLeft * correctGuesses;

  if(inputVal) {
    listofScores.initials.push(inputVal);
    listofScores.newScore.push(score);
  }

  console.log(listofScores);

  localStorage.setItem('hsLocal', JSON.stringify(listofScores));

  var appendScore = inputVal + ' ' + ' Score: ' + score;
  
  console.log(inputVal);
  if (!inputVal) {
    console.log('No initials filled out in the form!');
    return;
  }
  
  highScore.appendChild(li);
  
  li.append(appendScore);
  
  userInput.disabled = true;
  
  disablesubmit.disabled = true;
  
}


  function startQuiz() {

  viewHS.disabled = true;
  disablesubmit = false;
  userInput.disabled = false;
  
  var timeInterval = setInterval(function () {
    timeLeft--;
    timerEl.textContent = 'Time:' + timeLeft;
    
    if(timeLeft !== 0 && qRemaining === 0) {
      clearInterval(timeInterval);
      viewHS.disabled = false;
      sec1El.classList.remove('show');
      sec4El.classList.add('show');
      score = timeLeft * correctGuesses;
      return;
    }else if(timeLeft === 0 && qRemaining > 0) {
      clearInterval(timeInterval);
      viewHS.disabled = false;
      sec1El.classList.remove('show');
      sec4El.classList.add('show');
      score = timeLeft * correctGuesses;
      return;
    } 
    
  }, 1000);

  qPage.style.display = 'none';
  sec1El.classList.add('show');
  
  // docs time and updates remaining questions when wrong answer is chosen.
  // also displays 'Incorrect!' briefly.
  function incorrect() {
    timeLeft = timeLeft - 10;
    timerEl.textContent = 'Time:' + timeLeft;
    qRemaining--;
    console.log(qRemaining);
    dispIncorrect.classList.add('show');
    if(qRemaining === 2 && timeInterval !== 0) {
      sec1El.classList.remove('show');
      sec2El.classList.add('show');
    } else if(qRemaining === 1 && timeInterval !== 0) {
      sec2El.classList.remove('show');
      sec3El.classList.add('show')
    } else if (qRemaining === 0 && timeInterval !== 0) {
      setTimeout(() => {
        sec3El.classList.remove('show');
        sec4El.classList.add('show');
      }, 500);
    }
    setTimeout(() => {
      dispIncorrect.classList.remove('show');
    }, 500);
    
    }

    // updates questions remaining and number of correct guesses when correct answer is chosen.
    // also displays 'Correct!' briefly
    function correct() {
      qRemaining--;
      correctGuesses++;
      console.log(qRemaining);
      dispCorrect.classList.add('show');
      if(qRemaining === 2 && timeInterval !== 0) {
        sec1El.classList.remove('show');
        sec2El.classList.add('show');
      } else if(qRemaining === 1 && timeInterval !== 0) {
        sec2El.classList.remove('show');
        sec3El.classList.add('show')
      } else if (qRemaining === 0 && timeInterval !== 0) {
        setTimeout(() => {
          sec3El.classList.remove('show');
          sec4El.classList.add('show');
        }, 500);
      }
      setTimeout(() => {
        dispCorrect.classList.remove('show');
      }, 500);
  }
  
  
    // Adds functionality to correct and incorrect answers.
    wrngButton.forEach((btn)=> {
      btn.addEventListener("click", incorrect);
    })
    crctButton.forEach((btn2)=> {
      btn2.addEventListener("click", correct);
    })

    resetQuiz.addEventListener("click", function () {});

   
    
  }


  // checks local storage and updates highscores if storage is present.
  if(hsLocal !== null && hsLocal.initials.length !== null){

    for(x = 0; x < hsLocal.initials.length; x++){

    var li = document.createElement('li');

    highScore.appendChild(li);

    li.append(hsLocal.initials[x] + ' Score: ' + hsLocal.newScore[x]);

    }

  }

  // main page button functionality.
  startEl.addEventListener("click", startQuiz);
  
  userInput.addEventListener("click", formSubmission);
  
  clearHS.addEventListener("click", clearlist);

  viewHS.addEventListener("click", function() {
    qPage.style.display = 'none';
    sec4El.classList.add('show');
    //userInput.disabled = true;
    disablesubmit.disabled = true;

  });
  
  