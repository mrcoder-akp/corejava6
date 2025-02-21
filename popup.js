// 💥 Load popup.html dynamically
window.onload = function () {
    fetch('popup.html')
        .then(response => {
            if (!response.ok) throw new Error('Network response was not ok');
            return response.text();
        })
        .then(data => {
            document.body.insertAdjacentHTML('beforeend', data); // Add popup to body
            initPopups(); // Initialize popups after loading
        })
        .catch(error => console.error('Error loading popup:', error));
};

// 💥 Initialize Popups
function initPopups() {
    const popup = document.getElementById("popup");
    const formPopup = document.getElementById("formPopup");
    const closeBtn = document.getElementById("close-btn");
    const enrollBtn = document.getElementById("enroll-btn");
    const closeForm = document.getElementById("closeForm");

    // ✅ Show Offer Popup on load
    setTimeout(() => {
        popup.style.display = "flex";
    }, 1000);

    // ✅ Close Offer Popup
    if (closeBtn) {
        closeBtn.onclick = () => {
            popup.style.display = "none";
        };
    }

    // ✅ Open Form Popup on "Enroll"
    if (enrollBtn) {
        enrollBtn.onclick = () => {
            popup.style.display = "none";
            if (formPopup) formPopup.style.display = "flex";
        };
    }

    // ✅ Close Form Popup
    if (closeForm) {
        closeForm.onclick = () => {
            formPopup.style.display = "none";
        };
    }

    // Show success alert and close form after submission
    document.getElementById("enrollmentForm").addEventListener("submit", function(event) {
        event.preventDefault(); // Prevent default form submission to avoid page reload
    
        // ✅ Show success alert immediately after clicking submit
        const successAlert = document.getElementById('successAlert');
        successAlert.style.display = 'block';
    
        // 🕐 Immediately submit the form after showing the alert
        event.target.submit();
    });
}    
