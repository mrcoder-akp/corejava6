document.addEventListener("DOMContentLoaded", function () {
    console.log("DOM fully loaded");

    if ('speechSynthesis' in window) {
        console.log("Speech synthesis supported");

        let voices = [];

        function loadVoices() {
            voices = speechSynthesis.getVoices();
            if (voices.length === 0) {
                setTimeout(loadVoices, 100);
            }
        }

        speechSynthesis.onvoiceschanged = loadVoices;
        loadVoices();

        async function speakSelectedText() {
            let selectedText = window.getSelection().toString().trim();
            let parentElement = window.getSelection().anchorNode?.parentElement;

            // **🔥 Check if selected text is inside `.translate-parent` div**
            let isInsideTranslateParent = parentElement && parentElement.closest(".translate-parent");

            if (selectedText && isInsideTranslateParent) {
                console.log("✅ Text is inside .translate-parent:", selectedText);

                let translatedTextPromise = translateToHindiInChunks(selectedText);

                let englishSpeech = new SpeechSynthesisUtterance(selectedText);
                englishSpeech.lang = "en-US";
                englishSpeech.rate = 0.7;
                englishSpeech.pitch = 0;
                englishSpeech.voice = voices.find(voice => voice.lang === "en-US") || voices[0];

                console.log("🎙️ Speaking in English with voice:", englishSpeech.voice?.name || "Default");
                speechSynthesis.speak(englishSpeech);

                englishSpeech.onend = async function () {
                    let translatedText = await translatedTextPromise;
                    speakHindiWithIntro(translatedText);
                    window.getSelection().removeAllRanges();
                };
            } else {
                console.log("❌ Selected text is outside .translate-parent, ignoring...");
            }
        }

        async function translateToHindiInChunks(text) {
            const chunkSize = 500;
            let chunks = [];
            let translatedText = '';

            while (text.length > chunkSize) {
                let chunk = text.slice(0, chunkSize);
                chunks.push(chunk);
                text = text.slice(chunkSize);
            }
            if (text) chunks.push(text);

            for (let chunk of chunks) {
                const encodedText = encodeURIComponent(chunk);
                const apiUrl = `https://api.mymemory.translated.net/get?q=${encodedText}&langpair=en|hi`;

                try {
                    let response = await fetch(apiUrl);
                    let data = await response.json();
                    let partTranslatedText = data.responseData.translatedText;
                    translatedText += partTranslatedText;
                    console.log("🟢 Translated chunk:", partTranslatedText);
                } catch (error) {
                    console.error("❌ Translation API error:", error);
                    translatedText += "अनुवाद करने में असमर्थ";
                }
            }
            return translatedText;
        }

        function speakHindiWithIntro(translatedText) {
            let introSpeech = new SpeechSynthesisUtterance("आइए इसे जावा में विस्तार से समझते हैं।");
            introSpeech.lang = "hi-IN";
            introSpeech.rate = 0.9;
            introSpeech.pitch = 0;
            introSpeech.voice = voices.find(voice => voice.lang === "hi-IN");

            console.log("🎙️ Speaking Intro in Hindi...");
            speechSynthesis.speak(introSpeech);

            introSpeech.onend = function () {
                let hindiSpeech = new SpeechSynthesisUtterance(translatedText);
                hindiSpeech.lang = "hi-IN";
                hindiSpeech.rate = 0.9;
                hindiSpeech.pitch = 0;
                hindiSpeech.voice = voices.find(voice => voice.lang === "hi-IN");

                console.log("🎙️ Speaking in Hindi with voice:", hindiSpeech.voice?.name || "Default");
                speechSynthesis.speak(hindiSpeech);
            };
        }

        document.body.addEventListener("mouseup", function () {
            let selectedText = window.getSelection().toString().trim();
            let parentElement = window.getSelection().anchorNode?.parentElement;
            let isInsideTranslateParent = parentElement && parentElement.closest(".translate-parent");

            if (selectedText.length > 0 && isInsideTranslateParent) {
                speechSynthesis.cancel();
                speakSelectedText();
            }
        });

    } else {
        console.log("❌ Speech synthesis NOT supported");
    }
});
