
const filterCities = function filterCities() {

    let inputValue = getById('citySearch').value;

    divBox.style.display = 'block'

    if (inputValue.length > 0) {
        inputValue = inputValue.trim();
        inputValue = inputValue.toLowerCase();

        let result = cities.filter(city => city.toLowerCase().includes(inputValue));

        createSuggestionList(result);
    } else {

        divBox.innerHTML = ''
        divBox.style.display = 'none'

    }

    function createSuggestionList(array) {
        divBox.innerHTML = ''
        for (let i = 0; i < array.length; i++) {
            let newEl = document.createElement('p');
            newEl.innerText = array[i];
            newEl.style.margin = "5px"
            newEl.style.cursor = 'pointer'

            divBox.appendChild(newEl);
            newEl.addEventListener("click", fill)
        }
    }

    function fill(e) {
        let valueToFill = e.target.innerText
        citySearch.value = valueToFill
        let noticeArr = adsManager.allAds.filter(el => el.city === valueToFill )
        printAdsBars(noticeArr, noticeContainer)
        divBox.innerHTML = ''
        divBox.style.display = 'none'
    }
    
};