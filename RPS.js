let us = 0;
let cs = 0;

let userscore=0;
let compscore=0;

const userscorePara=document.querySelector("#you");
const comscorePara=document.querySelector("#com");

let sym = document.querySelectorAll(".hand");
let comHand = {
    rock: document.getElementById("com-rock"),
    paper: document.getElementById("com-paper"),
    scissors: document.getElementById("com-scissors")
};
let msg=document.querySelector("#msg");

// Elements to display the results
let exhand = document.getElementById("exhand");
let excomhand = document.getElementById("excomhand");

// Map choices to their corresponding image paths
const imagePaths = {
    rock: "rock.jpeg",
    paper: "paper.png",
    scissors: "scissors.png"
};

// Function to generate a random computer choice
const genComCho = () => {
    const str = ["rock", "paper", "scissors"];
    const randomIdx = Math.floor(Math.random() * 3);
    return str[randomIdx];
};

// Function to reset animation
const resetAnimation = (element) => {
    element.style.animation = "none";  // Reset the animation
    element.offsetHeight;              // Trigger a reflow, flushing the CSS changes
    element.style.animation = "";      // Reapply the animation
};

// Function to update the result display with the selected image
const updateResultDisplay = (userChoice, compChoice) => {
    // Update the user choice display with the correct image
    exhand.innerHTML = `<img src="${imagePaths[userChoice]}" alt="${userChoice}" style="width:100%; height:100%;">`;
    
    // Update the computer choice display with the correct image
    excomhand.innerHTML = `<img src="${imagePaths[compChoice]}" alt="${compChoice}" style="width:100%; height:100%;">`;
};

const drawGame=()=>{
    console.log("game is draw");
    msg.querySelector("#p").innerText="Its a draw try again :(";
    msg.querySelector("#p").style.background="orange";
}

const showwin=(userwin,userChoice,compChoice)=>{
    if(userwin){//userwin==true
        userscore++;
        userscorePara.innerText=userscore;
        console.log("user is win ");
        msg.querySelector("#p").innerText=`you win! your ${userChoice} beats ${compChoice}`;
        msg.querySelector("#p").style.background="green";
    }
    else{
        compscore++;
        comscorePara.innerText=compscore;
        console.log("computer wins");
        msg.querySelector("#p").innerText=`you lose :) ${compChoice} beats your ${userChoice}`;
        msg.querySelector("#p").style.background="red";
    }
}
// Function to play the game
const playgame = (userChoice) => {
    console.log(`User choice = ${userChoice}`);
    const compChoice = genComCho();
    console.log(`Comp choice = ${compChoice}`);

    // Reset animation and apply to the computer's choice button
    const currentComButton = comHand[compChoice];
    resetAnimation(currentComButton);
    currentComButton.classList.add("drop-animation");

    // Update the result display with both choices
    updateResultDisplay(userChoice, compChoice);

    if(userChoice==compChoice){
        drawGame();//draw game
    }
    else{
        let userwin=true;
        if(userChoice==="rock"){
            userwin=compChoice==="paper"?false:true;
        }
        else if(userChoice==="paper"){
            userwin=compChoice==="rock"?true:false;
        }
        else{
            userwin=compChoice==="rock"?false:true;
        }
        showwin(userwin,userChoice,compChoice);
    }
};
// Add event listeners to the user buttons
sym.forEach((b) => {
    b.addEventListener("click", () => {
        const userChoice = b.getAttribute("id");
        console.log(`Button was clicked: ${userChoice}`);

        // Apply green border color and drop animation to the clicked button
        resetAnimation(b);  // Reset and reapply the drop animation
        b.classList.add("drop-animation");

        // Play the game
        playgame(userChoice);
    });
});
// Function to reset the game
const resetGame = () => {
    // Reset user and computer scores to 0
    userscore = 0;
    compscore = 0;

    // Reset displayed scores
    document.getElementById("you").innerText = userscore;
    document.getElementById("com").innerText = compscore;
    
    // Clear the result displays
    exhand.innerHTML = "";
    excomhand.innerHTML = "";
    
    // Reset the message
    msg.querySelector("#p").innerText = "Play your Move";
    msg.querySelector("#p").style.background = "rgba(165, 42, 42, 0.644)";
    
    console.log("Game has been reset.");
};
// Add event listener to the reset button
document.getElementById("reset-btn").addEventListener("click", resetGame);
document.getElementById("you").innerText = us;
document.getElementById("com").innerText = cs;
