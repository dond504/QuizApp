/**
 * Example store structure
 */
const store = {
  // 5 or more questions are required
  questions: [{
      question: 'What color is the Sun?',
      answers: [
        'red',
        'blue',
        'pink',
        'green'
      ],
      correctAnswer: 'red'
    },
    {
      question: 'What color is grass?',
      answers: [
        'red',
        'orange',
        'purple',
        'green'
      ],
      correctAnswer: 'green'
    },
    {
      question: 'What color is the sky?',
      answers: [
        'red',
        'blue',
        'brown',
        'black'
      ],
      correctAnswer: 'blue'
    },
    {
      question: 'What color are couds?',
      answers: [
        'orange',
        'green',
        'white',
        'purple'
      ],
      correctAnswer: 'white'
    },
    {
      question: 'What is the color of snow?',
      answers: [
        'orange',
        'green',
        'white',
        'purple'
      ],
      correctAnswer: 'white'
    },
  ],
  quizStarted: false,
  questionNumber: 0,
  right: 0,
  wrong: 0
};

//Main page where you start quiz
function mainPage() {
  return `<header 
    <div class = 'mainpage'>
    <h1>Are you smarter than a First grader?</h1>
      <h2>Pop quiz are you ready?</h2>
      <button id = "startQuiz" class = "startbutton" autofocus>Start Quiz</button>
     </div>
   </header>
   <img src = "https://media.giphy.com/media/3oEdv4CFfKoLoD59bG/giphy.gif" alt = Million Dollar Question"/>`
}
//this fuction generates the quiz
function generateQuestion() {
  let number = store.questionNumber
  let question = store.questions[store.questionNumber];
  let answers = question.answers.map((answer, index) => {
    if (index === 0) {
      return `<div class = "middle"><input type='radio' id='answer${index}' name= 'answer' value='${answer}' required>
    <label for="answer${index}">${answer}</label></div><br>`
    } else {
      return `<div class= "middle"><input type="radio" id="answer${index}" name="answer" value='${answer}'>
    <label for="answer${index}">${answer}</label></div><br>`
    }
  });
  return `<div class='questionPage'>  
   <form id = "quiz-form">
   <h2>Question ${number + 1}: ${question.question}</h2>  
  ${answers.join("")}
  <button type= "click" class ="answerSubmit">Submit Answer</button>
  <p>Right: ${store.right}</p><p>Wrong: ${store.wrong}</p>
  </form>
</div>`
}
//make a page for right answers
function isRight(answers) {
  return `<div class="correctPage">
  <h2>Woo Hoo! You got it right!</h2>
  <p>Right: ${store.right}</p><p>Wrong: ${store.wrong}</p>
  <button id ="next" class="nextQuestion">Next Question</button>
 </div>
<img src = "https://media.giphy.com/media/lMameLIF8voLu8HxWV/giphy.gif" alt="People throwing confetti"/>`
}
// make a page for wrong answers
function isWrong(answers) {
  return `<div class="wrongPage">
  <h2>Oh no! You are not smarter than a First grader!</h2>
  <p>Right: ${store.right}</p><p>Wrong: ${store.wrong}</p>
  <button id ="next" class="nextQuestion">Next Question</button>
</div>
<img src = "https://media.giphy.com/media/V6GWsIj9WkOzu/giphy.gif" alt = "No Whamies"/>`
}
//last page restart quiz
function endPage() {
  return `<div class="endOfQuiz">
  <h2>You are smarter than a First grader!</h2>
  <h3>Right: ${store.right}</h3>
  <h3>Wrong: ${store.wrong}</h3>
  <h3>You got ${store.right}/${store.questionNumber} right!</h3>
  <button id="restartQuiz">Retry!</button>
  </div>
  <img src = "https://media.giphy.com/media/26DOJwj9M4npUa54A/giphy.gif" alt = "You did it dancing clown"/>`

}
//check user answers with store answers.. add right and wrong answers...
function answerCheck(review) {
  let i = store.questionNumber;
  let result = (review === store.questions[i].correctAnswer) ? "Correct" : "Incorrect";
  if (result === "Correct") {
    store.right += 1;
    isRight(store.questions[i].correctAnswer);
    html = isRight()
  } else {
    store.wrong += 1;
    isWrong(store.questions[i].correctAnswer);
    html = isWrong()
  }
  store.questionNumber++
  $('main').html(html)
  handleNextQuestion();
}
//listener that starts quiz
function handleStartQuiz() {
  $('main').on('click', '#startQuiz', function (event) {
    store.quizStarted = true;
    renderQuizApp();
  });
}
//submits answers to the answer check function!
function handleSubmit() {
  $('main').submit('#quiz-form', (event) => {
    event.preventDefault();
    let userAnswer = $("input[name ='answer']:checked").val();
    console.log(userAnswer)
    if (userAnswer != undefined) {
      answerCheck(userAnswer);
    };
  })
}
//listener that cycles through pages 
function handleNextQuestion() {
  $('#next').on('click', (event) => {
    if (store.questionNumber < 5) {
      html = renderQuizApp();
      main();
    } else {
      html = endPage();
      $('main').html(html);
    }
  });
}
//listener function to restart test
function handleRestart() {
  $("main").on('click', '#restartQuiz', function (event) {
    event.preventDefault();
    store.quizStarted = false;
    store.questionNumber = 0;
    renderQuizApp();
  });
}
//this function renders pages
function renderQuizApp() {
  let html = '';
  if (store.quizStarted) {
    html = generateQuestion()
    if (store.questionNumber > store.questions.length - 1) {}
  } else {
    html = mainPage()
  }
  $('main').html(html);
}




function main() {
  renderQuizApp()
  handleStartQuiz()
  handleSubmit()
  handleNextQuestion()
  handleRestart()
};
$(main());