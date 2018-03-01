import { Component } from '@angular/core';
import { NavController, NavParams, Platform, AlertController } from 'ionic-angular';
import { ParentComponent } from '../../parent-classes/parent-component';
import { HomePage } from '../home/home';

@Component({
  selector: 'page-split',
  templateUrl: 'split.html'
})
export class SplitPage extends ParentComponent {
  pot: string;
  smallBlind: string;
  splitFactor: string;
  splitAmount: string;
  extraAmount: string;
  extraChips: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public platform: Platform, public alertCtrl: AlertController) {
    // If we navigated to this page, we will have an item available as a nav param
    super(platform, alertCtrl);
    this.pot = navParams.get('pot');
    this.smallBlind = navParams.get('smallBlind');
    this.splitFactor = navParams.get('splitFactor');
    // this.isQualifyingLow();
    console.log(this.smallBlind, this.pot, this.splitFactor);
    this.split();

  }

    split() {
    var denomination = Number(this.smallBlind);
    var players = Number(this.splitFactor);
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
 
    this.extraAmount = potTotal.toString();
    this.splitAmount = ( playerPortions[playerName] );
    this.extraChips = (potTotal / denomination).toString();
    
    console.log('remaining pot: ' + potTotal );
    console.log('remaining pot: ' + potTotal / denomination + "  Chips remaining");
    console.log('each player gets', this.splitAmount); //@DEBUG
    console.log('this much is left over', this.extraAmount); //@DEBUG
  }

  toHome() {
    this.navCtrl.popToRoot();
  }

}
