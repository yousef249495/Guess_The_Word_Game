
// document.addEventListener("keydown", (e) => {
//     console.log(e.key)
// })


window.onload = function () {
    // Put the game name in it's place
    gameName("guess the word", "1.5")

    let startBtn = document.querySelector(".start-btn")

    startBtn.addEventListener("click", function () {
        document.querySelector(".guess-game .game-area").innerHTML = ` 
            <form>
                <div class="numOfTries">
                    <label for="numOfTries">How much life do you want in this game (1 - 10)</label>
                    <input id="numOfTries" type="number" max="10" min="1" autofocus required>
                </div>
                <div class="numOfChars">
                    <label for="numOfChars">how long of every life </label>
                    <select id="numOfChars">
                        <option value="3">3 litters</option>
                        <option value="5">5 litters</option>
                        <option value="10">10 litters</option>
                    </select>
                </div>
                <div class="check-before-play">
                    <input type="checkbox" id="hint-acknowled-check" name="hint-acknowled">
                    <label for="hint-acknowled-check">Do you acknowledge that: (long 3 = 1 hint), (long 5 = 2 hint), (long 10 = 3 hint)</label>
                </div>
                <input type="submit" value="Save">
            </form>
            `

        checksRequirements()
    })

}

// Setting the game name
function gameName(name, verision) {
    document.title = name
    document.querySelector("h1").textContent = name
    document.querySelector("h2 span").textContent = name
    document.querySelector("footer").innerHTML = `${name} game created by Yousef<span>verision: ${verision}</span>`
}

function checksRequirements() {
    // Form section 
    let form = document.forms[0]
    const hintAcknowled = document.querySelector("#hint-acknowled-check")

    form.addEventListener("submit", function (e) {
        e.preventDefault()

        if (hintAcknowled.checked) {
            const tryNum = +document.querySelector("form .numOfTries input").value
            const wordLen = +document.querySelector("form .numOfChars select").value

            document.querySelector(".guess-game .game-area").innerHTML = ` 
                <div class="inputs"></div>
                <div class="control">
                    <button class="check">Check Word</button>
                    <button class="hint"><span></span> Hint</button>
                </div>
                `

            generateInput(tryNum, wordLen)
        } else {
            const hintAcknowledDiv = document.querySelector(".check-before-play")
            hintAcknowledDiv.innerHTML = `                    
                    <p style="color:red;"> please check this condition</p>
                    <input type="checkbox" id="hint-acknowled-check" name="hint-acknowled">
                    <label for="hint-acknowled-check">You acknowled about: (long 3 = 1 hint), (long 5 = 2 hint), (long 10 = 3 hint)</label>
                    `
            checksRequirements()
        }

    })
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

        // Adding parent div of inputs to index.html
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
    const wordList3 = ['SEA', 'CAT', 'SUN', 'HAT', 'BAT',
        'DOG', 'RUN', 'NET', 'CUP', 'BOX',
        'JAM', 'MAP', 'PEN', 'CAP', 'FAN',
        'ANT', 'FOX', 'JAR', 'PIG', 'OWL']
    const wordList5 = ['HOUSE', 'PLANT', 'APPLE', 'WATER', 'TIGER',
        'BREAD', 'CHAIR', 'TABLE', 'GRAPE', 'SHIRT',
        'LIGHT', 'BRUSH', 'MATCH', 'SNAKE', 'SHELF',
        'PLANE', 'CANDY', 'DREAM', 'SWEET', 'STONE']
    const wordList10 = ['BASKETBALL', 'FRIENDSHIP', 'TELEVISION', 'MOTORCYCLE', 'ADVERTISEMENT',
        'MANUFACTURER', 'BOOKKEEPING', 'PHOTOGRAPHY', 'LITERATURE', 'SUPERVISOR',
        'GENEROSITY', 'ASTRONAUTS', 'IMAGINATION', 'CARPENTER', 'CHOCOLATES',
        'LEADERSHIP', 'COMPETITOR', 'RELATIONSHIP', 'CONTROLLER', 'PUBLICATION']

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

    let currentTry = 1
    const messageArea = document.querySelector(".message")

    // Print word description
    const allWords = [...wordList3, ...wordList5, ...wordList10]
    console.log(allWords);
    const startHints = [
        "It's often associated with tides and waves.", // SEA
        "A feline animal often seen as a pet and known for its agility.", // CAT
        "The main source of energy for life on Earth.", // SUN
        "A head accessory that can be made of various materials like wool or cotton.", // HAT
        "A piece of sports equipment also associated with vampires in folklore.", // BAT
        "A loyal companion, often trained for various tasks.", // DOG
        "A form of exercise that increases heart rate and endurance.", // RUN
        "A woven fabric device used in sports like tennis and volleyball.", // NET
        "A small container used in many cultures for drinking.", // CUP
        "A durable container often used for shipping or storage.", // BOX
        "A fruit preserve that pairs well with peanut butter.", // JAM
        "Often used by explorers and travelers to navigate unfamiliar territory.", // MAP
        "Commonly found in offices and schools, used for writing.", // PEN
        "Commonly associated with sports teams and casual wear.", // CAP
        "An electrical appliance used to circulate air.", // FAN
        "An insect known for its strength relative to its size.", // ANT
        "Often depicted as clever and sly in stories.", // FOX
        "A storage container that can hold pickles, jams, or other preserves.", // JAR
        "A farm animal that wallows in mud to stay cool.", // PIG
        "A bird often symbolizing wisdom in mythology.", // OWL
        "A structure that provides shelter and living space for a family.", // HOUSE
        "A living organism that absorbs water and nutrients through its roots.", // PLANT
        "A common fruit that is often associated with teachers.", // APPLE
        "A liquid essential for hydration and life, covering about 71% of Earth's surface.", // WATER
        "A large wild cat with distinctive orange and black stripes.", // TIGER
        "A staple food item that comes in various forms such as loaves, rolls, and baguettes.", // BREAD
        "A piece of furniture with a backrest and four legs.", // CHAIR
        "A flat surface supported by legs, used for dining or working.", // TABLE
        "A small, round, and often purple fruit that grows in clusters.", // GRAPE
        "An upper body garment typically with a collar and buttons.", // SHIRT
        "A source of artificial illumination in homes and offices.", // LIGHT
        "An implement with bristles, used for grooming or cleaning.", // BRUSH
        "A small stick coated with a chemical substance that ignites when struck.", // MATCH
        "A limbless reptile that moves by slithering.", // SNAKE
        "A flat surface attached to a wall for holding objects.", // SHELF
        "A vehicle designed for air travel with wings and engines.", // PLANE
        "A confectionery item often given as a treat or reward.", // CANDY
        "A succession of images or events that occurs during sleep.", // DREAM
        "A word often used to describe confections and desserts.", // SWEET
        "A naturally occurring solid material from the earth's crust.", // STONE
        "A sport where players try to score by shooting a ball through a hoop.", // BASKETBALL
        "A relationship based on mutual affection and trust.", // FRIENDSHIP
        "A device for viewing moving pictures and sound.", // TELEVISION
        "A two-wheeled vehicle powered by an engine.", // MOTORCYCLE
        "A public notice designed to promote products, services, or events.", // ADVERTISEMENT
        "An entity that produces goods on a large scale for sale.", // MANUFACTURER
        "The activity of recording financial transactions systematically.", // BOOKKEEPING
        "The practice or profession of taking and processing photographs.", // PHOTOGRAPHY
        "Written works, especially those considered of superior or lasting artistic merit.", // LITERATURE
        "A person who directs and oversees the work of others.", // SUPERVISOR
        "The quality of being unselfish and willing to give.", // GENEROSITY
        "Individuals trained to travel and work in space.", // ASTRONAUTS
        "The ability to create mental images or concepts beyond reality.", // IMAGINATION
        "A craftsman who works with wood, often constructing buildings or furniture.", // CARPENTER
        "Sweet edible treats made from cacao beans.", // CHOCOLATES
        "The ability to lead and direct others effectively.", // LEADERSHIP
        "An adversary in a competitive activity or sport.", // COMPETITOR
        "A significant connection or association between people.", // RELATIONSHIP
        "A device that manages or regulates the operation of a machine or system.", // CONTROLLER
        "The act of producing and distributing printed or digital material.", // PUBLICATION
    ];
    const p = document.createElement("p")
    p.innerHTML = `word discription: ${startHints[allWords.indexOf(wordToGuess)]}`
    messageArea.appendChild(p)

    let stopSpamingHintBtn = 4

    function giveUserHint() {
        const hardHints = [
            "A vast expanse of salty water, smaller than an ocean.", // SEA
            "A small carnivorous mammal often kept as a pet.", // CAT
            "The star at the center of our solar system.", // SUN
            "An item of clothing worn on the head.", // HAT
            "A solid or hollow cylinder, usually made of wood, used in sports.", // BAT
            "A domesticated mammal known for its loyalty.", // DOG
            "To move swiftly on foot.", // RUN
            "A mesh used to catch or enclose.", // NET
            "A small, open container for drinking.", // CUP
            "A container with flat sides and a lid, used for storage.", // BOX
            "A thick fruit preserve.", // JAM
            "A representation of geographical area.", // MAP
            "A writing instrument using ink.", // PEN
            "A soft, flat hat with a brim and sometimes a visor.", // CAP
            "A device for creating air flow.", // FAN
            "A small insect that can carry many times its own weight.", // ANT
            "A small, omnivorous mammal with a bushy tail.", // FOX
            "A cylindrical container with a lid.", // JAR
            "A domesticated, pig-like animal raised for meat.", // PIG
            "A nocturnal bird of prey with a large head.", // OWL
            "A residential building.", // HOUSE
            "A living organism that grows in soil and converts sunlight into energy.", // PLANT
            "A round fruit that grows on trees.", // APPLE
            "A chemical compound consisting of hydrogen and oxygen.", // WATER
            "A large feline predator with a striped coat.", // TIGER
            "A staple food made from dough and baked.", // BREAD
            "A piece of furniture for one person to sit on.", // CHAIR
            "A piece of furniture with a flat surface supported by legs.", // TABLE
            "A small, round fruit growing in clusters.", // GRAPE
            "An article of clothing for the upper body.", // SHIRT
            "A device that produces artificial illumination.", // LIGHT
            "An implement with bristles used for cleaning or grooming.", // BRUSH
            "A small stick that ignites when struck.", // MATCH
            "A legless reptile.", // SNAKE
            "A flat, horizontal surface attached to a wall for storage.", // SHELF
            "A flying vehicle with fixed wings.", // PLANE
            "A sweet confectionery item.", // CANDY
            "A series of images or events experienced during sleep.", // DREAM
            "Something pleasant and sugary.", // SWEET
            "A hard, naturally occurring mineral.", // STONE
            "A sport involving shooting a ball through a hoop.", // BASKETBALL
            "A relationship marked by mutual affection.", // FRIENDSHIP
            "A device for watching visual content.", // TELEVISION
            "A motor-powered vehicle with two wheels.", // MOTORCYCLE
            "A public announcement promoting goods or services.", // ADVERTISEMENT
            "A company that produces goods in large quantities.", // MANUFACTURER
            "The recording of financial transactions.", // BOOKKEEPING
            "The practice or art of capturing images with a camera.", // PHOTOGRAPHY
            "Written works considered to have high artistic merit.", // LITERATURE
            "A person who oversees the work of others.", // SUPERVISOR
            "The willingness to give or share freely.", // GENEROSITY
            "People trained for space travel.", // ASTRONAUTS
            "The power to create new ideas or images in the mind.", // IMAGINATION
            "A skilled tradesperson who works with wood.", // CARPENTER
            "Sweet confections made from cocoa beans.", // CHOCOLATES
            "The capacity to lead and influence others.", // LEADERSHIP
            "A rival or challenger in a contest.", // COMPETITOR
            "A bond or connection between individuals or groups.", // RELATIONSHIP
            "A mechanism or device that regulates or manages something.", // CONTROLLER
            "The act of making content available to the public.", // PUBLICATION
        ];

        const mediumHints = [
            "Many ships travel across it, and it's home to numerous marine species.", // SEA
            "It has sharp claws and is known for catching mice.", // CAT
            "It provides light and warmth to Earth.", // SUN
            "It can be used for fashion or protection from the sun.", // HAT
            "Commonly used in the sport of baseball to hit the ball.", // BAT
            "A common pet known for its loyalty and barking.", // DOG
            "You do this to move quickly on your feet.", // RUN
            "Often used in sports to catch or block objects.", // NET
            "A small, handle-less drinking vessel.", // CUP
            "Used for storing items, often made of cardboard or wood.", // BOX
            "Often spread on bread; can be made from strawberries.", // JAM
            "A diagram representing an area with streets and landmarks.", // MAP
            "An instrument for writing or drawing with ink.", // PEN
            "A soft hat with a visor.", // CAP
            "Produces air flow and can be electric or manual.", // FAN
            "A small insect known for its strength and colony behavior.", // ANT
            "A cunning animal often depicted in stories and folklore.", // FOX
            "A container typically used for storing food or other items.", // JAR
            "A pink farm animal known for its curly tail.", // PIG
            "A nocturnal bird known for its distinctive hooting call.", // OWL
            "A building designed for people to live in.", // HOUSE
            "An organism that grows in soil and performs photosynthesis.", // PLANT
            "A fruit that can be red, green, or yellow and is often eaten raw or used in pies.", // APPLE
            "A transparent, colorless liquid essential for life.", // WATER
            "A large, striped feline predator found in Asia.", // TIGER
            "A staple food made from flour, water, and yeast.", // BREAD
            "A common piece of furniture with four legs used for sitting.", // CHAIR
            "A piece of furniture with a flat top used for eating, writing, or working.", // TABLE
            "A small, juicy fruit that grows in clusters on vines.", // GRAPE
            "A garment worn on the upper body, typically with buttons and a collar.", // SHIRT
            "A device that provides illumination, commonly found in homes.", // LIGHT
            "A tool with bristles used for cleaning or styling.", // BRUSH
            "A small stick that can be struck to create a flame.", // MATCH
            "A reptile with no legs that slithers on the ground.", // SNAKE
            "A horizontal surface for storing items, often attached to a wall.", // SHELF
            "A flying vehicle used for transportation over long distances.", // PLANE
            "A sweet food often enjoyed as a treat, especially by children.", // CANDY
            "An experience you have while sleeping, often involving vivid images or events.", // DREAM
            "A term often used to describe something sugary or delightful.", // SWEET
            "A solid mineral material found in nature, often used for building.", // STONE
            "A sport where players try to score points by throwing a ball through a hoop.", // BASKETBALL
            "A close and caring relationship between people who care about each other.", // FRIENDSHIP
            "An electronic device used for viewing broadcast or streamed content.", // TELEVISION
            "A two-wheeled vehicle powered by an engine, often used for transportation or racing.", // MOTORCYCLE
            "A public notice or announcement promoting a product, service, or event.", // ADVERTISEMENT
            "A business or entity that produces goods for sale.", // MANUFACTURER
            "The activity of maintaining financial records and accounts.", // BOOKKEEPING
            "The art or practice of capturing images using a camera.", // PHOTOGRAPHY
            "Written works, especially those considered to have artistic or intellectual value.", // LITERATURE
            "A person who manages and oversees the work of others.", // SUPERVISOR
            "The quality of being kind and willing to give or share.", // GENEROSITY
            "Professionals who travel and work in space.", // ASTRONAUTS
            "The power to create ideas, pictures, or objects in your mind.", // IMAGINATION
            "A tradesperson who builds and repairs wooden structures.", // CARPENTER
            "Sweet treats made from cocoa, often given as gifts.", // CHOCOLATES
            "The ability to guide and influence others.", // LEADERSHIP
            "A person or entity that takes part in a contest or competition.", // COMPETITOR
            "A close connection between people, such as a family tie or friendship.", // RELATIONSHIP
            "A device used to manage or operate something.", // CONTROLLER
            "The process of producing and distributing printed material or content.", // PUBLICATION
        ];

        const easyHints = [
            "The Mediterranean and the Caribbean are examples of this.", // SEA
            "This animal says 'meow.'", // CAT
            "It's the reason we have daylight.", // SUN
            "People wear this on their head to keep warm in winter or cool in summer.", // HAT
            "It's used by athletes to hit a ball in baseball.", // BAT
            "This animal says 'woof.'", // DOG
            "What you do when you move quickly on foot.", // RUN
            "Used to catch fish or butterflies.", // NET
            "You drink from this small container.", // CUP
            "A square or rectangular container used for storage.", // BOX
            "A sweet spread made from fruit.", // JAM
            "Used to find your way; often shows streets and landmarks.", // MAP
            "A tool used for writing or drawing with ink.", // PEN
            "Another word for a hat.", // CAP
            "Used to cool down in warm weather.", // FAN
            "A small insect that lives in colonies.", // ANT
            "A wild animal known for its cunning and reddish fur.", // FOX
            "A glass container with a lid.", // JAR
            "A farm animal that says 'oink.'", // PIG
            "A bird that can turn its head almost completely around.", // OWL
            "People live in this, and it has doors and windows.", // HOUSE
            "Trees, flowers, and shrubs are all examples of this.", // PLANT
            "This fruit was famously used by Newton to describe gravity.", // APPLE
            "You drink this liquid every day, and it comes from taps and bottles.", // WATER
            "This big cat is often featured in zoos and is the largest species of the cat family.", // TIGER
            "You often spread butter or jam on this food.", // BREAD
            "A piece of furniture you sit on.", // CHAIR
            "A piece of furniture you eat at or work on.", // TABLE
            "A small, round fruit that grows in bunches.", // GRAPE
            "A piece of clothing worn on the upper body.", // SHIRT
            "It brightens a room; can be found in lamps or ceilings.", // LIGHT
            "A tool used for grooming hair or cleaning teeth.", // BRUSH
            "A small stick that can create a flame.", // MATCH
            "A long, legless reptile.", // SNAKE
            "A place to store books or other items.", // SHELF
            "A vehicle with wings that flies in the sky.", // PLANE
            "A sweet treat often enjoyed by children.", // CANDY
            "What you experience while you sleep.", // DREAM
            "Another word for a treat or dessert.", // SWEET
            "A small piece of rock.", // STONE
            "Michael Jordan is famous for playing this sport.", // BASKETBALL
            "It's a bond you share with your best friends.", // FRIENDSHIP
            "You watch shows and movies on this device.", // TELEVISION
            "It's a vehicle you ride on that has a motor and two wheels.", // MOTORCYCLE
            "A visual notice used to promote products or services.", // ADVERTISEMENT
            "A company that makes goods for sale.", // MANUFACTURER
            "The practice of keeping financial records.", // BOOKKEEPING
            "The art or practice of taking and processing photographs.", // PHOTOGRAPHY
            "Written works considered to have artistic or intellectual value.", // LITERATURE
            "A person who oversees and manages others.", // SUPERVISOR
            "The quality of being kind and giving.", // GENEROSITY
            "People trained to travel and work in space.", // ASTRONAUTS
            "The ability to form new ideas or images.", // IMAGINATION
            "A skilled worker who makes or repairs wooden objects.", // CARPENTER
            "Sweet treats made from cocoa.", // CHOCOLATES
            "The ability to guide or direct others.", // LEADERSHIP
            "A person or group that competes.", // COMPETITOR
            "A connection between people or entities.", // RELATIONSHIP
            "A device used to control or manage something.", // CONTROLLER
            "The process of issuing printed or digital material.", // PUBLICATION
        ];

        hintCountSpan.innerHTML = hintCount

        if (stopSpamingHintBtn > 0) {
            switch (hintCount) {
                case 3:
                    hintCount--
                    hintCountSpan.innerHTML = hintCount
                    const p3 = document.createElement("p")
                    p3.innerHTML = `Hint 1: ${hardHints[allWords.indexOf(wordToGuess)]}`
                    messageArea.appendChild(p3)
                    break;
                case 2:
                    hintCount--
                    hintCountSpan.innerHTML = hintCount
                    const p2 = document.createElement("p")
                    p2.innerHTML = `Hint 2: ${mediumHints[allWords.indexOf(wordToGuess)]}`
                    messageArea.appendChild(p2)
                    break;
                case 1:
                    hintCount--
                    hintCountSpan.innerHTML = hintCount
                    const p1 = document.createElement("p")
                    p1.innerHTML = `Hint 3: ${easyHints[allWords.indexOf(wordToGuess)]}`
                    messageArea.appendChild(p1)
                    break;
                case 0:
                    if (stopSpamingHintBtn === 1) {
                        const stopSpamMsg = document.createElement("p")
                        stopSpamMsg.innerHTML = `stop spaming!!!`
                        messageArea.appendChild(stopSpamMsg)
                        stopSpamingHintBtn--
                    } else {
                        const p0 = document.createElement("p")
                        p0.innerHTML = `No more hints`
                        messageArea.appendChild(p0)
                        stopSpamingHintBtn--
                    }
                    break;
                default:
                    messageArea.innerHTML = `There are an error`
            }
        }


    }

    // Hint input
    const hintBtn = document.querySelector(".hint")
    hintBtn.addEventListener("click", giveUserHint)

    // hint count
    let hintCount = wordToGuess.length === 3 ? 1 : wordToGuess.length === 5 ? 2 : 3
    const hintCountSpan = hintBtn.children[0]
    hintCountSpan.innerHTML = hintCount


    // Checking inputs function, during and after
    function handleGuesses() {
        // restart the game button
        let restartBtn = document.createElement("button")
        restartBtn.textContent = "restart the game"
        restartBtn.className = "restart"

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

            // adding restart button
            document.querySelector(".guess-game .user-help").appendChild(restartBtn)

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

                // adding restart button
                document.querySelector(".guess-game .user-help").appendChild(restartBtn)
            }

        }

        // refresh the page on the end
        restartBtn.addEventListener("click", () => location.reload())

    }

    // Checking inputs
    const guessBtn = document.querySelector(".check")
    guessBtn.addEventListener("click", handleGuesses)



}









