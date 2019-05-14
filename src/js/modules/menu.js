export class MenuView {
    renderMenu (categ) {

         const render = categ.map(item => {
                return `
               
                <li class="submenu_item">
                        <a href="/#menu/${item.main_ctg}" class="submenu_item-a">${item.main_ctg}</a>
                        <ul class="sub-submenu">
                        ${item.sub_ctg.map(el => `<li><a href="/#menu/${item.main_ctg}/${el}">${el}</a></li>`).join('')}
                        </ul>
                     </li>
                 
                `

            });
        document.getElementById('submenu_categ').innerHTML = `${render.join('')}`
    }
    itemsByCategory (lots, menuCtg, subCtg) {
        let fiterArr = [];
        if (subCtg === undefined) {
            fiterArr = [...lots.filter(el => el.main_ctg === menuCtg)]
        } else {
            fiterArr = [...lots.filter(el => el.sub_ctg === subCtg)];
        }
        return fiterArr;
    }
}


document.getElementById('categories').addEventListener("mouseover", () => {
    let menu = [...document.getElementsByClassName('submenu')];
    menu.map((el) => el.style.display = "flex")
});

window.addEventListener("blur", () => {
    let menu = [...document.getElementsByClassName('submenu')];
    menu.map((el) => el.style.display = "none")
}, true);

