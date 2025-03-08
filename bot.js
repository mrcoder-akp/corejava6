document.addEventListener("DOMContentLoaded", function () {
    const chatBox = document.getElementById("chat-box");
    const sendButton = document.getElementById("send-button");
    const clearButton = document.getElementById("clear-button");
    const inputField = document.getElementById("user-input");

    // 🟢 Load saved messages
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

    // 🟢 Save messages to local storage
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

    // 🟢 Load messages on page load
    loadMessages();
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
