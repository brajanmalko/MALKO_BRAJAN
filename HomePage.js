let SplashCon = document.getElementById("SplashCon");
let MainUICOn = document.getElementById("MainUICOn");
let SettingsCon = document.getElementById("SettingsCon");
let LevelLayer = document.getElementById("LevelLayer");
let NameLayer = document.getElementById("NameLayer");
let NoNameLayer = document.getElementById("NoNameLayer");
let ClassificaLayer = document.getElementById("ClassificaLayer");

let MainMenuMusic = document.getElementById("MainMenuMusic");

let PlayButton = document.getElementById("PlayButton");
let SettingsButton = document.getElementById("SettingsButton");
let ClassificaButton = document.getElementById("ClassificaButton");
let LevelButonCancel = document.getElementById("LevelButonCancel");
let NameButonCancel = document.getElementById("NameButonCancel");
let ClassificaButonCancel = document.getElementById("ClassificaButonCancel");
let NameGoButton = document.getElementById("NameGoButton");
let NameInput = document.getElementById("NameInput");
let LevelButonNormale = document.getElementById("LevelButonNormale");
let LevelButonMedio = document.getElementById("LevelButonMedio");
let LevelButonDifficile = document.getElementById("LevelButonDifficile");

let SettingsMusicCheckbox = document.getElementById("SettingsMusicCheckbox");
let SettingsSFXCheckbox = document.getElementById("SettingsSFXCheckbox");
let ColseSettingsButton = document.getElementById("ColseSettingsButton");
let ClassificaRowsCon = document.getElementById("ClassificaRowsCon");
let BlackOverlay = document.getElementById("BlackOverlay");

let TapSFX1Items = document.querySelectorAll('.TapSFX1');
let TapSFX2Items = document.querySelectorAll('.TapSFX2');

let ShwoingSplash = true;
let ShowingMain = false;
let ShowingSettings = false;
let SelectedLevel = 0
let LevelsArray = ["facile", "medio", "difficile"]


/*Storage*/
let SettingsSaves = {
    "MusicVolume": 1,
    "SFXVolume": 0.2,
    "Classifica": {},
    "CurrentPlayer": "",
    "CurrentScore": 0,
    "CurrentLevel": "facile"
}

if (localStorage.getItem('EcoRushSettings')) {
    let TempLoad = localStorage.getItem('EcoRushSettings');
    SettingsSaves = JSON.parse(TempLoad)
    if (SettingsSaves.MusicVolume == 1) {
        SettingsMusicCheckbox.src = "Assets/CheckboxOn.png"
    }
    else {
        SettingsMusicCheckbox.src = "Assets/CheckboxOff.png"
    }

    if (SettingsSaves.SFXVolume == 0.2) {
        SettingsSFXCheckbox.src = "Assets/CheckboxOn.png"
    }
    else {
        SettingsSFXCheckbox.src = "Assets/CheckboxOff.png"
    }
    if (SettingsSaves.CurrentPlayer != undefined && SettingsSaves.CurrentPlayer != 0 && SettingsSaves.CurrentPlayer != "") {
        NameInput.value = SettingsSaves.CurrentPlayer
    }

}


/* Classifica help */
let ImmaginiClassifica = ["Classifica1.png", "Classifica2.png", "Classifica3.png", "Classifica4.png", "Classifica5.png"]

let ClassificaSorted = Object.fromEntries(
    Object.entries(SettingsSaves.Classifica)
        .sort(([, a], [, b]) => b - a)
);

ClassificaRowsCon.innerHTML += `<div class="ClassificaRow">
<h4 class="ScalableH4">Classifica Vuota</h4>
</div>`

if (Object.keys(SettingsSaves.Classifica ).length != 0) {
    ClassificaRowsCon.innerHTML = ""
    let count = 0;
    for (let key in ClassificaSorted) {
        if (count < 5) {
            console.log(`${key}: ${ClassificaSorted[key]}`);

            ClassificaRowsCon.innerHTML += `<div class="ClassificaRow">
        <img src="Assets/${ImmaginiClassifica[count]}" alt="Checkbox" class="ClassificaImg">
        <h4 class="ScalableH4">${key}</h4>
        <h2 class="ScalableH2">${ClassificaSorted[key]}</h2>
    </div>`
            count++;
        } else {
            break;
        }
        console.log("aaaa")
    }
}



/* Tap Sound */
const ButtonClickSFX1 = new Audio();
ButtonClickSFX1.src = './Assets/MusicAndSounds/UITap1.mp3'

const ButtonClickSFX2 = new Audio();
ButtonClickSFX2.src = './Assets/MusicAndSounds/UITap2.mp3'

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

TapSFX1Items.forEach(function(element) {
    element.addEventListener('click', function() {
        PlayTapSFX1()
    });
});

TapSFX2Items.forEach(function(element) {
    element.addEventListener('click', function() {
        PlayTapSFX2()
    });
});


/* Other */
function GoTOPageBlackOverlay() {
    BlackOverlay.style.opacity = '1';
    SettingsSaves.CurrentLevel = LevelsArray[SelectedLevel];
    localStorage.setItem('EcoRushSettings', JSON.stringify(SettingsSaves));
    setTimeout(function () {
        window.location.href = "index.html";
    }, 500);
}

/* Splash Screen */
SplashCon.addEventListener("click", function () {
    if (ShwoingSplash == true) {
        let MainMenuMusic = document.getElementById("MainMenuMusic");
        setTimeout(function () {
            MainMenuMusic.play();
            MainMenuMusic.volume = SettingsSaves.MusicVolume;
            SplashCon.classList.add('Hidden');

            MainUICOn.classList.remove('FadeOut');
            MainUICOn.classList.add('FadeIn');
        }, 420);
        SplashCon.classList.add('FadeOut')
        MainUICOn.classList.remove('Hidden');
    }
})


/* Main Page */
PlayButton.addEventListener("click", function () {
    setTimeout(function () {
        MainUICOn.classList.add('Hidden');
        LevelLayer.classList.remove('FadeOut');
        LevelLayer.classList.add('FadeIn');
    }, 420);
    MainUICOn.classList.add('FadeOut')
    LevelLayer.classList.remove('Hidden');
}
)

SettingsButton.addEventListener("click", function () {
    setTimeout(function () {
        MainUICOn.classList.add('Hidden');
        SettingsCon.classList.remove('FadeOut');
        SettingsCon.classList.add('FadeIn');
    }, 420);
    MainUICOn.classList.add('FadeOut')
    SettingsCon.classList.remove('Hidden');
}
)

ClassificaButton.addEventListener("click", function () {
    setTimeout(function () {
        MainUICOn.classList.add('Hidden');
        ClassificaLayer.classList.remove('FadeOut');
        ClassificaLayer.classList.add('FadeIn');
    }, 420);
    MainUICOn.classList.add('FadeOut')
    ClassificaLayer.classList.remove('Hidden');
}
)


/* Settings Screen */
ColseSettingsButton.addEventListener("click", function () {
    setTimeout(function () {
        SettingsCon.classList.add('Hidden');
        MainUICOn.classList.remove('FadeOut');
        MainUICOn.classList.add('FadeIn');
    }, 420);
    SettingsCon.classList.add('FadeOut')
    MainUICOn.classList.remove('Hidden');
})

SettingsMusicCheckbox.addEventListener("click", function () {
    if (SettingsSaves.MusicVolume == 1) {
        MainMenuMusic.volume = 0
        SettingsSaves.MusicVolume = 0
        SettingsMusicCheckbox.src = "Assets/CheckboxOff.png"
    }
    else {
        MainMenuMusic.volume = 1
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


/* Name Selector */

function ShowNameLayer() {
    setTimeout(function () {
        LevelLayer.classList.add('Hidden');
        NameLayer.classList.remove('FadeOut');
        NameLayer.classList.add('FadeIn');
    }, 420);
    LevelLayer.classList.add('FadeOut')
    NameLayer.classList.remove('Hidden');
}

/* Level Selection */

LevelButonCancel.addEventListener("click", function () {
    setTimeout(function () {
        LevelLayer.classList.add('Hidden');
        MainUICOn.classList.remove('FadeOut');
        MainUICOn.classList.add('FadeIn');
    }, 420);
    LevelLayer.classList.add('FadeOut')
    MainUICOn.classList.remove('Hidden');
})

LevelButonNormale.addEventListener("click", function () {
    SelectedLevel = 0
    ShowNameLayer()
})

LevelButonMedio.addEventListener("click", function () {
    SelectedLevel = 1
    ShowNameLayer()
})

LevelButonDifficile.addEventListener("click", function () {
    SelectedLevel = 2
    ShowNameLayer()
})


/* Name Layer */

NameButonCancel.addEventListener("click", function () {
    setTimeout(function () {
        NameLayer.classList.add('Hidden');
        MainUICOn.classList.remove('FadeOut');
        MainUICOn.classList.add('FadeIn');
    }, 420);
    NameLayer.classList.add('FadeOut')
    MainUICOn.classList.remove('Hidden');
})

NameGoButton.addEventListener("click", function () {
    if (NameInput.value != "") {
        SettingsSaves.CurrentPlayer = NameInput.value
        localStorage.setItem('EcoRushSettings', JSON.stringify(SettingsSaves));
        GoTOPageBlackOverlay()

    }
    else {
        setTimeout(function () {
            NoNameLayer.classList.add('FadeOut');
        }, 1500);
        setTimeout(function () {
            NoNameLayer.classList.add('Hidden');
        }, 1920);

        setTimeout(function () {
            NoNameLayer.classList.remove('FadeOut');
            NoNameLayer.classList.add('FadeIn');
        }, 120);
        NoNameLayer.classList.remove('Hidden');
    }
})

/* Classifica Layer */

ClassificaButonCancel.addEventListener("click", function () {
    setTimeout(function () {
        ClassificaLayer.classList.add('Hidden');
        MainUICOn.classList.remove('FadeOut');
        MainUICOn.classList.add('FadeIn');
    }, 420);
    ClassificaLayer.classList.add('FadeOut')
    MainUICOn.classList.remove('Hidden');
})