// JavaScript para mostrar/ocultar el menú desplegable en dispositivos móviles
document.getElementById('menu-toggle').addEventListener('click', function () {
  const menu = document.getElementById('mobile-menu');
  menu.classList.toggle('hidden');
});

// Habilitar arrastrar para desplazar cards
const cardsContainer = document.querySelector('.cards-container');
let isDown = false;
let startX;
let scrollLeft;

cardsContainer.addEventListener('mousedown', (e) => {
  isDown = true;
  cardsContainer.classList.add('active');
  startX = e.pageX - cardsContainer.offsetLeft;
  scrollLeft = cardsContainer.scrollLeft;
});
cardsContainer.addEventListener('mouseleave', () => {
  isDown = false;
  cardsContainer.classList.remove('active');
});
cardsContainer.addEventListener('mouseup', () => {
  isDown = false;
  cardsContainer.classList.remove('active');
});
cardsContainer.addEventListener('mousemove', (e) => {
  if (!isDown) return;
  e.preventDefault();
  const x = e.pageX - cardsContainer.offsetLeft;
  const walk = (x - startX) * 2; // Ajusta la velocidad
  cardsContainer.scrollLeft = scrollLeft - walk;
});





// Mostrar/Ocultar Ventana del Chatbot
const botButton = document.getElementById('bot-button');
const chatbotWindow = document.getElementById('chatbot-window');
const closeChat = document.getElementById('close-chat');

botButton.addEventListener('click', () => {
  if (chatbotWindow.style.display === 'none' || chatbotWindow.style.display === '') {
      chatbotWindow.style.display = 'flex';
      botButton.innerHTML = '<img src="src/cerrar-bot.svg" alt="Cerrar">';
  } else {
      chatbotWindow.style.display = 'none';
      botButton.innerHTML = '<img src="src/bot.svg" alt="Chatbot">';
  }
});

closeChat?.addEventListener('click', () => {
  chatbotWindow.style.display = 'none';
  botButton.innerHTML = '<img src="bot.svg" alt="Chatbot">';
});














// Cargar el Chatbot
function loadChatbot() {
  fetch('chatbot.html')
      .then(response => response.text())
      .then(data => {
          document.body.insertAdjacentHTML('beforeend', data);
          setupChatbotToggle();
      });
}

// Mostrar/Ocultar el Chatbot
function setupChatbotToggle() {
  const botButton = document.getElementById('bot-button');
  const chatbotWindow = document.getElementById('chatbot-window');
  
  botButton.addEventListener('click', () => {
      chatbotWindow.classList.toggle('hidden');
  });
}

window.addEventListener('DOMContentLoaded', loadChatbot);
