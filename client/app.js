console.log("aura maxxing")

let inputWord = document.getElementById("input-word");
let inputLanguageOrigin = document.getElementById("input-language-origin");
let inputWordDefinition = document.getElementById("input-word-definition");
let wordWrapper = document.querySelector("section");
let addWordButton = document.getElementById("add-word-button");
let saveWordButton = document.getElementById("save-word-button");
let editId = null;

function addTheWord(data) {
    let theWord = document.createElement("h3");
    let wordOrigin = document.createElement("p");
    let wordDefinition = document.createElement("p");

    theWord.textContent = "word: " + data["word"]
    wordOrigin.textContent = "language: " + data["origin"]
    wordDefinition.textContent = "definition: " + data["definition"]

    wordWrapper.appendChild(theWord);
    wordWrapper.appendChild(wordOrigin);
    wordWrapper.appendChild(wordDefinition);

    let editButton = document.createElement("button");
    let deleteButton = document.createElement("button");

    editButton.textContent = "Edit word";
    deleteButton.textContent = "Delete word";

    editButton.onclick = function(){
        console.log("edit button clicked on: ", data["id"])
        inputWord.value = data["word"];
        inputLanguageOrigin.value = data["origin"];
        inputWordDefinition.value = data["definition"];
        editId = data["id"];
    }

    saveWordButton.onclick = function() {
        let editData = "word="+encodeURIComponent(inputWord.value) + "&origin="+encodeURIComponent(inputLanguageOrigin.value) +"&definition="+encodeURIComponent(inputWordDefinition.value)

        fetch(`http://flask-app-service:5000/words/${editId}`, {
            method: "PUT",
            body: editData,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        }).then(function(response) {
            console.log("response: ", response)
            clearLoadedWords()
            loadWordsFromServer()
            inputWord.value = ""
            inputLanguageOrigin.value = ""
            inputWordDefinition.value = ""
        })
    }
    deleteButton.onclick = function(){
        if(confirm("Are you sure you want to delete the word?")){

            let deleteId = data["id"]
            fetch(`http://flask-app-service:5000/words/${deleteId}`, {
            method: "DELETE",
            body: "",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        }).then(function(response){
            console.log("response: ", response)
            clearLoadedWords()
            loadWordsFromServer()
        })
    }
    }

    wordWrapper.appendChild(editButton);
    wordWrapper.appendChild(deleteButton);
}

function addNewWord() {

    let data = "word="+encodeURIComponent(inputWord.value) + "&origin="+encodeURIComponent(inputLanguageOrigin.value) +"&definition="+encodeURIComponent(inputWordDefinition.value);

    console.log(data)
    fetch("http://flask-app-service:5000/words", {
        method: "POST",
        body: data,
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        
    }).then(function(response) {
        console.log("response", response);
        clearLoadedWords();
        loadWordsFromServer();
        inputWord.value = "";
        inputLanguageOrigin.value = "";
        inputWordDefinition.value = "";
    })
}

function loadWordsFromServer() {
    fetch("http://flask-app-service:5000/words")
        .then(function(response){
        response.json()
        .then(function(data){

            let words = data
            words.forEach(addTheWord)
        });
    })
}

function clearLoadedWords(){
    wordWrapper.textContent = ""
}

addWordButton.onclick = addNewWord;
loadWordsFromServer()