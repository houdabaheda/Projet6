
// eslint-disable-next-line no-unused-vars
const contactButton = document.getElementById('contactButton');

contactButton.addEventListener('click', displayModal);

function displayModal() {
    const modal = document.getElementById('contact_modal');
    modal.style.display = 'block'; 
}
const closeModalButton = document.getElementById('closeModalButton');

closeModalButton.addEventListener('click', closeModal);

function closeModal() {
    const modal = document.getElementById('contact_modal');
    modal.style.display = 'none'; 
}


// eslint-disable-next-line no-unused-vars


function validateForm(prenom, nom, mail,message) {
    const errors = {}; //objet 

    if (prenom.length < 2) {
        errors.prenom = "Veuillez entrer 2 caractères ou plus pour le champ du prenom.";
        
    }

    if (nom.length < 2) {
        errors.nom = "Veuillez entrer 2 caractères ou plus pour le champ du nom.";
    }


    const emailRegExp = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i;
    if (!emailRegExp.test(mail)) {
        errors.mail = "Veuillez entrer une adresse email valide.";
    }

    if (!message || message.trim().length === 0) {
        errors.message = "Veuillez entrer un message."; 
    }


    if (Object.keys(errors).length > 0) {
        throw errors;
      
    }





}

const submitBtn = document.querySelector(".contact_button_envoyer"); 
submitBtn.addEventListener("click", function (event) {
    event.preventDefault();
    let first = document.getElementById("first");
    let prenom = first.value;
    let last = document.getElementById("last");
    let nom = last.value;
    let email = document.getElementById("email");
    let mail = email.value;
    let message = document.getElementById("message").value;


    document.querySelectorAll('.error-message').forEach(span => span.innerHTML = '');

 
    try {
        validateForm(prenom, nom, mail,message);
        console.log(`Prénom: ${prenom}, Nom: ${nom}, Email: ${mail},Message: ${message}`);
        


    } catch (errors) {
    
        if (errors.prenom) document.getElementById("prenomError").textContent = errors.prenom;
        if (errors.nom) document.getElementById("nomError").textContent = errors.nom;
        if (errors.mail) document.getElementById("emailError").textContent = errors.mail;
        if (errors.message) document.getElementById("messageError").textContent = errors.message; // Afficher l'erreur du champ "message"






    }






});

