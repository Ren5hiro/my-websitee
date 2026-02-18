/* ==========================================================
   LABORATORY ACTIVITY 4 & 6 INTEGRATED SCRIPT
   Features: Live Digital Clock, Form Validation, Anti-Spam
   ========================================================== */

// --- 1. GLOBALS FOR ANTI-SPAM ---
const formLoadTime = Date.now(); // Record when the page loads
const spamWords = ["free money", "buy now", "click here", "subscribe", "promo", "bitcoin", "crypto"];

// --- 2. LIVE DIGITAL CLOCK (From Lab 6) ---
function startTime() {
    const today = new Date();
    let h = today.getHours();
    let m = today.getMinutes();
    let s = today.getSeconds();
    
    // Add zero in front of numbers < 10
    m = checkTime(m);
    s = checkTime(s);
    
    const clockDiv = document.getElementById('liveClock');
    if (clockDiv) {
        clockDiv.innerHTML = `<span style="color:#00aaff; font-weight:800;">TIME:</span> ${h}:${m}:${s}`;
    }
    
    setTimeout(startTime, 1000);
}

function checkTime(i) {
    if (i < 10) { i = "0" + i };  
    return i;
}

// --- 3. FORM VALIDATION & FILTERING (From Lab 4) ---
function setupFormValidation() {
    const contactForm = document.getElementById("contactForm");
    
    if (contactForm) {
        contactForm.addEventListener("submit", function (e) {
            const emailField = document.querySelector("input[name='email']");
            const messageField = document.querySelector("textarea[name='message']");
            const submitTime = Date.now();

            // A. Client-Side Email Validation
            if (!emailField.value.includes("@")) {
                alert("Enter a valid email address.");
                e.preventDefault();
                return;
            }

            // B. Time-based Filtering (Anti-Bot)
            // Bots fill forms instantly. Humans take time.
            const secondsTaken = (submitTime - formLoadTime) / 1000;
            if (secondsTaken < 3) {
                alert("Submission was too fast. Please take your time to fill the form.");
                e.preventDefault();
                return;
            }

            // C. Spam Keyword Detection
            const lowerMessage = messageField.value.toLowerCase();
            const hasSpam = spamWords.some(word => lowerMessage.includes(word));
            
            if (hasSpam) {
                alert("Your message contains blocked spam keywords.");
                e.preventDefault();
                return;
            }

            // If all checks pass, FormSubmit.co handles the rest!
            console.log("Validation successful. Sending to FormSubmit...");
        });
    }
}

// --- 4. INITIALIZE ON LOAD ---
window.onload = function() {
    console.log("App.js: Initializing Portfolio Systems...");
    startTime();          // Start the clock
    setupFormValidation(); // Start the form listener
};