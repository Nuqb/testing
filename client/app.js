console.log("aura maxxing")

let inputWord = document.getElementById("input-word");
let inputLanguageOrigin = document.getElementById("input-language-origin");
let wordDefinition = document.getElementById("word-definition");
let wordWrapper = document.querySelector("section");
let addWordButton = document.getElementById("add-word-button");
let editId = null;

function addNewWord() {

    let data = "word="+encodeURIComponent(inputWord.value) + "&origin="+encodeURIComponent(inputLanguageOrigin.value) +"&definition="+encodeURIComponent(wordDefinition.value);

    console.log(data)
    fetch("http://localhost:8080/words", {
        method: "POST",
        body: data,
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        
    }).then(function(response) {
        console.log("response", response);
        inputWord.value = "";
        inputLanguageOrigin.value = "";
        wordDefinition.value = "";
    })
}

addWordButton.onclick = addNewWord;