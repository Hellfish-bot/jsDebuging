// DEFINING VARIABLES TO ACCESS DATA

// Initialization of arrays and variables:

const colors = ['red', 'blue', 'green', 'purple', 'orange', 'pink', 'red', 'blue', 'green', 'purple', 'orange', 'pink'];
let cards = shuffle(colors.concat(colors));
let selectedCards = [];
let score = 0;
let timeLeft = 30;
let gameInterval;

// DOM element selection:

const startbtn = document.getElementById('startbtn');
const gameContainer = document.getElementById('game-container');
const scoreElement = document.getElementById('score');
const timerElement = document.getElementById('timer');

// CREATE AND CALL FUNCTIONS TO START THE GAME

// Create the generateCards() function responsible for dynamically creating the card elements within the game container based on the cards array that holds color values for the cards.
// This function creates the card elements dynamically within the game-container div. Include given code in javaScript file after previous code.

function generateCards() {
    for (const color of cards) {    // a 'for…of' loop to iterate over each element (color) in the 'cards' array.
        const card = document.createElement('div'); // it creates a new HTML div element using document.createElement('div'). This 'div' element represents a card in the game.
        card.classList.add('card'); // It adds a class 'card' to the newly created 'div' element using card.classList.add('card'). This class might contain CSS styles or rules to style the card elements.
        card.dataset.color = color; // It sets the 'dataset.color' attribute of the card element to the current color value from the 'cards' array. This icon represents the card's hidden color until the player clicks it.
        card.textContent = '?'; // The text content of each card is initially set to a question mark ('?') using the card.textContent = '?'. This represents that the color of the card is hidden until it's clicked by the player.
        gameContainer.appendChild(card);    // the newly created card element is attached to the 'gameContainer' element as a child. This action adds each card element to the game interface within the designated container.
    }
}

// The shuffle() Function is responsible for shuffling the elements of an array in random order.

function shuffle(array) {   // Array parameter: It takes an array as an argument, which contains yet to be shuffled elements.
    for (let i = array.length - 1; i > 0; i--) {    // Shuffling process using loop through the array: The function starts by initiating a 'for' loop that iterates backward through the array starting from the last index
        const j = Math.floor(Math.random() * (i + 1));  // Random index selection: Within each iteration, it generates a random index 'j' using Math.floor(Math.random() * (i + 1)). This 'j' represents a random index within the array.
        [array[i], array[j]] = [array[j], array[i]];    // Swapping elements: It then swaps the elements at the 'i' and 'j' indices using array destructuring assignment: [array[i], array[j]] = [array[j], array[i]]. This line efficiently swaps the values at positions 'i' and 'j' without requiring a temporary variable.
    }
    return array;   // Returning the shuffled array: Once the loop is complete, the function returns the array with its elements rearranged into a random order.
}

// The handleCardClick(event) function manages the logic when a user clicks the card in the memory match game.

function handleCardClick(event) {
    // Event Target using const card = event.target;: 
    const card = event.target;  // This line retrieves the element that triggered the event (in this case, a clicked card) and assigns it to the 'card' variable.
    
    // Checking the card: 
    if (!card.classList.contains('card') || card.classList.contains('matched')) {   // if (!card.classList.contains('card') || card.classList.contains('matched')) { return; } This 'if' statement checks whether the clicked element is a card and if it's already matched. If either condition is true:
        return; // If the element is not a card or has already matched, the function returns early, ignoring any further actions for this particular click.
    }

    // Revealing the card:
    card.textContent = card.dataset.color;  // card.textContent = card.dataset.color;: It sets the text content of the clicked card to the value stored in its 'dataset.color'. This action reveals the card's color by changing the text content to the color value.
    card.style.backgroundColor = card.dataset.color;    // card.style.backgroundColor = card.dataset.color;: Changes the card's background color to match the revealed color.
    
    // Handling selected cards:
    selectedCards.push(card);   // selectedCards.push(card);: Adds the clicked card to the 'selectedCards' array, indicating that it's one of the cards currently chosen by the player.
    
    // Checking for matches:
    if (selectedCards.length === 2) {   // Checks if two cards have been selected. If two cards have been chosen, it uses 'setTimeout()' to delay the execution of the 'checkMatch()' function by 500 milliseconds. This brief delay allows the player to see both selected cards before their comparison briefly.
        setTimeout(checkMatch, 500);
    }
}

// The checkMatch() function evaluates whether the two selected cards match each other in the memory match game.

function checkMatch() {
    // Destructuring selected cards: 
    const [card1, card2] = selectedCards;   // This line uses array destructuring to assign the first two elements of the 'selectedCards' array to 'card1' and 'card2'. These variables represent the two cards selected by the player for comparison.
    
    // Comparing card colors: 
    if (card1.dataset.color === card2.dataset.color) {  // This checks if the color value stored in the 'dataset.color' attribute of 'card1' matches the color value of 'card2'.
        card1.classList.add('matched'); // If the colors match: It adds the class 'matched' to both cards using 'classList.add('matched')', marking them as matched pairs in the game.
        card2.classList.add('matched');
        score += 2; // Increases the 'score' by 2 points, as the player successfully matched a pair.
        scoreElement.textContent = `Score: ${score}`;   // Updates the 'scoreElement.textContent' to display the updated score to the player.
    } else {
        // Handling non-matching cards:
        card1.textContent = '?';    // If the colors of the two selected cards don't match, it resets the text content of both cards to a question mark ('?'), hiding their colors again.
        card2.textContent = '?';
        card1.style.backgroundColor = '#ddd';   // Sets the background color of both cards to a default color ('#ddd'), providing a visual cue that the selected cards didn't match.
        card2.style.backgroundColor = '#ddd';
    }

    // Resetting selection:
    selectedCards = []; // It clears the 'selectedCards' array to reset it for the next set of card selections. This action ensures the player can select two new cards after the comparison.
}

// The startGame() Function is a pivotal part of initializing and starting the memory match game.

function startGame() {
    // Setting intitial game
    let timeLeft = 30;  // Initializes the 'timeLeft' variable to 30 seconds, setting the duration for the game.
    startbtn.disabled = true;   // Disables the 'startbtn' button to prevent multiple game initiations simultaneously, ensuring one game is in progress at a time.
    score = 0; // Disables the 'startbtn' button to prevent multiple game initiations simultaneously, ensuring one game is in progress at a time.
    scoreElement.textContent = `Score: ${score}`;   // Updates the displayed score to show that it's reset to zero for the new game.
    
    // Starting the game timer
    startGameTimer(timeLeft);   // Initiates the game timer, counting down from the specified 'timeLeft' duration.
    
    // Preparing cards and game elements
    cards = shuffle(colors.concat(colors)); // Shuffles the 'colors' array and duplicates it to create pairs for the game cards.
    selectedCards = []; // Clears the 'selectedCards' array to prepare for new card selections in the upcoming game.
    gameContainer.innerHTML = '';   // Clears the game container, removing any existing cards from previous games.
    generateCards();    // Generates a new set of cards within the game container by calling the 'generateCards()' function, creating a fresh game layout for the player.
    
    // Enabling card click event
    gameContainer.addEventListener('click', handleCardClick);   // Adds an event listener to the game container, enabling card clicks and triggering the 'handleCardClick()' function to manage the gameplay when cards are clicked.
}

// The startGameTimer(timeLeft) function manages the game timer, updating the displayed time and handling the end of the game when the timer reaches zero.

function startGameTimer(timeLeft) {

    // Initial display:
    timerElement.textContent = `Time Left: ${timeLeft}`;    // Sets the initial display of the timer to show the 'timeLeft' value, indicating the starting time remaining for the game.
    
    // Interval setup:
    gameInterval = setInterval(() => {  // Initiates an interval that triggers a function every second (1000 milliseconds) to update the timer.
        
        // Countdown:
        timeLeft--; // Decrements the 'timeLeft' variable every second within the interval, simulating the countdown by reducing the remaining time.
        
        // Updating displayed time:
        timerElement.textContent = `Time Left: ${timeLeft}`;    // Updates the displayed time on the HTML element ('timerElement') to reflect the updated 'timeLeft' value after each decrement.

        // End of game:
        if (timeLeft === 0) {   // Checks if the remaining time reaches zero.
            clearInterval(gameInterval);    // Stops the interval, effectively ending the timer from counting down further.
            let timeLeft = 30;  // This line is redundant as it re-declares 'timeLeft' within the scope of this block, resetting it to 30, but it does not affect the 'timeLeft' used in the interval.
            alert('Game Over!');    // Displays an alert indicating that the game is over because the time limit has been reached.
            startbtn.disabled = false;  // Re-enables the 'startbtn' button, allowing the player to start a new game after the current one has ended.
        }
    }, 1000);
}

// Event listeners: To listen, click event startbtn adds an event listener to the 'startbtn' element, triggering the 'startGame' function when the button is clicked

startbtn.addEventListener('click', startGame);