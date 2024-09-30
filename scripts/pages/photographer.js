// Extraire l'ID du photographe de l'URL
const urlParams = new URLSearchParams(window.location.search);
const photographerId = urlParams.get('id');

// Affiche l'ID du photographe dans la console pour vérifier que ça fonctionne
console.log(photographerId);

// Fonction pour afficher les informations du photographe
async function photographe() {
    const reponse = await fetch('data/photographers.json');
    const data = await reponse.json();
    const photographers = data.photographers;

    const photograph = photographers.find((photographer) => photographer.id == photographerId);
    console.log(photograph);

    const imageElement = document.createElement("img");
    imageElement.src = photograph.portrait;
    imageElement.alt = `Photo intitulée ${photograph.name}`;

    const nomElement = document.createElement("h2");
    nomElement.innerText = photograph.name;

    const cityElemnt = document.createElement("h3");
    cityElemnt.innerText = `${photograph.city},${photograph.country}`;

    const taglinElement = document.createElement("h4");
    taglinElement.innerText = photograph.tagline;

    const sectionFiches = document.querySelector(".photograph-header");
    const info = document.createElement("div");

    const contac = document.querySelector(".contact ");
    const contact = document.createElement("h3");
    contact.innerText = photograph.name;
    contac.appendChild(contact)

    const barre = document.querySelector(".barre .price");
    barre.innerText = `${photograph.price} €/jour`;

    info.classList.add('info');
    info.appendChild(nomElement);
    info.appendChild(cityElemnt);
    info.appendChild(taglinElement);
    sectionFiches.appendChild(info);

    const button = document.querySelector(".contact_button");
    sectionFiches.appendChild(button);
    sectionFiches.appendChild(imageElement);
}

// Fonction pour récupérer et afficher les médias du photographe
async function getPhotographerById(photographerId, medias) {
    if (!medias) {
        const reponse = await fetch('data/photographers.json');
        const data = await reponse.json();
        medias = data.media;
    }

    console.log(medias);

    // Filtrer les médias du photographe
    const photographerMedias = medias.filter((mediaa) => mediaa.photographerId == photographerId);
    console.log(photographerMedias);

    const imageContainer = document.querySelector(".image");
    imageContainer.innerHTML = ""; // Vider l'élément avant de le remplir

    // Parcourir les médias du photographe et les afficher
    // Parcourir les médias du photographe et les afficher
    photographerMedias.forEach((media) => {
        // eslint-disable-next-line no-undef
        const mediaInstance = MediaFactory.createMedia(media); // Appel à la méthode static
        const mediaElement = mediaInstance.createMediaElement();
        imageContainer.appendChild(mediaElement);
    });

    // Appeler la fonction `mod` après l'ajout des éléments au DOM

    // eslint-disable-next-line no-undef
    addLike();
    mod(); // Appeler la fonction pour gérer les likes
}

// Fonction pour gérer le mo dal
function mod() {
    const modal = document.getElementById('modal');
    const modalMediaContainer = document.getElementById('modal-media-container');
    const modalTitle = document.getElementById('modal-title');
    const closeModal = document.querySelector('.close');
    const prev = document.querySelector('.prev');
    const next = document.querySelector('.next');

    let currentIndex = 0;

    // Assurez-vous que les articles sont bien sélectionnés
    const mediaItems = Array.from(document.querySelectorAll('.image article'));
    console.log(mediaItems);

    const mediaSources = mediaItems.map(item => item.querySelector('img, video')); // Recherche d'images et de vidéos
    console.log(mediaSources);

    const mediaTitles = mediaItems.map(item => item.querySelector('p') ? item.querySelector('p').textContent : ""); // Sélectionner les titres des médias
    console.log(mediaTitles);

    // Attacher les événements aux médias après leur création
    mediaSources.forEach((media, index) => {
        if (media) {
            media.addEventListener('click', () => {
                currentIndex = index;
                openModal();
            });
        }
    });

    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    prev.addEventListener('click', () => {
        currentIndex = (currentIndex > 0) ? currentIndex - 1 : mediaSources.length - 1;
        openModal();
    });

    next.addEventListener('click', () => {
        currentIndex = (currentIndex < mediaSources.length - 1) ? currentIndex + 1 : 0;
        openModal();
    });

    // Navigation au clavier
    document.addEventListener('keydown', (e) => {
        if (modal.style.display === 'block') {
            if (e.key === 'ArrowLeft') {
                currentIndex = (currentIndex > 0) ? currentIndex - 1 : mediaSources.length - 1;
                openModal();
            } else if (e.key === 'ArrowRight') {
                currentIndex = (currentIndex < mediaSources.length - 1) ? currentIndex + 1 : 0;
                openModal();
            } else if (e.key === 'Escape') {
                modal.style.display = 'none';
            }
        }
    });

    // Fonction pour ouvrir le modal
    function openModal() {
        modal.style.display = 'block';
        console.log(mediaSources[currentIndex])
        console.log(currentIndex)
        console.log(mediaSources)
        const media = mediaSources[currentIndex].cloneNode(true); // Cloner l'image ou la vidéo


        // Pour les vidéos, s'assurer que les contrôles sont toujours activés
        if (media.tagName.toLowerCase() === 'video') {
            media.controls = true;
        }

        modalMediaContainer.innerHTML = ''; // Réinitialise le contenu du modal
        modalMediaContainer.appendChild(media); // Ajoute le média cloné au modal
        modalTitle.textContent = mediaTitles[currentIndex]; // Affiche le titre correspondant
    }
}

// Appel des fonctions au chargement de la page
photographe();
getPhotographerById(photographerId);

// Fonction de tri des médias
async function tri() {
    const reponse = await fetch('data/photographers.json');
    const data = await reponse.json();
    const medias = data.media;
    const photographerMedias = medias.filter((media) => media.photographerId == photographerId);

    console.log(photographerMedias);

    const selectElement = document.getElementById('sort-options');
    selectElement.addEventListener('change', (event) => {
        const selectedValue = event.target.value;
        let mediaOrdonnees = Array.from(photographerMedias);

        if (selectedValue === 'popularite') {
            mediaOrdonnees.sort((a, b) => b.likes - a.likes); // Tri décroissant par likes (popularité)
            console.log("Option 'Popularité' sélectionnée");
        } else if (selectedValue === 'date') {
            mediaOrdonnees.sort((a, b) => new Date(b.date) - new Date(a.date)); // Tri par date décroissante
            console.log("Option 'Date' sélectionnée");
        } else if (selectedValue === 'titre') {
            mediaOrdonnees.sort((a, b) => a.title.localeCompare(b.title)); // Tri par ordre alphabétique des titres
            console.log("Option 'Titre' sélectionnée");
        }

        // Réafficher les médias après le tri
        getPhotographerById(photographerId, mediaOrdonnees);
    });
}

tri();
