const notPrivilegedColor = "lightyellow"
const privilegedColor = "lightgreen"
let K = 3;
let timer = null;
let intervalInSeconds = 2;
let buttonsArr = [];
let N = 5;

window.addEventListener('load', function() {

    document.getElementById("nInput").value = N;
    setInputFilter(document.getElementById("nInput"), function(value) {
        return /^\d*\.?\d*$/.test(value); // Allow digits and '.' only, using a RegExp
    });
    document.getElementById("kInput").value = K;
    setInputFilter(document.getElementById("kInput"), function(value) {
        return /^\d*\.?\d*$/.test(value); // Allow digits and '.' only, using a RegExp
    });
    document.getElementById("secondsInput").value = intervalInSeconds;
    setInputFilter(document.getElementById("secondsInput"), function(value) {
        return /^\d*\.?\d*$/.test(value); // Allow digits and '.' only, using a RegExp
    });

    InitilizeProcessors();
});


function autoSchedular() {
    document.getElementById("pickedLabel").innerText = "";
    if (timer != null) {
        updateGuiForScheduler(false);
        document.getElementById("autoSchedularButton").style.backgroundColor = "#dc3545"; // Red
        clearInterval(timer);
        timer = null;
        return;
    }
    updateGuiForScheduler(true);
    intervalInSeconds = Number.parseFloat(document.getElementById("secondsInput").value);
    if (intervalInSeconds < 0 || intervalInSeconds > 60) {
        intervalInSeconds = 2;
        document.getElementById("secondsInput").value = 2;
    }
    document.getElementById("autoSchedularButton").style.backgroundColor = "#28a745"; // Green    
    timer = setInterval(() => {
        makeRandomProcMove();
    }, intervalInSeconds * 1000);
}

function makeRandomProcMove() {
    let avail = buttonsArr.filter(button => button.style.backgroundColor === privilegedColor);
    let randIndex = Math.floor(Math.random() * Math.floor(avail.length));
    buttonsArr[buttonsArr.indexOf(avail[randIndex])].click();
    document.getElementById("pickedLabel").innerText = "Picked: P" + buttonsArr.indexOf(avail[randIndex]);
}

function InitilizeProcessors() {

    removeProccessors();
    buttonsArr = [];
    for (i = 0; i < N; i++) {
        addProccessor(i);
        buttonsArr.push(getButton(i));
    }

    buttonsArr.forEach(function(button, index) {
        if (index == 0) button.addEventListener('click', button0Click)
        else button.addEventListener('click', buttonNClick)
        button.style.backgroundColor = privilegedColor;
    });
    updatePriviliged();
}

function nInputBoxChanged() {
    let newN = Number.parseInt(document.getElementById("nInput").value);
    if (newN === N) return;
    N = newN;
    InitilizeProcessors();
}

function kInputBoxChanged() {
    let newK = Number.parseInt(document.getElementById("kInput").value);
    if (newK === K) return;
    K = newK;
    InitilizeProcessors();
}

function randomizeStates() {
    InitilizeProcessors();
}


function button0Click() {
    if (this.style.backgroundColor === notPrivilegedColor) {
        return;
    }
    this.textContent = (Number.parseInt(this.textContent) + 1) % K;
    updatePriviliged();
}

function buttonNClick() {
    if (this.style.backgroundColor === notPrivilegedColor) {
        return;
    }
    let i = buttonsArr.indexOf(this, 0);
    prevState = getButton(i - 1).textContent;
    this.textContent = prevState;
    updatePriviliged();
}

function updatePriviliged() {
    buttonsArr.forEach(function(button, index) {
        if (index == 0) {
            if (button.textContent === buttonsArr[buttonsArr.length - 1].textContent) {
                button.style.backgroundColor = privilegedColor;
            } else {
                button.style.backgroundColor = notPrivilegedColor;
            }
        } else {
            if (button.textContent !== buttonsArr[index - 1].textContent) {
                button.style.backgroundColor = privilegedColor;
            } else {
                button.style.backgroundColor = notPrivilegedColor;
            }
        }
    });
}