import { Component } from '@angular/core';
import { NavController, NavParams, Platform, AlertController } from 'ionic-angular';
import { ParentComponent } from '../../parent-classes/parent-component';

@Component({
  selector: 'page-split',
  templateUrl: 'split.html'
})
export class SplitPage extends ParentComponent {
  pot: string;
  denomination: string;
  splitFactor: string;
  splitAmount: string;
  extraAmount: string;
  extraChips: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public platform: Platform, public alertCtrl: AlertController) {
    super(platform, alertCtrl);
    this.pot = navParams.get('pot');
    this.denomination = navParams.get('denomination');
    this.splitFactor = navParams.get('splitFactor');
    this.split();

  }

    split() {
    var denomination = Number(this.denomination);
    var players = Number(this.splitFactor);
    var potTotal = Number(this.pot);

    // Add the players to an object
    var playerPortions = {};
    for( var i = 1; i <= players; i++ ){
        var playerName1 = 'player ' + i;
        playerPortions[playerName1] = 0;
    }

    // While there is enough money for everyone to have an even share,
    // pay each player from the potTotal
    while( potTotal >= ( denomination * players ) ){
        for( var a = 1; a <= players; a++ ){
            var playerName = 'player ' + a;
            playerPortions[playerName] += denomination;
            potTotal -= denomination;
        }
    }

    this.extraAmount = potTotal.toString();
    this.splitAmount = ( playerPortions[playerName] );
    this.extraChips = (potTotal / denomination).toString();
  }

  toHome() {
    this.navCtrl.popToRoot();
  }

}
