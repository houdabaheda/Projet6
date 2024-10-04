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

        const taglinElement = document.createElement("h4");
        taglinElement.innerText = article.tagline;

        const priceElement = document.createElement("h5");
        priceElement.innerText = `${article.price} €/jour`;



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
    try {
        const reponse = await fetch('data/photographers.json');
        if (!reponse.ok) {
            throw new Error(`Erreur : ${reponse.status} ${reponse.statusText}`);
        }
        const data = await reponse.json();
        const photographe = data.photographers;

        genererPhotographe(photographe);
    } catch (error) {
        console.error("Les données des photographes ne sont pas disponibles :", error);
        // Optionnel : afficher un message d'erreur sur la page
        const sectionFiches = document.querySelector(".photographer_section");
        sectionFiches.innerHTML = "<p>Les données des photographes ne peuvent pas être chargées pour le moment. Veuillez réessayer plus tard.</p>";
    }
}


data();





