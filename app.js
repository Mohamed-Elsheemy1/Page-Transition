const main = document.querySelector('main');

const links = [...document.querySelectorAll('a')];
const transitionDiv = document.querySelector('.transition__div');

let isAnimating = false;

links.forEach(link => {
    link.addEventListener('click', async e => {
        e.preventDefault();
        if(isAnimating) return
        const url = e.target.href;
        console.log(url)
        startTransition(url);
        const pathname = new URL(url).pathname;
        history.pushState(null, '', pathname);

    })
})

window.addEventListener('popstate', e => {
    const url = window.location.pathname;
    startTransition(url)
})

const startTransition = async (url) => {
    isAnimating = true;
    const html = await fetch(url);
    const htmlString = await html.text();
    const parser = new DOMParser();
    const parsedhtml = parser.parseFromString(htmlString, 'text/html').querySelector('main')
    
    // main.classList.add('hidden');

    // main.addEventListener('transitionend', () => {
    //     main.innerHTML = parsedhtml.innerHTML;
    //     main.classList.remove('hidden');

    // }, {once: true});

    transitionDiv.classList.add('animate__in');
    transitionDiv.addEventListener('transitionend', () => {
        main.innerHTML = parsedhtml.innerHTML;
        transitionDiv.classList.remove('animate__in');
        transitionDiv.classList.add('animate__out');
        setTimeout(() => {
            transitionDiv.style.transition = '0s';
            transitionDiv.classList.remove('animate__out');

            setTimeout(() => {
                transitionDiv.style.transition = '1s';
            }, 100)
            isAnimating = false;
        }, 1000)
    })

}