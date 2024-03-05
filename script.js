let elementi = ["c.png", "p.png", "v.png", "s.png", "r.png", "pdr.png", "a.png", "Explosion1.gif", "Explosion2.gif"];

var matrice;

var row1, row2, col1, col2;

//contatori per la generazione della matrice
let numero, numero_precedente;
let carta, secco, plastica, vetro;
let CanPlay = true
let cnt = 0;

//Controlli per il radiattivo
let dropsFatti = 0
let dropTraIRad;
let rAttivi = true

//variabili per cercare le combo
let cons_riga = 0;
let cons_colonna = 0;

//Contatori per il numero di elementi eliminati
let numero_carta = 0;
let numero_plastica = 0;
let numero_vetro = 0;
let numero_secco = 0;

//Contatore dei punti
let punti_totale = 0;
const punti_carta = 2;
const punti_plastica = 3;
const punti_vetro = 5;
const punti_secco = 1;
let contatore_perdita = 0;


//Elementi UI
let ScoreText = document.getElementById('ScoreText');
let PlayerNameText = document.getElementById('PlayerNameText');
let ProgressBar1 = document.getElementById("ProgressBar1")
let ProgressBarText1 = document.getElementById("ProgressBarText1")
let ProgressBar2 = document.getElementById("ProgressBar2")
let ProgressBarText2 = document.getElementById("ProgressBarText2")
let ProgressBar3 = document.getElementById("ProgressBar3")
let ProgressBarText3 = document.getElementById("ProgressBarText3")
let ProgressBar4 = document.getElementById("ProgressBar4")
let ProgressBarText4 = document.getElementById("ProgressBarText4")
let BlackOverlay = document.getElementById("BlackOverlay");
let SettingsCon = document.getElementById("SettingsCon");
let SettingsMusicCheckbox = document.getElementById("SettingsMusicCheckbox");
let SettingsSFXCheckbox = document.getElementById("SettingsSFXCheckbox");
let ColseSettingsButton = document.getElementById("ColseSettingsButton");
let QuitButton = document.getElementById("QuitButton");
let MusicaAttivaPerFade = true;
let PanelOpened = false;


/*Storage*/
let SettingsSaves = {
    "MusicVolume": 1,
    "SFXVolume": 0.2,
    "Classifica": {},
    "CurrentPlayer": "",
    "CurrentScore": 0,
    "CurrentLevel": "facile"
}
matrice = [[], [], [], [], []]

if (localStorage.getItem('EcoRushSettings')) {
    let TempLoad = localStorage.getItem('EcoRushSettings');
    SettingsSaves = JSON.parse(TempLoad)

    console.log(SettingsSaves.CurrentLevel)

    if (SettingsSaves.MusicVolume == 1) {
        SettingsMusicCheckbox.src = "Assets/CheckboxOn.png"
        MusicaAttivaPerFade = true;
    }
    else {
        SettingsMusicCheckbox.src = "Assets/CheckboxOff.png"
        MusicaAttivaPerFade = false;
    }

    if (SettingsSaves.SFXVolume == 0.2) {
        SettingsSFXCheckbox.src = "Assets/CheckboxOn.png"
    }
    else {
        SettingsSFXCheckbox.src = "Assets/CheckboxOff.png"
    }
}

/* Suoni */
const ButtonClickSFX1 = new Audio();
ButtonClickSFX1.src = './Assets/MusicAndSounds/UITap1.mp3'
const ButtonClickSFX2 = new Audio();
ButtonClickSFX2.src = './Assets/MusicAndSounds/UITap2.mp3'
const ButtonClickSFX3 = new Audio();
ButtonClickSFX3.src = './Assets/MusicAndSounds/UITap3.mp3'

let TapSFX1Items = document.querySelectorAll('.TapSFX1');
let TapSFX2Items = document.querySelectorAll('.TapSFX2');
let TapSFX3Items = document.querySelectorAll('.TapSFX3');

function PlayTapSFX1() {
    ButtonClickSFX1.volume = SettingsSaves.SFXVolume;
    ButtonClickSFX1.currentTime = 0;
    ButtonClickSFX1.play();
}
function PlayTapSFX2() {
    ButtonClickSFX2.volume = SettingsSaves.SFXVolume;
    ButtonClickSFX2.currentTime = 0;
    ButtonClickSFX2.play();
}
function PlayTapSFX3() {
    ButtonClickSFX3.volume = SettingsSaves.SFXVolume;
    ButtonClickSFX3.currentTime = 0;
    ButtonClickSFX3.pitch = 0.5
    ButtonClickSFX3.play();
}

TapSFX1Items.forEach(function (element) {
    element.addEventListener('click', function () {
        PlayTapSFX1()
    });
});
TapSFX2Items.forEach(function (element) {
    element.addEventListener('click', function () {
        PlayTapSFX2()
    });
});
TapSFX3Items.forEach(function (element) {
    element.addEventListener('click', function () {
        PlayTapSFX3()
        console.log("S")
    });
});

let SoundPlaying = false;
const CarboardSound = new Audio();
CarboardSound.src = './Assets/MusicAndSounds/CarboardSFX.mp3'
const PlasticSound = new Audio();
PlasticSound.src = './Assets/MusicAndSounds/PlasticSFX.mp3'
const GlassSound = new Audio();
GlassSound.src = './Assets/MusicAndSounds/GlassSFX.mp3'
const TrashSound = new Audio();
TrashSound.src = './Assets/MusicAndSounds/TrashSFX.mp3'

function CarboardSFX() {
    SoundPlaying = true;
    CarboardSound.volume = SettingsSaves.SFXVolume;
    if (SettingsSaves.SFXVolume == 0.2) {
        CarboardSound.volume = 1;
    }
    CarboardSound.currentTime = 0;
    CarboardSound.play();
    setTimeout(function () {
        SoundPlaying = false;
    }, 800)
}
function PlasticSFX() {
    SoundPlaying = true;
    PlasticSound.volume = SettingsSaves.SFXVolume;
    if (SettingsSaves.SFXVolume == 0.2) {
        PlasticSound.volume = 0.8;
    }
    PlasticSound.currentTime = 0;
    PlasticSound.play();
    setTimeout(function () {
        SoundPlaying = false;
    }, 800)
}
function GlassSFX() {
    SoundPlaying = true;
    GlassSound.volume = SettingsSaves.SFXVolume;
    if (SettingsSaves.SFXVolume == 0.2) {
        GlassSound.volume = 0.6;
    }
    GlassSound.currentTime = 0;
    GlassSound.play();
    setTimeout(function () {
        SoundPlaying = false;
    }, 900)
}
function TrashSFX() {
    SoundPlaying = true;
    TrashSound.volume = SettingsSaves.SFXVolume;
    if (SettingsSaves.SFXVolume == 0.2) {
        GlassSound.volume = 1;
    }
    TrashSound.currentTime = 0;
    TrashSound.play();
    setTimeout(function () {
        SoundPlaying = false;
    }, 800)
}

function ShakeScreen(){
    GameGridLayer.classList.add("Shake1");
    setTimeout(function(){
        GameGridLayer.classList.remove("Shake1");
    }, 400)
}

//variabile per la difficoltà
if (SettingsSaves.CurrentLevel == "facile") {
    matrice = [[], [], [], [], []];
    dropTraIRad = 0;
} else if (SettingsSaves.CurrentLevel == "medio") {
    matrice = [[], [], [], [], [], []];
    dropTraIRad = 4;
    setInterval(() => {
        if (!PanelOpened) {
            dropTraIRad += 1;
        }
    }, 120000);

} else if (SettingsSaves.CurrentLevel == "difficile") {
    matrice = [[], [], [], [], [], [], []];
    dropTraIRad = 7;
    setInterval(() => {
        if (!PanelOpened) {
            dropTraIRad += 1;
        }
    }, 120000);
}
/*Caricamento Tutorial */
let DialoghiTutorial = {
    "1": {
        "Sprite": 2,
        "Image": 1,
        "Text": "Ciao giovane! Finalmente sei qui"
    },

    "2": {
        "Sprite": 4,
        "Image": 1,
        "Text": "Lascia che ti spieghi il dafarsi"
    },
    "3": {
        "Sprite": 2,
        "Image": 2,
        "Text": "Il tuo compito e' aiutarmi a togliere la spazzatura dall'argine del fiume"
    },
    "4": {
        "Sprite": 7,
        "Image": 3,
        "Text": "Per raccoglierla devi unirla in righe o colonne da tre"
    },
    "5": {
        "Sprite": 4,
        "Image": 2,
        "Text": "Solo tre alla volta? No. Anche di più, ma succedono cose speciali"
    },
    "6": {
        "Sprite": 8,
        "Image": 4,
        "Text": "Quattro di fila si trasformeranno nel Potere Del Riciclo®"
    },
    "7": {
        "Sprite": 8,
        "Image": 5,
        "Text": "Maneggialo con cura, quando attivato esplode e elimina la spazzatura che ha attorno"
    },
    "8": {
        "Sprite": 9,
        "Image": 6,
        "Text": "Se sei cosi' bravo da unirne cinque ottieni il prezioso Amore Per La Natura"
    },
    "9": {
        "Sprite": 10,
        "Image": 7,
        "Text": "Non e' altro che il potere del riciclo piu' potente e rosa"
    },
    "10": {
        "Sprite": 11,
        "Image": 8,
        "Text": "Ma non e' tutto rosa e amore"
    },
    "11": {
        "Sprite": 12,
        "Image": 8,
        "Text": "In certe zone c'e' il riscio di trovare rifiuti radiattivi"
    },
    "12": {
        "Sprite": 13,
        "Image": 8,
        "Text": "Purtroppo non possiamo farci nulla"
    },
    "13": {
        "Sprite": 14,
        "Image": 7,
        "Text": "L'unico modo che abbiamo per liberarcene e' l'amore per la natura"
    },
    "14": {
        "Sprite": 2,
        "Image": 9,
        "Text": "E con questo concludo. Buon lavoro!"
    }
}

let TutrialLayer = document.getElementById("TutrialLayer");
let TutorialText = document.getElementById("TutorialText");
let TutorialImage = document.getElementById("TutorialImage");
let TutroialNutriaImage = document.getElementById("TutroialNutriaImage");
let TutorialButtonBack = document.getElementById("TutorialButtonBack");
let TutorialButtonNext = document.getElementById("TutorialButtonNext");

let TutorialImages = ['Assets/Tutorial/Placeholder.png', 'Assets/Tutorial/WelcomeImage.png', 'Assets/Tutorial/Trash.png', 'Assets/Tutorial/Tris.png', 'Assets/Tutorial/Quaterna.png', 'Assets/Tutorial/Riciclo.png', 'Assets/Tutorial/Cinquina.png', 'Assets/Tutorial/Amore.png', 'Assets/Tutorial/Radiattivo.png', 'Assets/Tutorial/GameLogo.png']
let SpriteNutria = ['', 'Assets/NutriaSprites/1.png', 'Assets/NutriaSprites/2.png', 'Assets/NutriaSprites/3.png', 'Assets/NutriaSprites/4.png', 'Assets/NutriaSprites/5.png', 'Assets/NutriaSprites/6.png', 'Assets/NutriaSprites/7.png', 'Assets/NutriaSprites/8.png', 'Assets/NutriaSprites/9.png', 'Assets/NutriaSprites/10.png', 'Assets/NutriaSprites/11.png', 'Assets/NutriaSprites/12.png', 'Assets/NutriaSprites/13.png', 'Assets/NutriaSprites/14.png', 'Assets/NutriaSprites/15.png']
let TutorialIndex = 1;

function UpdateTutorial() {
    TutorialText.innerText = DialoghiTutorial[TutorialIndex].Text;
    TutorialImage.src = TutorialImages[DialoghiTutorial[TutorialIndex].Image];
    TutroialNutriaImage.src = SpriteNutria[DialoghiTutorial[TutorialIndex].Sprite];
}

function EndTuorial() {
    setTimeout(function () {
        TutrialLayer.classList.add('Hidden');
    }, 420);
    TutrialLayer.classList.add('FadeOut')
    localStorage.setItem('EcoRushTutorial', "Done :D");
}

if (!localStorage.getItem('EcoRushTutorial')) {

    setTimeout(function () {
        TutrialLayer.classList.remove('FadeOut');
        TutrialLayer.classList.add('FadeIn');
    }, 320);
    TutrialLayer.classList.remove('Hidden');

    UpdateTutorial()

    TutorialButtonNext.addEventListener("click", function () {
        if (TutorialIndex < 14) {
            if (TutorialIndex == 1) {
                TutorialButtonBack.classList.remove('Hidden')
            }
            TutorialIndex++
            UpdateTutorial()
        }
        else {
            EndTuorial()
        }
    })

    TutorialButtonBack.addEventListener("click", function () {
        if (TutorialIndex > 1) {
            if (TutorialIndex == 2) {
                TutorialButtonBack.classList.add('Hidden')
            }
            TutorialIndex--
            UpdateTutorial()
        }
    })
}


/*Game Over and Won Page*/
let StringeGameOver = {
    "1": "Ritenteremo un altro giorno",
    "2": "C'era troppa spazzatura qui",
    "3": "Tranquillo giovane, hai fatto del tuo meglio"
};
let StringeGameWon = {
    "1": "Bravo giovane!",
    "2": "Tutto pulito!",
    "3": "Ora noi nutrie torneremo a balneare qui"
};
let RandomNumberGameOver = Math.floor(Math.random() * 3) + 1;
let GameOverText = document.getElementById("GameOverText");
GameOverText.innerText = StringeGameOver[RandomNumberGameOver]
let GameOverButtonBack = document.getElementById("GameOverButtonBack");
let GameOverButtonReplay = document.getElementById("GameOverButtonReplay");
let GameOverLayer = document.getElementById("GameOverLayer");

let RandomNumberGameWon = Math.floor(Math.random() * 3) + 1;
let GameWonText = document.getElementById("GameWonText");
GameWonText.innerText = StringeGameWon[RandomNumberGameWon]
let GameWonButtonBack = document.getElementById("GameWonButtonBack");
let GameWonButtonReplay = document.getElementById("GameWonButtonReplay");
let GameWonLayer = document.getElementById("GameWonLayer");

function GoBack() {
    BlackOverlay.style.opacity = '1';
    localStorage.setItem('EcoRushSettings', JSON.stringify(SettingsSaves));
    setTimeout(function () {
        window.location.href = "HomePage.html";
    }, 500);
}
function RePlay() {
    BlackOverlay.style.opacity = '1';
    localStorage.setItem('EcoRushSettings', JSON.stringify(SettingsSaves));
    setTimeout(function () {
        window.location.href = "index.html";
    }, 500);
}

let ContinueGame = false;
GameOverButtonBack.addEventListener("click", GoBack);
GameOverButtonReplay.addEventListener("click", RePlay);
GameWonButtonBack.addEventListener("click", GoBack);
GameWonButtonReplay.addEventListener("click", function () {
    setTimeout(function () {
        GameWonLayer.classList.add('Hidden');
        PanelOpened = false;
    }, 320);
    GameWonLayer.classList.remove('FadeIn')
    GameWonLayer.classList.add('FadeOut')
    ContinueGame = true;
});

function EndGame() {
    FadeMusicOut()
    setTimeout(function () {
        GameOverLayer.classList.remove('FadeOut');
        GameOverLayer.classList.add('FadeIn');
    }, 320);
    GameOverLayer.classList.remove('Hidden');
}
function WonGame() {
    FadeMusicOut()
    setTimeout(function () {
        GameWonLayer.classList.remove('FadeOut');
        GameWonLayer.classList.add('FadeIn');
    }, 320);
    GameWonLayer.classList.remove('Hidden');
    PanelOpened = true;
}

PlayerNameText.innerText = SettingsSaves.CurrentPlayer;
BlackOverlay.style.opacity = '0'
let GameGridLayer = document.getElementById("GameGridLayer");

function FadeMusicIn() {
    let TempVolume = GameMusic.volume;

    const fadeInterval = setInterval(() => {
        if (MusicaAttivaPerFade) {
            TempVolume += 0.1; TempVolume = 1;
        }
        else { TempVolume = 0; }
        if (TempVolume >= 1) {
            TempVolume = 1;
            clearInterval(fadeInterval);
        }
        GameMusic.volume = TempVolume;
    }, 1500);
};
function FadeMusicOut() {
    let TempVolume = GameMusic.volume;
    const fadeInterval = setInterval(() => {
        TempVolume -= 0.1;
        if (TempVolume <= 0) {
            TempVolume = 0;
            clearInterval(fadeInterval);
            GameMusic.pause();
        }
        GameMusic.volume = TempVolume;
    }, 500);
};

const GameMusic = new Audio();
GameMusic.src = './Assets/MusicAndSounds/BGM2.mp3'
let TempVolume = 0;

GameGridLayer.addEventListener("click", function () {
    console.log("Start Music")

    GameMusic.volume = 0; // Start with zero volume
    GameMusic.loop = true; // Enable looping
    GameMusic.play()
    console.log(SettingsSaves.MusicVolume)
    if (SettingsSaves.MusicVolume == 1) {
        if (MusicaAttivaPerFade) { FadeMusicIn() }
    }

}, { once: true })

//Aggiorna Barre di completamento
function UpdateBars() {
    ProgressBarText1.innerText = numero_carta
    if (numero_carta == 0) {
        ProgressBarText1.innerText = ""
    }
    if (numero_carta >= 50) {
        ProgressBarText1.innerText = "Completato"
        ProgressBarText1.classList.add("GreenText");
        ProgressBarText1.classList.add("TextBorderBlack");
        ProgressBarText1.classList.remove("BlackText");
    }
    ProgressBar1.style.width = numero_carta * 2 + "%"

    ProgressBarText2.innerText = numero_plastica
    if (numero_plastica == 0) {
        ProgressBarText2.innerText = ""
    }
    if (numero_plastica >= 50) {
        ProgressBarText2.innerText = "Completato"
        ProgressBarText2.classList.add("GreenText");
        ProgressBarText2.classList.add("TextBorderBlack");
        ProgressBarText2.classList.remove("BlackText");
    }
    ProgressBar2.style.width = numero_plastica * 2 + "%"

    ProgressBarText3.innerText = numero_vetro
    if (numero_vetro == 0) {
        ProgressBarText3.innerText = ""
    }
    if (numero_vetro >= 50) {
        ProgressBarText3.innerText = "Completato"
        ProgressBarText3.classList.add("GreenText");
        ProgressBarText3.classList.add("TextBorderBlack");
        ProgressBarText3.classList.remove("BlackText");
    }
    ProgressBar3.style.width = numero_vetro * 2 + "%"

    ProgressBarText4.innerText = numero_secco
    if (numero_secco == 0) {
        ProgressBarText4.innerText = ""
    }
    if (numero_secco >= 50) {
        ProgressBarText4.innerText = "Completato"
        ProgressBarText4.classList.add("GreenText");
        ProgressBarText4.classList.add("TextBorderBlack");
        ProgressBarText4.classList.remove("BlackText");
    }
    ProgressBar4.style.width = numero_secco * 2 + "%"

    if (!ContinueGame && numero_carta >= 50 && numero_plastica >= 50 && numero_vetro >= 50 && numero_secco >= 50) {
        WonGame()
    }
}

//funzione per generare il contenuto dei div della matrice
function generaNumero(i, j, max) {

    //Rendi possibile la caduta di un rad
    if (rAttivi && dropsFatti < dropTraIRad) {
        max = 5;
    }
    else {
        max = 4;
    }

    let n = Math.floor(Math.random() * max); // Genera un numero casuale da 0 a 4

    //Controlla i numeri alla colonna 0
    if (i >= 1 && j == 0) {
        while (n == matrice[i - 1][j]) {
            n = Math.floor(Math.random() * max);
        }
    }

    //Controlla i numeri alla riga 0
    if (j >= 1 && i == 0) {
        while (n == matrice[i][j - 1]) {
            n = Math.floor(Math.random() * max);
        }
    }

    //Controlla i numeri negli altri casi
    if (j >= 1 && i >= 1) {
        while (n == matrice[i][j - 1] || n == matrice[i - 1][j]) {
            n = Math.floor(Math.random() * max);
        }
    }

    return (n)
}

function genera_drop(righe, colonne) {
    let max = 4 //Massimo numero generabile

    for (let i = 0; i < righe; i++) {
        for (let j = 0; j < colonne; j++) {
            matrice[i][j] = generaNumero(i, j, max)

            //Counter per i drop radiattivi
            if (matrice[i][j] == 4) {
                dropsFatti++
            }
        }
    }
    console.log(matrice);
}

if (SettingsSaves.CurrentLevel == "facile") {
    genera_drop(5, 5);
    container.style.gridTemplateColumns = "1fr 1fr 1fr 1fr 1fr";
} else if (SettingsSaves.CurrentLevel == "medio") {
    genera_drop(6, 6);
    container.style.gridTemplateColumns = "1fr 1fr 1fr 1fr 1fr 1fr";
} else if (SettingsSaves.CurrentLevel == "difficile") {
    genera_drop(7, 7);
    container.style.gridTemplateColumns = "1fr 1fr 1fr 1fr 1fr 1fr 1fr";
}

//variabili per lo scabio delle celle
let prima_cella = null;
let seconda_cella = null;

function swap_div() {
    if (prima_cella && seconda_cella) {
        // Effettua lo scambio solo se entrambi i div sono stati cliccati
        console.log(prima_cella.textContent);
        console.log(seconda_cella.textContent);
        console.log(matrice[row2][col2]);
        console.log(matrice[row1][col1]);


        let temp = matrice[row2][col2];
        matrice[row2][col2] = matrice[row1][col1];
        matrice[row1][col1] = temp;

        stampa_matrice(matrice);

        console.log(matrice);

        if (matrice[row2][col2] == 5 || matrice[row1][col1] == 5) {
            setTimeout(() => {
                scambio_perdita();
            }, 500);
        } else if (matrice[row2][col2] == 6 || matrice[row1][col1] == 6) {
            setTimeout(() => {
                scambio_perdita();
            }, 500);
        } else if (matrice[row2][col2] == 4 || matrice[row1][col1] == 4) {
            scambio_perdita_swap();
        } else {
            cerca(row2, col2, matrice);
            combo(cons_riga, cons_colonna);
            console.log("Primo cliccato rig" + cons_riga + "Primo cliccato col" + cons_colonna)
            if (valore == false) {
                cerca(row1, col1, matrice);
                combo(cons_riga, cons_colonna);
                console.log("secondo cliccato rig" + cons_riga + "secondo cliccato col" + cons_colonna)

                if (valore == false) {
                    setTimeout(() => {
                        scambio_perdita_swap();

                    }, 500);
                }
            }




            console.log("Combo riga = " + cons_riga + "Combo colonna = " + cons_colonna)
        }
        CanPlay = false

        setTimeout(() => {
            prima_cella.classList.remove('SelectedDivBG');
            seconda_cella.classList.remove('SelectedDivBG');

            // Resetta le variabili delle coordinate
            prima_cella = null;
            seconda_cella = null;
            CanPlay = true
        }, 500);


    }

    controllo_swap(matrice);
}

//funzione per far partire le combo

var valore;
function combo(cons_riga, cons_colonna) {
    valore = true;
    if (cons_riga == 5) {
        console.log('combo 5 riga');
        quintuplo_orizzontale(matrice);
    }
    else if (cons_colonna == 5) {
        console.log('combo 5 colonna');
        quintuplo_verticale(matrice);
    }
    else if (cons_riga == 4) {
        console.log('combo 4 riga');
        quaduplo_orizzontale(matrice);
    }
    else if (cons_colonna == 4) {
        console.log('combo 4 colonna');
        quaduplo_verticale(matrice);
    }
    else if (cons_riga == 3) {
        let tipo = true;
        verifica_combo_speciale(tipo);
        if (combo_speciale == true) {
            return
        } else {
            console.log('combo 3 riga');
            triplo_orizzontale(matrice)
        }
    }
    else if (cons_colonna == 3) {
        let tipo = false;
        verifica_combo_speciale(tipo);
        if (combo_speciale == true) {
            return;
        } else {
            console.log('combo 3 colonna');
            triplo_verticale(matrice);
        }
    } else {
        valore = false;
    }
}

let divs = container.getElementsByTagName('div');
console.log(divs);

//funzione per stampare i div in base ai contenuti della matrice
function stampa_matrice(matrice) {

    console.log("Matrice nella" + matrice);
    let container = document.getElementById("container");
    container.innerHTML = "";
    for (let i = 0; i < matrice.length; i++) {
        for (let j = 0; j < matrice[i].length; j++) {
            // creazione del div
            let div = document.createElement("div");
            div.className = "matrice-div";
            div.classList.add('TapSFX3')
            div.innerHTML = "<img height ='70px' width='70px'src='img/" + elementi[matrice[i][j]] + "'></img>";

            if (matrice[i][j] == 0) {
                div.classList.add('PaperDivBG');
            }
            if (matrice[i][j] == 1) {
                div.classList.add('PlasticDivBG');
            }
            if (matrice[i][j] == 2) {
                div.classList.add('GlassDivBG');
            }
            if (matrice[i][j] == 3) {
                div.classList.add('TrashDivBG');
            }
            if (matrice[i][j] == 4) {
                div.classList.add('RadioactiveDivBG');
            }
            if (matrice[i][j] == 5) {
                div.classList.add('RecycleDivBG');
            }
            if (matrice[i][j] == 6) {
                div.classList.add('NatureLoveDivBG');
            }

            //assegnazione della funzione click ai div
            //gestione di quali div vengono cliccati
            div.addEventListener('click', function () {
                if (CanPlay) {
                    if (!prima_cella) {
                        let index = Array.from(divs).indexOf(this);

                        // Calcola la riga e la colonna corrispondenti all'indice
                        if (SettingsSaves.CurrentLevel == "facile") {
                            row1 = Math.floor(index / 5);
                            col1 = index % 5;
                        } else if (SettingsSaves.CurrentLevel == "medio") {
                            row1 = Math.floor(index / 6);
                            col1 = index % 6;
                        } else if (SettingsSaves.CurrentLevel == "difficile") {
                            row1 = Math.floor(index / 7);
                            col1 = index % 7;
                        }

                        console.log("prima riga" + row1 + "prima colonna" + col1);

                        console.log(div);

                        // Se il primo div non è stato cliccato, memorizza il riferimento
                        prima_cella = div;
                        prima_cella.classList.add('SelectedDivBG'); // Opzionale: evidenzia il primo div cliccato

                        //Se la prima cella clicccata corrisponde ai poteri allora parte la funzione
                        if (matrice[row1][col1] == 5) {
                            potere_del_riciclo(row1, col1);
                            prima_cella.classList.remove('SelectedDivBG');
                            prima_cella = null;
                        } else if (matrice[row1][col1] == 6) {
                            amore_della_natura(row1, col1);
                            prima_cella.classList.remove('SelectedDivBG');
                            prima_cella = null;
                        }
                    } else if (prima_cella === div) {
                        // Se il primo div è cliccato di nuovo, deselezionalo
                        prima_cella.classList.remove('SelectedDivBG');
                        prima_cella = null;
                    } else {
                        let index = Array.from(divs).indexOf(this);

                        // Calcola la riga e la colonna corrispondenti all'indice
                        if (SettingsSaves.CurrentLevel == "facile") {
                            row2 = Math.floor(index / 5);
                            col2 = index % 5;
                        } else if (SettingsSaves.CurrentLevel == "medio") {
                            row2 = Math.floor(index / 6);
                            col2 = index % 6;
                        } else if (SettingsSaves.CurrentLevel == "difficile") {
                            row2 = Math.floor(index / 7);
                            col2 = index % 7;
                        }
                        console.log("seconda riga" + row2 + "seconda colonna" + col2);

                        console.log(div);

                        // Se il secondo div è cliccato, memorizza il riferimento e scambia
                        seconda_cella = div;
                        seconda_cella.classList.add('SelectedDivBG'); // Opzionale: evidenzia il secondo div cliccato
                        if (verifica_spostamento(row1, col1, row2, col2)) {
                            swap_div();
                        } else {
                            CanPlay = false
                            setTimeout(() => {
                                if (prima_cella.classList.contains('SelectedDivBG')) {
                                    prima_cella.classList.remove('SelectedDivBG');
                                }
                                if (seconda_cella.classList.contains('SelectedDivBG')) {
                                    seconda_cella.classList.remove('SelectedDivBG');
                                }

                                // Resetta le variabili delle coordinate
                                prima_cella = null;
                                seconda_cella = null;
                                CanPlay = true
                            }, 500);
                        }
                    }
                }
            });


            container.appendChild(div);
            TapSFX3Items = document.querySelectorAll('.TapSFX3');
            TapSFX3Items.forEach(function (element) {
                element.addEventListener('click', function () {
                    PlayTapSFX3()
                    console.log("S")
                });
            });
        }
    }
}

stampa_matrice(matrice);
function verifica_spostamento(row1, col1, row2, col2) {
    if (row2 == row1 - 1 && col1 == col2) {
        return true;
    }
    else if (row2 == row1 + 1 && col1 == col2) {
        return true;
    }
    else if (row2 == row1 && col2 == col1 + 1) {
        return true;
    }
    else if (row2 == row1 && col2 == col1 - 1) {
        return true;
    }
    else {
        return false;
    }
}


//funzione per controllare se ci sono cons
function verifica_consecutivi(matrice) {

    for (j = 0; j < matrice.length; j++) {
        for (i = 0; i < matrice.length - 1; i++) {
            do {
                numero = Math.floor(Math.random() * 4);
                matrice[i][j] = elementi[numero];
            } while (
                matrice[i + 1][j] === matrice[i][j]
            );

        }
    }

    for (i = 0; i < matrice.length; i++) {
        for (j = 0; j < matrice.length - 1; j++) {
            do {
                numero = Math.floor(Math.random() * 4);
                matrice[i][j] = elementi[numero];
            } while (
                matrice[i][j + 1] === matrice[i][j]
            );

        }
    }
}


var dati_riga;
var dati_colonna;
let primo = undefined;
let secondo = undefined;

//funzione per cercare se sono presenti combo da tre, quattro e cinque
function cerca(riga, colonna, matrice) {
    //variabili per la posizione degli elementi consecutivi
    dati_riga = {
        cons_riga: 1,
        posizione: []
    };

    dati_colonna = {
        cons_colonna: 1,
        posizione: []
    };

    cons_colonna = 1;
    cons_riga = 1;

    console.log(riga);
    console.log(colonna);

    if (primo == undefined) {
        console.log("VALORE PRIMO CLICK");
        primo = true;
    } else if (primo != undefined) {
        console.log("VALORE secondo CLICK");

        primo = undefined;
        secondo = undefined;
    }

    for (let m = 0; m < matrice.length - 1; m++) {
        if (matrice[m + 1][colonna] != undefined && matrice[m + 1][colonna] === matrice[m][colonna] && matrice[m][colonna] < 4) {
            cons_colonna++;
            dati_colonna.cons_colonna++;
            dati_colonna.posizione.push({ riga: m, colonna });
            if (matrice.length == 5 && m == 3 || matrice.length == 6 && m == 4 || matrice.length == 7 && m == 5) {
                dati_colonna.posizione.push({ riga: m + 1, colonna });
            }
        }
        else {
            if (cons_colonna >= 3) {
                dati_colonna.posizione.push({ riga: m, colonna });
                break;
            } else {
                cons_colonna = 1;
                dati_colonna = {
                    cons_colonna: 1,
                    posizione: []
                };
            }

        }

    }

    for (let l = 0; l < matrice.length; l++) {

        if (matrice[riga][l + 1] != undefined && matrice[riga][l + 1] === matrice[riga][l] && matrice[riga][l] < 4) {
            cons_riga++;
            dati_riga.cons_riga++;
            dati_riga.posizione.push({ riga, colonna: l });
        }
        else {
            if (cons_riga >= 3) {
                dati_riga.posizione.push({ riga, colonna: l });
                break;
            } else {
                cons_riga = 1;
                dati_riga = {
                    cons_riga: 1,
                    posizione: []
                };
            }
        }


    }
    console.log(dati_colonna);
    console.log(dati_riga);


}

//funzione per cercare le combo in altre combo
var combo_speciale = false;

function verifica_combo_speciale(tipo) {
    if (tipo == true) {
        dati_riga.posizione.forEach(function (element) {
            cerca(element.riga, element.colonna, matrice);
            if (dati_colonna.posizione.length === 3) {
                riga_i = dati_colonna.posizione[0].riga;
                riga_f = dati_colonna.posizione[2].riga;

                if (matrice[riga_f][element.colonna] == matrice[element.riga][element.colonna]) {
                    combo_speciale = true;
                    quintuplo_croce_sopra();
                } else if (matrice[riga_i][element.colonna] == matrice[element.riga][element.colonna]) {
                    combo_speciale = true;
                    quintuplo_croce_sotto();
                }
            }
        });
    } else {
        let cnt = 0;
        dati_colonna.posizione.forEach(function (element) {
            cerca(element.riga, element.colonna, matrice);
            if (dati_riga.posizione.length == 3) {
                colonna_i = dati_riga.posizione[0].colonna;
                colonna_f = dati_riga.posizione[2].colonna;

                if (matrice[element.riga][colonna_f] == matrice[element.riga][element.colonna] || matrice[element.riga][colonna_i] == matrice[element.riga][element.colonna]) {
                    if (cnt == 0) {
                        combo_speciale = true;
                        quintuplo_croce_sopra();
                    } else if (cnt == 2) {
                        combo_speciale = true;
                        quintuplo_croce_sotto();
                    }
                }
            }
            cnt++;
        });
    }
    if (dati_colonna.posizione.length != 3 || dati_riga.posizione.length != 3) {
        combo_speciale = false;
    }
}

//funzione per verificare se ci sono combo nella matrice dopo gli swap

function controllo_swap(matrice) {
    for (i = 0; i < matrice.length; i++) {
        for (j = 0; j < matrice.length; j++) {
            cerca(i, j, matrice);
            combo(cons_riga, cons_colonna)
        }
    }
}

//funzione per scambio con i poteri
function scambio_perdita() {
    let temp = matrice[row2][col2]
    matrice[row2][col2] = matrice[row1][col1];
    matrice[row1][col1] = temp;

    console.log(matrice);

    stampa_matrice(matrice);
}

//funzione per scambio con contatore per
function scambio_perdita_swap() {
    let temp = matrice[row2][col2]
    matrice[row2][col2] = matrice[row1][col1];
    matrice[row1][col1] = temp;

    console.log(matrice);

    contatore_perdita++;

    stampa_matrice(matrice);

    if (contatore_perdita >= 3) {
        EndGame();
    }
}

//funzione per implementare la discesa degli elementi in caso verticale
function triplo_verticale() {
    dati_colonna.posizione.reverse();
    let riga = dati_colonna.posizione[0].riga;
    let colonna = dati_colonna.posizione[0].colonna;

    let combo = 3;
    assegna_punti(riga, colonna, combo);

    console.log("Valore riga: " + riga + ", Valore colonna: " + colonna);
    for (i = riga; i > 0; i--) {

        console.log("Elemento riga = " + i);

        if (i >= 3) {
            matrice[i][colonna] = matrice[i - 3][colonna];
            matrice[i - 3][colonna] = generaNumero(i, colonna);
        }
        else {
            matrice[i][colonna] = generaNumero(i, colonna);
        }

    }

    matrice[0][colonna] = generaNumero(0, colonna);

    stampa_matrice(matrice);

    controllo_swap(matrice);

    valore = true;

}

//funzione per implementare la discesa degli elementi in caso orizzontale
function triplo_orizzontale(matrice) {
    let riga = dati_riga.posizione[0].riga;
    let colonna = dati_riga.posizione[0].colonna;

    let combo = 3;
    assegna_punti(riga, colonna, combo);

    dati_riga.posizione.forEach(function (element) {
        console.log("Valore riga: " + element.riga + ", Valore colonna: " + element.colonna);
        for (i = element.riga; i > 0; i--) {

            matrice[i][element.colonna] = matrice[i - 1][element.colonna];
            stampa_matrice(matrice);
        }
        matrice[0][element.colonna] = generaNumero(0, element.colonna);

    });
    console.log(matrice);
    console.log("matrice dopo il triplo" + matrice);

    stampa_matrice(matrice);

    controllo_swap(matrice);

    valore = true;

}

//funzione per implementare la discesa degli elementi in caso verticale
function quaduplo_verticale() {
    dati_colonna.posizione.reverse();
    let riga = dati_colonna.posizione[0].riga;
    let colonna = dati_colonna.posizione[0].colonna;

    let combo = 4;
    assegna_punti(riga, colonna, combo);

    console.log("Valore riga: " + riga + ", Valore colonna: " + colonna);
    for (i = riga; i > 0; i--) {

        console.log("Elemento riga = " + i);

        if (i == 4 || i == 5 || i == 6) {
            matrice[i][colonna] = matrice[i - 4][colonna];
            matrice[0][colonna] = generaNumero(i, colonna);
        }
        else {
            matrice[i][colonna] = generaNumero(i, colonna);
        }

    }
    matrice[riga][colonna] = 5;

    matrice[0][colonna] = generaNumero(0, colonna);

    stampa_matrice(matrice);

    controllo_swap(matrice);

    valore = true;

}

//funzione per implementare la discesa degli elementi in caso orizzontale
function quaduplo_orizzontale() {

    let riga_punti = dati_riga.posizione[0].riga;
    let colonna = dati_riga.posizione[0].colonna;

    let combo = 4;
    assegna_punti(riga_punti, colonna, combo);

    ultimo = dati_riga.posizione.pop();
    riga = dati_riga.posizione[0].riga;
    dati_riga.posizione.forEach(function (element) {
        console.log("Valore riga: " + element.riga + ", Valore colonna: " + element.colonna);
        for (i = element.riga; i > 0; i--) {
            matrice[i][element.colonna] = matrice[i - 1][element.colonna];
        }
    });

    matrice[riga][ultimo.colonna] = 5;
    console.log(matrice);
    console.log("matrice dopo il triplo" + matrice);

    stampa_matrice(matrice);

    controllo_swap(matrice);

    valore = true;

}

//funzione per implementare la discesa degli elementi in caso verticale
function quintuplo_verticale() {
    dati_colonna.posizione.reverse();
    let riga = dati_colonna.posizione[0].riga;
    let colonna = dati_colonna.posizione[0].colonna;

    let combo = 5;
    assegna_punti(riga, colonna, combo);

    console.log("Valore riga: " + riga + ", Valore colonna: " + colonna);
    for (i = riga; i > 0; i--) {

        console.log("Elemento riga = " + i);

        matrice[i][colonna] = generaNumero(i, colonna);

        if (i == 5 || i == 6) {
            matrice[i][colonna] = matrice[i - 5][colonna];
            matrice[0][colonna] = generaNumero(i, colonna);
        }
        else {
            matrice[i][colonna] = generaNumero(i, colonna);
        }

    }
    matrice[riga][colonna] = 6;
    matrice[0][colonna] = generaNumero(0, colonna);

    stampa_matrice(matrice);

    controllo_swap(matrice);

    valore = true;

}

//funzione per implementare la discesa degli elementi in caso orizzontale
function quintuplo_orizzontale() {
    let riga_punti = dati_riga.posizione[0].riga;
    let colonna = dati_riga.posizione[0].colonna;

    let combo = 5;
    assegna_punti(riga_punti, colonna, combo);

    ultimo = dati_riga.posizione.pop();
    riga = dati_riga.posizione[0].riga;
    dati_riga.posizione.forEach(function (element) {
        console.log("Valore riga: " + element.riga + ", Valore colonna: " + element.colonna);
        for (i = element.riga; i > 0; i--) {
            matrice[i][element.colonna] = matrice[i - 1][element.colonna];
        }
    });

    matrice[riga][ultimo.colonna] = 6;
    console.log(matrice);
    console.log("matrice dopo il triplo" + matrice);

    stampa_matrice(matrice);

    controllo_swap(matrice);
}

//funzione per far partire la combo ad L se trovata

function quintuplo_croce_sopra() {
    console.log("COMBO CROCE sopra");

    dati_colonna.posizione.reverse();
    let riga = dati_colonna.posizione[0].riga;
    let colonna = dati_colonna.posizione[0].colonna;

    let riga_riga = dati_riga.posizione[0].riga;
    let colonna_riga = dati_riga.posizione[0].colonna;

    if (matrice[riga][colonna] == matrice[riga_riga][colonna_riga]) {
        matrice[riga_riga][colonna_riga] = 6;
        dati_riga.posizione.shift();

    } else {
        riga_riga = dati_riga.posizione[2].riga;
        colonna_riga = dati_riga.posizione[2].colonna;
        matrice[riga_riga][colonna_riga] = 6;
        dati_riga.posizione.pop();

    }

    dati_colonna.posizione.shift();
    riga = dati_colonna.posizione[0].riga;
    colonna = dati_colonna.posizione[0].colonna;

    dati_riga.posizione.forEach(function (element) {
        console.log("Valore riga: " + element.riga + ", Valore colonna: " + element.colonna);
        for (i = element.riga; i > 0; i--) {
            matrice[i][element.colonna] = matrice[i - 1][element.colonna];
        }

        matrice[0][element.colonna] = generaNumero(0, element.colonna);
    });



    console.log("Valore riga: " + riga + ", Valore colonna: " + colonna);
    for (i = riga; i > 0; i--) {

        console.log("Elemento riga = " + i);

        if (i >= 2) {
            matrice[i][colonna] = matrice[i - 2][colonna];
            matrice[i - 2][colonna] = generaNumero(i, colonna);
        } else {
            matrice[i][colonna] = generaNumero(i, colonna);
        }

    }

    matrice[0][colonna] = generaNumero(0, colonna);

    stampa_matrice(matrice);

    controllo_swap(matrice);
}

function quintuplo_croce_sotto() {
    console.log("COMBO CROCE sotto");
    triplo_orizzontale(matrice);
    dati_colonna.posizione.reverse();
    dati_colonna.posizione.pop();
    let riga = dati_colonna.posizione[0].riga;
    let colonna = dati_colonna.posizione[0].colonna;



    console.log("Valore riga: " + riga + ", Valore colonna: " + colonna);
    for (i = riga; i > 0; i--) {

        console.log("Elemento riga = " + i);

        if (i >= 3) {
            matrice[i][colonna] = matrice[i - 2][colonna];
            matrice[i - 2][colonna] = generaNumero(i, colonna);
        } else {
            matrice[i][colonna] = generaNumero(i, colonna);
        }

    }

    matrice[0][colonna] = generaNumero(0, colonna);

    stampa_matrice(matrice);

    controllo_swap(matrice);
}

// Controlla se l'elemento esiste nella matrice e se sì, assegna i punti
function controlla_e_assegna(riga, colonna, combo) {
    if (riga >= 0 && riga < matrice.length && colonna >= 0 && colonna < matrice[0].length && matrice[riga][colonna] !== undefined) {
        assegna_punti(riga, colonna, combo);
    }
}

//funzione per attivare il potere del riciclo se cliccato
function potere_del_riciclo(riga, colonna) {
    let combo = 1

    controlla_e_assegna(riga - 1, colonna, combo); // Sopra
    controlla_e_assegna(riga + 1, colonna, combo); // Sotto
    controlla_e_assegna(riga, colonna - 1, combo); // Sinistra
    controlla_e_assegna(riga, colonna + 1, combo); // Destra



    for (i = riga + 1; i > 0; i--) {

        console.log("Elemento riga = " + i);
        if (i == matrice.length) {
            i--;
        }
        if (matrice[i][colonna] != 4) {
            if (i >= 3) {
                matrice[i][colonna] = matrice[i - 3][colonna];
                matrice[i - 3][colonna] = generaNumero(i, colonna);
                stampa_matrice(matrice)
            } else {
                matrice[i][colonna] = generaNumero(i, colonna);
                stampa_matrice(matrice)
            }
        }
    }

    matrice[0][colonna] = generaNumero(0, colonna);

    let n = riga;
    if (matrice[n][colonna - 1] != 4) {
        for (n = riga; n > 0; n--) {

            if (matrice[n][colonna - 1] != undefined) {
                matrice[n][colonna - 1] = matrice[n - 1][colonna - 1];

                matrice[0][colonna - 1] = generaNumero(0, colonna - 1);
                stampa_matrice(matrice);
            }
        }
    }

    let m = riga;
    if (matrice[m][colonna + 1] != 4) {
        for (m = riga; m > 0; m--) {

            if (matrice[m][colonna + 1] != undefined) {
                matrice[m][colonna + 1] = matrice[m - 1][colonna + 1];

                matrice[0][colonna + 1] = generaNumero(0, colonna + 1);
                stampa_matrice(matrice);
            }
        }
    }



    console.log(matrice);

    stampa_matrice(matrice);

    controllo_swap(matrice);
}

//funzione per attivare l'amore della natura se cliccato
function amore_della_natura(riga, colonna) {

    let combo = 1
    controlla_e_assegna(riga - 1, colonna, combo);
    controlla_e_assegna(riga + 1, colonna, combo);
    controlla_e_assegna(riga, colonna - 1, combo);
    controlla_e_assegna(riga, colonna + 1, combo);

    controlla_e_assegna(riga - 1, colonna + 1, combo);
    controlla_e_assegna(riga - 1, colonna - 1, combo);
    controlla_e_assegna(riga + 1, colonna - 1, combo);
    controlla_e_assegna(riga + 1, colonna + 1, combo);

    for (i = riga + 1; i > 0; i--) {

        console.log("Elemento riga = " + i);
        if (i == matrice.length) {
            i--;
        }
        if (i == 4) {
            matrice[i][colonna] = matrice[i - 3][colonna];
            matrice[i - 3][colonna] = generaNumero(i, colonna);
        }
        else if (i == 3) {
            matrice[i][colonna] = matrice[i - 3][colonna];
            matrice[i - 3][colonna] = generaNumero(i, colonna);
        }
        else {
            matrice[i][colonna] = generaNumero(i, colonna);
        }

    }

    matrice[0][colonna] = generaNumero(0, colonna);

    for (let n = riga + 1; n > 0; n--) {

        console.log("Elemento riga = " + n);

        if (n == matrice.length) {
            n--;
        }

        if (matrice[n][colonna - 1] != undefined) {
            if (n == 4) {
                matrice[n][colonna - 1] = matrice[n - 3][colonna - 1];
                matrice[n - 3][colonna - 1] = generaNumero(n, colonna - 1);
            }
            else if (n == 3) {
                matrice[n][colonna - 1] = matrice[n - 3][colonna - 1];
                matrice[n - 3][colonna - 1] = generaNumero(n, colonna - 1);
            }
            else {
                matrice[n][colonna - 1] = generaNumero(n, colonna - 1);
            }
        }

        matrice[0][colonna] = generaNumero(0, colonna - 1);

    }


    for (let m = riga + 1; m > 0; m--) {

        console.log("Elemento riga = " + m);

        if (m == matrice.length) {
            m--;
        }

        if (matrice[m][colonna + 1] != undefined) {
            if (m == 4) {
                matrice[m][colonna + 1] = matrice[m - 3][colonna + 1];
                matrice[m - 3][colonna + 1] = generaNumero(m, colonna + 1);
            }
            else if (m == 3) {
                matrice[m][colonna + 1] = matrice[m - 3][colonna + 1];
                matrice[m - 3][colonna + 1] = generaNumero(m, colonna + 1);
            }
            else {
                matrice[m][colonna + 1] = generaNumero(m, colonna + 1);
            }
        }
        matrice[0][colonna] = generaNumero(0, colonna + 1);
    }



    stampa_matrice(matrice);

    controllo_swap(matrice);

}

function assegna_punti(riga, colonna, combo) {
    if (matrice[riga][colonna] != undefined) {
        if (matrice[riga][colonna] == 0) {
            if (!SoundPlaying) { CarboardSFX() }

            punti_totale += punti_carta * combo;
            if (numero_carta < 50) {
                numero_carta += combo;
            }
            if (numero_carta > 50) {
                numero_carta = 50;
            }
        }
        else if (matrice[riga][colonna] == 1) {
            if (!SoundPlaying) { PlasticSFX() }

            punti_totale += punti_plastica * combo;
            if (numero_plastica < 50) {
                numero_plastica += combo;
            }
            if (numero_plastica > 50) {
                numero_plastica = 50;
            }
        }
        else if (matrice[riga][colonna] == 2) {
            if (!SoundPlaying) { GlassSFX() }

            punti_totale += punti_vetro * combo;
            if (numero_vetro < 50) {
                numero_vetro += combo;
            }
            if (numero_vetro > 50) {
                numero_vetro = 50;
            }
        }
        else if (matrice[riga][colonna] == 3) {
            if (!SoundPlaying) { TrashSFX() }

            punti_totale += punti_secco * combo;
            if (numero_secco < 50) {
                numero_secco += combo;
            }
            if (numero_secco > 50) {
                numero_secco = 50;
            }
        }

        UpdateBars()
        ShakeScreen()
    }

    ScoreText.innerText = "Punteggio: " + punti_totale;
    if (SettingsSaves.Classifica[SettingsSaves.CurrentPlayer] < punti_totale) {
        SettingsSaves.Classifica[SettingsSaves.CurrentPlayer] = punti_totale;
    }
    localStorage.setItem('EcoRushSettings', JSON.stringify(SettingsSaves));
}

//funzione per animazione prima di effettuare la combo
function animazione_orizz(callback) {
    dati_riga.posizione.forEach(function (element) {
        console.log("animazione");
        matrice[element.riga][element.colonna] = 7;
    });

    stampa_matrice(matrice);

    setTimeout(() => {
        console.log("Operazione completata");
        callback();
    }, 2000);
}

function animazione_vert(callback) {
    dati_colonna.posizione.forEach(function (element) {
        console.log("animazione");
        matrice[element.riga][element.colonna] = 7;
    });

    stampa_matrice(matrice);

    setTimeout(() => {
        console.log("Operazione completata");
        callback();
    }, 2000);
}

/* Settings Screen */
SettingsButton.addEventListener("click", function () {
    setTimeout(function () {
        GameGridLayer.classList.add('Hidden');
        SettingsCon.classList.remove('FadeOut');
        SettingsCon.classList.add('FadeIn');
    }, 320);
    GameGridLayer.classList.remove('FadeIn')
    GameGridLayer.classList.add('FadeOut')
    SettingsCon.classList.remove('Hidden');
    PanelOpened = true;
}
)

ColseSettingsButton.addEventListener("click", function () {
    setTimeout(function () {
        SettingsCon.classList.add('Hidden');
        GameGridLayer.classList.remove('FadeOut');
        GameGridLayer.classList.add('FadeIn');
        PanelOpened = false;
    }, 320);
    SettingsCon.classList.remove('FadeIn')
    SettingsCon.classList.add('FadeOut')
    GameGridLayer.classList.remove('Hidden');
})

SettingsMusicCheckbox.addEventListener("click", function () {
    if (SettingsSaves.MusicVolume == 1) {
        GameMusic.volume = 0
        SettingsSaves.MusicVolume = 0
        SettingsMusicCheckbox.src = "Assets/CheckboxOff.png"
    }
    else {
        GameMusic.volume = 1
        SettingsSaves.MusicVolume = 1
        SettingsMusicCheckbox.src = "Assets/CheckboxOn.png"
    }

    localStorage.setItem('EcoRushSettings', JSON.stringify(SettingsSaves));
})

SettingsSFXCheckbox.addEventListener("click", function () {
    if (SettingsSaves.SFXVolume == 0.2) {
        SettingsSaves.SFXVolume = 0
        SettingsSFXCheckbox.src = "Assets/CheckboxOff.png"
    }
    else {
        SettingsSaves.SFXVolume = 0.2
        SettingsSFXCheckbox.src = "Assets/CheckboxOn.png"
    }
    localStorage.setItem('EcoRushSettings', JSON.stringify(SettingsSaves));
})

QuitButton.addEventListener("click", function () {
    BlackOverlay.style.opacity = '1';
    localStorage.setItem('EcoRushSettings', JSON.stringify(SettingsSaves));
    setTimeout(function () {
        window.location.href = "HomePage.html";
    }, 500);
});