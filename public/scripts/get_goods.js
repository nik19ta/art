let products = document.querySelector('.products')

const params = decodeURI(document.location.search);
const URL = params.split('?')[0];

if (params.split('?')[1]) {
    getGood(null, params.split('?')[1].split('=')[1])
} else {
    getGood(null, null)
}



function getGood(keywords, params) {
    fetch(URL + 'get_goods', {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify({
                search: keywords,
                params: params
            })
        })
        .then(response => response.text())
        .then((response) => {
            response = JSON.parse(response)
            while (products.firstChild) {
                products.removeChild(products.firstChild);
            }

            for (let i = 0; i < response.length; i++) {
                elem = createElem('product', response[i])
                products.appendChild(elem);
                appendChildP(elem, response[i])
            }
        })
        .catch(err => console.log(err))

}

function to_prod(data) {
    console.log(data);
}

function createElem(class_, product_) {
    let elem = document.createElement('a');
        elem.href = `/product?id=${product_.id}`
    elem.className = class_;
        elem.onclick = function () {
            to_prod(product_.id)
        };
    elem.id = product_.id;
    return elem
}

function appendChildP(elem, product_) {
    let div_img = document.createElement('div');
        div_img.style.backgroundImage = `url(${product_.img})`;
        div_img.className = `img_back`;
    let name = document.createElement('p');
    name.className = 'name'
    name.innerHTML = `${product_.name}`
    let price = document.createElement('p');
    price.className = 'price'
    price.innerHTML = `${product_.price}₽`

    // elem.appendChild(img);
    elem.appendChild(div_img);
    elem.appendChild(name);
    elem.appendChild(price);
}