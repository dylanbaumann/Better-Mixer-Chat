const emptyLinks = document.querySelectorAll('a[href="#"]');

if(emptyLinks){
    emptyLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
        });
    });
}