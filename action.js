const popup  = document.querySelector(".popup");
const popuptitle = document.querySelector(".popup .details h2");
const popupdesc = document.querySelector(".desc");
const popupicon = document.querySelector(".popup .icon img");
const popupbtn = document.querySelector(".reconnect");

let isOnline = true , intervalId , Timer = 10 ;

const checkconnection = async () => {
    try {
        const response = await fetch("https://jsonplaceholder.typicode.com");
        isOnline = response.status >= 200 && response.status < 300;
    } catch (error) {
        isOnline = false;
    }
    Timer = 11;
    clearInterval(intervalId);
    handlepopup(isOnline);
}

const handlepopup = (status) => {
    if(status) {
        popupicon.src = "image/noc.png";
        popuptitle.innerText = "Restored Connection"
        popupdesc.innerHTML = "Your Device is Now seccessefully Connected to the internet"
        popup.classList.add("online");
        return setTimeout(() => popup.classList.remove("show","online"), 3000);
    }
    popuptitle.innerText = "Lost Connection";
    popupdesc.innerHTML = "Your network is unavailble. We Will attempt to reconnect you in <b>10</b> seconde.";
    popup.className = "popup show";
    intervalId = setInterval(() => {
        Timer--;
        if(Timer === 0) {
            checkconnection();
        }
        popup.querySelector(".desc b").innerHTML = Timer;
    },1000);
}

// when the is Online is ture check the conneciton evry 3 seconde 
setInterval(() => isOnline && checkconnection(),3000);

popupbtn.addEventListener("click" , checkconnection);