const embyImage = new Image()
embyImage.src = './My Game Assets/Images/embySprite.png'

const draggleImage = new Image()
draggleImage.src = './My Game Assets/Images/draggleSprite.png'

const monsters = {
    Emby:{
        position: {
            x: 280,
            y: 325
        },
        image: {
            src: './My Game Assets/Images/embySprite.png'
        },
        image: embyImage,
        frames: {
            max: 4,
            hold: 60
        },
        animate: true,
        name: 'Emby',
        //attacks: [attacks.Tackle, attacks.Fireball]
        attacks: [attacks["6/8"], attacks["2/4"], attacks["4/8"], attacks["7/8"], attacks.Correcto, attacks.Incorrecto]
    },

    Draggle:{
        position: {
            x: 800,
            y: 100
        },
        image: {
            src: './My Game Assets/Images/draggleSprite.png'
        },
        frames: {
            max: 4,
            hold: 60
        },
        animate: true,
        isEnemy: true,
        name: 'Draggle',
        attacks: [attacks.Tackle, attacks.Fireball]
    }
}