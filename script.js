// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCkxA2IpOctlsZy3R9V7d7RY8afmreScMI",
    authDomain: "quiz-80102.firebaseapp.com",
    projectId: "quiz-80102",
    storageBucket: "quiz-80102.appspot.com",
    messagingSenderId: "228206496223",
    appId: "1:228206496223:web:6ebf46526c244730fb1c6a",
    measurementId: "G-GJR7GH2CH7"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Global variables
let currentQuestionIndex = 0;
let questions = [];

// Fetch questions from Firestore
async function fetchQuestions() {
    const querySnapshot = await db.collection("questions").get();
    querySnapshot.forEach((doc) => {
        questions.push(doc.data());
    });
    displayQuestion(currentQuestionIndex);
}

// Display the current question
function displayQuestion(index) {
    const question = questions[index];
    document.getElementById('question').innerText = question.question;
    const optionsContainer = document.getElementById('options');
    optionsContainer.innerHTML = '';
    question.options.forEach((option, i) => {
        const optionButton = document.createElement('button');
        optionButton.classList.add('list-group-item', 'list-group-item-action');
        optionButton.innerText = option;
        optionButton.addEventListener('click', () => selectOption(i));
        optionsContainer.appendChild(optionButton);
    });
    document.getElementById('next-btn').style.display = 'none';
}

// Handle option selection
function selectOption(selectedIndex) {
    const correctAnswer = questions[currentQuestionIndex].correctAnswer;
    console.log(correctAnswer);
    console.log(selectedIndex);
    const options = document.querySelectorAll('#options button');
    options.forEach((button, index) => {
        button.classList.remove('active');
        if (index === selectedIndex) {
            button.classList.add('active');
        }
    });

    if (Number(selectedIndex) === Number(correctAnswer)) {
        alert("Correct Answer!");
    } else {
        alert("Wrong Answer!");
    }

    document.getElementById('next-btn').style.display = 'block';
}

// Go to the next question
document.getElementById('next-btn').addEventListener('click', () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        displayQuestion(currentQuestionIndex);
    } else {
        alert("Quiz completed!");
    }
});

// Load the first question
fetchQuestions();
