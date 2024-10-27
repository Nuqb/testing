console.log("aura maxxing")

let inputWord = document.getElementById("input-word");
let inputLanguageOrigin = document.getElementById("input-language-origin");
let wordDefinition = document.getElementById("word-definition");
let wordWrapper = document.querySelector("section");
let addWordButton = document.getElementById("add-word-button");
let saveWordButton = document
let editId = null;

function addTheWord(data) {
    let theWord = document.createElement("h3")
    let wordOrigin = document.createElement("p")
    let wordDefinition = document.createElement("p")

    theWord.textContent = data["word"]
    wordOrigin.textContent = data["origin"]
    wordDefinition.textContent = data["definition"]

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
        wordDefinition.value = data["definition"];
        editId = data["id"];
    }

    saveWordButton.onclick = function() {
        let editData = "word="+encodeURIComponent(inputWord.value) + "&origin="+encodeURIComponent(inputLanguageOrigin.value) +"&definition="+encodeURIComponent(wordDefinition.value);

        fetch('http://localhost:8080/words/${editId}', {
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
            definition.value = ""
        })
    }
    deleteButton.onclick = function(){
        if(confirm("Are you sure you want to delete the word?")){

            let deleteID = data["id"]
            fetch('http://localhost:8080/words/${deleteID}', {
            method: "DELETE",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        }).then(function(response) {
            console.log("response: ", response)
            clearLoadedWords()
            loadWordsFromServer()
        })
    }
    }

    wordWrapper.appendChild(editButton);
    wordWrapper.appendChild(deleteButton);
    wordWrapper.apppendChild(document.createElement("hr"));
}

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

function loadWordsFromServer() {
    fetch("http://localhost:8080/words")
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