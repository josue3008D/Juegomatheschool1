let correctAnswer = 0;
let opportunities = 3; // Número de oportunidades para respuestas incorrectas
let score = { correct: 0, incorrect: 0 };
let timerInterval;

function generateRandomQuestion() {
    // Operadores
    const operators = ['+', '-', 'X', '÷'];
    const operator = operators[Math.floor(Math.random() * operators.length)];
    
    let num1 = Math.floor(Math.random() * 100) + 1; // Número entre 1 y 100
    let num2 = Math.floor(Math.random() * 100) + 1; // Número entre 1 y 100
    let result;
    
    if (operator === '+') {
        result = num1 + num2;
    } else if (operator === '-') {
        result = num1 - num2;
    } else if (operator === 'X') {
        result = num1 * num2;
    } else if (operator === '÷') {
        num1 = num1 * num2; // Asegura que la división sea exacta
        result = num1 / num2;
    }
    
    // Generar opciones
    const correctOption = Math.floor(Math.random() * 3);
    const options = Array.from({ length: 3 }, (_, i) => {
        if (i === correctOption) return result;
        let option;
        do {
            option = Math.floor(Math.random() * 100) + 1;
        } while (option === result);
        return option;
    });
    
    document.getElementById('ejercicio').innerText = `${num1} ${operator} ${num2} = ?`;
    document.getElementById('opcion-a').innerText = options[0];
    document.getElementById('opcion-b').innerText = options[1];
    document.getElementById('opcion-c').innerText = options[2];
    
    correctAnswer = result;
    startTimer();
}

function startTimer() {
    let time = 15;
    const timer = document.getElementById('cronometro');
    timer.innerText = time;
    
    timerInterval = setInterval(() => {
        time--;
        timer.innerText = time;
        if (time <= 0) {
            clearInterval(timerInterval);
            handleAnswer(null); // No se seleccionó ninguna respuesta
        }
    }, 1000);
}

function handleAnswer(selectedOption) {
    clearInterval(timerInterval);

    if (selectedOption === null) {
        showMessage('Tiempo agotado! La respuesta era: ' + correctAnswer, false);
    } else {
        const selectedValue = parseInt(selectedOption.innerText);
        if (selectedValue === correctAnswer) {
            score.correct++;
            showMessage('¡Correcto!', true);
        } else {
            opportunities--;
            score.incorrect++;
            showMessage('Incorrecto! La respuesta era: ' + correctAnswer, false);
        }
    }
    
    document.getElementById('oportunidades').innerText = 'Oportunidades: ' + opportunities;
    
    if (opportunities <= 0) {
        showFinalScore();
    } else {
        setTimeout(generateRandomQuestion, 2000); // Genera nueva pregunta después de 2 segundos
    }
}

function showMessage(message, isCorrect) {
    const messageElement = document.getElementById('mensaje');
    messageElement.innerText = message;
    messageElement.className = 'mensaje ' + (isCorrect ? 'correcto' : 'incorrecto');
    messageElement.style.display = 'block';
}

function showFinalScore() {
    document.getElementById('resultado').classList.remove('hidden');
    document.getElementById('correctas').innerText = 'Correctas: ' + score.correct;
    document.getElementById('incorrectas').innerText = 'Incorrectas: ' + score.incorrect;
    document.getElementById('opciones').style.display = 'none';
    document.getElementById('nueva-pregunta').style.display = 'none';
    document.getElementById('jugar-nuevamente').style.display = 'block';
}

document.getElementById('opcion-a').addEventListener('click', function() { handleAnswer(this); });
document.getElementById('opcion-b').addEventListener('click', function() { handleAnswer(this); });
document.getElementById('opcion-c').addEventListener('click', function() { handleAnswer(this); });

document.getElementById('nueva-pregunta').addEventListener('click', generateRandomQuestion);
document.getElementById('jugar-nuevamente').addEventListener('click', () => {
    score = { correct: 0, incorrect: 0 };
    opportunities = 3;
    document.getElementById('resultado').classList.add('hidden');
    document.getElementById('opciones').style.display = 'block';
    document.getElementById('nueva-pregunta').style.display = 'block';
    document.getElementById('jugar-nuevamente').style.display = 'none';
    generateRandomQuestion();
});

// Inicializar el fondo con signos matemáticos
document.addEventListener('DOMContentLoaded', function() {
    const symbols = ['+', '-', 'X', '÷', '=', '>', '<'];
    const numSymbols = 30; // Número total de signos matemáticos en el fondo

    const container = document.querySelector('.math-symbols');
    
    for (let i = 0; i < numSymbols; i++) {
        const symbol = document.createElement('div');
        symbol.className = 'symbol';
        symbol.innerText = symbols[Math.floor(Math.random() * symbols.length)];
        symbol.style.top = Math.random() * 100 + '%';
        symbol.style.left = Math.random() * 100 + '%';
        symbol.style.fontSize = Math.random() * (4 - 2) + 2 + 'rem'; // Tamaño aleatorio entre 2rem y 4rem
        container.appendChild(symbol);
    }

    // Llama a la función para inicializar el juego
    generateRandomQuestion();
});




