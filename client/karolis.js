console.log("Hello from client/karolis.js");

document.getElementById('wordForm').addEventListener('submit', function(event) {
    event.preventDefault(); 
    console.log("Form submitted!"); 
});
