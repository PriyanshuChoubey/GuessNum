let randomNum = parseInt((Math.random()*100)+1)

const submit = document.querySelector('#subt')
const userInput = document.querySelector('#guessField')
const guessSlot = document.querySelector('.guesses')
const remaining = document.querySelector('.lastResult')
const lowOrhi = document.querySelector('.lowOrHi')
const startOver = document.querySelector('.resultParas')

const p = document.createElement('p')

let prevGuess = []
let numGuess =1
let playGame = true

if(playGame){
    submit.addEventListener('click', function(e){
        e.preventDefault()
        const guess = parseInt(userInput.value)
        validateGuess(guess)

    })
}

function validateGuess(guess){
    //check for validation of guesses made i.e guess within 100 or not
    if(isNaN(guess))
    {
        alert("Please enter a valid number!")
    }
    else if(guess<1)
    {
        alert("Please enter a number greater than 0!")
    }else if(guess>100)
    {
        alert("Please enter a number less than 100!")
    }
    else{
        prevGuess.push(guess)
        if(numGuess > 10)
        {
            displayGuess(guess)
            displayMsg(`Game Over! Correct Answer = ${randomNum}`)
            endGame()
        }
        else{
            displayGuess(guess)
            checkGuess(guess)
        }
    }
}

function checkGuess(guess){
    //it checks low or high or equals to random num or not(based on validateGuess output)
    if(guess === randomNum)
    {
        displayMsg(`You guessed correctly!`)
        endGame()
    }else if(guess<randomNum){
        displayMsg(`Increase the guessed number!`)
    }else if(guess>randomNum){
        displayMsg(`Decrease the guessed number!`)
    }
}

function displayGuess(guess){
    //it will display the number of guesses made
    //decrement the attempts
    //clear the input field for next input

    userInput.value = ""
    guessSlot.innerHTML += `${guess} `
    numGuess++;
    remaining.innerHTML = `${11-numGuess}`
}

function displayMsg(msg){
    //display the message based on checkGuess() output
    lowOrhi.innerHTML= `<h2>${msg}</h2>`
}


function endGame(){
    userInput.value = ''
    userInput.setAttribute('disabled','')   //so that user can't submit anymore values
    p.classList.add('button')
    p.innerHTML = `<h2 id="newGame">Start new Game</h2>`;
    startOver.appendChild(p)
    playGame= false
    newGame();
}

function newGame(){
    //restarting the game and reseting the whole variables
    const newGameButton = document.querySelector('#newGame')
    newGameButton.addEventListener('click', function(e){
        randomNum = parseInt((Math.random()*100)+1);
        prevGuess = []
        numGuess = 1
        guessSlot.innerHTML = ''
        remaining.innerHTML = `${11-numGuess} `;
        userInput.removeAttribute('disabled')
        startOver.removeChild(p)
        playGame = true        
    });
}