let oldScrollY = 0;
let div = document.querySelector('#header');

window.addEventListener('scroll', function () {
    let scrolled = window.pageYOffset || document.documentElement.scrollTop;
    let dY = scrolled - oldScrollY;

    if (dY < 0 && document.documentElement.scrollTop > 60) {
        setTimeout(() => {
            div.classList.remove('not');
            div.classList.add('yes');
        }, 50)
    } else if (document.documentElement.scrollTop < 60) {
        setTimeout(() => {
            div.classList.remove('not');
            div.classList.add('yes');
        }, 50)
    } else {
        setTimeout(() => {
            div.classList.add('not');
            div.classList.remove('yes');
        }, 50)
    }

    oldScrollY = scrolled;
});