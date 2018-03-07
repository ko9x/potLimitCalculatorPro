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
  splitFactor: string = "0"

  // players:Array<string>;
  
  player1 = {
    title: "player1",
    name: "",
    bet: "",
    status: ""
  }
  player2 = {
    title: "player2",
    name: "",
    bet: "",
    status: ""
  }
  player3 = {
    title: "player3",
    name: "",
    bet: "",
    status: ""
  }
  player4 = {
    title: "player4",
    name: "",
    bet: "",
    status: ""
  }
  player5 = {
    title: "player5",
    name: "",
    bet: "",
    status: ""
  }
  player6 = {
    title: "player6",
    name: "",
    bet: "",
    status: ""
  }
  player7 = {
    title: "player7",
    name: "",
    bet: "",
    status: ""
  }
  player8 = {
    title: "player8",
    name: "",
    bet: "",
    status: ""
  }
  player9 = {
    title: "player9",
    name: "",
    bet: "",
    status: ""
  }
  player10 = {
    title: "player10",
    name: "",
    bet: "",
    status: ""
  }

  players:Array<any>;
  playerStates:Array<string>;
  currentDealer = this.player1;
  currentAction= this.player1;
  playerNumber: string;

  // player1Name: string = "player1";
  // player2Name: string = "player2";
  // player3Name: string = "player3";
  // player4Name: string = "player 4";
  // player5Name: string = "player 5";
  // player6Name: string = "player 6";
  // player7Name: string = "seat open";
  // player8Name: string = "seat open";
  // player9Name: string = "seat open";
  // player10Name: string = "seat open";

  // player1Bet: string = "";
  // player2Bet: string = "";
  // player3Bet: string = "";
  // player4Bet: string = "";
  // player5Bet: string = "";
  // player6Bet: string = "";
  // player7Bet: string = "";
  // player8Bet: string = "";
  // player9Bet: string = "";
  // player10Bet: string = "";

  // player1Status: string = "active";
  // player2Status: string = "active";
  // player3Status: string = "active";
  // player4Status: string = "active";
  // player5Status: string = "active";
  // player6Status: string = "active";
  // player7Status: string = "out";
  // player8Status: string = "out";
  // player9Status: string = "out";
  // player10Status: string = "out";

  constructor(public navCtrl: NavController, public alertCtrl: AlertController) {
    this.players = [this.player1,this.player2,this.player3,this.player4,this.player5,this.player6,this.player7,this.player8,this.player9,this.player10]
    this.playerStates = ["active","inactive","out"]
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
      if (Number(x) >= Number(this.currentBet)) {
        this.currentBet = x;
      } else {
      }
    } 
    this.pot = z.toString();
    this.primaryNumber = "0";
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
    let x = this.currentBet;
    let y = this.pot;
    let z = 0
    z = Number(x) + Number(y);
      this.pot = z.toString(); 
  }

  fold() {
    this.nextAction();
    let playerStatus = this.currentAction + "Status";
    this[playerStatus] = "inactive";
  }

  potBet() {
    let x = this.pot;
    let y = this.currentBet;
    let z = 0
    z = (Number(y) * 2) + Number(x);
    this.potBetAmount = z.toString();
    this.potBetConfirm();
  }

  // clearBets() {
  //   this.player1Bet = "";
  //   this.player2Bet = "";
  //   this.player3Bet = "";
  //   this.player4Bet = "";
  //   this.player5Bet = "";
  //   this.player6Bet = "";
  //   this.player7Bet = "";
  //   this.player8Bet = "";
  //   this.player9Bet = "";
  //   this.player10Bet = "";
  // }

  // Player tracking functions

  editPlayer(playerPosition) {
    if(this.players.indexOf(playerPosition) > -1){
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
    // this.clearBets();
    this.currentAction = this.currentDealer;
    this.nextAction();
    let sb = this.currentAction + "Bet";
    this[sb] = this.smallBlind;
    this.nextAction();
    let bb = this.currentAction + "Bet";
    this[bb] = this.bigBlind;
    this.nextAction();
  }

  removePlayer(playerPosition) {
    let i = this.players.indexOf(playerPosition);
    let playerName = playerPosition + "Name"
    let playerStatus = playerPosition + "Status"
    this.players.splice(i,1);
    this[playerName] = "seat open";
    this[playerStatus] = "out";
  }


  // Alerts

  addPlayerName(playerPosition) {
    let p = this.players.indexOf(playerPosition);
    if(this.players.indexOf(playerPosition) > -1){
      this.players.splice(p,1);
    }
    let alert = this.alertCtrl.create({
      title: 'enter name',
      message: 'limit 7 characters',
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
            this.players.push(playerPosition);
            let playerName = playerPosition + 'Name';
            let playerStatus = playerPosition + 'Status'
            this[playerName] = data.playerName;
            this[playerStatus] = "active";
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
            this.currentDealer = playerPosition;
          }
        },
        {
          text: 'Move Action',
          handler: () => {
            this.currentAction = playerPosition;
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
