console.log("Hello from client/karolis.js");

document.getElementById('wordForm').addEventListener('submit', function(event) {
    event.preventDefault();  // no page reload

    const word = document.getElementById('word').value;
    const language = document.getElementById('language').value;
    const definition = document.getElementById('definition').value;
    const userTranslation = document.getElementById('userTranslation').value;

    console.log(`Word: ${word}, Language: ${language}, Definition: ${definition}, Translation: ${userTranslation}`);
});

