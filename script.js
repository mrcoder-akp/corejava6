document.addEventListener("DOMContentLoaded", function () {
  attachTopicClickListener();

  // Add event listener for home button click
  document.getElementById("homeBtn").addEventListener("click", loadHomeContent);
});

// Function to Load Java Topics on Home Click
function loadHomeContent() {
  fetch("index2.html") // Load index.html content
    .then(response => response.text())
    .then(htmlContent => {
      document.getElementById("mainContent").innerHTML = htmlContent;
      attachTopicClickListener(); // Reattach event listeners
    })
    .catch(error => {
      console.error("Error loading home content:", error);
      document.getElementById("content-description").textContent = "Error loading home content. Please try again.";
    });
}

// Function to Attach Click Event to Topics
function attachTopicClickListener() {
  const topicsList = document.getElementById("topics");
  const sidebar = document.querySelector(".sidebar");
  const contentTitle = document.getElementById("content-title");
  const contentDescription = document.getElementById("content-description");

  if (topicsList) {
    topicsList.addEventListener("click", function (e) {
      if (e.target.tagName === "LI") {
        const topicKey = e.target.dataset.topic;
        const url = `${topicKey}.html`; // Example: "Language.html", "Compilation.html"

        contentTitle.textContent = e.target.textContent;
        contentDescription.textContent = "Loading content...";

        fetch(url)
          .then(response => {
            if (!response.ok) throw new Error("Network error");
            return response.text();
          })
          .then(content => {
            // Hide sidebar and show content on mobile
            sidebar.classList.add("hide-sidebar");
            document.querySelector(".content").classList.add("full-width");

            contentDescription.innerHTML = content;
          })
          .catch(error => {
            console.error("Error fetching content:", error);
            contentDescription.textContent = "Error loading content. Try again.";
          });
      }
    });
  }
}

// Function to Show Sidebar Again (For Mobile)
function showSidebar() {
  document.querySelector(".sidebar").classList.remove("hide-sidebar");
  document.querySelector(".content").classList.remove("full-width");
}

// Function to Search Topics
function searchContent() {
  const searchTerm = document.getElementById("searchBar").value.toLowerCase();
  const topics = document.querySelectorAll("#topics li");
  let found = false;

  topics.forEach(topic => {
    const topicName = topic.textContent.toLowerCase();
    const description = topic.getAttribute("data-description").toLowerCase();

    if (topicName.includes(searchTerm) || description.includes(searchTerm)) {
      topic.style.display = "block";
      found = true;
    } else {
      topic.style.display = "none";
    }
  });

  const contentTitle = document.getElementById("content-title");
  const contentDescription = document.getElementById("content-description");

  if (found) {
    contentTitle.textContent = "Search Results";
    contentDescription.textContent = `Showing results for: "${searchTerm}"`;
  } else {
    contentTitle.textContent = "No Results Found";
    contentDescription.textContent = "Try searching for a different topic.";
  }
}

// Toggle the mobile menu
function toggleMenu() {
  document.getElementById("mobileMenu").classList.toggle("open");
}

// Close mobile menu on click
document.querySelectorAll(".mobile-menu a").forEach(item => {
  item.addEventListener("click", function () {
    document.getElementById("mobileMenu").classList.remove("open");

    if (this.textContent === "Home") {
      loadHomeContent();
    }
  });
});


/////////////////////////////////////////////////////////////////////////////////////////////
//New ko blinking ke liye code yaha se start hai
const badge = document.querySelector('.new-badge');

// Debugging logs removed
setInterval(() => {
  getComputedStyle(badge).opacity; // Opacity check without console log
}, 500);
;


///////////////////////////////////////////////////////////////////////////////////////////////////////
//Yaha se image for right click disable karne ke liye start hai
// Right-click disable (Desktop)
document.addEventListener('contextmenu', function(e) {
  if (e.target.classList.contains('special-img')) {
    e.preventDefault();
  }
});

// Long-press disable (Mobile)
document.addEventListener('DOMContentLoaded', () => {
  const img = document.querySelector('.special-img');

  if (img) {
    img.addEventListener('touchstart', function(e) {
      e.preventDefault();
    });
  }
});

////////////////////////////////////////////////////////////////////////////////////////////
// ✅ Page Load Par Internet Check Karega
window.addEventListener("load", checkInternet);

// ✅ Internet Status Change Hone Par Listen Karega
window.addEventListener("online", () => {
  showAlert("✅ Back online!", "green");
});

window.addEventListener("offline", () => {
  showAlert("❌ Connection Lost!", "red");
});

// ✅ Internet Speed Check Function
function checkInternet() {
  const image = new Image();
  const startTime = new Date().getTime();
  
  image.onload = function () {
    const endTime = new Date().getTime();
    const duration = endTime - startTime;
    
    if (duration > 3000) {
      showAlert("⚠️ Your net is slow, please wait...", "orange");
    }
  };

  image.onerror = function () {
    showAlert("❌ Connection Lost!", "red");
  };

  // Google se small image load karenge
  image.src = "https://www.google.com/images/phd/px.gif?" + new Date().getTime();
}

// ✅ Alert Box Function
function showAlert(message, color) {
  let alertBox = document.getElementById("networkAlert");

  if (!alertBox) {
    alertBox = document.createElement("div");
    alertBox.id = "networkAlert";
    alertBox.style.position = "fixed";
    alertBox.style.top = "10px";
    alertBox.style.left = "50%";
    alertBox.style.transform = "translateX(-50%)";
    alertBox.style.background = color;
    alertBox.style.color = "white";
    alertBox.style.padding = "10px 20px";
    alertBox.style.borderRadius = "5px";
    alertBox.style.zIndex = "1000";
    alertBox.style.fontSize = "16px";
    document.body.appendChild(alertBox);
  }

  alertBox.innerText = message;
  alertBox.style.display = "block";

  // 3 sec ke baad alert hide ho jayega
  setTimeout(() => {
    alertBox.style.display = "none";
  }, 3000);
}


