const input = document.getElementById("search-input"),
    goods = [...document.querySelectorAll(".submenu a")],
    categClone = [],
    ul = document.getElementById('list'),
    list = (style) => document.getElementById('search-list').style.display = style,
    categ = [];


//клонирование Node элементов, чтобы не удалять из основного
// меню (возможно использовать данные с back-end)
(function clone() {
    goods.forEach((el) => categClone.push(el.cloneNode(true)));
    categClone.forEach((el) => {
        let li = document.createElement('li');
        li.classList.add("list_item");
        li.appendChild(el);
        categ.push(li);
    })
})();

function showList() {
    categ.forEach((el) => {
        ul.appendChild(el);
    });

}

const search = () => {

    showList();
    list('block');

    const textSearch = input.value.trim();
    if (textSearch !== '') {
        categ.forEach((el) => {
            if (el.innerText.toLowerCase().search(textSearch.toLowerCase()) === -1) {
                el.classList.add('hide');
            } else {
                el.classList.remove('hide');
            }
        })
    } else {
        categ.forEach((el) => {
            el.classList.remove('hide'); //очистка поиска
            list('none');
        })
    }
};


input.addEventListener("input", search);
