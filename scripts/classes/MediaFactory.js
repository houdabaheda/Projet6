class MediaFactory {
    constructor(media) {
        this.media = media;
    }

    // La méthode `createMediaElement` sera implémentée dans les sous-classes
    

    static createMedia(media) {
        if (media.image) {
            return new ImageMedia(media);
        } else if (media.video) {
            return new VideoMedia(media);
        } 
    }
}

// Classe pour les images
class ImageMedia extends MediaFactory {
    createMediaElement() {
        const bloc = document.createElement("article");
        const image = document.createElement("img");
        image.src = `../../assets/images/${this.media.image}`;
        image.alt = this.media.title;

        const titleLikes = this.createTitleLikesHeart();
        bloc.appendChild(image);
        bloc.appendChild(titleLikes);

        return bloc;
    }

    createTitleLikesHeart() {
        const div = document.createElement("div");
        div.classList.add("title-likes-heart");

        const title = document.createElement("p");
        title.innerText = this.media.title;

        const likes = document.createElement("h1");
        likes.innerText = this.media.likes;

        const heart = document.createElement("i");
        heart.classList.add('fa-solid', 'fa-heart');
        heart.dataset.id = this.media.id;

        const divv = document.createElement("div");
        divv.classList.add("likes-heart");
        divv.appendChild(likes);
        divv.appendChild(heart);

        div.appendChild(title);
        div.appendChild(divv);

        return div;
    }
}

// Classe pour les vidéos
class VideoMedia extends MediaFactory {
    createMediaElement() {
        const bloc = document.createElement("article");
        const video = document.createElement("video");
        video.controls = false;
        const sourceElement = document.createElement("source");
        sourceElement.src = `../../assets/images/${this.media.video}`;
        sourceElement.type = "video/mp4";
        video.appendChild(sourceElement);

        const titleLikes = this.createTitleLikesHeart();
        bloc.appendChild(video);
        bloc.appendChild(titleLikes);

        return bloc;
    }

    createTitleLikesHeart() {
        const div = document.createElement("div");
        div.classList.add("title-likes-heart");

        const title = document.createElement("p");
        title.innerText = this.media.title;

        const likes = document.createElement("h1");
        likes.innerText = this.media.likes;

        const heart = document.createElement("i");
        heart.classList.add('fa-solid', 'fa-heart');
        heart.dataset.id = this.media.id;

        const divv = document.createElement("div");
        divv.classList.add("likes-heart");
        divv.appendChild(likes);
        divv.appendChild(heart);

        div.appendChild(title);
        div.appendChild(divv);

        return div;
    }
}            