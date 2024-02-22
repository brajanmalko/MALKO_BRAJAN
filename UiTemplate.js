let ProgressBar1 = document.getElementById("ProgressBar1")
let ProgressBarText1 = document.getElementById("ProgressBarText1")
let ProgressBar2 = document.getElementById("ProgressBar2")
let ProgressBarText2 = document.getElementById("ProgressBarText2")
let ProgressBar3 = document.getElementById("ProgressBar3")
let ProgressBarText3 = document.getElementById("ProgressBarText3")
let ProgressBar4 = document.getElementById("ProgressBar4")
let ProgressBarText4 = document.getElementById("ProgressBarText4")
let ProgressBar5 = document.getElementById("ProgressBar5")
let ProgressBarText5 = document.getElementById("ProgressBarText5")

let ButtonAddBar1 = document.getElementById("ButtonAddBar1")
let ButtonSubBar1 = document.getElementById("ButtonSubBar1")

let ValueBar1 = 0

function UpdateBar1() {
    ProgressBarText1.innerText = ValueBar1
    ProgressBarText2.innerText = ValueBar1
    ProgressBarText3.innerText = ValueBar1
    ProgressBarText4.innerText = ValueBar1
    ProgressBarText5.innerText = ValueBar1
    if (ValueBar1 == 0) {
        ProgressBarText1.innerText = ""
        ProgressBarText2.innerText = ""
        ProgressBarText3.innerText = ""
        ProgressBarText4.innerText = ""
        ProgressBarText5.innerText = ""
    }
    if (ValueBar1 == 100) {
        ProgressBarText1.innerText = "Done"
        ProgressBarText2.innerText = "Done"
        ProgressBarText3.innerText = "Done"
        ProgressBarText4.innerText = "Done"
        ProgressBarText5.innerText = "Done"
    }
    ProgressBar1.style.width = ValueBar1 + "%"
    ProgressBar2.style.width = ValueBar1 + "%"
    ProgressBar3.style.width = ValueBar1 + "%"
    ProgressBar4.style.width = ValueBar1 + "%"
    ProgressBar5.style.width = ValueBar1 + "%"
}

function AddBar1() {

    if (ValueBar1 < 100) {
        ValueBar1 += 5
        UpdateBar1()
    }
}

function SubBar1() {
    if (ValueBar1 > 0) {
        ValueBar1 -= 5
        UpdateBar1()
    }
}

ButtonAddBar1.addEventListener(
    "click", AddBar1)

ButtonSubBar1.addEventListener(
    "click", SubBar1)