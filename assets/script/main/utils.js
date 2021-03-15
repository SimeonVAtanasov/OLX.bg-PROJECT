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

function hideElement(el){
    el.style.display = "none";
}

function showElement (el,  disp = "block"){
    el.style.display = disp
}

function debounce(func, time) {
    let timerId;
    return function () {
      clearTimeout(timerId);
      timerId = setTimeout(func, time);
    };
  }