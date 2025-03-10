document.addEventListener("DOMContentLoaded", function () {
  attachTopicClickListener();

  // Add event listener for home button click
  document.getElementById("homeBtn").addEventListener("click", loadHomeContent);
});

// Function to Load Java Topics on Home Click
function loadHomeContent() {
  fetch("index.html") // Load index.html content
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
