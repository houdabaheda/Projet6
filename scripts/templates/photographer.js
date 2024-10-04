// eslint-disable-next-line no-unused-vars
function addLike() {
    let hearticons = document.querySelectorAll('.likes-heart .fa-solid.fa-heart');

    function calculHeart() {
        const mediaItems = Array.from(document.querySelectorAll('.image article')); 
        let mediaTitless = mediaItems.map(item => Number(item.querySelector('h1').textContent));
        
        let somme = mediaTitless.reduce((acc, current) => acc + current, 0);
       
        const barre = document.querySelector(".barre .number")
        barre.textContent = somme
    }
    calculHeart()


    for (const hearticon of hearticons) {

        hearticon.addEventListener('click', (event) => {
            const mediaItems = Array.from(document.querySelectorAll('.image article')); 
            let mediaTitless = mediaItems.map(item => Number(item.querySelector('h1').textContent));
            let somme = mediaTitless.reduce((acc, current) => acc + current, 0);
            const barre = document.querySelector(".barre .number")
            console.log(event)

            let consth1Elemnt = hearticon.previousElementSibling;
            let currentValue = parseInt(consth1Elemnt.textContent, 10);
            consth1Elemnt.textContent = currentValue + 1;


            calculHeart()
            barre.textContent = somme + 1;
        });
    }




}