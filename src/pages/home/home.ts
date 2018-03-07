import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { SplitPage } from '../split/split';
import { HLSplitPage } from '../hl-split/hl-split';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  //Number Pannel
  row1 : Array<string>;
  row2 : Array<string>;
  row3 : Array<string>;
  // register function properties
  previousAnswer:number=0;
  history:Array<string>;
  error:boolean;
  
  smallBlind: string = ".25";
  bigBlind: string = ".50";
  pot: string = "0";
  potBetAmount: string = "0";
  currentBet: string = this.bigBlind;
  primaryNumber: string = "0";
  splitFactor: string = "0";
  
  player1 = {
    title: "player1",
    name: "add name",
    bet: "",
    status: "active"
  };

  player2 = {
    title: "player2",
    name: "add name",
    bet: "",
    status: "active"
  };

  player3 = {
    title: "player3",
    name: "add name",
    bet: "",
    status: "active"
  };

  player4 = {
    title: "player4",
    name: "seat open",
    bet: "",
    status: "inactive"
  };

  player5 = {
    title: "player5",
    name: "seat open",
    bet: "",
    status: "inactive"
  };

  player6 = {
    title: "player6",
    name: "seat open",
    bet: "",
    status: "inactive"
  };

  player7 = {
    title: "player7",
    name: "seat open",
    bet: "",
    status: "inactive"
  };

  player8 = {
    title: "player8",
    name: "seat open",
    bet: "",
    status: "inactive"
  };

  player9 = {
    title: "player9",
    name: "seat open",
    bet: "",
    status: "inactive"
  };

  player10 = {
    title: "player10",
    name: "seat open",
    bet: "",
    status: "inactive"
  };

  players:Array<any>;
  playerStates:Array<string>;
  handStages:Array<string>;
  currentHandStage: string = "";
  currentDealer = this.player1;
  currentAction= this.player1;
  playerNumber: string;

  constructor(public navCtrl: NavController, public alertCtrl: AlertController) {
    this.players = [this.player1,this.player2,this.player3]
    this.playerStates = ["active","inactive"]
    this.handStages = ["Pre-Flop","Flop","Turn","River"]
    //Number Panel
    this.row1 = ["7","8","9"];
    this.row2 = ["4","5","6"];
    this.row3 = ["1","2","3"];
   
    this.history = [];
    this.previousAnswer = 0;
    this.error = false;
    this.newGame();
  }
  register(n:string){
    this.error ? this.clear() : null;
    if(this.primaryNumber===this.previousAnswer.toString()&&this.previousAnswer!==0){
      this.history.unshift(this.previousAnswer.toString());
      this.previousAnswer = 0;
      this.clear();
    }
    if(this.primaryNumber==="0"){
      this.primaryNumber = n;
    }else{
      if(this.primaryNumber.length<=40){
        this.primaryNumber += n;
      }
    }
  }

  addDecimal(){
    this.primaryNumber.indexOf(".") == -1? this.primaryNumber+=".":null;
  }

  solve() {
    var x = this.primaryNumber
    var y = this.pot
    var z = 0
    if(x != "") {
      z = (+x + +y);
      if (this.currentAction.bet !== "0") {
          let increase = Number(x) - Number(this.currentAction.bet);
          let n = Number(this.pot) + increase
          this.pot = n.toString();
      } else {
        this.pot = z.toString();
      }
    } 
    
    this.primaryNumber = "0";
    this.currentAction.bet = x;
    this.currentBet = x;
    this.nextAction();
  }

  clear(){
    this.error = false;
    this.primaryNumber = "0";
  }

  onError(){
    this.primaryNumber = "ERROR";
    this.error = true;
    this.previousAnswer = 0;
  }

  newGame() {
    this.pot = "0";
    this.currentBet = this.bigBlind;
    this.primaryNumber = "0";
    this.potBetAmount = "0";
    this.blindsToPot();
    this.currentHandStage = "Pre-Flop";
  }

  newHand() {
    this.pot = "0";
    this.currentBet = this.bigBlind;
    this.primaryNumber = "0";
    this.potBetAmount = "0";
    this.blindsToPot();
    this.nextDealer();
  }

  blindsToPot() {
    let x = this.smallBlind;
    let y = this.bigBlind;
    let z = 0
    z = Number(x) + Number(y);
    this.pot = z.toString();
  }

  call() {
    if(this.currentAction.bet !== "0") {
      let toCall = Number(this.currentBet) - Number(this.currentAction.bet)
      let n = Number(this.pot) + toCall
      this.pot = n.toString();
    } else {
      let x = this.currentBet;
      let y = this.pot;
      let z = 0
    z = Number(x) + Number(y);
      this.pot = z.toString();
      
    }
    let TIME_IN_MS = 100;
    let holdUp = setTimeout( () => {
      this.checkBettingRoundStatus();
    }, TIME_IN_MS);
    this.currentAction.bet = this.currentBet;
    this.nextAction();
  }

  fold() {
    this.nextAction();
    this.currentAction.status = "inactive"
  }

  potBet() {
    let x = this.pot;
    let y = this.currentBet;
    let z = 0
    z = (Number(y) * 2) + Number(x);
    this.potBetAmount = z.toString();
    this.potBetConfirm();
  }

  clearBets() {
    this.players.forEach(function(element) {
      element.bet = "";
    })
  }

  resetStates() {
    this.players.forEach(function(element) {
      element.status = "active";
    })
  }

  nextBettingRound() {
    let next = this.handStages.indexOf(this.currentHandStage) + 1;
    this.currentHandStage = this.handStages[next];
  }

  checkBettingRoundStatus() {
    let activePlayers = [];
    let x = this.currentBet;
    this.players.forEach(function(element) {
      if(element.status === "active") {
        activePlayers.push(element);
      }
    });
    let betGood = [];
    activePlayers.forEach(function(element) {
      if(element.bet === x) {
        betGood.push(element);
      }
     
    });
    if(activePlayers.length === betGood.length) {
      if(this.currentHandStage === "Pre-Flop" && x === this.bigBlind) {
        this.checkBigBlind();
      } else {
        this.nextBettingRound();
      }
    }
    console.log('activePlayers', activePlayers.length); //@DEBUG
    console.log('betGood', betGood.length); //@DEBUG
  };

  // Player tracking functions

  editPlayer(playerPosition) {
    if(this.players.indexOf(this[playerPosition]) > -1){
      this.playerOptions(playerPosition);
    } else {
      this.addPlayerName(playerPosition);
    }
    
  }


  nextAction() {
    let p = this.players.indexOf(this.currentAction);
    let next = p += 1
    if(this.players.indexOf(this.currentAction) === (this.players.length - 1)) {
      this.currentAction = this.players[0]
    } else {
      this.currentAction = this.players[next]
      
    }

  }

  nextDealer() {
    let p = this.players.indexOf(this.currentDealer);
    let next = p += 1
    if(this.players.indexOf(this.currentDealer) === (this.players.length - 1)) {
      this.currentDealer = this.players[0]
    } else {
      this.currentDealer = this.players[next]
    }
    this.currentHandStage = "Pre-Flop";
    this.resetStates();
    this.clearBets();
    this.currentAction = this.currentDealer;
    this.nextAction();
    this.currentAction.bet = this.smallBlind;
    this.nextAction();
    this.currentAction.bet = this.bigBlind;
    this.nextAction();
  }

  removePlayer(playerPosition) {
    let i = this.players.indexOf(this[playerPosition]);
    this.players.splice(i,1);
    this[playerPosition].name = "seat open";
    this[playerPosition].status = "inactive";
  }


  // Alerts

  addPlayerName(playerPosition) {
    let p = this.players.indexOf(playerPosition);
    if(this.players.indexOf(playerPosition) > -1){
      this.players.splice(p,1);
    }
    let alert = this.alertCtrl.create({
      title: 'enter name',
      message: 'keep it short',
      inputs: [
        {
          name: 'playerName',
          placeholder: 'enter name',
          type: "text"
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: data => {
          }
        },
        {
          text: 'Confirm',
          handler: data => {
            this.players.push(this[playerPosition]);
            this[playerPosition].name = data.playerName;
            this[playerPosition].status = "active";
            this.newHand();
          }
        }
      ]
    });
    alert.present();
  }

  playerOptions(playerPosition) {
    let alert = this.alertCtrl.create({
      title: 'Edit Player',
      message: 'What would you like to do?',
      buttons: [
        {
          text: 'Change Name',
          handler: () => {
            this.addPlayerName(playerPosition);
          }
        },
        {
          text: 'Remove Player',
          handler: () => {
            this.removePlayer(playerPosition);
          }
        },
        {
          text: 'Move Dealer',
          handler: () => {
            this.currentDealer = this[playerPosition];
          }
        },
        {
          text: 'Move Action',
          handler: () => {
            this.currentAction = this[playerPosition];
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    alert.present();
  }
  

  setBlinds() {
    let alert = this.alertCtrl.create({
      enableBackdropDismiss: false,
      title: 'Enter Blinds',
      message: 'use decimal for blinds less than $1.00',
      inputs: [
        {
          name: 'smallBlind',
          placeholder: 'small blind',
          type:"number",
        
        },
        {
          name: 'bigBlind',
          placeholder: 'big blind',
          type: 'number'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: data => {
          }
        },
        {
           
          text: 'Confirm Blinds',
          handler: data => {
            if(data.smallBlind !== "" && data.bigBlind !== "") {
            this.newHand();
            this.smallBlind = data.smallBlind;
            this.bigBlind = data.bigBlind;
            this.blindsToPot();
            this.currentBet = this.bigBlind;
            } else {
              console.log('enter a number')
            }
            
            
          }
        
        }
      ]
      
    });
    alert.present();
  }

  potBetConfirm() {
    let alert = this.alertCtrl.create({
      title: "The pot bet amount is currently", 
      message: this.potBetAmount,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Bet the Pot',
          handler: () => {
            let x = this.pot;
            let y = this.potBetAmount;
            let z = 0;
            z = Number(y) + Number(x);
            this.pot = z.toString();
            this.currentBet = y.toString();
          }
        }
      ]
    });
    alert.present();
  }

  checkBigBlind() {
    let alert = this.alertCtrl.create({
      title: 'Option',
      message: 'Big Blind can check or bet',
      buttons: [
        {
          text: 'Check',
          handler: () => {
            this.nextBettingRound();
          }
        },
        {
          text: 'Bet',
          role: 'cancel',
          handler: () => {;
          }
        }
      ]
    });
    alert.present();
  }

  changeCurrentBet() {
    let alert = this.alertCtrl.create({
      title: 'Change Current Bet',
      message: 'this amount will not be added to the pot',
      inputs: [
        {
          name: 'newCurrentBet',
          placeholder: 'enter amount',
          type: 'number'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Confirm',
          handler: data => {
            this.currentBet = data.newCurrentBet
          }
        }
      ]
    });
    alert.present();
  }

  isQualifyingLow(smallBlind, pot) {
    let alert = this.alertCtrl.create({
      title: 'Is there a qualifying low?',
      buttons: [
        {
          text: 'Yes',
          handler: () => {
            this.navCtrl.push(HLSplitPage, {smallBlind: smallBlind, pot: pot});
          }
        },
        {
          text: 'No',
          handler: () => {
            this.regularSplit();
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
          }
        }
      ]
    });
    alert.present();
  }

  regularSplit() {
    let alert = this.alertCtrl.create({
      title: 'How Many Players Are Splitting The Pot?',
      inputs: [
        {
          name: 'splitFactor',
          placeholder: 'amount of players',
          type: 'number'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Confirm',
          handler: data => {
            this.splitFactor = data.splitFactor;
            this.navCtrl.push(SplitPage, {smallBlind: this.smallBlind, pot: this.pot, splitFactor: this.splitFactor})
          }
        }
      ]
    });
    alert.present();
  }


}
