import {ask} from '@reach-sh/stdlib/ask.mjs';

const SUITS = ['♠', '♣', '♥', '♦'];
const VALUES = ['3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A', '2'];
const RANK = {
    '3': 0, '4': 1, '5': 2, '6': 3, '7': 4, '8': 5, '9': 6, '10': 7, 
    'J': 8, 'Q': 9, 'K': 10, 'A': 11, '2': 12, 'SmallJoker': 13, 'BigJoker': 14 
};


class Card{
    constructor(suit, value, rank = RANK[value]){
        this.suit = suit;
        this.value = value;
        this.rank = rank;
    }
}

export class Deck{
  constructor(cards = freshDeck()){
    this.cards = cards;
    this.rCard;
    this.info = []; //array of 2d arrays, [rank, frequency]
    this.count = [0, 0, 0, 0]; //[#of singles, #of pairs, #of triples, #of quadruples]
    this.rank;
    this.type;
  }

  get numOfCards(){
    return this.cards.length;
  }

  getInfo(){
      this.sortD();
      for(let i = 0; i < this.numOfCards; i++){
          const cardRank = this.cards[i].rank;
          const index = this.info.findIndex(x => x[0] === cardRank)
          if(index === -1){
              this.info.push([cardRank, 1]);
          } else{
              this.info[index][1]++;
          }
      }
      return this.info;
  }

  getCount(){
      for(let i = 0; i < this.info.length; i++){
          this.count[this.info[i][1] - 1]++;
      }
      return this.count;
  }

  handType(){
    console.log(this.getInfo());
    console.log(this.getCount());
    this.type = -1;
    if(compareArr(this.count, [1, 0, 0, 0])){
        console.log(`Single ${this.cards[0].value}`);
        this.type = 0;
        this.rank = this.cards[0].rank;
    } else if(compareArr(this.count, [0, 1, 0, 0])){
        console.log(`Pair ${this.cards[0].value}s`);
            this.type = 1;
            this.rank = this.cards[0].rank;
    } else if(compareArr(this.count, [0, 0, 1, 0])){
        console.log(`Three of a kind ${this.cards[0].value}`);
        this.type = 2;
        this.rank = this.cards[0].rank;
    } else if(compareArr(this.count, [0, 0, 0, 1])){
        console.log(`Bomb ${this.cards[0].value}`);
        this.type = 12;
        this.rank = this.cards[0].rank;
    } else if(compareArr(this.count, [1, 0, 1, 0])){
        console.log(`Three of a kind + ${this.cards[0].value}`);
        this.type = 3;
        this.rank = this.info.find(x => x[1] === 3)[0];
    } else if(compareArr(this.count, [0, 1, 1, 0])){
        console.log(`Three of a kind + Pair ${this.cards[0].value}s`);
        this.type = 4;
        this.rank = this.info.find(x => x[1] === 3)[0];
    } else if((this.count[0] >= 1) && (this.count[0] <= 2) && compareArr(this.count, [this.count[0], 0, 0, 1])){
        console.log(`Four of a kind + Singles`);
        this.type = 10;
        this.rank = this.info.find(x => x[1] === 4)[0];
    } else if((this.count[1] >= 1) && (this.count[1] <= 2) && compareArr(this.count, [0, this.count[1], 0, 1])){
        console.log(`Four of a kind + Pairs`);
        this.type = 11;
        this.rank = this.info.find(x => x[1] === 4)[0];
    } else if((this.count[0] >= 5) && compareArr(this.count, [this.count[0], 0, 0, 0])){
        for(let i = 0; i < this.info.length - 1; i++){
            if(this.info[i + 1][0] != this.info[i][0] + 1){
                this.type = -1;
                return this.type;
            }
        }
        console.log(`Sequence of singles`)
        this.type = 5;
        this.rank = this.info[0][0];
    } else if((this.count[1] >= 3) && compareArr(this.count, [0, this.count[1], 0, 0])){
        for(let i = 0; i < this.info.length - 1; i++){
            if(this.info[i + 1][0] != this.info[i][0] + 1){
                this.type = -1;
                return this.type;
            }
        }
        console.log(`Sequence of pairs`)
        this.type = 6;
        this.rank = this.info[0][0];
    } else if((this.count[2] >= 2) && compareArr(this.count, [0, 0, this.count[2], 0])){
        for(let i = 0; i < this.info.length - 1; i++){
            if(this.info[i + 1][0] != this.info[i][0] + 1){
                this.type = -1;
                return this.type;
            }
        }
        console.log(`Sequence of triples`)
        this.type = 7;
        this.rank = this.info[0][0];
    } else if((this.count[2] >= 2) && (this.count[0] <= this.count[2]) && compareArr(this.count, [this.count[0], 0, this.count[2], 0])){
        const startIndex = this.info.findIndex(x => x[1] === 3);
        for(let i = startIndex; i < startIndex + this.count[2] - 1; i++){
            if(this.info[i + 1][0] != this.info[i][0] + 1){
                this.type = -1;
                return this.type;
            }
        }
        console.log(`Sequence of triples + singles`)
        this.type = 8;
        this.rank = this.info.find(x => x[1] === 3)[0];
    } else if((this.count[2] >= 2) && (this.count[1] <= this.count[2]) && compareArr(this.count, [0, this.count[1], this.count[2], 0])){
        const startIndex = this.info.findIndex(x => x[1] === 3);
        for(let i = startIndex; i < startIndex + this.count[2] - 1; i++){
            if(this.info[i + 1][0] != this.info[i][0] + 1){
                this.type = -1;
                return this.type;
            }
        }
        console.log(`Sequence of triples + pairs`)
        this.type = 9;
        this.rank = this.info.find(x => x[1] === 3)[0];
    } else if(compareArr(this.count, [2, 0, 0, 0])){
        if(this.info[0][0] === 13 && this.info[1][0] === 14){
            console.log(`Rocket!`);
            this.type = 13;
        }
    }
    return this.type;
  }

  sortD(){
    this.cards.sort((a,b) => (RANK[a.value] > RANK[b.value])? 1: (RANK[a.value] < RANK[b.value])? -1: 0);
  }

  shuffle(){
    for(let i = this.numOfCards - 1; i > 0; i--){
       const j = Math.floor(Math.random() * (i + 1));
       [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
    }
  }

  deleteFromDeck(h){
      for(let i = 0; i < h.cards.length; i++){
          for(let ii = 0; ii < this.cards.length; ii++){
              if(h.cards[i].value === this.cards[ii].value){
                  this.cards.splice(ii, 1);
                  break;
              }
          }
      }
  }
}

const freshDeck = () => {
    const temp = SUITS.flatMap(suit => {
      return VALUES.map(value => {
        return new Card(suit, value);
      })
    })
    temp.push(new Card(0, 'SmallJoker'));
    temp.push(new Card(0, 'BigJoker'));
    return temp;
}

const compareArr = (a, b) => {
    if(a.length != b.length){
        return false;
    }
    for(let i = 0; i < a.length; i++){
        if(a[i] != b[i]){
            return false;
        }
    }
    return true;
}

export class Player{
    constructor(name, deck){
        this.name = name;
        this.deck = deck;
    }
    displayDeck(){
        console.log(`${this.name}'s hand:`);
        console.log(this.deck.cards);
    }

    //getInput method of the Player class
    //should get the player to choose an action: pass or play a valid hand
    //returns valid hand (object of the deck class), or empty array if pass
    
    async getInput(boardHand){
        const playerHand = await ask(`${this.name}'s turn: play a hand or pass`, h => {
            const tmp = stringToDeck(h);
            if(!compareHands(boardHand, tmp)){
                throw Error(`Not a valid hand, try again`);
            }
            return tmp;
        });
        this.deck.deleteFromDeck(playerHand);
        return playerHand;
    }
}

//generates a deck from string input
export const stringToDeck = (input) => {
  if((input === 'pass') || (input === 'Pass') || (input === 'p') || (input === '')){
    return new Deck([]);
  } else {
      //will have to implement checks that input is valid
      const inArr = input.split(' ');
      const tmp = [];
      for(let i = 0; i < inArr.length; i++){
          tmp.push(new Card(0, inArr[i]));
      } 
      const tmpDeck = new Deck(tmp);
      tmpDeck.sortD();
      return tmpDeck;
  }
}

//complete compareHands function
//takes in two decks as input
//returns true if h2 is a valid hand to play against h1 (i.e. either a pass or a bigger hand) otherwise false
export const compareHands = (h1, h2) => {
    if((h2.cards.length === 0) || (h1.cards.length === 0)){
        return true;
    } else{
        const t1 = h1.handType();
        const t2 = h2.handType();
        if(t2 > -1){
            if(t2 === 13){      //rocket can be played on any hand
                return true;
            } else if(t2 === 12){   //bombs can be played on any hand that is not a rocket or a bigger bomb
                if(t1 < 12 || (t1 === 12 && h2.rank > h1.rank)){
                    return true;
                }
            } else if(compareArr(h1.count, h2.count)){ 
                if(h2.rank > h1.rank){
                    return true;
                }
            }
        }
    }
    return false; 
}

/*

getInput:

do

prompt an input

parse the input string -> inputHand object
"Type out the cards"
"3 3 3 7 7" -> deck
"SmallJoker BigJoker" -> deck
"pass" -> empty deck
//assume cards selected are available

while !compareHands(boardHand, inputHand) <- while inputHand is not valid

compareHands:

if inputHand == pass return true;
else if 



//
deck object:

0 1 2 3 4 
primal: single/pair/triple/quadruple/jokerbomb

sequence: number of cards in sequence

0 1 2 3 4
kicker: nothing/single/pair/2 singles/2 pairs

primal value:

//

3 4 5 6 7
primal: 0
sequence: 5
kicker: 0
primal value: 3


3 4 5 6 7 8
primal: 0
sequence: 6
kicker: 0
primal value: 3

3 3 3 4 4 4 6
primal: 2
sequence: 2
kicker: 1
primal value: 3

if(check if primal > 4 or equal to){
    if(sequence same, kicker same, primal bigger){
        return true
    }
}

class counter(){
    value: 3
    count: 1
}

fillInProperties(inputDeck){
    primal determined by highest number of repeating cards
        deck.cards
        loop over all cards in inputDeck
            if(counter exists in table){
                inc counter
            } else {
                make new counter in table
            }
        primal = highest count in table 
        primal value = value of the counter
    table hand array.length, take the lowest ranking element, generate an array of consecutive numbers, [3 4 5 6 7] for --> [3 4 5 6 7]==all elements in hand array
}




-----------------------------------
0: Single Card: 4                                           
(check if 1 card, check higher rank)

1: Pair: 7-7
(check if 2 cards, check if the same, check if higher rank)

2: 3-of-a-kind: 5-5-5
(check if 3 cards, check if the same, check if higher rank)

3: 3-of-a-kind plus a card: 8-8-8-3
(check if 3 cards, check if the same, check if higher rank)

4: 3-of-a-kind plus a pair: 10-10-10-4-4
(check if 5 cards, check if triple&pair, check if higher rank)

5: Sequence (at least 5 cards): 3-4-5-6-7
(check >= 5 cards, check if consecutive in RANK array)

6: Pair Sequence (at least 3 pairs): 4-4-5-5-6-6
(check )

7: 3-of-a-kind Sequence (at least 2): 7-7-7-8-8-8

8: 3-of-a-kind Sequence plus cards: 10-10-10-J-J-J-3-5

9: 3-of-a-kind Sequence plus pairs: Q-Q-Q-K-K-K-3-3-9-9

10: 4-of-a-kind plus two cards: 6-6-6-6-10-Q

11: 4-of-a-kind plus two pairs: J-J-J-J-5-5-7-7

*[for all above check if same combination as board hand]
12: Bomb: 4-4-4-4 (beats any previous combination)

13: Rocket: Joker-Joker (beats any combination or bomb)
-------------------------------------

*/



//   getHTML(){
//     const cardDiv = document.createElement('div');
//     cardDiv.innerText = this.suit;
//     cardDiv.classList.add('card, this.color');
//     cardDiv.dataset.value = `${this.value} ${this.suit}`;
//     return cardDiv;
//   }  