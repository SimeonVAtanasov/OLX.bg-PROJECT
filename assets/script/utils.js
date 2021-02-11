function getById(id) {
    return document.getElementById(id)
}
function createElement(el, text) {
    let element =  document.createElement(el);
    
    if(text){
        element.innerHTML = text;
    }

    return element;
}