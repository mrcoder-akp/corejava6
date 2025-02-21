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
    const submitForm = document.getElementById("submitForm");

    // ✅ Check if elements exist before using them
    if (popup) {
        // ✅ Show Offer Popup on load
        setTimeout(() => {
            popup.style.display = "flex";
        }, 1000);
    }

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

    // ✅ Close if clicked outside popup
    window.onclick = (event) => {
        if (event.target === popup) popup.style.display = "none";
        if (event.target === formPopup) formPopup.style.display = "none";
    };

    // ✅ Submit Form & Show Alert
    if (submitForm) {
        submitForm.onclick = () => {
            const firstName = document.getElementById('firstName')?.value.trim();
            const lastName = document.getElementById('lastName')?.value.trim();
            const graduation = document.getElementById('graduation')?.value.trim();
            const interest = document.getElementById('interest')?.value.trim();
            const email = document.getElementById('email')?.value.trim();
            const mobile = document.getElementById('mobile')?.value.trim();

            // 🟡 Check if all fields are filled
            if (!firstName || !lastName || !graduation || !interest || !email || !mobile) {
                alert('⚠️ Please fill out all fields!');
                return;
            }

            // ✅ Show success alert and close form
            alert('✅ Successfully Applied! We will contact you soon.');
            formPopup.style.display = "none";
        };
    }
}

/////////////////////////////////////////////////////////////////////////////////////////////

document.getElementById("enrollmentForm").addEventListener("submit", function(event) {
    event.preventDefault(); // ✅ Stop default form submission

    const form = event.target;
    const formData = new FormData(form);

    fetch(form.action, {
        method: "POST",
        body: formData,
        headers: {
            'Accept': 'application/json'
        }
    })
    .then(response => {
        console.log("Response Status:", response.status); // 🟡 Debug: Check status

        if (response.ok) {
            console.log("✅ Form submitted successfully!");

            // ✅ Show success alert
            const successAlert = document.getElementById("successAlert");
            successAlert.style.display = "block";

            // ✅ Hide after 2 seconds & reset form
            setTimeout(() => {
                successAlert.style.display = "none";
                form.reset();
            }, 2000);
        } else {
            console.error("❌ Error in response:", response);
            alert("❌ Error occurred. Please try again.");
        }
    })
    .catch(error => {
        console.error("💥 Network Error:", error);
        alert("❌ Failed to submit. Check your network.");
    });
});
