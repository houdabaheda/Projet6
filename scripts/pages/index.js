function genererPhotographe(photographe) {
    for (let i = 0; i < photographe.length; i++) {

        const article = photographe[i];

        const imageElement = document.createElement("img");
        imageElement.src = `../../assets/photographers/${article.portrait}`;
        
        const photographerLink = document.createElement('a');
        photographerLink.href = `photographer.html?id=${article.id}`;
        photographerLink.setAttribute('aria-label', `Voir les détails de ${article.name}`);
       

        const nomElement = document.createElement("h2");
        nomElement.innerText = article.name;

        const cityElemnt = document.createElement("h3");
        cityElemnt.innerText = `${article.city},${article.country} `;

        const taglinElement =document.createElement("h4");
        taglinElement.innerText= article.tagline;

        const priceElement =document.createElement("h5");
        priceElement.innerText=`${article.price} €/jour`;



        //Rattachement de nos balises au DOM
        const sectionFiches = document.querySelector(".photographer_section");
        const photographeElement = document.createElement("article");
        sectionFiches.appendChild(photographeElement);
        photographeElement.appendChild(imageElement);
        photographeElement.appendChild(photographerLink)
        photographerLink.appendChild(imageElement);
        photographerLink.appendChild(nomElement);
        photographeElement.appendChild(cityElemnt);
        photographeElement.appendChild(taglinElement);
        photographeElement.appendChild(priceElement);

    }



}

async function data() {
    const reponse = await fetch('data/photographers.json');
    const data = await reponse.json();
    const photographe = data.photographers

    genererPhotographe(photographe);
}


data();





