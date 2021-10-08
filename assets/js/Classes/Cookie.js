class Cookie {
    #name;
    #value;
    #domain;
    #path;
    #maxAge;
    #expires;


    constructor(name) {
        this.#name = name;
    }

    getName() {
        return this.#name;
    }

    getValue() {
        return this.#value;
    }

    setValue(value) {
        this.#value = value;
        document.cookie = this.#name + "=" + this.#value;
    }

    getDomain() {
        return this.#domain;
    }

    setDomain(domain) {
        this.#domain = domain;
        document.cookie = this.#name + "=" + this.#value + "; domain=" + this.getDomain();
    }

    getPath() {
        return this.#path;
    }

    setPath(path) {
        this.#path = path;
        document.cookie = this.#name + "=" + this.#value + "; path=" + this.getPath();
    }

    getMaxAge() {
        return this.#maxAge;
    }

    setMaxAge(maxAge) {
        this.#maxAge = maxAge;
        document.cookie = this.#name + "=" + this.#value + "; max-age=" + this.getMaxAge();
    }

    getExpires() {
        return this.#expires;
    }

    setExpires(expires) {
        this.#expires = expires;
        document.cookie = this.#name + "=" + this.#value + "; expires=" + this.getExpires();
    }

    delete() {
        this.setMaxAge("0");
    }
}


function getCookies() {
    let cookieString = document.cookie;
    cookieString = cookieString.replaceAll(" ", "");
    let cookieList = cookieString.split(";");

    let cookies = new Array2D(cookieList.length, 2);

    for (let i = 0; i < cookieList.length; i++) {
        cookies.items[i][0] = cookieList[i].substring(0, cookieList[i].indexOf("="));
        cookies.items[i][1] = cookieList[i].substring(cookieList[i].indexOf("=") + 1, cookieList[i].length);
    }
    
    return cookies;
}

function getCookie(name) {

}

function hasCookie(name) {
    let cookies = getCookies();

    if (!cookies.items[0][0]) return false;

    for (let i = 0; i < cookies.items.length; i++) {
        if(name == cookies.items[i][0]) {
            return true;
        }
    }
    return false;
}