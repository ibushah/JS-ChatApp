
// *******VARIABLE DECLARATIONS*********

let email=document.getElementById("email");
let password=document.getElementById("password");
let submit=document.getElementById("submit");



// ************EVENTS***********

submit.addEventListener("click",login);



// *************FUNCTIONS*************

function login(e)
{
    e.preventDefault();

    firebase.auth().signInWithEmailAndPassword(email.value, password.value)
    .then((e)=>
    {
        alert("Login Successful");
        location.assign("./Dashboard.html")
    }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
      });
}