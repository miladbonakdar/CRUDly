
module.exports = function() {
    let param = null;
    for (let i = 0; i < this.url.length; i++) {
        if (
            param &&
            (this.url[i] === "/" || this.url[i] === "\\" || this.url[i] === ":" || this.url[i] === "?")
        ) {
            this.urlParams.push(param);
            param = null;
        }
        if (param) {
            param += this.url[i];
            continue;
        }
        if (this.url[i] === ":") param = ":";
    }
    if (param) this.urlParams.push(param);
};
