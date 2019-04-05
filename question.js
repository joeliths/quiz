
// Send httpRequest to url, receive JSON from api.
var httpRequest = new XMLHttpRequest;
var url="https://opentdb.com/api.php?amount=10&category=11&difficulty=medium&type=multiple";
var res;

httpRequest.onreadystatechange = function(){
  if(httpRequest.readyState==4){
    if(httpRequest.status==200){
      res=httpRequest.response.results;

        loadQuestion();



      }
    }
  }
  httpRequest.open("GET",url);
  httpRequest.responseType="json";
  httpRequest.send();

var container=document.getElementById('quizContainer');
var questionEl=document.getElementById('question');
var opt1=document.getElementById('opt1');
var opt2=document.getElementById('opt2');
var opt3=document.getElementById('opt3');
var opt4=document.getElementById('opt4');
var nextButton=document.getElementById('nextButton');
var resultCont=document.getElementById('result');
var progress=document.getElementById('progress');


// Shuffle array with questions so answer and options will me at random places.
function randomFunc(myArr) {
            var l = myArr.length, temp, index;
            while (l > 0) {
               index = Math.floor(Math.random() * l);
               l--;
               temp = myArr[l];
               myArr[l] = myArr[index];
               myArr[index] = temp;
            }
            return myArr;
         }


var question;
var answer;
var options=[];
var counter=0;

// Load question and place them to HTML-elements
function loadQuestion(){

  question=res[counter].question;
  answer=res[counter].correct_answer;
  options=res[counter].incorrect_answers;
  options.push(answer);

  options=randomFunc(options);

  questionEl.innerHTML=question;
  opt1.innerHTML=options[0];
  opt1.id =options[0];
  opt2.innerHTML=options[1];
  opt2.value=options[1];
  opt3.innerHTML=options[2];
  opt3.value=options[2];
  opt4.innerHTML=options[3];
  opt4.value=options[3];

  counter++;
  progress.setAttribute("value",counter);


  }


var score=0;
var selectedOption;
var index;
var x = document.getElementsByTagName('input');
// Load next question and add score id answer is correct.
function nextQuestion(){
    selectedOption=document.querySelector("input[type=radio]:checked");

    index=options.indexOf(answer);

  if (!selectedOption){
    alert("Please select your answer");
    return;
  }


  if(selectedOption.value==index+1){
    selectedOption.parentElement.style.setProperty("background","green");
    score++;
  }
  else {
    selectedOption.parentElement.style.setProperty("background","red");

    setTimeout(function(){x[index].parentElement.style.setProperty("background","green");}, 1500)



  }

  if (counter<=9){

    setTimeout(showAnswer, 3500);

  }
  else {
  setTimeout  (displayResult,3500);
  }

  }

  // Show user correct answer,

function showAnswer(){
  selectedOption.checked=false;
  selectedOption.parentElement.style.setProperty("background","rgba(255, 255, 255, 0.5)");
  x[index].parentElement.style.setProperty("background","rgba(255, 255, 255, 0.5)");

  loadQuestion();
}

  // Get the modal
  var modal = document.getElementById('myModal');



  // Get the <span> element that closes the modal
  var span = document.getElementsByClassName("close")[0];

  // When quiz is finish open modal
  function displayResult() {
    document.getElementById('modal-body').innerHTML="The quiz is finished!"+"<br><br>You scored "+score+"/10<br><br> Close this window to start over";
    modal.style.display = "block";
  }

  // When the user clicks on <span> (x), close the modal and reload page.
  span.onclick = function() {
    modal.style.display = "none";
    document.location.reload()
  }

  // When the user clicks anywhere outside of the modal, close it and reload page.
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
      document.location.reload()
    }
  }
