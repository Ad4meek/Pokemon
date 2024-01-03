const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d')

canvas.width = 1280
canvas.height = 640

ctx.fillRect(0, 0, canvas.width, canvas.height)

const image = new Image()
image.src = '../res/img/maps/testmap.png'

image.onload = () => {
    ctx.drawImage(image, -1900, -600)
}

const character = new Image()
character.src = '../res/img/characters/characterDown.png'

character.onload = () => {
    ctx.drawImage(character, -1900, -600)
}