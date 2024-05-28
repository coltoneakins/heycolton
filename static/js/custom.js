// Check local storage for the theme and set icon class
var theme = localStorage.getItem("theme");
if (theme == "dark") {
    var socialIcons = document.getElementById("home-banner-social");
    if (socialIcons) {
        socialIcons.classList.add("social-icons-dark");
    }
}

// Make a watcher for the themeChangeed event
window.addEventListener("themeChanged", function (e) {
    // Change the color of the social icons
    var socialIcons = document.getElementById("home-banner-social");
    if (socialIcons){
        if (e.detail.theme === "dark") {
            socialIcons.classList.add("social-icons-dark");
        } else {
            socialIcons.classList.remove("social-icons-dark");
        }
    }
});
