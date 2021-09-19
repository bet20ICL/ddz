import {Deck, Player, stringToDeck, compareHands} from './deck.mjs'
import {ask} from '@reach-sh/stdlib/ask.mjs';

// async function testHandtype(){
//     console.log(`Start Game running`);
//     while(true){
//         const deck = await ask(`Play a test hand:`, h => {
//             const tmp = stringToDeck(h);
//             return tmp;
//         });
//         console.log(deck.getInfo());
//         console.log(deck.getCount());
//         console.log(deck.handType());
//         console.log(deck.rank);
//     }
// }

// async function compareTest(){
    // while(true){
    //     const deck1 = await ask(`Play test hand 1:`, h => {
    //         const tmp = stringToDeck(h);
    //         return tmp;
    //     });

    //     const deck2 = await ask(`Play test hand 2:`, h => {
    //         const tmp = stringToDeck(h);
    //         return tmp;
    //     });
    //     console.log(deck1.rank);

    //     console.log(deck2.rank);

    //     console.log(compareHands(deck1, deck2));
    // }
// }

// async function testExistence(){
//     function exist(h1, h2){
//         if(h2.numOfCards === 0){
//             return true;
//         }
//         const h1Info = h1.getInfo();
//         const h2Info = h2.getInfo();
//         for(let i = 0; i < h2Info.length; i++){
//             if(h1Info.findIndex(x => (x[0] === h2Info[i][0]) && (x[1] >= h2Info[i][1])) === -1){
//                 return false;
//             }
//         }
//         return true;
//     }
    
//     while(true){
//         const deck1 = await ask(`Play test hand 1:`, h => {
//             const tmp = stringToDeck(h);
//             return tmp;
//         });
    
//         const deck2 = await ask(`Play test hand 2:`, h => {
//             const tmp = stringToDeck(h);
//             return tmp;
//         });
    
//         console.log(exist(deck1, deck2));
    
//     }
//     let boardHand = new Deck([]);
//     console.log(Players[playerPos].deck.getInfo())
//     while(Players[playerPos].deck.numOfCards > 0){
//         const playedHand = await Players[playerPos].getInput(boardHand);
//         console.log(playedHand);
//         Players[playerPos].displayDeck();
//     }   
// }

export async function startGame(){
    console.log(`Start Game running`);

    //Make a new deck and shuffle it
    const deck = new Deck();
    deck.shuffle();
    console.log(deck);

    //Deal the deck to the 3 players
    const Alice = new Player('Alice', new Deck(deck.cards.slice(0, 17)));
    const Bob = new Player('Bob', new Deck(deck.cards.slice(17, 34)));
    const Charlie = new Player('Charlie', new Deck(deck.cards.slice(34, 51)));

    //Display the decks
    const Players = [Alice, Bob, Charlie];
    for (let i = 0; i < Players.length; i++){
        Players[i].deck.sortD();
         Players[i].displayDeck();
    }   

     //Set up landlord deck
    const landlordDeck = new Deck(deck.cards.slice(51));
    console.log("Landlord Deck:")
    console.log(landlordDeck.cards);

    //Choose a landlord 
    //Eventually landlordN determined by player interaction
    const landlordN = Math.floor(Math.random() * 3);
    console.log(`The landlord is ${Players[landlordN].name}`);
    Players[landlordN].deck.cards.push(...landlordDeck.cards);

    console.log(`Landlord's hand: `)
    Players[landlordN].deck.sortD();
    Players[landlordN].displayDeck(); 

    console.log(Players[landlordN].deck.getInfo);

    /*
    bidding code:
    to do later

    */

    let playerPos = landlordN;
    let roundNum = 0;
    let gameRunning = false;
    //Game Loop
    while(gameRunning === false){
        console.log(`Round ${roundNum}:`);

        let boardHand = new Deck([]);
        let passCount = 0;
        while(passCount < 2 && gameRunning === false){
            //getInput method of the Player class
            //should get the player to choose an action: pass or play a valid hand
            //returns valid hand (object of the deck class), or empty array if pass
            Players[playerPos].displayDeck();
            const playedHand = await Players[playerPos].getInput(boardHand);
            if(Players[playerPos].deck.numOfCards === 0){
                gameRunning = true;
            } else{
                if(playedHand.cards.length === 0){
                    passCount += 1;
                } else {
                    boardHand = playedHand;
                    passCount = 0;
                }
                playerPos = (playerPos + 1) % 3;
            }
        }
        roundNum++;
    }    
    console.log(`${Players[playerPos].name} wins!`);
    console.log(`Game lasted ${roundNum - 1} rounds`);
}