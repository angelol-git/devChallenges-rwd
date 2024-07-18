function handleMobileMenuClickOpen() {
    const mobileMenu = document.getElementById("mobile-menu");
    if (mobileMenu.style.display === "block") {
        mobileMenu.style.display = "none";
    }

    else {
        mobileMenu.style.display = "block";
    }
}

function handleMobileMenuClickClose() {
    const mobileMenu = document.getElementById("mobile-menu");
    if (mobileMenu.style.display === "block") {
        mobileMenu.style.display = "none";
    }

    else {
        mobileMenu.style.display = "block";
    }
}

function calculateSettingAsThemeString({ localStorageTheme, systemSettingLight }) {
    if (localStorageTheme !== null) {
        return localStorageTheme;
    }

    if (systemSettingLight.matches) {
        return "light";
    }

    return "light";
}

const themeButton = document.querySelector("[data-theme-toggle]");
const localStorageTheme = localStorage.getItem("theme");
const systemSettingLight = window.matchMedia("(prefers-color-scheme: light)");

let currentThemeSetting = calculateSettingAsThemeString({ localStorageTheme, systemSettingLight });

themeButton.addEventListener("click", () => {
    const newTheme = currentThemeSetting === "light" ? "dark" : "light";
    console.log(newTheme);

    document.querySelector("html").setAttribute("data-theme", newTheme);

    localStorage.setItem("theme", newTheme);

    currentThemeSetting = newTheme;
})