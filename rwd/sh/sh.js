//Theme
function findCurrentTheme() {
    if (localStorage.getItem("theme") !== null) {
        return localStorage.getItem("theme");;
    }

    if (window.matchMedia("(prefers-color-scheme: light)")) {
        return "light";
    }

    return "light";
}

function updateButton(sun, mobileSun, moon, mobileMoon, theme) {
    if (theme === "light") {
        sun.classList.add("sh__header-theme-active");
        mobileSun.classList.add("sh__header-theme-active");
        moon.classList.remove("sh__header-theme-active");
        mobileMoon.classList.remove("sh__header-theme-active");

    } else {
        moon.classList.add("sh__header-theme-active");
        mobileMoon.classList.add("sh__header-theme-active");
        sun.classList.remove("sh__header-theme-active");
        mobileSun.classList.remove("sh__header-theme-active");
    }
}


const themeButton = document.querySelector("[data-theme-toggle]");
const themeButtonSun = themeButton.querySelector(".sh__header-theme-sun");
const themeButtonMoon = themeButton.querySelector(".sh__header-theme-moon");
const themeMobileButton = document.querySelector("[data-theme-mobile-toggle]");
const themeMobileButtonSun = themeMobileButton.querySelector(".sh__header-mobile-theme-sun");
const themeMobileButtonMoon = themeMobileButton.querySelector(".sh__header-mobile-theme-moon");

let currentTheme = findCurrentTheme();
updateButton(themeButtonSun, themeMobileButtonSun, themeButtonMoon, themeMobileButtonMoon, currentTheme);
document.querySelector("html").setAttribute("data-theme", currentTheme);

themeButton.addEventListener("click", () => {
    const newTheme = currentTheme === "light" ? "dark" : "light";
    localStorage.setItem("theme", newTheme);
    updateButton(themeButtonSun, themeMobileButtonSun, themeButtonMoon, themeMobileButtonMoon, newTheme);
    document.querySelector("html").setAttribute("data-theme", newTheme);
    currentTheme = newTheme;
})
themeMobileButton.addEventListener("click", () => {
    const newTheme = currentTheme === "light" ? "dark" : "light";
    localStorage.setItem("theme", newTheme);
    updateButton(themeButtonSun, themeMobileButtonSun, themeButtonMoon, themeMobileButtonMoon, newTheme);
    document.querySelector("html").setAttribute("data-theme", newTheme);
    currentTheme = newTheme;
})

//Mobile Menu
function handleMobileMenuClickOpen() {
    const mobileMenu = document.getElementById("mobile-menu");
    if (mobileMenu.style.display === "flex") {
        mobileMenu.style.display = "none";
    }

    else {
        mobileMenu.style.display = "flex";
    }
}

function handleMobileMenuClickClose() {
    const mobileMenu = document.getElementById("mobile-menu");
    if (mobileMenu.style.display === "flex") {
        mobileMenu.style.display = "none";
    }

    else {
        mobileMenu.style.display = "flex";
    }
}
