function getButton(buttonId) {
    let id = "p" + buttonId + "Button";
    return document.getElementById(id);
}

function addProccessor(id) {
    let div = document.getElementById('procRow');
    let state = Math.round(Math.random() * 100) % K;
    let tooltipText = '';
    if (id == 0) {
        tooltipText = "IF 𝑥(0)=𝑥(" + (N - 1) + ")" + "\n THEN 𝑥(0)≔𝑥(0)+1" +
            "\n\nLeft Click - Make a move (if priviliged)";
    } else {
        tooltipText = "IF 𝑥(" + id + ")!=𝑥(" + (id - 1) + ")" +
            "\n THEN 𝑥(" + id + ")≔𝑥(" + (id - 1) + ")" +
            "\n\nLeft Click - Make a move (if priviliged)";
    }
    let procHTML =
        `<div class="col text-center">
    <button id="p` + id + `Button" type="button " class="btn btn-success proccessor" data-toggle="tooltip" data-placement="top" title="` + tooltipText + `">` + state + `</button>
    <h4>P` + id + `</h4>
    </div>`

    div.insertAdjacentHTML('afterbegin', procHTML);
}

function removeProccessors() {
    let div = document.getElementById('procRow');
    div.innerHTML = ``;
}

function updateGuiForScheduler(isSchedulerActive) {
    document.getElementById("kInput").disabled = isSchedulerActive;
    document.getElementById("nInput").disabled = isSchedulerActive;
    document.getElementById("secondsInput").disabled = isSchedulerActive;
    document.getElementById("kInputButton").disabled = isSchedulerActive;
    document.getElementById("nInputButton").disabled = isSchedulerActive;
    document.getElementById("randomButton").disabled = isSchedulerActive;
}
// Restricts input for the given textbox to the given inputFilter function.
function setInputFilter(textbox, inputFilter) {
    ["input", "keydown", "keyup", "mousedown", "mouseup", "select", "contextmenu", "drop"].forEach(function(event) {
        textbox.addEventListener(event, function() {
            if (inputFilter(this.value)) {
                this.oldValue = this.value;
                this.oldSelectionStart = this.selectionStart;
                this.oldSelectionEnd = this.selectionEnd;
            } else if (this.hasOwnProperty("oldValue")) {
                this.value = this.oldValue;
                this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
            } else {
                this.value = "";
            }
        });
    });
}