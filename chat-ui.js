document.addEventListener("DOMContentLoaded", function () {
    const chatContainer = document.getElementById("chat-container");
    const chatHeader = document.getElementById("chat-header");
    const chatLogo = document.getElementById("chat-logo");
    const crossButton = document.getElementById("cross-btn");

    // 🟢 Open chat
    chatLogo.addEventListener("click", () => {
        chatContainer.style.display = 'flex';
        crossButton.style.display = 'block';
        chatLogo.style.display = 'none';
    });

    // 🟢 Close chat
    crossButton.addEventListener("click", () => {
        chatContainer.style.display = 'none';
        crossButton.style.display = 'none';
        chatLogo.style.display = 'block';
    });

    // 🟢 Chat Container Moveable Code
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
});
