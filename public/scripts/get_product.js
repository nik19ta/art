let params = document.location.search;
const URL = params.split('?')[0];


if (params.split('?')[1]) {
    get_product(params.split('?')[1].split('=')[1])
} else {
    console.log(null);
}

function get_product(id) {
    fetch(URL + 'get_product', {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify({
                id: id,
            })
        })
        .then(response => response.text())
        .then((response) => {
            response = JSON.parse(response)
            draw(response);
        })
        .catch(err => console.log(err))
}

function draw(data) {
    console.log(data.data[0]);

    let elem_left = document.querySelector('#left');

    let div_img = document.createElement('img');
        div_img.src = `${data.data[0]['img']}`
        div_img.className = `get_peoduct__img`;


    document.title = data.data[0].name;
    document.querySelector('#title').innerHTML = data.data[0].name;
    document.querySelector('#desc').innerHTML = data.data[0].des;
    document.querySelector('#price').innerHTML = data.data[0].price;
    document.querySelector('#category').innerHTML = data.data[0].category;
        document.querySelector('#category').href = `/catalog?=${data.data[0].category}`
    document.querySelector('#name').innerHTML = data.data[0].name;

    elem_left.appendChild(div_img);
}
