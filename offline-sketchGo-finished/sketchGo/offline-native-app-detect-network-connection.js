function detectOffline() {
    if (navigator.onLine) {
        document.documentElement.style.backgroundColor = "palevioletred";
    } else {
        document.documentElement.style.backgroundColor = "silver";
    }
}
window.addEventListener("load", detectOffline);
window.addEventListener("online", detectOffline);
window.addEventListener("offline", detectOffline);

