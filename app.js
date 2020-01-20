// constants 

let today = new Date()
const pictureOfTheDayURI = 'https://api.nasa.gov/planetary/apod?api_key=Eja2wKokHAlZqpnulA7GXhMyRgJhp7saFdZlqLxe'
const asteroidsURI = `https://api.nasa.gov/neo/rest/v1/feed?start_date=${today.getFullYear()}-0${(today.getMonth()+1)}-0${today.getDate()}&end_date=${today.getFullYear()}-${(0 + today.getMonth()+1)}-${today.getDate() + 1}&api_key=Eja2wKokHAlZqpnulA7GXhMyRgJhp7saFdZlqLxe`
const imageSection = document.querySelector('.iotd')

// api

function get(url) {
    return fetch(url).then(resp => resp.json())
}


// functions

function createImageOfTheDay(image) {
    const h2 = document.createElement('h2')
    h2.textContent = image.title

    const img = document.createElement('img')
    img.src = image.url

    const p = document.createElement('p')
    p.textContent = image.explanation

    imageSection.append(h2, img, p)
}

function renderImage() {
    get(pictureOfTheDayURI).then(createImageOfTheDay)
}


// event listeners