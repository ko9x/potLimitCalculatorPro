import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

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
  secondaryNumber:string = null;
  currentOperation:string = null;
  previousAnswer:number=0;
  ac : boolean;
  history:Array<string>
  error:boolean;

  constructor(public navCtrl: NavController, public alertCtrl: AlertController) {
    this.handStages = ["Pre-Flop", "Flop", "Turn", "River"];
    //Number Panel
    this.row1 = ["7","8","9"];
    this.row2 = ["4","5","6"];
    this.row3 = ["1","2","3"];
   
    this.ac = false;
    this.history = [];
    this.previousAnswer = 0;
    this.error = false;
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
  }

  

  clear(){
    this.error = false;
    this.primaryNumber = "0";
    this.secondaryNumber==null?null:this.ac = true;
  }
  allClear(){
    this.secondaryNumber = null;
    this.currentOperation = null;
    this.previousAnswer = 0;
    this.ac = false;
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
        this.underBetAlert();
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
    this.potBetAlert();
  }

  onError(){
    this.primaryNumber = "ERROR";
    this.error = true;
    this.previousAnswer = 0;
  }

  underBetAlert() {
    let alert = this.alertCtrl.create({
      title: 'Is somebody All in?',
      subTitle: 'Calls that are smaller than the current bet must be entered manually.',
      buttons: ['Dismiss']
    });
    alert.present();
  }

  potBetAlert() {
    let alert = this.alertCtrl.create({
      title: 'The pot bet amount is currently',
      subTitle: this.potBetAmount,
      buttons: ['Dismiss']
    });
    alert.present();
  }
}
