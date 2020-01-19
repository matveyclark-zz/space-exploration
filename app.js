// constants 

const pictureOfTheDayURI = 'https://api.nasa.gov/planetary/apod?api_key=Eja2wKokHAlZqpnulA7GXhMyRgJhp7saFdZlqLxe'

// api

function get(url) {
    return fetch(url).then(resp => resp.json())
}


// functions


// event listeners