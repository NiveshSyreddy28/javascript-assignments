if (localStorage.getItem("localScore") === null) {
    localStorage.setItem("localScore","0");
    document.getElementById("localScore").innerHTML = 0;
}
else {
  document.getElementById("localScore").innerHTML = parseInt(localStorage.getItem("localScore"));
}

if (sessionStorage.getItem("sessionScore") === null) {
  sessionStorage.setItem("sessionScore","0");
  document.getElementById("sessionScore").innerHTML = 0;
}
else {
    document.getElementById("sessionScore").innerHTML = parseInt(sessionStorage.getItem("sessionScore"));
  }

function incrementLocalScore() {
    console.log('incrementing the local Storage value');

    var value = parseInt(localStorage.getItem("localScore"));
    var newValue = value + 1
    localStorage.setItem("localScore", newValue);
    document.getElementById("localScore").innerHTML = parseInt(localStorage.getItem("localScore"));

    }

    function resetLocalScore() {
      console.log("Resetting the local storage value");
    localStorage.setItem("localScore", "0");
    document.getElementById("localScore").innerHTML = '0'
    }

    function incrementSessionScore(){
        console.log('Incrementing the Session storage value');

        var val = parseInt(sessionStorage.getItem("sessionScore"));
        var newVal = val + 1
        sessionStorage.setItem("sessionScore", newVal);

        document.getElementById("sessionScore").innerHTML = parseInt(sessionStorage.getItem("sessionScore"));

    }
