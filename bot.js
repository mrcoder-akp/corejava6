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

    // Function to load saved messages from local storage
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

    // Function to save messages to local storage
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
    
        // 🟢 Create "Typing..." effect with animated dots
        const typingIndicator = document.createElement("div");
        typingIndicator.classList.add("message", "bot-message", "typing");
        typingIndicator.innerHTML = `<span></span><span></span><span></span>`; // 🟢 Dots for animation
        chatBox.appendChild(typingIndicator);
        chatBox.scrollTop = chatBox.scrollHeight;
    
        // 🟢 Simulate typing delay before bot replies
        setTimeout(() => {
            chatBox.removeChild(typingIndicator); // Remove typing indicator
            
            const botMessage = document.createElement("div");
            botMessage.classList.add("message", "bot-message");
            botMessage.textContent = botReply;
            chatBox.appendChild(botMessage);
            
            saveMessage(botReply, "bot-message");
            chatBox.scrollTop = chatBox.scrollHeight;
        }, 5000); // 🟢 2-second delay before showing bot response
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

    // Load messages on page load
    loadMessages();
});

// JavaScript to make the chat container movable within 90% of its allowed display area
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
    chatContainer.style.transition = 'none'; // Disable transition while dragging
});

document.addEventListener('mousemove', (e) => {
    if (isDragging) {
        let newLeft = e.clientX - offsetX;
        let newTop = e.clientY - offsetY;

        // Get the allowed movement area (90% of max-width & max-height)
        const maxWidth = window.innerWidth * 0.9 - chatContainer.offsetWidth;
        const maxHeight = window.innerHeight * 0.9 - chatContainer.offsetHeight;

        // Apply movement restrictions
        if (newLeft < 0) newLeft = 0;
        if (newTop < 0) newTop = 0;
        if (newLeft > maxWidth) newLeft = maxWidth;
        if (newTop > maxHeight) newTop = maxHeight;

        chatContainer.style.left = `${newLeft}px`;
        chatContainer.style.top = `${newTop}px`;
        chatContainer.style.transform = 'none'; // Remove centering transform
    }
});

document.addEventListener('mouseup', () => {
    isDragging = false;
    chatContainer.style.cursor = 'move';
    chatContainer.style.transition = '0.2s ease-out'; // Re-enable smooth movement after dragging
});








////////////////////////////////////////////////////////////////////////////////////////////////////
// Source div se text fetch karein
const sourceText = document.getElementById("text-source").innerText;

// Line breaks preserve karne ke liye "\n" ko "<br>" me replace karein
const formattedText = sourceText.replace(/\n/g, "<br>");

// Marquee text container ka reference lein
const textElement = document.getElementById("marquee-text");

let index = 0;
let displayText = "";

function typeEffect() {
  if (index < formattedText.length) {
    displayText += formattedText[index];
    textElement.innerHTML = displayText; // Update marquee text
    index++;
    setTimeout(typeEffect, 50); // Speed adjust karne ke liye change karein
  } else {
    setTimeout(() => {
      textElement.innerHTML = "";
      index = 0;
      displayText = "";
      typeEffect();
    }, 1000); // Text complete hone ke baad kitna delay ho
  }
}

typeEffect();


