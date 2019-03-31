document.getElementById('categories').addEventListener("mouseover", () => {
    let menu = [...document.getElementsByClassName('submenu')];
    menu.map((el) => el.style.display = "flex")
});

window.addEventListener("scroll", () => {
    let menu = [...document.getElementsByClassName('submenu')];
    menu.map((el) => el.style.display = "none")
});

