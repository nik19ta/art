const URL = 'http://localhost:3000/';
let products = document.querySelector('.products')

getGood(null)


function getGood(keywords) {
    fetch(URL + 'get_goods', {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify({
                search: keywords,
            })
        })
        .then(response => response.text())
        .then((response) => {
            console.log(response);
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


function createElem(class_, product_) {
    let elem = document.createElement('div');
    elem.className = class_;
    elem.id = product_.id;
    return elem
}

function appendChildP(elem, product_) {
    let img = document.createElement('img');
    img.className = 'img';
    img.src = product_.img;
    let name = document.createElement('p');
    name.className = 'name'
    name.innerHTML = `${product_.name}`
    let price = document.createElement('p');
    price.className = 'price'
    price.innerHTML = `${product_.price}₽`
    let manufacturer = document.createElement('p');
    manufacturer.className = 'manufacturer'
    manufacturer.innerHTML = `${product_.Manufacturer}`

    elem.appendChild(img);
    elem.appendChild(name);
    elem.appendChild(price);
}