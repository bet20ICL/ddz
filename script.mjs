import {Deck, Player, stringToDeck, compareHands} from './deck.mjs'
import {ask} from '@reach-sh/stdlib/ask.mjs';

// function testHandtype(){
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

function compareTest(){

}

export async function startGame(){
    console.log(`Start Game running`);
    while(true){
        const deck1 = await ask(`Play test hand 1:`, h => {
            const tmp = stringToDeck(h);
            return tmp;
        });

        const deck2 = await ask(`Play test hand 2:`, h => {
            const tmp = stringToDeck(h);
            return tmp;
        });
        console.log(deck1.rank);

        console.log(deck2.rank);

        console.log(compareHands(deck1, deck2));
    }

    // //Make a new deck and shuffle it
    // const deck = new Deck();
    // deck.shuffle();
    // console.log(deck);

    // //Deal the deck to the 3 players
    // const Alice = new Player('Alice', new Deck(deck.cards.slice(0, 17)));
    // const Bob = new Player('Bob', new Deck(deck.cards.slice(17, 34)));
    // const Charlie = new Player('Charlie', new Deck(deck.cards.slice(34, 51)));

    // //Display the decks
    // const Players = [Alice, Bob, Charlie];
    // for (let i = 0; i < Players.length; i++){
    //     Players[i].deck.sortD();
    //     Players[i].displayDeck();
    // }   

    // //Set up landlord deck
    // const landlordDeck = new Deck(deck.cards.slice(51));
    // console.log("Landlord Deck:")
    // console.log(landlordDeck.cards);


    // //Choose a landlord 
    // //Eventually landlordN determined by player interaction
    // const landlordN = Math.floor(Math.random() * 3);
    // console.log(`The landlord is ${Players[landlordN].name}`);
    // Players[landlordN].deck.cards.push(...landlordDeck.cards);

    // console.log(`Landlord's hand: `)
    // Players[landlordN].deck.sortD();
    // Players[landlordN].displayDeck(); 

    // console.log(Players[landlordN].deck.getInfo);

    /*
    bidding code:
    to do later

    */

    // let playerPos = landlordN;
    // let roundNum = 0;

    // //Game Loop
    // while(!(Players[playerPos].deck.numOfCards === 0)){
    //     console.log(`Round ${roundNum}:`);
    //     for(let i = 0; i < Players.length; i++){
    //         Players[i].displayDeck();
    //     }
    //     let boardHand = new Deck([]);
    //     let passCount = 0;
    //     while(passCount < 2){
    //         //getInput method of the Player class
    //         //should get the player to choose an action: pass or play a valid hand
    //         //returns valid hand (object of the deck class), or empty array if pass
    //         const playedHand = await Players[playerPos].getInput(boardHand);
    //         if(playedHand.cards.length === 0){
    //             passCount += 1;
    //         } else {
    //             boardHand = playedHand;
    //             passCount = 0;
    //         }
    //         playerPos = (playerPos + 1) % 3;     
    //     }
    //     roundNum++;
    // }    
    // console.log(`${Players[playerPos].name} wins!`);
}