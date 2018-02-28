import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { SplitPage } from '../split/split';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  //Number Pannel
  row1 : Array<string>;
  row2 : Array<string>;
  row3 : Array<string>;
  handStages : Array<string>;
  smallBlind: string = ".25";
  bigBlind: string = ".50";
  pot: string = "0";
  potBetAmount: string = "0";
  currentBet: string = this.bigBlind;
  handStatus: string = "Pre-Flop";
  primaryNumber: string = "0";
  highPot: string = "0";
  lowPot: string = "0";
  previousAnswer:number=0;
  history:Array<string>
  error:boolean;

  constructor(public navCtrl: NavController, public alertCtrl: AlertController) {
    this.handStages = ["Pre-Flop", "Flop", "Turn", "River"];
    //Number Panel
    this.row1 = ["7","8","9"];
    this.row2 = ["4","5","6"];
    this.row3 = ["1","2","3"];
   
    this.history = [];
    this.previousAnswer = 0;
    this.error = false;
    this.setBlinds();
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

  call() {
    let x = this.currentBet;
    let y = this.pot;
    let z = 0
    z = Number(x) + Number(y);
      this.pot = z.toString();
    

  }

  changeHandStatus() {
    if(this.handStatus === "Pre-Flop") {
      this.handStatus = "Flop";
      this.currentBet = "0";
      
    }
   else if(this.handStatus === "Flop") {
      this.handStatus = "Turn";
      this.currentBet = "0";
      
    }
    else if (this.handStatus === "Turn") {
      this.handStatus = "River";
      this.currentBet = "0";
      
    }
  }

  newHand() {
    this.pot = "0";
    this.handStatus = "Pre-Flop";
    this.currentBet = this.bigBlind;
    this.primaryNumber = "0";
    this.potBetAmount = "0";
    this.blindsToPot();
  }

  
  clear(){
    this.error = false;
    this.primaryNumber = "0";
  }
  
  addDecimal(){
    this.primaryNumber.indexOf(".") == -1? this.primaryNumber+=".":null;
  }

  blindsToPot() {
    let x = this.smallBlind;
    let y = this.bigBlind;
    let z = 0
    z = Number(x) + Number(y);
    this.pot = z.toString();
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
        // this.underBetAlert();
      }
    } 
    this.pot = z.toString();
    this.primaryNumber = "0";
    // this.potBet();
  }

  potBet() {
    let x = this.pot;
    let y = this.currentBet;
    let z = 0
    z = (Number(y) * 2) + Number(x);
    this.potBetAmount = z.toString();
    this.potBetConfirm();
  }

  underBetAlert() {
    let alert = this.alertCtrl.create({
      title: 'Is somebody All in?',
      subTitle: 'Calls that are smaller than the current bet must be entered manually.',
      buttons: ['Dismiss']
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
          text: 'Confirm Blinds',
          handler: data => {
            this.smallBlind = data.smallBlind;
            this.bigBlind = data.bigBlind;
            this.blindsToPot();
            this.currentBet = this.bigBlind;
            this.handStatus = "Pre-Flop"
            
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
    this.navCtrl.push(SplitPage, {smallBlind: smallBlind});
    let alert = this.alertCtrl.create({
      title: 'Is there a qualifying low?',
      buttons: [
        {
          text: 'Yes',
          handler: () => {
            this.highLowSplit();
          }
        },
        {
          text: 'No',
          handler: () => {
            console.log('Buy clicked');
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

  highLowSplit() {
    var denomination = Number(this.smallBlind);
    var players = 2;
    var potTotal = Number(this.pot);

    // Add the players to an object
    var playerPortions = {};
    for( var i = 1; i <= players; i++ ){
        var playerName = 'player ' + i;
        playerPortions[playerName] = 0;
    }

    // While there is enough money for everyone to have an even share,
    // pay each player from the potTotal
    while( potTotal >= ( denomination * players ) ){
        for( var i = 1; i <= players; i++ ){
            var playerName = 'player ' + i;
            playerPortions[playerName] += denomination;
            potTotal -= denomination;
        }
    }

    this.highPot = ( playerPortions[playerName] ) + potTotal / denomination;
    this.lowPot = ( playerPortions[playerName] )
    
    console.log('remaining pot: ' + potTotal );
    console.log('remaining pot: ' + potTotal / denomination + "  Chips remaining");
    console.log('high pot', this.highPot); //@DEBUG
    console.log('low pot', this.lowPot); //@DEBUG
  }
  

  onError(){
    this.primaryNumber = "ERROR";
    this.error = true;
    this.previousAnswer = 0;
  }
}
