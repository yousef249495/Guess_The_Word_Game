
// Setting the game name
function gameName(name) {
    document.title = name
    document.querySelector("h1").textContent = name
    document.querySelector("footer").textContent = `${name} game created by Yousef`
}



function generateInput(tryNum, wordLen) {
    const inputContainer = document.querySelector(".inputs")

    // Create main try div
    for (let i = 1; i <= tryNum; i++) {
        const tryDiv = document.createElement("div")
        tryDiv.classList.add(`try-${i}`)
        tryDiv.innerHTML = `<span>life ${i}</span>`

        if (i !== 1) tryDiv.classList.add("disabled")

        // Create chars inputs
        for (let j = 1; j <= wordLen; j++) {
            const input = document.createElement("input")
            input.type = "text"
            input.id = `try-${i}-char-${j}`
            // input.placeholder = j
            input.setAttribute("maxlength", "1")

            tryDiv.appendChild(input)
        }

        // Adding to index.html
        inputContainer.appendChild(tryDiv)

        // Disable all inputs except first input
        const inputsInDisabledDiv = document.querySelectorAll(".disabled input")
        inputsInDisabledDiv.forEach((input) => { input.disabled = true })

        const inputs = document.querySelectorAll("input");
        inputs.forEach((input, index) => {

            // Convert input to uppercase
            input.addEventListener("input", function (e) {
                this.value = this.value.toUpperCase()

                const nextInput = inputs[index + 1]
                if (nextInput) nextInput.focus()
            })

            input.addEventListener("keydown", function (e) {
                // console.log(inputs);
                // console.log(e.target.value);

                const currentIndex = Array.from(inputs).indexOf(this)
                if (e.key === "ArrowRight") {
                    const nextIndex = currentIndex + 1
                    if (nextIndex < inputs.length) inputs[nextIndex].focus()
                }
                if (e.key === "ArrowLeft") {
                    const prevIndex = currentIndex - 1
                    if (prevIndex >= 0) inputs[prevIndex].focus()
                }
                if (e.key === "Backspace") {
                    const prevIndex = currentIndex - 1
                    if (prevIndex >= 0 && e.target.value === "") inputs[prevIndex].focus()
                }
            })
        })
    }

    inputContainer.children[0].children[1].focus()

    // Manege words list
    let wordToGuess = ""
    const wordList3 = ["SEA", "CAT", "SUN", "HAT"]
    const wordList5 = ["HOUSE", "PLANT", "APPLE", "WATER", "TIGER", "BREAD"]
    const wordList10 = ["BASKETBALL", "FRIENDSHIP", "TELEVISION", "MOTORCYCLE"]

    switch (wordLen) {
        case 3:
            wordToGuess = wordList3[Math.floor(Math.random() * wordList3.length)]
            break;
        case 5:
            wordToGuess = wordList5[Math.floor(Math.random() * wordList5.length)]
            break;
        case 10:
            wordToGuess = wordList10[Math.floor(Math.random() * wordList10.length)]
            break;

    }
    console.log(wordToGuess);

    let currentTry = 1
    const messageArea = document.querySelector(".message")


    // Checking inputs function
    function handleGuesses() {
        let successGuess = true

        for (let i = 1; i <= wordLen; i++) {
            const inputField = document.querySelector(`#try-${currentTry}-char-${i}`)
            const char = inputField.value.toUpperCase()
            const correctChar = wordToGuess[i - 1]

            // Game Logic
            if (correctChar === char) {
                // char is correct and in place
                inputField.className = "in-place"
            } else if (wordToGuess.includes(char) && char !== "") {
                // char is correct and not in place
                inputField.className = "not-in-place"
                successGuess = false
            } else {
                // char is not correct and not in the word
                inputField.className = "not-in-the-word"
                successGuess = false
            }
        }

        // Check if user win or lose
        if (successGuess) {
            messageArea.innerHTML = `you won and the word is <span class="win">${wordToGuess}</span>`

            // Disable all Inputs
            let allTries = document.querySelectorAll(".inputs > div")
            allTries.forEach((tryDiv) => {
                tryDiv.classList.add("disabled")
                tryDiv.disabled = true
            })

            // Disable check/guess and hint button
            guessBtn.disabled = true
            hintBtn.disabled = true

        } else {
            // Make current row work
            document.querySelector(`.try-${currentTry}`).classList.add("disabled")
            let currentTryInputs = document.querySelectorAll(`.try-${currentTry} input`)
            currentTryInputs.forEach((input) => { input.disabled = true })

            currentTry++

            // Make new row work
            let nextTry = document.querySelector(`.try-${currentTry}`)
            if (nextTry) {
                nextTry.classList.remove("disabled")
                let nextTryInputs = document.querySelectorAll(`.try-${currentTry} input`)
                nextTryInputs.forEach((input) => { input.disabled = false })

                // Focus on the first input in the new row
                nextTryInputs[0].focus()
            }


            // Print lose message
            if (currentTry > tryNum) {
                messageArea.innerHTML = `you lost and the word is <span class="lose">${wordToGuess}</span>`

                // Disable check/guess and hint button
                guessBtn.disabled = true
                hintBtn.disabled = true
            }


        }
    }

    // Checking inputs
    const guessBtn = document.querySelector(".check")
    guessBtn.addEventListener("click", handleGuesses)



    function giveUserHint() {
        const allWords = [...wordList3, ...wordList5, ...wordList10]
        const hardHints = [
            "A vast expanse of salty water, smaller than an ocean.", // sea
            "A small carnivorous mammal often kept as a pet.", // cat
            "The star at the center of our solar system.", // sun
            "An item of clothing worn on the head.", // hat
            "A building for human habitation.", // house
            "A living organism that typically grows in the earth.", // plant
            "A fruit that grows on trees.", // apple
            "A transparent, tasteless, odorless, and nearly colorless chemical substance.", // water
            "A large carnivorous feline with a distinctive coat pattern.", // tiger
            "A staple food made from flour and water and usually baked.", // bread
            "A sport played with a round ball and two hoops.", // basketball
            "A close and trusting relationship between two or more people.", // friendship
            "A device for viewing visual and audio broadcasts.", // television
            "A Means of transport." // motorcycle
        ];

        const mediumHints = [
            "Many ships travel across it, and it's home to numerous marine species.", // sea
            "It has sharp claws and is known for catching mice.", // cat
            "It provides light and warmth to Earth.", // sun
            "It can be used for fashion or protection from the sun.", // hat
            "It typically has rooms for living, cooking, and sleeping.", // house
            "It uses photosynthesis to make food from sunlight.", // plant
            "It's often red or green and is associated with the phrase 'an apple a day keeps the doctor away.'", // apple
            "It's essential for all known forms of life and makes up about 71% of the Earth's surface.", // water
            "It is known for its orange fur with black stripes.", // tiger
            "It can be sliced for sandwiches or toasted for breakfast.", // bread
            "Players score points by throwing the ball into the opponent's hoop.", // basketball
            "It involves mutual affection, trust, and support.", // friendship
            "It has channels that show programs, movies, and news.", // television
            "It's faster and more agile than a bicycle, often used for commuting or racing." // motorcycle
        ];

        const easyHints = [
            "The Mediterranean and the Caribbean are examples of this.", // sea
            "This animal says 'meow.'", // cat
            "It's the reason we have daylight.", // sun
            "People wear this on their head to keep warm in winter or cool in summer.", // hat
            "People live in this, and it has doors and windows.", // house
            "Trees, flowers, and shrubs are all examples of this.", // plant
            "This fruit was famously used by Newton to describe gravity.", // apple
            "You drink this liquid every day, and it comes from taps and bottles.", // water
            "This big cat is often featured in zoos and is the largest species of the cat family.", // tiger
            "You often spread butter or jam on this food.", // bread
            "Michael Jordan is famous for playing this sport.", // basketball
            "It's a bond you share with your best friends.", // friendship
            "You watch shows and movies on this device.", // television
            "It's a vehicle you ride on that has a motor and two wheels." // motorcycle
        ];

        console.log(hintCount);
        hintCountSpan.innerHTML = hintCount

        switch (hintCount) {
            case 3:
                hintCount--
                hintCountSpan.innerHTML = hintCount
                messageArea.innerHTML = `Hint: ${hardHints[allWords.indexOf(wordToGuess)]}`
                break;
            case 2:
                hintCount--
                hintCountSpan.innerHTML = hintCount
                messageArea.innerHTML = `Hint: ${mediumHints[allWords.indexOf(wordToGuess)]}`
                break;
            case 1:
                hintCount--
                hintCountSpan.innerHTML = hintCount
                messageArea.innerHTML = `Hint: ${easyHints[allWords.indexOf(wordToGuess)]}`
                break;
            case 0:
                messageArea.innerHTML = `No more hints`
                break;
            default:
                messageArea.innerHTML = `There are an error`
        }


    }

    // Hint input
    const hintBtn = document.querySelector(".hint")
    hintBtn.addEventListener("click", giveUserHint)

    let hintCount = wordToGuess.length === 3 ? 1 : wordToGuess.length === 5 ? 2 : 3
    const hintCountSpan = hintBtn.children[0]
    hintCountSpan.innerHTML = hintCount


}





window.onload = function () {
    // Put the game name in it's place
    gameName("guess the word (demo)")

    let tryNum, wordLen
    let form = document.forms[0]

    form.addEventListener("submit", function (e) {
        e.preventDefault()
        tryNum = +document.querySelector("form .numOfTries input").value
        wordLen = +document.querySelector("form .numOfChars select").value

        document.querySelector(".guess-game .game-area").removeChild(form)
        console.log(tryNum, wordLen);

        document.querySelector(".guess-game .game-area").innerHTML = ` 
            <div class="inputs"></div>
            <div class="control">
                <button class="check">Check Word</button>
                <button class="hint"><span></span> Hint</button>
            </div>
            <div class="message">
                <span></span>
                <p>To know the same letter could be more than one in the same word or not</p>
            </div>`

        generateInput(tryNum, wordLen)


    })



}



