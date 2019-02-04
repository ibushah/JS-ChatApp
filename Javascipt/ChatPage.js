
// ****************VARIABLE DECLARATION***********

let send = document.getElementById("send");
let msg = document.getElementById("input");
let username = document.getElementById("user");
let wrap = document.getElementById("wrap");
let loader = document.getElementById("load")
let ul = document.getElementById("ulStyle")
let totalData = [];

let currentUserUid = "";
let recieverUid = "";
let name = "";


let msgRef = firebase.database().ref("myMsgs");

// *************EVENTS***************

window.addEventListener("load", onLoad);

send.addEventListener("click", sendData);


// **************FUNCTIONS***************

function onLoad() {
   
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            currentUserUid = user.uid
            recieverUid = localStorage.getItem("chatUser");

            firebase.database().ref("Users/" + recieverUid).once("value", (snapshot) => {
                name = snapshot.val().name;
                username.innerText = name;
            })

            getData();

            msg.focus()
           
          
        }
    })
  
}


// *************DATALOAD***********



async function getData() {
   await  msgRef.child(`${currentUserUid}/${recieverUid}/Sender`).once("value", (snapshot) => {
        let a = snapshot.val();
        console.log(a)

        for (var key in a) {
            totalData.push(a[key])
        }

    })
   await  msgRef.child(`${currentUserUid}/${recieverUid}/Reciever`).once("value", (snap) => {
        let b = snap.val();

        for (var key in b) {
            totalData.push(b[key])
        }
        wrap.style.display = "block"
        loader.style.display = "none";
        ul.innerHTML = data(totalData);
        totalData = []

        ul.scrollTop=ul.scrollHeight;
        console.log(totalData)
        
    })

   
}

function data(d) {
    let sorted= d.sort((a, b) => (a.time > b.time) ? 1 : -1);
    return (
        sorted.map((v) => {
          if(v.uid!==currentUserUid){ return `<li class="U">${v.msg}
           <br />
            <span class="sender">${name} [${timeConvert(v.time)}]</span>
           </li>`;}
           else
           {
           return `<li class="I">${v.msg}
           <br />
            <span class="sender"> [${timeConvert(v.time)}]</span>
           </li>`;
           }
        })
    )
}

function timeConvert(t)
{
   let d=new Date(t);
   let hours=d.getHours();
   let min=d.getMinutes();
   return (hours+":"+min)

    
}


function sendData() {
   
    let obj =
    {
        msg: msg.value,
        time: Date.now(),
        uid:currentUserUid
    }
    msgRef.child(`${currentUserUid}/${recieverUid}/Sender`).push(obj)
        .then((a) => {

            // localStorage.setItem("chatUser", JSON.stringify(obj));

            msgRef.child(`${recieverUid}/${currentUserUid}/Reciever`).push(obj)
                .then(() => {
                    getData();
                    msg.value = ""
                    ul.scrollTop=ul.scrollHeight;


                })


        })

}

