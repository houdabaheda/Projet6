// Extraire l'ID du photographe de l'URL
const urlParams = new URLSearchParams(window.location.search);
const photographerId = urlParams.get('id');



async function photographe() {
    try{
        const reponse = await fetch('data/photographers.json');
        const data = await reponse.json();
        const photographers = data.photographers;
    
        const photograph = photographers.find((photographer) => photographer.id == photographerId);
    
        const imageElement = document.createElement("img");
        imageElement.src = `../../assets/photographers/${photograph.portrait}`;
        
        imageElement.alt = `Photo intitulée ${photograph.name}`;
    
        const nomElement = document.createElement("h2");
        nomElement.innerText = photograph.name;
    
        const cityElemnt = document.createElement("h3");
        cityElemnt.innerText =`${photograph.city},${photograph.country}`;
    
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

    }catch (error) {
        console.error("Erreur lors du chargement des informations du photographe :", error);
    }

}

async function getPhotographerById(photographerId, medias) {
    try {
        if (!medias) {
            const reponse = await fetch('data/photographers.json');
            if (!reponse.ok) throw new Error(`Erreur : ${reponse.status} ${reponse.statusText}`);
            
            const data = await reponse.json();
            medias = data.media;
        }

        const photographerMedias = medias.filter((media) => media.photographerId == photographerId);
        const imageContainer = document.querySelector(".image");
        imageContainer.innerHTML = "";

        photographerMedias.forEach((media) => {
            // eslint-disable-next-line no-undef
            const mediaInstance = MediaFactory.createMedia(media);
            const mediaElement = mediaInstance.createMediaElement();
            imageContainer.appendChild(mediaElement);
        });

        // eslint-disable-next-line no-undef
        addLike();
        
        modale(); 
    } catch (error) {
        console.error("Erreur lors du chargement des médias :", error);
    }
}


function modale() {
    const modal = document.getElementById('modal');
    const modalMediaContainer = document.getElementById('modal-media-container');
    const modalTitle = document.getElementById('modal-title');
    const closeModal = document.querySelector('.close');
    const prev = document.querySelector('.prev');
    const next = document.querySelector('.next');

    let currentIndex = 0;

    const mediaItems = Array.from(document.querySelectorAll('.image article'));


    const mediaSources = mediaItems.map(item => item.querySelector('img, video')); 
    

    const mediaTitles = mediaItems.map(item => item.querySelector('p') ? item.querySelector('p').textContent : ""); 
   

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

    function openModal() {
        modal.style.display = 'block';
        
        const media = mediaSources[currentIndex].cloneNode(true); 


        if (media.tagName.toLowerCase() === 'video') {
            media.controls = true;
        }

        modalMediaContainer.innerHTML = ''; 
        modalMediaContainer.appendChild(media);
        modalTitle.textContent = mediaTitles[currentIndex];
    }
}

photographe();
getPhotographerById(photographerId);



async function sortPhotographerMedia() {
    try {
        const reponse = await fetch('data/photographers.json');
        if (!reponse.ok) throw new Error(`Erreur : ${reponse.status} ${reponse.statusText}`);
        
        const data = await reponse.json();
        const medias = data.media;
        const photographerMedias = medias.filter((media) => media.photographerId == photographerId);

        const selectElement = document.getElementById('sort-options');
        selectElement.addEventListener('change', (event) => {
            const selectedValue = event.target.value;
            let mediaOrdonnees = Array.from(photographerMedias);

            if (selectedValue === 'popularite') {
                mediaOrdonnees.sort((a, b) => b.likes - a.likes);
            } else if (selectedValue === 'date') {
                mediaOrdonnees.sort((a, b) => new Date(b.date) - new Date(a.date));
            } else if (selectedValue === 'titre') {
                mediaOrdonnees.sort((a, b) => a.title.localeCompare(b.title));
            }

            getPhotographerById(photographerId, mediaOrdonnees);
        });
    } catch (error) {
        console.error("Erreur lors du tri des médias :", error);
    }
}

sortPhotographerMedia();
