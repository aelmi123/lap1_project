class Post {
    id;
    value;
    noLikes;
    noDislikes;
    noEmojis;
    comments;
    gifs;

    constructor(id, value, noLikes = 0, noDislikes = 0, noEmojis = 0, comments = [], gifs =[]) {
        this.id = id;
        this.value = value;
        this.noLikes = noLikes;
        this.noDislikes = noDislikes;
        this.noEmojis = noEmojis;
        this.comments = comments;
        this.gifs = gifs;
    }

    get Id() {
        return this.id;
    }

    set Id(value) {
        this.id = value;
    }

    get Value() {
        return this.value;
    }

    set Value(value) {
        this.value = value;
    }

    get NoLikes() {
        return this.noLikes;
    }

    get NoDislikes() {
        return this.noDislikes;
    }

    set NoDislikes(value) {
        this.noDislikes = value;
    }

    get NoEmojis() {
        return this.noEmojis;
    }

    set noEmojis(value) {
        this.noEmojis = value;
    }
    get Comments() {
        return this.comments;
    }
    set comments(value) {
        this.comments = value
    }
    get Gifs() {
        return this.gifs;
    }
    set gifs(value) {
        this.gifs = value
    }
}

module.exports = Post;
