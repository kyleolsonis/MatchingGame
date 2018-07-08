// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    cardList = array;
    console.log(cardList);
    return array;
}
/*
 * Create a list that holds all of your cards
 */
let cardList = ["fa fa-diamond", "fa fa-diamond",
              "fa fa-paper-plane-o", "fa fa-paper-plane-o",
              "fa fa-anchor", "fa fa-anchor",
              "fa fa-bolt", "fa fa-bolt",
              "fa fa-cube", "fa fa-cube",
              "fa fa-leaf", "fa fa-leaf",
              "fa fa-bicycle", "fa fa-bicycle",
              "fa fa-bomb", "fa fa-bomb"];

$(document).ready(function(){//Start of jQuery

//This code block below removes the fa-symbol from each card, then assigns a new html '.class' of shuffled fa-symbol
$('.restart').click(function(){
  shuffle(cardList);
  for (let i = 0; i <= cardList.length; i++){
    $('.card').find('i').removeClass();
  }//The 3 lines above have removed the class from all <i> elements
  $('.card > i').each(function(index, element) {
    $(element).addClass(cardList[index % cardList.length]);
  });//The 2 lines above assign html '.class' symbols to the shuffled cards
  $('.card').removeClass('match open show')
  totalMoves = 0;//These 3 lines reset move counter
  $totalMoves = $('.moves')
  $totalMoves.text(0);
  stopTimer();//resets timer to 0
  matchedCards = 0;//resets count of matched cards that determines end of game
})

let openCards = []; //holds 2 card values to compare them
let $firstCard;//holds value of 1st of 2 cards turned over
let matchedCards = 0;
//Turn cards over and compare them
const clickedCard = $('.card').click(function(){
                    $(this).toggleClass('open show');//shows card
                    const $card = $(this);//assigns current card to a variable
                    console.log($card.find('i').attr('class'));//logs the symbol of the card to the console.//TODO: delete this line
                    const currentCardSymbol = $card.find('i').attr('class');//finds the symbol of the clicked card
                    openCards.push(currentCardSymbol);//puts the symbol of the current card into openCards array
                    console.log(openCards);//TODO: delete this line
                    determineMatch();
                    addMove();//adds another move to the move counter
                    function determineMatch(){
                      if (openCards.length == 1){
                        $firstCard = $card;//saves first card flipped to global variable for comparison
                      } else if (openCards.length == 2){
                        if (openCards[0] == openCards[1]){//compares first and second cards flipped over
                          $card.toggleClass('match');//sets match class to matched cards
                          $firstCard.toggleClass('match');//sets match class to matched cards
                          matchedCards = matchedCards + 2;
                          if (matchedCards == 16){
                            gameOver();
                            $('.timer').empty();
                          }
                          console.log(matchedCards);
                          openCards.pop();//This and the 3 lines below clear the openCards array
                          openCards.pop();
                          openCards.pop();//One extra pop in case player accidentally turns over 3 cards
                        } else {
                          setTimeout(function(){
                            $card.toggleClass('open show');//flips card back over
                            $firstCard.toggleClass('open show');//flips card back over
                            openCards.pop();//This and the 2 lines below clear the openCards array
                            openCards.pop();
                            openCards.pop();//One extra pop in case player accidentally turns over 3 cards
                          }, 500);
                        }//end of: if (openCards[0] == openCards[1]){
                      } else {
                        //do nothing
                      }//end of: if (openCards.length == 1){
                    }//end determineMatch function
                  });//end clickedCard

//This block of codes below keeps track of the total moves of each game and reduces stars for too many moves
let totalMoves = 0;

function addMove(){
  totalMoves = totalMoves + 1;
  $totalMoves = $('.moves')
  $totalMoves.text(totalMoves);
  if (totalMoves === 16){
    $('.stars > li:first').remove();
  } else if (totalMoves === 24){
    $('.stars > li:first').remove();;
  } else if (totalMoves === 30){
    $('.stars > li:first').remove();;
  }
  return totalMoves;
}

//The code below ends the game 
function gameOver(){
    $('.card').toggleClass('match open show win');//Shows winning matches in orange
    setTimeout(function(){//Waits a moment then asks to play again
      const popUp = confirm("You win! Play again?");
      $('.card').removeClass('match open show win');
    }, 1000);
    shuffle(cardList);//Same code below here as on the "restart button"
    for (let i = 0; i <= cardList.length; i++){
      $('.card').find('i').removeClass();
    }//The 3 lines above have removed the class from all <i> elements
    $('.card > i').each(function(index, element) {
      $(element).addClass(cardList[index % cardList.length]);
    });//The 2 lines above assign html '.class' symbols to the shuffled cards
    $('.card').removeClass('match open show')
    totalMoves = 0;//These 3 lines reset move counter
    $totalMoves = $('.moves')
    $totalMoves.text(0);
    stopTimer();
    matchedCards = 0;//resets matchedCards counter
  };//end gameOver()

//The code below is the timer
let time = 0;
let clockID;

function startTimer(){//A big thanks to the udacity tutorial, I'd never heard of setInterval() before!
    $('.deck').off();//turns off the click event that started the clock
    let time = 0;
    clockID = setInterval(function(){
        time++;
        console.log(time);
        $('.timer').html('<span class="pageTimer">' + time + '</span>');
    }, 1500);// moves time one second at a time
    return time;
};//end startTimer()

$('.deck').on({//starts timer when deck is clicked anywhere
  click: function(){
  startTimer();
  }
});//end .deck.on event listener

function stopTimer(){//stops timer at end of game by removing it, then adding start timer event listener back in.
    clearInterval(clockID);
    //$('.pageTimer').remove();
    time = 0;
    $('.deck').on({//starts timer when deck is clicked anywhere
      click: function(){
        startTimer();
      }
    });
}//end stopTimer()

}); //end jquery
