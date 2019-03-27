
/**
 * @description get url params from url template
 */
const urlParser = function() {
    let param = null;
    let url = this.extra.url || '';
    for (let i = 0; i < url.length; i++) {
        if (param && (url[i] === '/' || url[i] === '\\' || url[i] === ':' || url[i] === '?')) {
            this.urlParams.push(param);
            param = null;
        }
        if (param) {
            param += url[i];
            continue;
        }
        if (url[i] === ':') param = ':';
    }
    if (param) this.urlParams.push(param);
};

module.exports = urlParser;