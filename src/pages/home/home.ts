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
  
  denomination: string = ".25"
  smallBlind: string = ".25";
  bigBlind: string = ".50";
  savedBB: string = ".50"
  pot: string = "0";
  potBetAmount: string = "0";
  currentBet: string = this.bigBlind;
  primaryNumber: string = "0";
  splitFactor: string = "0";
  smallestAction = "Call"
  
  player1 = {
    title: "player1",
    name: "add name",
    bet: "",
    atTable: true,
    inHand: true
  };

  player2 = {
    title: "player2",
    name: "seat open",
    bet: "",
    atTable: false,
    inHand: false
  };

  player3 = {
    title: "player3",
    name: "seat open",
    bet: "",
    atTable: false,
    inHand: false
  };

  player4 = {
    title: "player4",
    name: "seat open",
    bet: "",
    atTable: false,
    inHand: false
  };

  player5 = {
    title: "player5",
    name: "seat open",
    bet: "",
    atTable: false,
    inHand: false
  };

  player6 = {
    title: "player6",
    name: "seat open",
    bet: "",
    atTable: false,
    inHand: false
  };

  player7 = {
    title: "player7",
    name: "seat open",
    bet: "",
    atTable: false,
    inHand: false
  };

  player8 = {
    title: "player8",
    name: "seat open",
    bet: "",
    atTable: false,
    inHand: false
  };

  player9 = {
    title: "player9",
    name: "seat open",
    bet: "",
    atTable: false,
    inHand: false
  };

  player10 = {
    title: "player10",
    name: "seat open",
    bet: "",
    atTable: false,
    inHand: false
  };

  players:Array<any>;
  atTable:Array<any>;
  inHand:Array<any>;
  playerStates:Array<string>;
  handStages:Array<string>;
  currentHandStage: string = "";
  currentDealer = this.player1;
  currentAction= this.player1;
  BBPlayer = this.player1;
  SBPlayer = this.player1;
  playerNumber: string;

  constructor(public navCtrl: NavController, public alertCtrl: AlertController) {
    this.players = [this.player1,this.player2,this.player3,this.player4,this.player5,this.player6,this.player7,this.player8,this.player9,this.player10,];
    this.atTable = [this.player1];
    this.inHand = [this.player1];
    this.handStages = ["Pre-Flop","Flop","Turn","River"];
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
    this.potBetCalculate();
    var p = this.potBetAmount;
    var x = this.primaryNumber;
    var y = this.pot;
    var z = 0;
    if(Number(x) > Number(p)) {
      this.potBetConfirm();
    } else {
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
    this.smallestAction = "Call";
    this.nextAction();
  }
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
    this.bigBlind = this.savedBB;
    this.currentBet = this.bigBlind;
    this.primaryNumber = "0";
    this.potBetAmount = "0";
    this.addPlayersToTable();
    this.addPlayersToHand();
    this.blindsToPot();
    this.smallestAction = "Call";
    this.nextDealer();
    this.establishBBPlayer();
    this.establishSBPlayer();
  }

  blindsToPot() {
    let x = this.smallBlind;
    let y = this.bigBlind;
    let z = 0
    z = Number(x) + Number(y);
    this.pot = z.toString();
  }

  call() {
    if(this.currentBet == "") {
      this.currentAction.bet = "0";
      this.currentBet = "0";
    }
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
    setTimeout( () => {
      this.checkBettingRoundStatus();
    }, TIME_IN_MS);
    this.currentAction.bet = this.currentBet;
    this.nextAction();
  }

  fold() {
    let ca = this.currentAction;
    let ih = this.inHand;
    let i = ih.indexOf(ca);
    this.currentAction.inHand = false;
    let TIME_IN_MS = 100;
    setTimeout( () => {
      this.checkBettingRoundStatus();
    }, TIME_IN_MS);
    this.nextAction();
    ih.splice(i,1);
  }

  potBetCalculate() {
    let ca = this.currentAction;
    let BBP = this.BBPlayer;
    let SBP = this.SBPlayer;
    let bb = this.bigBlind;
    let sb = this.smallBlind;
    let x = this.pot;
    let y = this.currentBet;
    let z = 0;
    if(sb === bb) {
      if(this.currentHandStage === "Pre-Flop" && (ca === SBP && y === bb)) {
        this.potBetAmount = this.pot
      }else if(this.currentHandStage === "Pre-Flop" && (ca === BBP && y === bb)) {
        this.potBetAmount = this.pot;
     } else {
     z = (Number(y) * 2) + Number(x);
     this.potBetAmount = z.toString();
     }
    } else if(this.currentHandStage === "Pre-Flop" && (ca === BBP && y === bb)) {
       this.potBetAmount = this.pot;
    } else {
    z = (Number(y) * 2) + Number(x);
    this.potBetAmount = z.toString();
    }
  }

  potBet() {
    let ca = this.currentAction;
    let BBP = this.BBPlayer;
    let SBP = this.SBPlayer;
    let bb = this.bigBlind;
    let sb = this.smallBlind;
    let x = this.pot;
    let y = this.currentBet;
    let z = 0;
    if(sb === bb) {
      if(this.currentHandStage === "Pre-Flop" && (ca === SBP && y === bb)) {
        this.potBetAmount = this.pot
        this.potBetConfirm();
      }else if(this.currentHandStage === "Pre-Flop" && (ca === BBP && y === bb)) {
        this.potBetAmount = this.pot;
        this.potBetConfirm();
     } else {
     z = (Number(y) * 2) + Number(x);
     this.potBetAmount = z.toString();
     this.potBetConfirm();
     }
    } else if(this.currentHandStage === "Pre-Flop" && (ca === BBP && y === bb)) {
       this.potBetAmount = this.pot;
       this.potBetConfirm();
    } else {
    z = (Number(y) * 2) + Number(x);
    this.potBetAmount = z.toString();
    this.potBetConfirm();
    }
  }

  clearBets() {
    this.atTable.forEach(function(element) {
      element.bet = "";
    })
  }

  resetStates() {
    this.atTable.forEach(function(element) {
      element.inHand = true;
    })
  }

  nextBettingRound() {
    this.atTable.forEach(function(element) {
      element.bet = "";
    });
    let atTable = this.atTable;
    let currentAction = this.currentAction;
    let cd = this.atTable.indexOf(this.currentDealer);
    let higher = [];
    let lower = [];
    this.atTable.forEach(function(element) {
      if(element.inHand === true && atTable.indexOf(element) > cd) {
        higher.push(element);
      };
      if(element.inHand === true && atTable.indexOf(element) > -1)  {
        lower.push(element)
      };
    }); 
    if(higher.length > 0) {
      let t = higher[0].title
      atTable.forEach(function(element) {
        if(element.title === t) {
          currentAction = element;
        }
        currentAction = element;
      })
    }
    if(higher.length > 0) {
      this.currentAction = higher[0];
    } else {
      this.currentAction = lower[0];
    }
    this.currentBet = "";
    this.smallestAction = "Check";
    this.changeHandStage();
  }

  

  checkBettingRoundStatus() {
    
    let inHand = this.inHand;
    let x = this.currentBet;
    this.atTable.forEach(function(element) {
      if(element.inHand === true && inHand.indexOf(element) < 0) {
        inHand.push(element);
      }
    });
    let betGood = [];
    inHand.forEach(function(element) {
      if(element.bet === x && betGood.indexOf(element) < 0) {
        betGood.push(element);
      }
     
    });
    if(inHand.length === betGood.length) {
      if(this.currentHandStage === "Pre-Flop" && (x === this.bigBlind && this.currentAction === this.BBPlayer)) {
        this.checkBigBlind();
      } else if (this.currentHandStage === "Pre-Flop" && x === this.bigBlind) {
        this.checkSmallBlind();
      } else {
        this.nextBettingRound();
      }
    }
  };

  changeHandStage() {
    let next = this.handStages.indexOf(this.currentHandStage) + 1;
    this.currentHandStage = this.handStages[next];
  }

  // Player tracking functions

  editPlayer(playerPosition) {
    if(this.atTable.indexOf(this[playerPosition]) > -1){
      this.playerOptions(playerPosition);
    } else {
      this.addPlayer(playerPosition);
    }
    
  }

  establishBBPlayer() {
    let cd = this.currentDealer;
    let cdi = this.atTable.indexOf(cd);
    if(this.atTable.length > cdi + 2) {
      let BB = cdi + 2;
      this.BBPlayer = this.atTable[BB];
    } else if(this.atTable.length - 2 === cdi ) {
        this.BBPlayer = this.atTable[0];
    } else this.BBPlayer = this.atTable[1];
  }

  establishSBPlayer() {
    let cd = this.currentDealer;
    let cdi = this.atTable.indexOf(cd);
    if(this.atTable.length > cdi + 1) {
      let SB = cdi + 1;
      this.SBPlayer = this.atTable[SB];
    } else if(this.atTable.length - 1 === cdi ) {
        this.SBPlayer = this.atTable[0];
    } else this.BBPlayer = this.atTable[1];
  }


  nextAction() {
    let p = this.inHand.indexOf(this.currentAction);
    let next = p += 1
    if(this.inHand.indexOf(this.currentAction) === (this.inHand.length - 1)) {
      this.currentAction = this.inHand[0]
    } else {
      this.currentAction = this.inHand[next]
      
    }

  }

  nextDealer() {
    let p = this.atTable.indexOf(this.currentDealer);
    let next = p += 1
    if(this.atTable.indexOf(this.currentDealer) === (this.atTable.length - 1)) {
      this.currentDealer = this.atTable[0]
    } else {
      this.currentDealer = this.atTable[next]
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
    let i = this.atTable.indexOf(this[playerPosition]);
    this.atTable.splice(i,1);
    this[playerPosition].name = "seat open";
    this[playerPosition].atTable = false;
    this[playerPosition].inHand = false;
    this[playerPosition].bet = "";
  }

  addPlayersToTable() {
    this.atTable = [];
    let atTable = this.atTable;
    this.players.forEach(function(element) {
      if(element.atTable === true) {
        atTable.push(element);
      }; 
    });
  };

  addPlayersToHand() {
    this.inHand = [];
    let inHand = this.inHand;
    this.atTable.forEach(function(element) {
      element.inHand === true;
      inHand.push(element);
    });
  };


  // Alerts

  changePlayerName(playerPosition) {
    let p = this.atTable.indexOf(this[playerPosition]);
    let alert = this.alertCtrl.create({
      enableBackdropDismiss: false,
      title: 'Enter Name',
      message: "keep it short",
      inputs: [
        {
          name: 'name',
          placeholder: 'enter name',
          type: 'text'
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
            if(data.name !== "") {
            this[playerPosition].name = data.name;
            this.atTable.splice(p,1,this[playerPosition]);
            this.newHand();
          } else {
            this.invalidAlert();
          }
          }
        }
      ]
    });
    alert.present();
  }

  addPlayer(playerPosition) {
    let pi = this.players.indexOf(this[playerPosition]);
    let alert = this.alertCtrl.create({
      enableBackdropDismiss: false,
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
            if(data.playerName !== "") {
            this.atTable.splice(pi,0,this[playerPosition]);
            this[playerPosition].name = data.playerName;
            this[playerPosition].atTable = true;
            this[playerPosition].inHand = true;
            this.newHand();
          } else {
            this.invalidAlert();
          }
          }
        }
      ]
    });
    alert.present();
    
  }

  playerOptions(playerPosition) {
    let alert = this.alertCtrl.create({
      enableBackdropDismiss: false,
      title: 'Edit Player',
      message: 'What would you like to do?',
      buttons: [
        {
          text: 'Change Name',
          handler: () => {
            this.changePlayerName(playerPosition);
          }
        },
        {
          text: 'Remove Player',
          handler: () => {
            this.removePlayer(playerPosition);
            this.newHand();
          }
        },
        { 
          text: 'Straddle',
          handler: () => {
            if(this.currentHandStage === "Pre-Flop") {
              this.straddleAlert(playerPosition);
            } else {
              this.invalidStraddleAlert();
            } 
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
  

  setBlinds() {
    let alert = this.alertCtrl.create({
      enableBackdropDismiss: false,
      title: 'Enter Blinds',
      message: 'use starting decimal for amounts less than $1.00',
      inputs: [
        {
          name: 'denomination',
          placeholder: 'smallest chip in play',
          type:"number",
        
        },
        {
          name: 'smallBlind',
          placeholder: 'small blind amount',
          type:"number",
        
        },
        {
          name: 'bigBlind',
          placeholder: 'big blind amount',
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
            if(data.smallBlind !== "" && (data.bigBlind !== "" && data.denomination !== "")) {
            this.denomination = data.denomination;
            this.smallBlind = data.smallBlind;
            this.bigBlind = data.bigBlind;
            this.savedBB = data.bigBlind;
            this.newHand();
            this.blindsToPot();
            this.currentBet = this.bigBlind;
            } else {
              this.invalidAlert();
            }
            
            
          }
        
        }
      ]
      
    });
    alert.present();
  }

  potBetConfirm() {
    let alert = this.alertCtrl.create({
      enableBackdropDismiss: false,
      title: "The pot bet amount is currently", 
      message: this.potBetAmount,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
          this.primaryNumber = "0";
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
            this.currentAction.bet = this.currentBet;
            this.smallestAction = "Call";
            this.primaryNumber = "0";
            this.nextAction();
          }
        }
      ]
    });
    alert.present();
  }

  checkBigBlind() {
    let alert = this.alertCtrl.create({
      enableBackdropDismiss: false,
      title: 'Option',
      message: 'check or bet?',
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

  checkSmallBlind() {
    let alert = this.alertCtrl.create({
      enableBackdropDismiss: false,
      title: 'Option',
      message: 'check or bet?',
      buttons: [
        {
          text: 'Check',
          handler: () => {
            this.nextAction();
            this.checkBigBlind();
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

  isQualifyingLow(denomination, pot) {
    let alert = this.alertCtrl.create({
      enableBackdropDismiss: false,
      title: 'Is there a qualifying low?',
      buttons: [
        {
          text: 'Yes',
          handler: () => {
            this.navCtrl.push(HLSplitPage, {denomination: denomination, pot: pot});
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
      enableBackdropDismiss: false,
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
          }
        },
        {
          text: 'Confirm',
          handler: data => {
            this.splitFactor = data.splitFactor;
            this.navCtrl.push(SplitPage, {denomination: this.denomination, pot: this.pot, splitFactor: this.splitFactor})
          }
        }
      ]
    });
    alert.present();
  }

  straddleAlert(playerName) {
    let alert = this.alertCtrl.create({
      enableBackdropDismiss: false,
      title: 'Straddle Bet?',
      inputs: [
        {
          name: 'straddleAmount',
          placeholder: 'total straddle amount',
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
          text: 'Confirm',
          handler: data => {
            if(data.straddleAmount !== "") {
            let x = Number(this.pot);
            let y = 0;
            let spi = this.atTable.indexOf(this[playerName])
            if(spi === this.atTable.length - 1) {
              this.currentAction = this.atTable[0];
            } else {
              let nca = spi + 1;
              this.currentAction = this.atTable[nca];
            }
            this.BBPlayer = this[playerName];
            this.currentBet = data.straddleAmount;
            this.bigBlind = data.straddleAmount;
            this[playerName].bet = data.straddleAmount;
            y = Number(data.straddleAmount) + x;
            this.pot = y.toString();
          } else {
            this.invalidAlert();
          }
          }
        }
      ]
    });
    alert.present();
  }

  invalidAlert() {
    let alert = this.alertCtrl.create({
      title: 'One or more fields was invalid',
      subTitle: 'please fill out all fields correctly',
      buttons: ['Dismiss']
    });
    alert.present();
  }

  invalidStraddleAlert() {
    let alert = this.alertCtrl.create({
      title: 'Invalid Request',
      subTitle: 'you can only straddle pre-flop',
      buttons: ['Dismiss']
    });
    alert.present();
  }
  

}
