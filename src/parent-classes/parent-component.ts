export class ParentComponent {
    public platform: any;
    public alertCtrl: any;
    constructor( alertCtrl, platform ) {
        this.alertCtrl = alertCtrl;
        this.platform = platform;
    }

    showAlert( title, message, buttonText ) {
        let alert = this.alertCtrl.create({
            title: title,
            subTitle: message,
            buttons: [buttonText]
        });
        alert.present();
    }
}