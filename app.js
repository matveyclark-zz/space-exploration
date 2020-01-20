// constants 

let today = new Date()
const pictureOfTheDayURI = 'https://api.nasa.gov/planetary/apod?api_key=Eja2wKokHAlZqpnulA7GXhMyRgJhp7saFdZlqLxe'
const asteroidsURI = `https://api.nasa.gov/neo/rest/v1/feed?start_date=${today.getFullYear()}-0${(today.getMonth()+1)}-0${today.getDate()}&end_date=${today.getFullYear()}-${(0 + today.getMonth()+1)}-${today.getDate() + 1}&api_key=Eja2wKokHAlZqpnulA7GXhMyRgJhp7saFdZlqLxe`
const imageSection = document.querySelector('.iotd')
const asteroidContainer = document.querySelector('.asteroid')

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

function createAsteroid(asteroid) {
    const p = document.createElement('p')
    p.textContent = asteroid.name

    const img = document.createElement('img')
    img.classList.add('asteroid-icon')
    if(asteroid.is_potentially_hazardous_asteroid === true) {
        img.src = '/images/asteroid_danger.svg'
    } else {
        img.src = '/images/asteroid_safe.svg'
    }
    
    asteroidContainer.append(p, img)
}

function renderImage() {
    get(pictureOfTheDayURI).then(createImageOfTheDay)
}

function renderAsteroids() {
    get(asteroidsURI).then(obj => {
        let asteroids = obj.near_earth_objects[Object.keys(obj.near_earth_objects)[0]].concat(obj.near_earth_objects[Object.keys(obj.near_earth_objects)[1]])
        asteroids.forEach(createAsteroid)
    })
}


// event listeners