let SplashCon = document.getElementById("SplashCon");
let MainUICOn = document.getElementById("MainUICOn");
let SettingsCon = document.getElementById("SettingsCon");
let LevelLayer = document.getElementById("LevelLayer");
let NameLayer = document.getElementById("NameLayer");
let NoNameLayer = document.getElementById("NoNameLayer");

let MainMenuMusic = document.getElementById("MainMenuMusic");
let ButtonClickSFX1 = document.getElementById("ButtonClickSFX1");
let ButtonClickSFX2 = document.getElementById("ButtonClickSFX2");

let PlayButton = document.getElementById("PlayButton");
let SettingsButton = document.getElementById("SettingsButton");
let LevelButonCancel = document.getElementById("LevelButonCancel");
let NameButonCancel = document.getElementById("NameButonCancel");
let NameGoButton = document.getElementById("NameGoButton");
let NameInput = document.getElementById("NameInput");
let LevelButonNormale = document.getElementById("LevelButonNormale");
let LevelButonMedio = document.getElementById("LevelButonMedio");
let LevelButonDifficile = document.getElementById("LevelButonDifficile");

let SettingsMusicCheckbox = document.getElementById("SettingsMusicCheckbox");
let SettingsSFXCheckbox = document.getElementById("SettingsSFXCheckbox");
let ColseSettingsButton = document.getElementById("ColseSettingsButton");
let BlackOverlay = document.getElementById("BlackOverlay");

let TapSFX1Items = document.getElementsByClassName("TapSFX1");
let TapSFX2Items = document.getElementsByClassName("TapSFX2");

let ShwoingSplash = true;
let ShowingMain = false;
let ShowingSettings = false;
let SelectedLevel = 0
let LevelsArray = ["index.html", "index.html", "index.html"]


/*Storage*/
let SettingsSaves = {
    "MusicVolume": 1,
    "SFXVolume": 0.2,
    "Classifica": {
        "Sandrina" : 182,
        "Gigiotto" : 12,
        "Saluun" : 192,
        "Wabakii" : 182,
        "Sacrso" : 2,
        "Otto" : 88
    },
    "CurrentPlayer": ""
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
    if(SettingsSaves.CurrentPlayer != undefined && SettingsSaves.CurrentPlayer != 0 && SettingsSaves.CurrentPlayer != ""){
        NameInput.value = SettingsSaves.CurrentPlayer
    }

}



/* Tap Sound */

function PlayTapSFX1() {
    ButtonClickSFX1.volume = SettingsSaves.SFXVolume;
    ButtonClickSFX1.currentTime = 0;
    ButtonClickSFX1.play;
    console.log("wap")
}

function PlayTapSFX2() {
    ButtonClickSFX2.volume = SettingsSaves.SFXVolume;
    ButtonClickSFX2.currentTime = 0;
    ButtonClickSFX2.play;
    console.log("wap", SFXVolume)
}

for (let i = 0; i < TapSFX1Items.length; i++) {
    TapSFX1Items[i].addEventListener("click", PlayTapSFX1)
}
for (let i = 0; i < TapSFX2Items.length; i++) {
    TapSFX2Items[i].addEventListener("click", PlayTapSFX2)
}


/* Other */
function GoTOPageBlackOverlay(Page) {
    BlackOverlay.style.opacity = '1'; // Fading to black

    setTimeout(function () {
        // Change the page after the transition
        window.location.href = Page;
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
    PlayTapSFX1();
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
    PlayTapSFX1();
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
    PlayTapSFX2();
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
    PlayTapSFX1();
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
    PlayTapSFX2();
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
    PlayTapSFX2();
})

NameGoButton.addEventListener("click", function () {
    if (NameInput.value != "") {
        SettingsSaves.CurrentPlayer = NameInput.value
        localStorage.setItem('EcoRushSettings', JSON.stringify(SettingsSaves));
        GoTOPageBlackOverlay(LevelsArray[SelectedLevel])
        PlayTapSFX1();
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
        PlayTapSFX2();
    }
})