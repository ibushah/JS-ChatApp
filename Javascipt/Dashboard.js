

// **********VARIABLE DECLARATION**************

var ref = firebase.database().ref('Users/');
var inset = document.getElementById("inset");
let wrap = document.getElementById("wrap");
let loader = document.getElementById("load");
let ul = document.getElementById("ulStyle");
let currentUserUid = ""
let msgRef = firebase.database().ref("myMsgs/");





// *******************EVENTS*******************


window.addEventListener("load", load);


// *****************FUNCTIONS*********************

function load() {

    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            currentUserUid = user.uid
        } else {


        }
    });


    let arr = []
    var i = 0;

    ref.on("child_added", (snapshot) => {

        console.log("chld aded", snapshot.val())
        // for (var key in snapshot.val()) {
        arr.push(snapshot.val())
        // }
        console.log(i, "i")
        i++;
        ul.innerHTML += users(snapshot.val());
        wrap.style.display = "block";
        loader.style.display = "none"
    })
}


function users(data) {

    if (data.uid !== currentUserUid) { return `<li class=${data.uid} onClick="messagePage(this)"  id="liStyle">${data.name}</li>`; }
    else {
        return "";
    }


}



function messagePage(e) {
    localStorage.setItem("chatUser", e.className);
    location.assign("../Pages/ChatPage.html");

}

function logOut() {
    firebase.auth().signOut().then(function () {
        location.assign("../Index.html")
    }).catch(function (error) {
        // An error happened.
    });
}