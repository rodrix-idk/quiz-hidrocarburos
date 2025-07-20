const questions = [
    {
        question: "¿Qué tipo de hidrocarburo se caracteriza por tener solo enlaces simples carbono-carbono?",
        options: ["Alcano", "Alqueno", "Alquino", "Aromático"],
        answer: "Alcano",
        explanation: "Los alcanos son hidrocarburos saturados, lo que significa que solo contienen enlaces simples carbono-carbono."
    },
    {
        question: "¿Cuál es la fórmula general para los alcanos acíclicos (de cadena abierta)?",
        options: ["CnH2n", "CnH2n-2", "CnH2n+2", "CnH2n+4"],
        answer: "CnH2n+2",
        explanation: "La fórmula general CnH2n+2 indica que por cada 'n' átomos de carbono, hay '2n+2' átomos de hidrógeno en un alcano de cadena abierta."
    },
    {
        question: "¿Qué tipo de enlace carbono-carbono poseen los alquenos?",
        options: ["Solo enlaces simples", "Al menos un doble enlace", "Al menos un triple enlace", "Enlaces aromáticos"],
        answer: "Al menos un doble enlace",
        explanation: "Los alquenos son hidrocarburos insaturados que contienen al menos un doble enlace carbono-carbono."
    },
    {
        question: "¿Cuál es la fórmula general para los alquenos acíclicos (con un solo doble enlace)?",
        options: ["CnH2n+2", "CnH2n", "CnH2n-2", "CnH2n-4"],
        answer: "CnH2n",
        explanation: "La presencia de un doble enlace en un alqueno reduce en dos los átomos de hidrógeno en comparación con un alcano, dando la fórmula CnH2n."
    },
    {
        question: "¿Qué característica define a los alquinos?",
        options: ["Presencia de solo enlaces simples", "Presencia de un doble enlace", "Presencia de un triple enlace", "Estructura cíclica"],
        answer: "Presencia de un triple enlace",
        explanation: "Los alquinos son hidrocarburos insaturados que contienen al menos un triple enlace carbono-carbono."
    },
    {
        question: "¿Cuál es la fórmula general para los alquinos acíclicos (con un solo triple enlace)?",
        options: ["CnH2n", "CnH2n+2", "CnH2n-2", "CnHn"],
        answer: "CnH2n-2",
        explanation: "Un triple enlace en un alquino reduce en cuatro los átomos de hidrógeno en comparación con un alcano, resultando en CnH2n-2."
    },
    {
        question: "El butano es un ejemplo de:",
        options: ["Alqueno", "Alquino", "Alcano", "Cicloalcano"],
        answer: "Alcano",
        explanation: "El nombre 'butano' termina en -ano, lo que indica que es un alcano y solo contiene enlaces simples."
    },
    {
        question: "El eteno (etileno) es el alqueno más simple. ¿Cuántos átomos de carbono tiene?",
        options: ["1", "2", "3", "4"],
        answer: "2",
        explanation: "El prefijo 'et-' en eteno indica dos átomos de carbono."
    },
    {
        question: "¿Cuál de los siguientes es un gas utilizado comúnmente en la soldadura, debido a su combustión a alta temperatura?",
        options: ["Metano", "Propano", "Butano", "Acetileno (Etino)"],
        answer: "Acetileno (Etino)",
        explanation: "El acetileno (nombre IUPAC: etino) es el alquino más simple y se utiliza en soldadura y corte de metales."
    },
    {
        question: "¿Cómo se nombran los hidrocarburos con un doble enlace?",
        options: ["Con la terminación -ano", "Con la terminación -eno", "Con la terminación -ino", "Con la terminación -ol"],
        answer: "Con la terminación -eno",
        explanation: "La terminación -eno se usa para indicar la presencia de un doble enlace en la cadena de carbono."
    }
];

let currentQuestionIndex = 0;
let score = 0;
let timer;
const TIME_LIMIT = 15;
let timeLeft = TIME_LIMIT;

const questionElement = document.getElementById('question');
const optionsButtons = document.querySelectorAll('.option-btn');
const timerElement = document.getElementById('time');
const quizContainer = document.getElementById('quiz-container');
const feedbackArea = document.getElementById('feedback-area');
const feedbackMessage = document.getElementById('feedback-message');
const explanationElement = document.getElementById('explanation');
const nextQuestionBtn = document.getElementById('next-question-btn');
const resultContainer = document.getElementById('result-container');
const scoreElement = document.getElementById('score');
const motivationalMessage = document.getElementById('motivational-message');
const restartQuizBtn = document.getElementById('restart-quiz-btn');
const questionArea = document.getElementById('question-area');

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    quizContainer.classList.remove('hidden');
    resultContainer.classList.add('hidden');
    feedbackArea.classList.add('hidden');
    questionArea.classList.remove('hidden'); // Asegúrate de que el área de preguntas sea visible
    loadQuestion();
}

function loadQuestion() {
    resetTimer();
    clearInterval(timer); // Limpiar cualquier temporizador anterior
    timeLeft = TIME_LIMIT;
    timerElement.textContent = timeLeft;
    startTimer();

    const currentQuestion = questions[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;

    optionsButtons.forEach((button, index) => {
        button.textContent = currentQuestion.options[index];
        button.onclick = () => checkAnswer(button, currentQuestion.options[index]);
        button.classList.remove('correct', 'incorrect');
        button.disabled = false; // Habilitar botones
    });

    feedbackArea.classList.add('hidden');
    questionArea.classList.remove('hidden');
    nextQuestionBtn.classList.add('hidden');
}

function startTimer() {
    timer = setInterval(() => {
        timeLeft--;
        timerElement.textContent = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timer);
            checkAnswer(null, null); // Llama a checkAnswer para manejar el tiempo agotado
        }
    }, 1000);
}

function resetTimer() {
    clearInterval(timer);
    timeLeft = TIME_LIMIT;
    timerElement.textContent = timeLeft;
}

function checkAnswer(selectedButton, selectedOption) {
    clearInterval(timer); // Detener el temporizador inmediatamente
    const currentQuestion = questions[currentQuestionIndex];
    const correctAnswer = currentQuestion.answer;

    optionsButtons.forEach(button => {
        button.disabled = true; // Deshabilitar todos los botones una vez que se selecciona una respuesta o el tiempo se agota
        if (button.textContent === correctAnswer) {
            button.classList.add('correct');
        }
    });

    if (selectedOption === correctAnswer) {
        score++;
        feedbackMessage.textContent = "¡Correcto!";
        feedbackMessage.style.color = "#2e7d32"; // Verde oscuro
    } else {
        feedbackMessage.textContent = "¡Incorrecto!";
        feedbackMessage.style.color = "#d32f2f"; // Rojo
        if (selectedButton) {
            selectedButton.classList.add('incorrect');
        }
    }

    explanationElement.textContent = currentQuestion.explanation;
    feedbackArea.classList.remove('hidden');
    nextQuestionBtn.classList.remove('hidden');
    questionArea.classList.add('hidden'); // Ocultar el área de la pregunta

    if (currentQuestionIndex === questions.length - 1) {
        nextQuestionBtn.textContent = "Ver Resultados";
    } else {
        nextQuestionBtn.textContent = "Siguiente Pregunta";
    }
}

function showNextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        loadQuestion();
    } else {
        showResults();
    }
}

function showResults() {
    quizContainer.classList.add('hidden');
    resultContainer.classList.remove('hidden');
    scoreElement.textContent = score;

    let message = "";
    if (score === questions.length) {
        message = "¡Felicidades! ¡Eres un genio de los hidrocarburos!";
    } else if (score >= questions.length * 0.7) {
        message = "¡Excelente! Tienes un gran conocimiento. ¡Sigue así!";
    } else if (score >= questions.length * 0.4) {
        message = "¡Buen esfuerzo! Repasa algunos conceptos y lo dominarás.";
    } else {
        message = "¡No te desanimes! La química es fascinante, un poco más de estudio y verás el progreso. ¡Tú puedes!";
    }
    motivationalMessage.textContent = message;
}

// Event Listeners
nextQuestionBtn.addEventListener('click', showNextQuestion);
restartQuizBtn.addEventListener('click', startQuiz);

// Iniciar el quiz al cargar la página
document.addEventListener('DOMContentLoaded', startQuiz);