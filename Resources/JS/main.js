//console.log("linked");

// ------ local variables ------- //

var gameboard = document.getElementById("gameBoard");
var time = document.getElementById("time");

var cardsFlipped = 0;

        // allows card count to reset so that game can continue

var lastCardPicked= -1;

        // restets time between clicks to allow us to click on next combination of cards without the game from bugging
var timeReset ='';

        //Counts the score
var score=0;

//For the end game message

var message=document.getElementById("message");

// click counter

var clickCount=0;

var click=document.getElementById("count");

    //Timer to count how long it took user to complete the game

var hours=0;
var minutes=0;
var seconds=0;
var mili=0;
var t;

// ----- Arrays -----//

        // pictures for tiles
var gameTiles = [
 'bird.jpg', 
 'butterfly.jpg',   
 'cat.jpg',   
 'dog.jpg',   
 'fish.jpg',   
 'hamster.jpg',   
 'penguin.jpg',  
 'rabbit.jpg',   

];

        // doubles images for game

var solutionArray = gameTiles.concat(gameTiles);

        // counts cards flipped/ clicked & stores to make sure that only 2 cards are flipped

var flipArray = new Array ();



//------ event listeners ------//

document.getElementById("gameControl").addEventListener("click", startGame);

//------- initiates functions ---------//



startGame();
timerCount();
console.log(solutionArray);


// ------- functions for game ------- //

        // function to start game 

function startGame(){
    
    
    // shuffles game cards
    
    shuffleArray(solutionArray);
    
    // resets click counter
    
    click.innerHTML="Number of clicks: 0";
    clickCount=0;
    
    //resets end game message
    
   message.innerHTML="";
    document.getElementById("gameControl").innerHTML="Restart Game"
    
    // restets timer
    hours=0;
    minutes=0;
    seconds=0;
    mili=0;
    
    /// sets the score at start of game
    
    score=0;
    
    /// clear Gameboard
    
    gameboard.innerHTML= "";
    
    /// gameboard create
    
    for ( var i =0; i<= ((solutionArray.length)-1); i++){
        displayImage(i);
    }
}


        //function to get the images to display from the array

function displayImage(i){
    
    gameboard.innerHTML += '<div class="col-md-3 col-xs-4 gameTile"><img id="cards'+i+'" src= "../MemoryGame/Resources/Img/tileBack.jpg" onclick="pickCard(\''+solutionArray[i]+'\', \'' +i+ '\', this); return false;" class="cardImg"></div>';
}


        // function to get cards to flip

function pickCard(a,b,c){
 
    
    
    
            // if atatement to make sure that only 2 cards can be fliiped at once
    
    if(cardsFlipped<2 && lastCardPicked !=b ){
        flipArray[cardsFlipped] = solutionArray[b];
        flipArray[(cardsFlipped+2)] = c.id;
        cardsFlipped++;
        clickCount++;
        
            // gives the source for the images when cards are flipped
    
    c.src = '../MemoryGame/Resources/Img/'+solutionArray[b];
        
            // if statement to check if the cards clicked are the same or different. If different the card will flip back to back of tile image
        
        if(cardsFlipped==2){
            if(flipArray[0]==flipArray[1]){
               console.log('same');
                pickAgain();
                score++;
               
                
                //check if game over
                
                if(gameTiles.length <= score){
                   console.log('End Game');
                    gameOver();
                   }
                
               }else{ 
                   timeReset = setInterval(hideCard,450);
                   console.log('different');
                  
            
                
               }
            
        }
        
        lastCardPicked=b;
  } 
    click.innerHTML="Number of clicks: " + clickCount;
    console.log(flipArray);
    console.log(clickCount);
}




        // function for when the game is over

function gameOver(){
    
    message.innerHTML="Congratulations you found all the pairs! It took you "+(clickCount/2)+" attempts and 0" + minutes + ":" + seconds + " to complete the game. <br>Hit play again to restart the game."
    
    document.getElementById("gameControl").innerHTML="Play Again";
}


        // function to allow user to pick a further 2 cards when playing

function pickAgain(){
    cardsFlipped = 0;
    flipArray=[];
    lastCardPicked=-1;
    clearInterval(timeReset);
}


        // function to flip card back if the images do not match

function hideCard(a){
    
document.getElementById(flipArray[2]).src="../MemoryGame/Resources/Img/tileBack.jpg";
document.getElementById(flipArray[3]).src="../MemoryGame/Resources/Img/tileBack.jpg";  
pickAgain();
   
}

        // function to randomize the order of the cards

function shuffleArray(randomise){
    for(var c = randomise.length - 1; c>0; c--){
        var b = Math.floor(Math.random()* (c+1));
        var a = randomise[c];
        randomise[c] = randomise[b];
        randomise[b]= a;
    }
    
    return randomise;
};


    // Function that times how long it took user to complete game 

function addTime (){
    seconds++;
    if (seconds>=60){
        seconds=0;
        minutes++;
        if(minutes >= 60){
            minutes=0;
            hours++;
        }
    }
    time.textContent ="Play Time:" + (hours ? (hours >9 ? hours : "0" + hours): "00") + ":" + (minutes ? (minutes > 9 ? minutes : "0" + minutes) :"00")+ ":" + (seconds > 9 ? seconds : "0" + seconds);
    
    timerCount();
}

function timerCount(){
    t= setTimeout(addTime,1000);
}


