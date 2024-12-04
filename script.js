// Función para la búsqueda por voz
function startVoiceSearch() {
    // Obtener el botón de búsqueda por voz
    const voiceButton = document.getElementById('voice-search-button');

    // Cambiar el color del botón para indicar que está grabando
    voiceButton.classList.add('bg-blue-500');  // Cambiar a azul para indicar que está grabando
    voiceButton.classList.remove('bg-gray-300');  // Eliminar el color gris inicial

    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = "es-ES";  // Idioma español
    recognition.start();

    recognition.onresult = function(event) {
        const transcript = event.results[0][0].transcript;
        document.getElementById('search-input').value = transcript; // Coloca el texto dictado en el input
        searchContent(); // Llama a la función de búsqueda para redirigir al archivo
    };

    recognition.onerror = function(event) {
        console.error("Error en el reconocimiento de voz: ", event.error);
    };

    // Cuando termine el reconocimiento de voz, restaurar el color original del botón
    recognition.onend = function() {
        voiceButton.classList.remove('bg-blue-500');  // Eliminar el color azul
        voiceButton.classList.add('bg-gray-300');    // Restaurar el color gris original
    };
}

// Función para manejar la tecla "Enter" para la búsqueda
function handleKeyDown(event) {
    if (event.key === "Enter") {
        searchContent(); // Ejecutar la búsqueda cuando el usuario presione Enter
    }
}

// Función para normalizar cadenas (sin tildes y compararlas)
function normalizeString(str) {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

// Función para la búsqueda al hacer clic en el botón de "Buscar"
function searchContent() {
    const searchInput = normalizeString(document.getElementById('search-input').value);
    const htmlFiles = [
        { file: 'index.html', title: 'Página principal' },
        { file: 'Costs-budgets.html', title: 'Costos y Presupuestos' },
        { file: 'iso-norms.html', title: 'Normas ISO' },
        { file: 'login.html', title: 'Iniciar sesión' },
        { file: 'register.html', title: 'Registrarse' },
        { file: 'Software-Engineering.html', title: 'Ingeniería de Software' },
        { file: 'Software-Architecture.html', title: 'Arquitectura de Software' },
        { file: 'Verification-Validation.html', title: 'Verificación y Validación' }
    ];

    let found = false;

    // Buscar en los archivos HTML
    htmlFiles.forEach(file => {
        const normalizedTitle = normalizeString(file.title); // Normalizar el título
        if (normalizedTitle.includes(searchInput)) {
            found = true;
            window.location.href = file.file; // Redirigir al archivo al encontrar el título
        }
    });

    // Si no se encuentra nada, mostrar un mensaje en consola
    if (!found && searchInput.length > 0) {
        console.log('No se encontraron resultados para: ' + searchInput);
    }
}


// Función para la búsqueda por voz en versión móvil
function startVoiceSearchMobile() {
    const voiceButtonMobile = document.getElementById('voice-search-button-mobile');

    // Cambiar el color del botón para indicar que está grabando
    voiceButtonMobile.classList.add('bg-blue-500');  // Cambiar a azul para indicar que está grabando
    voiceButtonMobile.classList.remove('bg-gray-300');  // Eliminar el color gris inicial

    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = "es-ES";  // Idioma español
    recognition.start();

    recognition.onresult = function(event) {
        const transcript = event.results[0][0].transcript;
        document.getElementById('mobile-search-input').value = transcript; // Coloca el texto dictado en el input
        searchContent(); // Llama a la función de búsqueda para redirigir al archivo
    };

    recognition.onerror = function(event) {
        console.error("Error en el reconocimiento de voz: ", event.error);
    };

    // Cuando termine el reconocimiento de voz, restaurar el color original del botón
    recognition.onend = function() {
        voiceButtonMobile.classList.remove('bg-blue-500');  // Eliminar el color azul
        voiceButtonMobile.classList.add('bg-gray-300');    // Restaurar el color gris original
    };
}

// Función para manejar la tecla "Enter" para la búsqueda en versión móvil
function handleKeyDown(event) {
    if (event.key === "Enter") {
        searchContent(); // Ejecutar la búsqueda cuando el usuario presione Enter
    }
}

// Función para la búsqueda al hacer clic en el botón de "Buscar" en versión móvil
function searchContent() {
    const searchInput = normalizeString(document.getElementById('mobile-search-input').value);
    const htmlFiles = [
        { file: 'index.html', title: 'Página principal' },
        { file: 'Costs-budgets.html', title: 'Costos y Presupuestos' },
        { file: 'iso-norms.html', title: 'Normas ISO' },
        { file: 'login.html', title: 'Iniciar sesión' },
        { file: 'register.html', title: 'Registrarse' },
        { file: 'Software-Engineering.html', title: 'Ingeniería de Software' },
        { file: 'Software-Architecture.html', title: 'Arquitectura de Software' },
        { file: 'Verification-Validation.html', title: 'Verificación y Validación' }
    ];

    let found = false;

    // Buscar en los archivos HTML
    htmlFiles.forEach(file => {
        const normalizedTitle = normalizeString(file.title); // Normalizar el título
        if (normalizedTitle.includes(searchInput)) {
            found = true;
            window.location.href = file.file; // Redirigir al archivo al encontrar el título
        }
    });

    // Si no se encuentra nada, mostrar un mensaje en consola
    if (!found && searchInput.length > 0) {
        console.log('No se encontraron resultados para: ' + searchInput);
    }
}

// Función para normalizar cadenas (sin tildes y compararlas)
function normalizeString(str) {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase();
}













// JavaScript para mostrar/ocultar el menú desplegable en dispositivos móviles
const menuToggle = document.getElementById('menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');

if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', function () {
        mobileMenu.classList.toggle('hidden');
    });
}

// Habilitar arrastrar para desplazar cards
const cardsContainer = document.querySelector('.cards-container');
if (cardsContainer) {
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
}






//chatbot funcion UI
const chatbotIcon = document.getElementById("chatbotIcon");
        const chatbotWindow = document.getElementById("chatbotWindow");
        const iconImage = document.getElementById("iconImage");
        const chatContent = document.getElementById("chatContent");
        const chatInput = document.getElementById("chatInput");
        const optionsMenu = document.getElementById("optionsMenu");

        chatbotIcon.addEventListener("click", () => {
            chatbotWindow.classList.toggle("hidden");
            if (chatbotWindow.classList.contains("hidden")) {
                iconImage.src = "src/bot.svg";
            } else {
                iconImage.src = "src/cerrar-bot.svg";
            }
        });

        function toggleOptions() {
            optionsMenu.classList.toggle("hidden");
        }

        function sendMessage() {
            const message = chatInput.value.trim();
            if (message) {
                const userMessageElement = document.createElement("p");
                userMessageElement.classList.add("text-gray-800", "bg-blue-100", "p-2", "rounded-lg", "mb-2", "self-end", "max-w-xs", "break-words");
                userMessageElement.textContent = message;
                chatContent.appendChild(userMessageElement);

                const typingIcon = document.createElement("div");
                typingIcon.classList.add("text-gray-400", "bg-gray-200", "p-2", "rounded-lg", "mb-2", "max-w-xs", "flex", "items-center", "space-x-2");
                typingIcon.innerHTML = `
                    <svg class="h-4 w-4 animate-spin" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 001 1h2a1 1 0 100-2h-1V6z" clip-rule="evenodd" />
                    </svg>
                    <span>Escribiendo...</span>
                `;
                chatContent.appendChild(typingIcon);

                setTimeout(() => {
                    typingIcon.remove();
                    const botMessage = "Esta es una respuesta del chatbot que se adapta al contenido del mensaje.";
                    const botMessageElement = document.createElement("p");
                    botMessageElement.classList.add("text-white", "bg-gray-700", "p-2", "rounded-lg", "mb-2", "max-w-xs", "break-words");
                    botMessageElement.textContent = botMessage;
                    chatContent.appendChild(botMessageElement);
                    chatContent.scrollTop = chatContent.scrollHeight;
                }, 1000);

                chatInput.value = "";
                chatContent.scrollTop = chatContent.scrollHeight;
            }
        }

        function clearChat() {
            chatContent.innerHTML = `
                <div class="text-white bg-gray-700 p-2 rounded-lg mb-2 max-w-xs break-words">
                    Hola, ¿En qué puedo ayudarte hoy?
                </div>
            `;
            optionsMenu.classList.add("hidden");
        }

        function handleKeyPress(event) {
            if (event.key === 'Enter') {
                sendMessage();
                event.preventDefault(); // Evita el salto de línea al presionar Enter
            }
        }

        document.addEventListener("click", function(event) {
            if (!event.target.closest("#optionsMenu") && !event.target.closest("[onclick='toggleOptions()']")) {
                optionsMenu.classList.add("hidden");
            }
        });



//video normas ISO
const carousel = document.getElementById('carousel');
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        const prevBtnMobile = document.getElementById('prevBtnMobile');
        const nextBtnMobile = document.getElementById('nextBtnMobile');

        let scrollPosition = 0;
        const cardWidth = carousel.querySelector('.flex-shrink-0').offsetWidth + 16; // Ajuste del desplazamiento

        function scrollLeft() {
            scrollPosition = Math.max(scrollPosition - cardWidth * 2, 0); // Desplaza dos tarjetas
            carousel.style.transform = `translateX(-${scrollPosition}px)`;
        }

        function scrollRight() {
            const maxScroll = carousel.scrollWidth - carousel.clientWidth;
            scrollPosition = Math.min(scrollPosition + cardWidth * 2, maxScroll); // Desplaza dos tarjetas
            carousel.style.transform = `translateX(-${scrollPosition}px)`;
        }

        prevBtn.addEventListener('click', scrollLeft);
        nextBtn.addEventListener('click', scrollRight);
        prevBtnMobile.addEventListener('click', scrollLeft);
        nextBtnMobile.addEventListener('click', scrollRight);

//descargar contenido y mostrar secciones
function downloadContent() {
    const element = document.getElementById('Contenido');
    if (element) {
        html2pdf().from(element).set({
            margin: 1,
            filename: 'Informacion_InnovaSoft.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2, logging: true },
            jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
        }).save();
    } else {
        console.warn('Elemento Contenido no encontrado para la descarga.');
    }
}

function showSection(sectionId) {
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.classList.add('hidden');
    });

    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.remove('hidden');
    } else {
        console.warn(`Sección con ID "${sectionId}" no encontrada.`);
    }

    const downloadButton = document.getElementById('downloadButton');
    if (downloadButton) {
        downloadButton.style.display = (sectionId === 'Contenido') ? 'inline' : 'none';
    }
}








