class Post {
    id;
    value;
    noLikes;
    noDislikes;
    noEmojis;

    constructor(id, value, noLikes = 0, noDislikes = 0, noEmojis = 0) {
        this.id = id;
        this.value = value;
        this.noLikes = noLikes;
        this.noDislikes = noDislikes;
        this.noEmojis = noEmojis;
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
}

module.exports = Post;