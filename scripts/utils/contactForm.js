
// eslint-disable-next-line no-unused-vars
function displayModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "block";
}

// eslint-disable-next-line no-unused-vars
function closeModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
}

function validateForm(prenom, nom, mail) {
    const errors = {}; //objet 

    if (prenom.length < 2) {
        errors.prenom = "Veuillez entrer 2 caractères ou plus pour le champ du prenom.";
        //ajouter la variable prenom qui contien un message d'erreur 
    }

    if (nom.length < 2) {
        errors.nom = "Veuillez entrer 2 caractères ou plus pour le champ du nom.";
    }


    //emailRegExp est une expression régulière qui vérifie la structure d'un email.
    const emailRegExp = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i;
    if (!emailRegExp.test(mail)) {
        errors.mail = "Veuillez entrer une adresse email valide.";
        //Si le mail ne correspond pas à l'expression régulière, une erreur est ajoutée à l'objet errors .
    }


    // vérifie si l'objet errors contient au moins une clé (c'est-à-dire s'il y a des erreurs)
    if (Object.keys(errors).length > 0) {
        throw errors;
        //Si des erreurs existent, elles sont lancées sous forme d'exception.
        //throw permet de signaler qu'une condition inattendue ou incorrecte a été rencontrée
        //Cela interrompt l'exécution normale du code et transfère le contrôle à un gestionnaire d'erreurs try...catch

    }



}

const submitBtn = document.querySelector(".contact_button_envoyer"); //bouton envoyer
submitBtn.addEventListener("click", function (event) {
    event.preventDefault();
    let first = document.getElementById("first");
    let prenom = first.value;
    let last = document.getElementById("last");
    let nom = last.value;
    let email = document.getElementById("email");
    let mail = email.value;


    // Sélectionne tous les éléments avec la classe error-message et vide leur contenu
    document.querySelectorAll('.error-message').forEach(span => span.innerHTML = '');

    //Le code à risque d'erreur (dans ce cas, l'appel de validateForm) 
    //Si validateForm n'a pas d'erreurs,
    //le formulaire modal (.bground) est caché et le modal qui afficher le message merci est affiché
    try {
        validateForm(prenom, nom, mail);
        


    } catch (errors) {
        // Si des erreurs sont détectées, elles sont capturées dans le bloc catch.
        // Pour chaque clé d'erreur(prenom,nom,mail ...) le message d'erreur correspondant est affiché dans l'élément HTML approprié
        if (errors.prenom) document.getElementById("prenomError").textContent = errors.prenom;
        if (errors.nom) document.getElementById("nomError").textContent = errors.nom;
        if (errors.mail) document.getElementById("emailError").textContent = errors.mail;





    }






});
