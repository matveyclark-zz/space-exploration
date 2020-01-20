// constants 

let today = new Date()
const pictureOfTheDayURI = 'https://api.nasa.gov/planetary/apod?api_key=Eja2wKokHAlZqpnulA7GXhMyRgJhp7saFdZlqLxe'
const asteroidsURI = `https://api.nasa.gov/neo/rest/v1/feed?start_date=${today.getFullYear()}-0${(today.getMonth()+1)}-0${today.getDate()}&end_date=${today.getFullYear()}-${(0 + today.getMonth()+1)}-${today.getDate() + 1}&api_key=Eja2wKokHAlZqpnulA7GXhMyRgJhp7saFdZlqLxe`
const marsRoverURI = 'https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=2539&page=2&api_key=Eja2wKokHAlZqpnulA7GXhMyRgJhp7saFdZlqLxe'
const astrosURI = 'http://api.open-notify.org/astros.json'
const imageSection = document.querySelector('.iotd')
const asteroidContainer = document.querySelector('.wrapper.asteroids')
const roverPhotosContainer = document.querySelector('.rover-photos')
const astronaughtContainer = document.querySelector('.wrapper.astros')

// api

function get(url) {
    return fetch(url).then(resp => resp.json())
}


// functions

    // create image of the day 

function createImageOfTheDay(image) {
    const h2 = document.createElement('h2')
    h2.textContent = image.title

    const img = document.createElement('img')
    img.src = image.url

    const p = document.createElement('p')
    p.textContent = image.explanation

    imageSection.append(h2, img, p)
}

    // render image of the day 

function renderImage() {
    get(pictureOfTheDayURI).then(createImageOfTheDay)
}

    // create asteroids

function createAsteroid(asteroid) {
    const div = document.createElement('div')
    div.classList.add('asteroid')

    const p = document.createElement('p')
    p.textContent = asteroid.name

    const img = document.createElement('img')
    img.classList.add('asteroid-icon')
    if(asteroid.is_potentially_hazardous_asteroid === true) {
        img.src = '/images/asteroid_danger.svg'
    } else {
        img.src = '/images/asteroid_safe.svg'
    }
    
    div.append(p, img)
    asteroidContainer.append(div)
}

    // render asteroids

function renderAsteroids() {
    get(asteroidsURI).then(obj => {
        let asteroids = obj.near_earth_objects[Object.keys(obj.near_earth_objects)[0]].concat(obj.near_earth_objects[Object.keys(obj.near_earth_objects)[1]])
        asteroids.forEach(createAsteroid)
    })
}

    // create mars rover photos

function createRoverPhoto(photo) {
    const img = document.createElement('img')
    img.classList.add('rover-photo')
    img.src = photo.img_src

    roverPhotosContainer.append(img)
}

    // render mars rover photos

function renderRoverPhotos() {
    get(marsRoverURI).then(obj => {
        obj.photos.forEach(createRoverPhoto)
    })
}

    // create astronaughts

function createAstronaughts(astro) {
    const div = document.createElement('div')
    div.classList.add('astronaught')

    const p = document.createElement('p')
    p.classList.add('astro-name')
    p.textContent = astro.name

    const pCraft = document.createElement('p')
    pCraft.classList.add('astro-craft')
    pCraft.textContent = astro.craft

    const img = document.createElement('img')
    img.classList.add('astro-icon')
    img.src = '/images/astronaut.svg'

    div.append(p, pCraft, img)
    astronaughtContainer.append(div)
}

    // render astronaughts

function renderAstronaughts() {
    get(astrosURI).then(obj => {
        obj.people.forEach(createAstronaughts)
    })
}


// event listeners