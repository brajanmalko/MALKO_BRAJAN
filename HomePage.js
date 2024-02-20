let SplashCon = document.getElementById("SplashCon");
let MainUICOn = document.getElementById("MainUICOn");
let MainMenuMusic = document.getElementById("MainMenuMusic");

let ShwoingSplash = true;
let ShowingMain = false;

SplashCon.addEventListener("click", function () {
    if (ShwoingSplash == true) {
        let MainMenuMusic = document.getElementById("MainMenuMusic");
        setTimeout(function () {
            MainMenuMusic.play();
            SplashCon.classList.add('Hidden');

            MainUICOn.classList.remove('FadeOut');
            MainUICOn.classList.add('FadeIn');
        }, 420);
        SplashCon.classList.add('FadeOut')
        MainUICOn.classList.remove('Hidden');
        MainMenuMusic.play();
    }
})