const battleBackgroundImage = new Image()
battleBackgroundImage.src = './My Game Assets/Images/battleBackground.png'
const battleBackground = new Sprite({
    position: {
        x: 0,
        y: 0
    },
    image: battleBackgroundImage
})

let draggle 
let emby 
let renderedSprites
let battleAnimationId
let queue 

var vecProblema = []
var resCorrecta = 0
var pregunta = 0
var promLength = problemas.length
  
function createButtons(){
    vecProblema = []
    var azar = Math.floor(Math.random() * promLength)
    var contLength = problemas[azar].length
    var resAleatoria = 0
    var elementoEliminado = 0
    var lengthAux = 0
    
    for(i=0; i<contLength; i++){
        vecProblema.push(problemas[azar][i])
    }
    pregunta = vecProblema[0]
    resCorrecta = vecProblema[1]

    document.querySelector('#attackType').innerHTML = pregunta
    document.querySelector('#attackType').style.color = "red"

    lengthAux = contLength
    for(i=1; i<contLength; i++){
        azar = Math.floor(Math.random() * (lengthAux - 1) + 1)
        resAleatoria = vecProblema[azar]
        elementoEliminado = vecProblema.splice(azar, 1)
        const button = document.createElement('button')
        button.name = "nombre" + i
        button.innerHTML = resAleatoria
        document.querySelector('#attacksBox').append(button)
        lengthAux = lengthAux - 1
    }
}

function modifyButtons(){
    console.log('entroooo modify')
    var azar2 = Math.floor(Math.random() * promLength)
    var contLength2 = problemas[azar2].length
    var resAleatoria2
    var elementoEliminado2
    var lengthAux2
    var name2

    vecProblema = []
    for(i=0; i<contLength2; i++){
        vecProblema.push(problemas[azar2][i])
    }

    pregunta = vecProblema[0]
    resCorrecta = vecProblema[1]

    document.querySelector('#attackType').innerHTML = pregunta
    document.querySelector('#attackType').style.color = "red"

    lengthAux2 = contLength2
    //console.log(lengthAux2)
    for(i=1; i<contLength2; i++){
        name2 = "nombre" + i
        azar2 = Math.floor(Math.random() * (lengthAux2 - 1) + 1)
        resAleatoria2 = vecProblema[azar2]
        elementoEliminado2 = vecProblema.splice(azar2, 1)
        const button = document.querySelector("[name="+name2+"]")
        button.innerHTML = resAleatoria2
        lengthAux2 = lengthAux2 - 1
    }
}

function initBattle() {
    document.querySelector('#userInterface').style.display = 'block'
    document.querySelector('#dialogueBox').style.display = 'none'
    document.querySelector('#enemyHealthBar').style.width = '100%'
    document.querySelector('#playerHealthBar').style.width = '100%'
    //--------------------- aqui se resetean los botones ------------------------------
    document.querySelector('#attacksBox').replaceChildren()

    draggle = new Monster(monsters.Draggle)
    draggle.position.y = 100
    draggle.position.x = 800
    emby = new Monster(monsters.Emby)
    emby.position.x = 280
    emby.position.y = 325
    renderedSprites = [draggle, emby]
    queue = []

    //------------------------------- aqui se crean los botones -------------------------------------
    createButtons()
    //------------------ aqui se ejecutan acciones al clickear los botones -----------------------------------------
    document.querySelectorAll('button').forEach((button) => {
        button.addEventListener('click', (e) => {
            //se selecciona el ataque
            if(e.currentTarget.innerHTML == resCorrecta){
                var selectedAttack = attacks["Correcto"]
            }else{
                var selectedAttack = attacks["Incorrecto"]
            }
        
            
            emby.attack({ 
                attack: selectedAttack,
                recipient: draggle,
                renderedSprites
            })

            if (draggle.health <= 0){
                defeatedEnemies++
                queue.push(() => {
                    draggle.faint()
                })
                queue.push(() => {
                    gsap.to('#overlappingDiv', {
                        opacity: 1,
                        onComplete: () => {
                            cancelAnimationFrame(battleAnimationId)
                            animate()
                            document.querySelector('#userInterface').style.display = 'none'

                            gsap.to('#overlappingDiv', {
                                opacity: 0,
                            })

                            battle.initiated = false
                            audio.map.play()
                        }
                    })
                })
            }

            const randomAttack = draggle.attacks[Math.floor(Math.random() * draggle.attacks.length)]

            queue.push(() => {
                draggle.attack({ 
                    attack: randomAttack,
                    recipient: emby,
                    renderedSprites
                })
            })

            if (emby.health <= 0){
                queue.push(() => {
                    emby.faint()
                })
                queue.push(() => {
                    gsap.to('#overlappingDiv', {
                        opacity: 1,
                        onComplete: () => {
                            cancelAnimationFrame(battleAnimationId)
                            animate()
                            document.querySelector('#userInterface').style.display = 'none'

                            gsap.to('#overlappingDiv', {
                                opacity: 0,
                            })

                            battle.initiated = false
                            audio.map.play()
                        }
                    })
                })
            }

            //------------------aqui resetear botones y preguntas-----------------------
            modifyButtons()
        })
        
    })
}

function animateBattle(){
    battleAnimationId = window.requestAnimationFrame(animateBattle)
    battleBackground.draw()

    renderedSprites.forEach(sprite => {
        sprite.draw()
    })
}

animate()
//initBattle()
//animateBattle()

document.querySelector('#dialogueBox').addEventListener('click', (e) => {
    if(queue.length > 0) {
        queue[0]()
        queue.shift()
    }else e.currentTarget.style.display = 'none'
})