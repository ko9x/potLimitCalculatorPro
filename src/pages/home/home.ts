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
  // bet tracking properties
  smallBlind: string = ".25";
  bigBlind: string = ".50";
  pot: string = "0";
  potBetAmount: string = "0";
  currentBet: string = this.bigBlind;
  primaryNumber: string = "0";
  splitFactor: string = "0"
  // player tracking properties
  players:Array<string>;
  currentDealer: string = "player1";
  currentAction: string = "player3";
  playerNumber: string;

  player1Name: string = "add name";
  player2Name: string = "add name";
  player3Name: string = "";
  player4Name: string = "";
  player5Name: string = "";
  player6Name: string = "";
  player7Name: string = "";
  player8Name: string = "";
  player9Name: string = "";
  player10Name: string = "";

  player1Bet: string = "";
  player2Bet: string = "";
  player3Bet: string = "";
  player4Bet: string = "";
  player5Bet: string = "";
  player6Bet: string = "";
  player7Bet: string = "";
  player8Bet: string = "";
  player9Bet: string = "";
  player10Bet: string = "";

  player1D: boolean = false;
  player2D: boolean = false;
  player3D: boolean = false;
  player4D: boolean = false;
  player5D: boolean = false;
  player6D: boolean = false;
  player7D: boolean = false;
  player8D: boolean = false;
  player9D: boolean = false;
  player10D: boolean = false;

  player1A: boolean = false;
  player2A: boolean = false;
  player3A: boolean = false;
  player4A: boolean = false;
  player5A: boolean = false;
  player6A: boolean = false;
  player7A: boolean = false;
  player8A: boolean = false;
  player9A: boolean = false;
  player10A: boolean = false;

  constructor(public navCtrl: NavController, public alertCtrl: AlertController) {
    this.players = []
    //Number Panel
    this.row1 = ["7","8","9"];
    this.row2 = ["4","5","6"];
    this.row3 = ["1","2","3"];
   
    this.history = [];
    this.previousAnswer = 0;
    this.error = false;
    this.newHand();
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

  newHand() {
    this.pot = "0";
    this.currentBet = this.bigBlind;
    this.primaryNumber = "0";
    this.potBetAmount = "0";
    this.blindsToPot();
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
  }

  potBet() {
    let x = this.pot;
    let y = this.currentBet;
    let z = 0
    z = (Number(y) * 2) + Number(x);
    this.potBetAmount = z.toString();
    this.potBetConfirm();
  }

  addPlayer(playerPosition) {
    this.players.push(playerPosition);
    this.addPlayerName(playerPosition)
  }

  nextAction() {
    var i = this.currentAction.slice(-1)
    var n = Number(i)
    var n1 = n += 1
    if(this.players.indexOf(this.currentAction.slice(0, -1) + n1.toString()) !== -1) {
      this.currentAction = this.currentAction.slice(0, -1) + n1.toString();
    } else {
    }

  }

  nextDealer() {

  }

  // Alerts

  addPlayerName(playerPosition) {
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
            var playerName = playerPosition + 'Name'
            this[playerName] = data.playerName
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
