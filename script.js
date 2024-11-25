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








