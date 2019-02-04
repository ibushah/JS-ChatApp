

// variablesss

let submit = document.getElementById("submit");
let email = document.getElementById("email");
let password = document.getElementById("password");
let name = document.getElementById("name");





// Events

submit.addEventListener("click", dataLoad);




// functions

function dataLoad(e) {
    e.preventDefault();
    
    firebase.auth().createUserWithEmailAndPassword(email.value, password.value)
        .then((e) => {
            let uid = e.user.uid;
            let obj =
            {
                name: name.value,
                email: email.value,
                uid
            }


            firebase.database().ref("Users/" + uid).set(obj)
                .then(() => {
                    alert("account successfully made!")
                    email.value = "";
                    password.value = "";
                    name.value = "";
                    location.assign("../Pages/Login.html")
                });
        })
        .catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // ...
            console.log(errorMessage)
        });
}