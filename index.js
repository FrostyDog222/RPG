import characterData from './data.js'
import {Character} from './Character.js'
// Dice and attack
const menuMusic = new Audio('/utility/sounds/menu.mp3')
const fireball = new Audio('/utility/sounds/fireball attack.mp3')
const diceThrow = new Audio('/utility/sounds/dice.mp3')
const monsterDiv = document.getElementById('monster')
const wizardDiv = document.getElementById('hero')

// The Dark Forest
const GiantSpider = new Audio('/utility/sounds/The Dark Forest/spider.mp3')
const Werewolf = new Audio('/utility/sounds/The Dark Forest/werewolf.mp3')
const Ent = new Audio('/utility/sounds/The Dark Forest/ent.mp3')
const Wraith = new Audio('/utility/sounds/The Dark Forest/wraith.mp3')
const Arachnus = new Audio('/utility/sounds/The Dark Forest/spider queen.mp3')
// Mountains of Madness
const Troll = new Audio('/utility/sounds/Mountains of Madness/troll.mp3')
const Yeti = new Audio('/utility/sounds/Mountains of Madness/yeti.mp3')
const Harpie = new Audio('/utility/sounds/Mountains of Madness/harpie.mp3')
const Goblin = new Audio('/utility/sounds/Mountains of Madness/goblin.mp3')
const Grimgor = new Audio('/utility/sounds/Mountains of Madness/grimgor.mp3')
// Plains of Despair
const Gargoyle = new Audio('/utility/sounds/Plains of Despair/gargoyle.mp3')
const Zombies = new Audio('/utility/sounds/Plains of Despair/zombies.mp3')
const Minotaur = new Audio('/utility/sounds/Plains of Despair/minotaur.mp3')
const Mummie = new Audio('/utility/sounds/Plains of Despair/mummie.mp3')
const Drakon = new Audio('/utility/sounds/Plains of Despair/drakon.mp3')
// Castle of Shadows
const ShadowDemon = new Audio('/utility/sounds/Castle of Shadows/shadow demon.mp3')
const SkeletonKnight = new Audio('/utility/sounds/Castle of Shadows/skeleton.mp3')
const Necromancer = new Audio('/utility/sounds/Castle of Shadows/necromancer.mp3')
const Gargantuan = new Audio('/utility/sounds/Castle of Shadows/gargantuan.mp3')
const Malakar = new Audio('/utility/sounds/Castle of Shadows/malakar the shadow lord.mp3')

// story
const storyBody = document.getElementById('story-body')
const storyContainer = document.getElementById('story-container')
const storyBtn = document.getElementById('story-button')
const storyTitle = document.getElementById('story-title')
const storyText = document.getElementById('story-text')
let storyShown = false

// shop
const shopBtn = document.getElementById('shop-button')
const shop = document.getElementById('shop')
const coins = document.getElementById('coins')
const healthPotion = document.getElementById('health-potion')
const extraHealthPotion = document.getElementById('extra-health-potion')
const staff = document.getElementById('staff')
const armor = document.getElementById('armor')
let money = 200
let isExtraHealthPotion = false
let isStaff = false
let isArmor = false

// Health Potion
healthPotion.addEventListener('click', function(){
    if(money >= 30 && wizard.health < 150){
        wizard.health = wizard.health + 30
        if(wizard.health > 150){
            wizard.health = 150
        }
        money = money - 30
        addCoins()
        render()
        console.log(wizard.health)
    }
})

// Healing overtime potion
extraHealthPotion.addEventListener('click', function(){
    if(money >= 75){
        money = money - 75
        addCoins()
        render()
        isExtraHealthPotion = true
        extraHealthPotion.disable = true
        extraHealthPotion.style.background = "#c2b28c"
        extraHealthPotion.textContent = "Sold Out"
    }
})

function extraHealth(){
    if(isExtraHealthPotion){
        if(wizard.health < 150){
            wizard.health += Math.floor(Math.random() * 15) + 4
        }else{
            wizard.health = 150
        }
        render()
    }
}

// Staff +4 damage 
staff.addEventListener('click', function(){
    if(money >= 175){
        money = money - 175
        addCoins()
        render()
        isStaff = true
        staff.disable = true
        staff.style.background = "#c2b28c"
        staff.textContent = "Sold Out"
    }
})

function extraDamage(){
    if(isStaff){
        let newDamageArray = wizard.currentDiceScore
        newDamageArray.push(4)
        return newDamageArray
    }else {
        return wizard.currentDiceScore
    }
}

// Armor -4 dmg from monster

armor.addEventListener('click', function(){
    if(money >= 175){
        money = money - 175
        addCoins()
        render()
        isArmor = true
        armor.disable = true
        armor.style.background = "#c2b28c"
        armor.textContent = "Sold Out"
    }
})

function extraArmor(){
    if(isArmor){
        let newDamageArray = monster.currentDiceScore
        let sum = newDamageArray.reduce(function(a, b){
            return a + b
        }, 0)
        let subtractedSum = sum - 5
        if(subtractedSum < 0){
            subtractedSum = 0
        }
        return [subtractedSum]
    }else{
        return monster.currentDiceScore
    }
}

shop.style.display = 'none'

function handleShop(){
    if (shop.style.display === "none") {
        shop.style.display = "block"
        shopBtn.textContent = "Hide Shop"
    }else {
        shop.style.display = "none"
        shopBtn.textContent = "Show Shop"
    }
}

shopBtn.addEventListener('click', handleShop)

function addCoins(){
    if(money ===null){
        money = 0
        coins.textContent = money
    }else {
        coins.textContent = money
    }
}

function shakeScreen(){
    setTimeout(function(){
        monsterDiv.classList.add('shake')
        wizardDiv.classList.add('shake')
    }, 1200)

    setTimeout(function(){
        monsterDiv.classList.remove('shake')
        wizardDiv.classList.remove('shake')
    }, 2500)
}

function hideStory(){
    storyBody.style.display = 'none'
    storyContainer.style.display = 'none'
}

function showStory(){
    storyBody.style.display = 'block'
    storyContainer.style.display = 'block'
}


storyBtn.addEventListener('click', hideStory)

let monstersArray = [
    "spider", "werewolf", "ent", "wraith", "arachnus",
    "troll", "yeti", "harpie","goblin", "grimgor",
    "gargoyle", "zombies", "minotaur", "mummie", "drakon",
    "shadowDemon", "skeletonKnight", "necromancer", "gargantuan", "malakar"
    ]
let isWaiting = false

function getNewMonster() {
    const nextMonsterData = characterData[monstersArray.shift()]
    if (money === null){
        money = 0
    }else if (nextMonsterData.name === "Troll"){
        money = money + 100
    }else if (nextMonsterData.name === "Gargoyle"){
        money = money + 150
    }else if (nextMonsterData.name === "Shadow Demon"){
        money = money + 200
    }else {
        money = money + Math.floor(Math.random() * 40) + 10
    }
    extraHealth()
    addCoins()
    return nextMonsterData ? new Character(nextMonsterData) : {}
}

function disableButton() {
    const button = document.getElementById("attack-button")
    button.disabled = true
    button.classList.add('disabled')
    button.classList.remove('active')
    setTimeout(function() {
      button.disabled = false
      button.classList.remove('disabled')
    }, 3500);
}

function attack() {
    shakeScreen()
    disableButton()
    diceThrow.play();
    setTimeout(function() {
        fireball.play();
    }, 1000);
    if(!isWaiting){
        wizard.setDiceHtml()
        monster.setDiceHtml()
        wizard.takeDamage(extraArmor())
        monster.takeDamage(extraDamage())
        render()
        
        if(wizard.dead){
            endGame()
        }
        else if(monster.dead){
            isWaiting = true
            if(monstersArray.length > 0){
                setTimeout(()=>{
                    monster = getNewMonster()
                    render()
                    isWaiting = false
                },1500)
            }
            else{
                endGame()
            }
        }    
    }
    switch(monster.name) {
        case "Giant Spider":
            setTimeout(function() {
                GiantSpider.volume = 0.5
                GiantSpider.play()
            }, 2000);
            break
        case "Werewolf":
            setTimeout(function() {
                Werewolf.volume = 0.5
                Werewolf.play() 
            }, 2000);
            break
        case "Ent":
            setTimeout(function() {
                Ent.volume = 0.5
                Ent.play()
            }, 2000);
            break
        case "Wraith":
            setTimeout(function() {
                Wraith.volume = 0.5
                Wraith.play()
            }, 2000);
            break
        case "Arachnus":
            storyShown = true
            setTimeout(function() {
                Arachnus.volume = 0.5
                Arachnus.play()
            }, 2000);
            break
        case "Troll":
            if (storyShown){
                storyTitle.textContent = `Traveling to Mountains of Madness`
                storyText.textContent = `These towering mountains are home to fierce trolls and other deadly creatures. The mountain peaks are covered in snow and ice, making travel treacherous. 
                The only way to cross the mountains is through a treacherous network of caves that are said to be haunted by the spirits of those who have perished in the mountains.`
                showStory()
                storyShown = false
            }
            setTimeout(function() {
                Troll.volume = 0.5
                Troll.play()
            }, 2000);
            break
        case "Yeti":
            setTimeout(function() {
                Yeti.volume = 0.5
                Yeti.play()
            }, 2000);
            break
        case "Harpie":
            setTimeout(function() {
                Harpie.volume = 0.5
                Harpie.play()
            }, 2000);
            break
        case "Goblin":
            setTimeout(function() {
                Goblin.volume = 0.5
                Goblin.play()
            }, 2000);
            break
        case "Grimgor":
            storyShown = true
            setTimeout(function() {
                Grimgor.volume = 0.5
                Grimgor.play()
            }, 2000);
            break
        case "Gargoyle":
            if(storyShown){
                storyTitle.textContent = `Traveling to Plains of Despair`
                storyText.textContent = `This barren wasteland is home to few creatures, but those that do live there are incredibly dangerous.
                The plains are plagued by frequent sandstorms and sudden lightning storms, making travel across them incredibly dangerous.
                The only sign of civilization is a massive castle that looms in the distance, said to be home to the source of the evil that plagues the land.`
                showStory()
                storyShown = false
            }
            setTimeout(function() {
                Gargoyle.volume = 0.5
                Gargoyle.play()
            }, 2000);
            break
        case "Zombies":
            setTimeout(function() {
                Zombies.volume = 0.5
                Zombies.play()
            }, 2000);
            break
        case "Minotaur":
            setTimeout(function() {
                Minotaur.volume = 0.5
                Minotaur.play()
            }, 2000);
            break
        case "Mummie":
            setTimeout(function() {
                Mummie.volume = 0.5
                Mummie.play()
            }, 2000);
            break
        case "Drakon":
            storyShown = true
            setTimeout(function() {
                Drakon.volume = 0.5
                Drakon.play()
            }, 2000);
            break
        case "Shadow Demon":
            if(storyShown){
                storyTitle.textContent = `Traveling to The Castle of Shadows`
                storyText.textContent = `Now, Zoltar stands at the entrance of the dark and foreboding Castle of Shadows,
                where the source of the evil lies. Armed with nothing but his trusty set of dice,
                Zoltar must defeat the dark lord and save the land from destruction.`
                showStory()
                storyShown = false
            }
            setTimeout(function() {
                ShadowDemon.volume = 0.5
                ShadowDemon.play()
            }, 2000);
            break
        case "Skeleton Knight":
            setTimeout(function() {
                SkeletonKnight.volume = 0.5
                SkeletonKnight.play()
            }, 2000);
            break
        case "Necromancer":
            setTimeout(function() {
                Necromancer.volume = 0.5
                Necromancer.play()
            }, 2000);
            break
        case "Gargantuan":
            setTimeout(function() {
                Gargantuan.volume = 0.5
                Gargantuan.play()
            }, 2000);
            break
        case "Malakar":
            setTimeout(function() {
                Malakar.volume = 0.5
                Malakar.play()
            }, 2000);
            break
    }
}


function endGame() {
    isWaiting = true
    menuMusic.volume = 0.7
    menuMusic.play()
    const endMessage = wizard.health === 0 && monster.health === 0 ?
        `After a long and grueling battle, Zoltan emerged victorious over Malakar the Dark Lord and saved the land from destruction.
        The people rejoiced and hailed him as a hero. With the evil vanquished, the world was once again filled with hope and light.
        Zoltan's name would be remembered for generations to come as the one who saved the land from darkness` :
        wizard.health > 0 ? `
        After a long and grueling battle, Zoltan emerged victorious over Malakar the Dark Lord and saved the land from destruction.
        The people rejoiced and hailed him as a hero. With the evil vanquished, the world was once again filled with hope and light.
        Zoltan's name would be remembered for generations to come as the one who saved the land from darkness.
        ` :
            `
            The battle was intense and unforgiving. Zoltan fought with all his might, but in the end, he was defeated by Malakar the Dark Lord's power.
            As he lay there, battered and broken, he knew that his journey had come to an end. The people mourned his loss and the world fell into a deep despair.
            The darkness that had been vanquished before had returned, stronger than ever.
            Zoltan's name would be remembered as a brave warrior who gave his life in the fight against evil.
            `

    const endEmoji = wizard.health > 0 ? "🔮" : "☠️"
        setTimeout(()=>{
            document.body.innerHTML = `
                <div class="end-game">
                    <h2>Game Over</h2> 
                    <h3>${endMessage}</h3>
                    <p class="end-emoji">${endEmoji}</p>
                </div>
                `
        }, 2000)
}

document.getElementById("attack-button").addEventListener('click', attack)

function render() {
    switch(monster.name) {
        case "Troll":
            if (storyShown){
                storyTitle.textContent = `Traveling to Mountains of Madness`
                storyText.textContent = `These towering mountains are home to fierce trolls and other deadly creatures. The mountain peaks are covered in snow and ice, making travel treacherous. 
                The only way to cross the mountains is through a treacherous network of caves that are said to be haunted by the spirits of those who have perished in the mountains.`
                showStory()
                storyShown = false
            }
            break
        case "Gargoyle":
            if(storyShown){
                storyTitle.textContent = `Traveling to Plains of Despair`
                storyText.textContent = `This barren wasteland is home to few creatures, but those that do live there are incredibly dangerous.
                The plains are plagued by frequent sandstorms and sudden lightning storms, making travel across them incredibly dangerous.
                The only sign of civilization is a massive castle that looms in the distance, said to be home to the source of the evil that plagues the land.`
                showStory()
                storyShown = false
            }
            break
        case "Shadow Demon":
            if(storyShown){
                storyTitle.textContent = `Traveling to The Castle of Shadows`
                storyText.textContent = `Now, Zoltar stands at the entrance of the dark and foreboding Castle of Shadows,
                where the source of the evil lies. Armed with nothing but his trusty set of dice,
                Zoltar must defeat the dark lord and save the land from destruction.`
                showStory()
                storyShown = false
            }
            break
    }
    menuMusic.pause()
    document.getElementById('hero').innerHTML = wizard.getCharacterHtml()
    document.getElementById('monster').innerHTML = monster.getCharacterHtml()
}

const wizard = new Character(characterData.hero)
let monster = getNewMonster()
render()