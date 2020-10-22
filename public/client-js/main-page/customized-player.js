const forest_sound = new Audio('../../assets/sounds/forest_sound.mp3')
const sea_sound = new Audio('../../assets/sounds/sea_sound.mp3')
const rain_sound = new Audio('../../assets/sounds/rain_sound.mp3')
const desert_sound = new Audio('../../assets/sounds/desert_sound.mp3')

forest_sound.loop = true
sea_sound.loop = true
rain_sound.loop = true
desert_sound.loop = true


$('#playForest').on('click', () => {
    if(forest_sound.paused){
        forest_sound.play()
    } else{
        forest_sound.pause()
    }
})


$('#playSea').on('click', () => {
    if(sea_sound.paused){
        sea_sound.play()
    } else{
        sea_sound.pause()
    }
})


$('#playRain').on('click', () => {
    if(rain_sound.paused){
        rain_sound.play()
    } else{
        rain_sound.pause()
    }
})


$('#playDesert').on('click', () => {
    if(desert_sound.paused){
        desert_sound.play()
    } else{
        desert_sound.pause()
    }
})