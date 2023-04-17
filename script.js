let questions = [
    {
        "question": "Wann wurde die Fussball-Bundesliga gegründet ?",
        "anwser1": "1952",
        "anwser2": "1957",
        "anwser3": "1963",
        "anwser4": "1969",
        "right_anwser": 3,
    },

    {
        "question": "Wer wurde am häufigsten Fußball-Weltmeister ?",
        "anwser1": "Liechtenstein",
        "anwser2": "England",
        "anwser3": "Deutschland",
        "anwser4": "Brasilien",
        "right_anwser": 4,
    },

    {
        "question": " Welches ist das am meistverkaufte Videospiel ?",
        "anwser1": "Minecraft",
        "anwser2": "Super Mario",
        "anwser3": "Grand Theft Auto 5",
        "anwser4": "The Last of Us",
        "right_anwser": 1,
    },

    {
        "question": "Welche ist die meistverkaufte Konsole der Welt ?",
        "anwser1": "Nintendo DS",
        "anwser2": "X Box One",
        "anwser3": "Playstation 2",
        "anwser4": "Sega Genesis",
        "right_anwser": 3,
    },

    {
        "question": "Wann wird GTA 6 veröffentlicht ?",
        "anwser1": "2023",
        "anwser2": "2024",
        "anwser3": "2025",
        "anwser4": "Vermutlich zur nächsten Konsolengeneration",
        "right_anwser": 4,
    },

    {
        "question": "Wann wurde das erste Iphone präsentiert ?",
        "anwser1": "09. Januar 2007",
        "anwser2": "14. Januar 2007",
        "anwser3": "22. Februar 2007",
        "anwser4": "11. März 2007",
        "right_anwser": 1,
    },

    {
        "question": "Welches ist das beliebteste Wanderlied ?",
        "anwser1": "Hoch auf dem gelben Wagen",
        "anwser2": "Blau von den Bergen kommen wir",
        "anwser3": "Das Wandern ist des Müllers Lust",
        "anwser4": "Alles neu macht der Mai",
        "right_anwser": 1,
    },

    {
        "question": "Wo geht die Sonne auf ?",
        "anwser1": "Norden",
        "anwser2": "Osten",
        "anwser3": "Süden",
        "anwser4": "Westen",
        "right_anwser": 2,
    },

    {
        "question": "Wieviele Reifen hat ein Trike ?",
        "anwser1": "2",
        "anwser2": "3",
        "anwser3": "4",
        "anwser4": "6",
        "right_anwser": 2,
    },

    {
        "question": "Wieviel Fett darf Rinderhack enthalten ?",
        "anwser1": "20 %",
        "anwser2": "25 %",
        "anwser3": "30 %",
        "anwser4": "7 %",
        "right_anwser": 1,
    },
]

let actualquestion = 0;
let rightQuestions = 0;
let audioCorrect = new Audio('audio/correct.mp3');
let audioWrong = new Audio('audio/wrong.mp3');


function render() {
    document.getElementById('all-questions').innerHTML = questions.length;
    renderQuestion();
}


function renderQuestion() {
    if (actualquestion >= questions.length) {
        showEndScreen();
    }
    else {
        updateQuestion();
    }
}


function showAnwser(pick) {
    let question = questions[actualquestion];
    let pickedQuestionNumber = pick.slice(-1);
    let idOfRightAnwser = `anwser${question['right_anwser']}`;

    if (pickedQuestionNumber == question['right_anwser']) {                               // right anwser choosen
        document.getElementById(pick).parentNode.classList.add('bg-success');             // changes background color to green by right anwser
        document.getElementById('amount-of-questions').innerHTML = questions.length;
        rightQuestions++;                                                                 // raises right questions by 1
        audioCorrect.play();                                                              // plays sound of right anwser
    }
    else {
        document.getElementById(pick).parentNode.classList.add('bg-danger');
        document.getElementById(idOfRightAnwser).parentNode.classList.add('bg-success');
        audioWrong.play();                                                                // plays sound of wrong anwser 
    }
    document.getElementById('next-btn').disabled = false;                                 // enables next question button
}


function nextQuestion() {

    actualquestion++;
    renderQuestion();
    resetAnwsers();

}


function resetAnwsers() {                                                         // removes background-color green and red of right and wrong questions
    document.getElementById('anwser1').parentNode.classList.remove('bg-success');
    document.getElementById('anwser1').parentNode.classList.remove('bg-danger');
    document.getElementById('anwser2').parentNode.classList.remove('bg-success');
    document.getElementById('anwser2').parentNode.classList.remove('bg-danger');
    document.getElementById('anwser3').parentNode.classList.remove('bg-success');
    document.getElementById('anwser3').parentNode.classList.remove('bg-danger');
    document.getElementById('anwser4').parentNode.classList.remove('bg-success');
    document.getElementById('anwser4').parentNode.classList.remove('bg-danger');
}


function restartGame() {                                                 // starts new quiz-round
    document.getElementById('image-head').src = `img/card-back.jpg`;     // shows beginning background-image
    document.getElementById('question-body').style = '';
    document.getElementById('quiz-end').style = 'display:none;';         // hides endscreen

    actualquestion = 0;
    rightQuestions = 0;

    render();
}


function updateQuestion() {
    let percent = (actualquestion + 1) / questions.length;
    percent = Math.round(percent * 100);                                  // rounds percent-number

    document.getElementById('progress-bar').innerHTML = `${percent} %`;   // shows actual percent-number
    document.getElementById('progress-bar').style.width = `${percent}%`;  // changes background-color identical to percent-number

    let question = questions[actualquestion];

    document.getElementById('question-number').innerHTML = actualquestion + 1;  // raises question-number by 1
    document.getElementById('question-text').innerHTML = question['question'];  // displays current question of JSON array
    document.getElementById('anwser1').innerHTML = question['anwser1'];         // displays anwser selection of JSON array
    document.getElementById('anwser2').innerHTML = question['anwser2'];
    document.getElementById('anwser3').innerHTML = question['anwser3'];
    document.getElementById('anwser4').innerHTML = question['anwser4'];
    document.getElementById('next-btn').disabled = true;
}


function showEndScreen() {
    document.getElementById('quiz-end').style = '';
    document.getElementById('question-body').style = 'display:none';                // hides quiz-body
    document.getElementById('amount-of-rightQuestions').innerHTML = rightQuestions; // shows number of right anwsered questions
    document.getElementById('amount-of-questions').innerHTML = questions.length;    // shows number of all questions
    document.getElementById('image-head').src = 'img/winner.png';                   // displays endscreen background
    document.getElementById('progress-bar').style = 'display:none';                 // hides progress-bar

}

