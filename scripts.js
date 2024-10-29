$(document).ready(function () {
    // Script para el chatbot
    $('#send-message').click(function () {
      let userInput = $('#chat-input').val();
      if (userInput) {
        $('#chat-window').append(`<div class='user-message bg-blue-500 text-white p-2 rounded-md mb-2'>${userInput}</div>`);
        $('#chat-input').val('');
        // Llamada a la IA del chatbot (placeholder)
        setTimeout(() => {
          $('#chat-window').append(`<div class='bot-message bg-gray-300 text-black p-2 rounded-md mb-2'>Soy el asistente virtual de InnovaSoft, ¿En qué puedo ayudarte?</div>`);
        }, 1000);
      }
    });
  });