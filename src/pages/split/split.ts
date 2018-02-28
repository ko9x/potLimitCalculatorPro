import { Component } from '@angular/core';
import { NavController, NavParams, Platform, AlertController } from 'ionic-angular';
import { ParentComponent } from '../../parent-classes/parent-component';

@Component({
  selector: 'page-split',
  templateUrl: 'split.html'
})
export class SplitPage extends ParentComponent {
  pot: string;
  smallBlind: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public platform: Platform, public alertCtrl: AlertController) {
    // If we navigated to this page, we will have an item available as a nav param
    super(platform, alertCtrl);
    this.pot = navParams.get('pot');
    this.smallBlind = navParams.get('smallBlind');
    console.log(this.smallBlind, this.pot);

  }

}
