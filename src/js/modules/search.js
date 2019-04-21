export class Search {
    goSearch(cat, lots) {
        const input = document.getElementById("search-input");
        const list = (style) => document.getElementById('search-list').style.display = style;
        let categ = [];
        let ul = document.getElementById("list");

        cat.forEach((el) => {
            let li = document.createElement('li');
            let a = document.createElement('a');

            a.setAttribute('href', `/#${el.main_ctg}`);
            a.innerText = `${el.main_ctg}`;
            li.classList.add("list_item");
            li.appendChild(a);
            categ.push(li);

            el.sub_ctg.map(sub => {
                let li = document.createElement('li');
                let a = document.createElement('a');
                a.setAttribute('href', `/#${el.main_ctg}/${sub}`);
                a.innerText = `${sub}`;
                li.classList.add("list_item");
                li.appendChild(a);
                categ.push(li);
            })
        });

        function showList(arr, par) {
            arr.forEach((el) => {
                par.appendChild(el);
            });
        }

        const search = () => {

            showList(categ, ul);
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
    }
}
