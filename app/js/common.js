/**
 * Created at 28/05/2018
 * By Adrien
 */

function askFor(url, cb) {
    const xhr = new XMLHttpRequest();
    xhr.open('get', url, true);
    xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
    xhr.send(null);

    xhr.onloadend = function () {
        if (xhr.status === 200) {
            return cb(null, JSON.parse(xhr.response));
        } else {
            return cb(new Error('Error ' + xhr.status + '. ' + xhr.response));
        }
    };
}

function createElt(name, text, className, style, parent) {
    const e = document.createElement(name || 'div');
    if (text != null)
        e.innerHTML = text;
    if (className != null)
        e.className = className;
    if (style != null) {
        for (var property in style) {
            if (style.hasOwnProperty(property)) {
                e.setAttribute(property, style[property]);
            }
        }
    }
    if (parent != null)
        parent.appendChild(e);
    return e;
}