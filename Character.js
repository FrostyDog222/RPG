import { getDiceRollArray, getDicePlaceholderHtml, getPercentage } from './utils.js'

const forest = new Audio('/utility/sounds/The Dark Forest/forest.mp3')
const mountains = new Audio('/utility/sounds/Mountains of Madness/mountain.mp3')
const wasteland = new Audio('/utility/sounds/Plains of Despair/wasteland.mp3')
const castle = new Audio('/utility/sounds/Castle of Shadows/castle.mp3')

function Character(data) {
    Object.assign(this, data)
    this.maxHealth = this.health

    this.diceHtml = getDicePlaceholderHtml(this.diceCount)

    this.setDiceHtml = function() {
        this.currentDiceScore = getDiceRollArray(this.diceCount)
        this.diceHtml = this.currentDiceScore.map((num) =>
            `<div class="dice">${num}</div>`).join("")
    }

    this.takeDamage = function (attackScoreArray) {
        const totalAttackScore = attackScoreArray.reduce((total, num) => total + num)
        this.health -= totalAttackScore
        if (this.health <= 0) {
            this.dead = true
            this.health = 0
        }
    }

    this.getHealthBarHtml = function () {
        const percent = getPercentage(this.health, this.maxHealth)
        return `<div class="health-bar-outer">
                    <div class="health-bar-inner ${percent < 26 ? "danger" : ""}" 
                            style="width:${percent}%;">
                    </div>
                </div>`  
    }
    

    this.getCharacterHtml = function () {
        const { elementId, name, avatar, health, diceCount, diceHtml, isDarkForest, isMountainsOfMadness, isCastleOfShadows, isPlainsOfDispair } = this
        
        function handleEnviroment(){
            if(isDarkForest){
                document.querySelector('body').style.backgroundImage = 'url("/images/The Dark Forest/forest.jpg") '
                document.querySelector('body').style.backgroundRepeat = 'no-repeat'
                document.querySelector('body').style.backgroundPosition = 'center center'
                document.querySelector('body').style.backgroundAttachment = 'fixed'
                document.querySelector('body').style.backgroundSize = 'cover'
                forest.volume = 0.3
                forest.loop = true
                forest.play()
            }else if(isMountainsOfMadness){
                document.querySelector('body').style.backgroundImage = 'url("/images/Mountains of Madness/mountains.jpg")'
                document.querySelector('body').style.backgroundRepeat = 'no-repeat'
                document.querySelector('body').style.backgroundPosition = 'center center'
                document.querySelector('body').style.backgroundAttachment = 'fixed'
                document.querySelector('body').style.backgroundSize = 'cover'
                forest.pause()
                mountains.volume = 0.2
                mountains.loop = true
                mountains.play()
            }else if(isPlainsOfDispair){
                document.querySelector('body').style.backgroundImage = 'url("/images/Plains of Despair/wasteland.jpg")'
                document.querySelector('body').style.backgroundRepeat = 'no-repeat'
                document.querySelector('body').style.backgroundPosition = 'center center'
                document.querySelector('body').style.backgroundAttachment = 'fixed'
                document.querySelector('body').style.backgroundSize = 'cover'
                mountains.pause()
                wasteland.volume = 0.2
                wasteland.loop = true
                wasteland.play()
            } 
            else if(isCastleOfShadows){
                document.querySelector('body').style.backgroundImage = 'url("/images/Castle of Shadows/castle.jpg")'
                document.querySelector('body').style.backgroundRepeat = 'no-repeat'
                document.querySelector('body').style.backgroundPosition = 'center center'
                document.querySelector('body').style.backgroundAttachment = 'fixed'
                document.querySelector('body').style.backgroundSize = 'cover'
                wasteland.pause()
                castle.volume = 0.2
                castle.loop = true
                castle.play()
            }
        }
        
        handleEnviroment()
        const healthBar = this.getHealthBarHtml()
        return `
            <div class="character-card">
                <h4 class="name"> ${name} </h4>
                <img class="avatar" src="${avatar}" />
                <div class="health">health: <b> ${health} </b></div>
                ${healthBar}
                <div class="dice-container">
                    ${diceHtml}
                </div>
            </div>`
    }
}

export {Character}
