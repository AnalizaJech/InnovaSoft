// app.js

// Función para simular el inicio de sesión
function loginUser() {
    localStorage.setItem('isLoggedIn', true); // Simulando token de sesión
}

// Función para cerrar sesión
function logoutUser() {
    localStorage.removeItem('isLoggedIn');
    window.location.href = 'index.html'; // Redirigir a la página principal
}

// Verificar si el usuario está autenticado
function checkAuth() {
    return localStorage.getItem('isLoggedIn') === 'true';
}

// Redirigir a login si no está autenticado
function requireAuth() {
    if (!checkAuth()) {
        alert('Necesitas iniciar sesión para acceder a esta página.');
        window.location.href = 'login.html';
    }
}

// Añadir control a botones según el estado de autenticación
document.addEventListener("DOMContentLoaded", () => {
    const createQuestionBtn = document.getElementById("createQuestion");
    const startQuizBtn = document.getElementById("startQuiz");
    const saveBtn = document.getElementById("save");

    if (createQuestionBtn) {
        createQuestionBtn.addEventListener("click", () => {
            if (!checkAuth()) {
                alert('Inicia sesión para crear preguntas.');
                window.location.href = 'login.html';
            } else {
                // Lógica para crear preguntas
            }
        });
    }

    if (startQuizBtn) {
        startQuizBtn.addEventListener("click", () => {
            if (!checkAuth()) {
                alert('Inicia sesión para empezar el cuestionario.');
                window.location.href = 'login.html';
            } else {
                // Lógica para empezar el cuestionario
            }
        });
    }

    if (saveBtn) {
        saveBtn.addEventListener("click", () => {
            if (!checkAuth()) {
                alert('Inicia sesión para guardar.');
            } else {
                // Lógica para guardar la información
            }
        });
    }
});
