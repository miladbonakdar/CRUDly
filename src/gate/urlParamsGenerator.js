const removeCharacter = (str, c = ":") => {
    if (str.startsWith(c)) return str.substring(1);
    return str;
};

module.exports = function() {
    let param = null;
    for (let i = 0; i < this.url.length; i++) {
        if (
            param &&
            (this.url[i] === "/" || this.url[i] === "\\" || this.url[i] === ":" || this.url[i] === "?")
        ) {
            this.params.push(removeCharacter(param));
            param = null;
        }
        if (param) {
            param += this.url[i];
            continue;
        }
        if (this.url[i] === ":") param = ":";
    }
    if (param) this.params.push(removeCharacter(param));
};
