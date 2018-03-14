import { Component } from '@angular/core';
import { NavController, NavParams, Platform, AlertController } from 'ionic-angular';
import { ParentComponent } from '../../parent-classes/parent-component';
import { SplitPage } from '../split/split';

@Component({
  selector: 'page-hl-split',
  templateUrl: 'hl-split.html'
})
export class HLSplitPage extends ParentComponent {
  highPot: string = "0";
  lowPot: string = "0";
  pot: string;
  denomination: string;
  splitFactor: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public platform: Platform, public alertCtrl: AlertController) {
    super(platform, alertCtrl);
    this.pot = navParams.get('pot');
    this.denomination = navParams.get('denomination');
    this.highLowSplit();

  }

  highLowSplit() {
    var denomination = Number(this.denomination);
    var players = 2;
    var potTotal = Number(this.pot);

    // Add the players to an object
    var playerPortions = {};
    for( var a = 1; a <= players; a++ ){
        var playerName1 = 'player ' + a;
        playerPortions[playerName1] = 0;
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

    this.highPot = ( playerPortions[playerName] ) + potTotal;
    this.lowPot = ( playerPortions[playerName] )
  }

  

  highSplit() {
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
          }
        },
        {
          text: 'Confirm',
          handler: data => {
            this.splitFactor = data.splitFactor;
            this.navCtrl.push(SplitPage, {denomination: this.denomination, pot: this.highPot, splitFactor: this.splitFactor})
          }
        }
      ]
    });
    alert.present();
  }

  lowSplit() {
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
          }
        },
        {
          text: 'Confirm',
          handler: data => {
            this.splitFactor = data.splitFactor;
            this.navCtrl.push(SplitPage, {denomination: this.denomination, pot: this.lowPot, splitFactor: this.splitFactor})
          }
        }
      ]
    });
    alert.present();
  }

  toHome() {
    this.navCtrl.popToRoot();
  }

}
