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
            console.log(response);
        })
        .catch(err => console.log(err))
}