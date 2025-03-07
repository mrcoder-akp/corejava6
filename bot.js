document.addEventListener("DOMContentLoaded", function () {
    const chatContainer = document.getElementById("chat-container");
    const chatHeader = document.getElementById("chat-header");
    const chatBox = document.getElementById("chat-box");
    const sendButton = document.getElementById("send-button");
    const clearButton = document.getElementById("clear-button");
    const chatLogo = document.getElementById("chat-logo");
    const crossButton = document.getElementById("cross-btn");
    const inputField = document.getElementById("user-input");

    let offsetX, offsetY, isDragging = false;

    // 🟢 Function to load saved messages from local storage
    function loadMessages() {
        const messages = JSON.parse(localStorage.getItem("chatMessages")) || [];
        messages.forEach(msg => {
            const messageDiv = document.createElement("div");
            messageDiv.classList.add("message", msg.type);
            messageDiv.textContent = msg.text;
            chatBox.appendChild(messageDiv);
        });
        chatBox.scrollTop = chatBox.scrollHeight;
    }

    // 🟢 Function to save messages to local storage
    function saveMessage(text, type) {
        const messages = JSON.parse(localStorage.getItem("chatMessages")) || [];
        messages.push({ text, type });
        localStorage.setItem("chatMessages", JSON.stringify(messages));
    }

    function sendMessage() {
        const userText = inputField.value.trim();
        if (userText === "") return;

        const userMessage = document.createElement("div");
        userMessage.classList.add("message", "user-message");
        userMessage.textContent = userText;
        chatBox.appendChild(userMessage);

        saveMessage(userText, "user-message");

        inputField.value = "";
        chatBox.scrollTop = chatBox.scrollHeight;

        // Bot response after delay
        setTimeout(() => botResponse(userText), 1000);
    }

    function botResponse(userText) {
        let botReply = "I didn't understand that. Can you ask something else? Plz Connect with mail-mrtark@gmail.com";

        const responses = {
            "hello": "Hi there! How can I assist you🤖?",
            "hi": "Hello! I'm Avinash😊",
            "how are you": "I'm Good, but I'm doing great! How about you?",
            "bye": "Goodbye! Have a great day🥰!",
            "help": "I'm here to assist you. Ask me anything (Software Developer issue)🔍!",
            "java": "Yes, I can help you with all Java topics. Click the Navbar Java icon and read all topics deeply😊"
        };

        Object.keys(responses).forEach(key => {
            if (userText.toLowerCase().includes(key)) {
                botReply = responses[key];
            }
        });

        // 🟢 Typing Indicator Animation
        const typingIndicator = document.createElement("div");
        typingIndicator.classList.add("message", "bot-message", "typing");
        typingIndicator.innerHTML = `<span></span><span></span><span></span>`;
        chatBox.appendChild(typingIndicator);
        chatBox.scrollTop = chatBox.scrollHeight;

        setTimeout(() => {
            chatBox.removeChild(typingIndicator);

            const botMessage = document.createElement("div");
            botMessage.classList.add("message", "bot-message");
            botMessage.textContent = botReply;
            chatBox.appendChild(botMessage);

            saveMessage(botReply, "bot-message");
            chatBox.scrollTop = chatBox.scrollHeight;
        }, 2000);
    }

    sendButton.addEventListener("click", sendMessage);
    inputField.addEventListener("keypress", (event) => {
        if (event.key === "Enter") sendMessage();
    });

    clearButton.addEventListener("click", () => {
        chatBox.innerHTML = "";
        localStorage.removeItem("chatMessages");
    });

    chatLogo.addEventListener("click", () => {
        chatContainer.style.display = 'flex';
        crossButton.style.display = 'block';
        chatLogo.style.display = 'none';
    });

    crossButton.addEventListener("click", () => {
        chatContainer.style.display = 'none';
        crossButton.style.display = 'none';
        chatLogo.style.display = 'block';
    });

    // 🟢 Load messages on page load
    loadMessages();
});

// 🟢 Chat Container Moveable Code (Fixed Bottom Boundaries)
const chatHeader = document.querySelector('.chat-header');
const chatContainer = document.querySelector('.chat-container');

let isDragging = false;
let offsetX = 0;
let offsetY = 0;

chatHeader.addEventListener('mousedown', (e) => {
    isDragging = true;

    const rect = chatContainer.getBoundingClientRect();
    offsetX = e.clientX - rect.left;
    offsetY = e.clientY - rect.top;

    chatContainer.style.cursor = 'grabbing';
    chatContainer.style.transition = 'none';
});

document.addEventListener('mousemove', (e) => {
    if (isDragging) {
        let newLeft = e.clientX - offsetX;
        let newTop = e.clientY - offsetY;

        const navbarHeight = document.querySelector(".navbar") ? document.querySelector(".navbar").offsetHeight : 60;
        const maxWidth = window.innerWidth - chatContainer.offsetWidth - 10;
        const maxHeight = window.innerHeight - chatContainer.offsetHeight - 10;

        if (newLeft < 10) newLeft = 10;
        if (newLeft > maxWidth) newLeft = maxWidth;
        if (newTop < navbarHeight) newTop = navbarHeight;
        if (newTop > maxHeight) newTop = maxHeight;

        chatContainer.style.left = `${newLeft}px`;
        chatContainer.style.top = `${newTop}px`;
        chatContainer.style.transform = 'none';
    }
});

document.addEventListener('mouseup', () => {
    isDragging = false;
    chatContainer.style.cursor = 'move';
    chatContainer.style.transition = '0.2s ease-out';
});

// 🟢 Auto Adjust Chat Logo Position in Bottom Right Corner (Responsive)
function adjustChatLogo() {
    const logo = document.getElementById("chat-logo");
    logo.style.position = "fixed";
    logo.style.bottom = "10px";
    logo.style.right = "10px";
}

window.addEventListener("resize", adjustChatLogo);
window.addEventListener("load", adjustChatLogo);
