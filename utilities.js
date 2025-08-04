function qsa(selector){
    return document.querySelectorAll(selector);
}
function qs(selector){
    return document.querySelector(selector);
}
function ce(element){
    return document.createElement(element);
}
function getbyID(element){
    return document.getElementById(element)
}

export { qsa, qs, ce, getbyID}