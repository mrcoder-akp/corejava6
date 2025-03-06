let questions = [];
let correctCount = parseInt(localStorage.getItem("correctCount")) || 0;
let incorrectCount = parseInt(localStorage.getItem("incorrectCount")) || 0;
let totalPoints = parseInt(localStorage.getItem("totalPoints")) || 0;
let level = parseInt(localStorage.getItem("level")) || 1;
let targetScore = 250;
let timer;
let isPopupOpen = false; // ✅ Track if pop-up is open

document.getElementById("target-score").innerText = targetScore;
document.getElementById("correct-count").innerText = correctCount;
document.getElementById("incorrect-count").innerText = incorrectCount;
document.getElementById("total-score").innerText = totalPoints;

fetch("questions.json")
    .then(response => response.json())
    .then(data => {
        questions = data;
        loadQuestion();
    })
    .catch(error => console.error("Error loading questions:", error));

function loadQuestion() {
    if (questions.length === 0 || isPopupOpen) return; // ✅ If pop-up is open, don't load next question

    let questionData = questions[Math.floor(Math.random() * questions.length)];

    document.getElementById("question").innerText = questionData.question;
    let optionsContainer = document.getElementById("options");
    optionsContainer.innerHTML = "";
    document.getElementById("result").innerText = "";
    document.getElementById("question-points").innerText = "";
    document.getElementById("more-explanation-container").innerHTML = ""; // Clear previous explanation

    questionData.options.forEach((option, index) => {
        let btn = document.createElement("button");
        btn.innerText = option;
        btn.classList.add("option-btn");
        btn.onclick = () => checkAnswer(index, questionData);
        optionsContainer.appendChild(btn);
    });

    setDynamicTimer(questionData.question);
}

function checkAnswer(selected, questionData) {
    clearInterval(timer);
    let resultText = document.getElementById("result");
    let questionPoints = getQuestionPoints(questionData.question);

    if (selected === questionData.correct) {
        resultText.innerHTML = `<div class="correct-text">✅ Correct!</div> 
                                <div class="explanation-text">${questionData.explanation}</div>`;
        correctCount++;
        totalPoints += questionPoints;
    } else {
        resultText.innerHTML = `<div class="incorrect-text">❌ Incorrect!</div> 
                                <button class="more-explanation-btn" onclick="showMoreExplanation('${questionData.moreExplanation}')">
                                    More Explanation
                                </button>`;
        incorrectCount++;
        totalPoints -= questionPoints;
    }

    document.getElementById("correct-count").innerText = correctCount;
    document.getElementById("incorrect-count").innerText = incorrectCount;
    document.getElementById("total-score").innerText = totalPoints;

    localStorage.setItem("correctCount", correctCount);
    localStorage.setItem("incorrectCount", incorrectCount);
    localStorage.setItem("totalPoints", totalPoints);

    updateLevel();
    
    // ✅ If pop-up is NOT open, load next question after 2 seconds
    if (!isPopupOpen) {
        setTimeout(loadQuestion, 2000);
    }
}

// ✅ Background Overlay for Blur Effect
let overlay = document.createElement("div");
overlay.id = "overlay";
document.body.appendChild(overlay);

function showMoreExplanation(moreExplanation) {
    let explanationContainer = document.getElementById("more-explanation-container");

    explanationContainer.innerHTML = `
        <h2>More Explanation</h2>
        <p>${moreExplanation}</p>
        <button class="back-btn" onclick="closeExplanation()">Back</button>
    `;

    // ✅ Show Pop-up & Overlay
    explanationContainer.classList.add("active");
    overlay.style.display = "block";
    isPopupOpen = true; // ✅ Set flag to prevent next question from loading
}

function closeExplanation() {
    let explanationContainer = document.getElementById("more-explanation-container");

    // ✅ Hide Pop-up & Overlay
    explanationContainer.classList.remove("active");
    overlay.style.display = "none";
    isPopupOpen = false; // ✅ Reset flag to allow next question

    loadQuestion(); // ✅ Load next question when "Back" is clicked
}

function getQuestionPoints(questionText) {
    let wordCount = questionText.split(" ").length;
    return wordCount <= 10 ? 10 : wordCount <= 20 ? 20 : 30;
}

function updateLevel() {
    if (totalPoints >= targetScore) {
        level++;
        correctCount = 0;
        incorrectCount = 0;
        totalPoints = 0;
        localStorage.setItem("correctCount", correctCount);
        localStorage.setItem("incorrectCount", incorrectCount);
        localStorage.setItem("totalPoints", totalPoints);
        localStorage.setItem("level", level);
    }
    document.getElementById("level").innerText = level;
}

function setDynamicTimer(questionText) {
    clearInterval(timer);
    let wordCount = questionText.split(" ").length;
    let timeLeft = wordCount <= 10 ? 20 : wordCount <= 20 ? 60 : 90;

    document.getElementById("timer").innerText = timeLeft;
    timer = setInterval(() => {
        if (isPopupOpen) return; // ✅ If pop-up is open, pause timer

        timeLeft--;
        document.getElementById("timer").innerText = timeLeft;
        if (timeLeft === 0) {
            clearInterval(timer);
            loadQuestion();
        }
    }, 1000);
}
/////////////////////////////////////////////////////////////////

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
  