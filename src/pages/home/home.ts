import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  //Number Pannel
  row1 : Array<string>;
  row2 : Array<string>;
  row3 : Array<string>;
  panel : Array<Array<object>>;
  pot: string = "0";
  primaryNumber: string = "";
  secondaryNumber:string = null;
  currentOperation:string = null;
  previousAnswer:number=0;
  ac : boolean;
  history:Array<string>
  error:boolean;

  constructor(public navCtrl: NavController) {
    //Number Panel
    this.row1 = ["7","8","9"];
    this.row2 = ["4","5","6"];
    this.row3 = ["1","2","3"];
    this.panel = [
      [
        {
          text: "C",
          color: "primary",
          col3: true,
          click: "clear()",
        },
        {
          text: "+/-",
          color: "primary",
          width: "col-3",
          click: "changeSign()",
        },
        {
          text: "%",
          color: "primary",
          width: "col-3",
          click: "percertange()",
        },
        {
          text: "/",
          color: "primary",
          width: "col-2",
          click: "operation('/')",
        }
      ],
      [
        {
          text: "7",
          color: "light",
          width: "col-3",
          click: "register(7)",
        },
        {
          text: "8",
          color: "light",
          width: "col-3",
          click: "register(8)",
        },
        {
          text: "9",
          color: "light",
          width: "col-3",
          click: "register(9)",
        },
        {
          text: "x",
          color: "primary",
          width: "col-2",
          click: "operation('*')",
        }
      ],
      [
        {
          text: "4",
          color: "light",
          width: "col-3",
          click: "register(4)",
        },
        {
          text: "5",
          color: "light",
          width: "col-3",
          click: "register(5)",
        },
        {
          text: "6",
          color: "light",
          width: "col-3",
          click: "register(6)",
        },
        {
          text: "-",
          color: "primary",
          width: "col-2",
          click: "operation('-')",
        }
      ],
      [
        {
          text: "1",
          color: "light",
          width: "col-3",
          click: "register(1)",
        },
        {
          text: "2",
          color: "light",
          width: "col-3",
          click: "register(2)",
        },
        {
          text: "3",
          color: "light",
          width: "col-3",
          click: "register(3)",
        },
        {
          text: "+",
          color: "primary",
          width: "col-2",
          click: "operation('+')",
        }
      ],
      [
        {
          text: "0",
          color: "light",
          width: "col-6",
          click: "register(0)",
        },
        {
          text: ".",
          color: "light",
          width: "col-3",
          click: "decimal()",
        },
        {
          text: "=",
          color: "primary",
          width: "col-2",
          click: "solve()",
        }
      ]
    ];
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
    if(this.primaryNumber===""){
      this.primaryNumber = n;
    }else{
      if(this.primaryNumber.length<=40){
        this.primaryNumber += n;
      }
    }
  }
  // changeSign(){
  //   if(this.primaryNumber!=="0"){
  //     this.primaryNumber[0] == "-" ? this.primaryNumber = this.primaryNumber.substring(1):this.primaryNumber = "-"+this.primaryNumber;    
  //   }
  // }
  clear(){
    this.error = false;
    this.primaryNumber = "";
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
  // setOperation(o:string){
  //   if(this.primaryNumber!=="0"){
  //     if(this.secondaryNumber!==null){
  //       this.solve(false);
  //       this.primaryNumber = "0";
  //     }else{
  //       this.secondaryNumber = this.primaryNumber;
  //       this.primaryNumber = "0";
  //     }
  //     this.currentOperation = o;
  //   }
  // }
  // percentage(){
  //   this.primaryNumber!=="0" ? this.primaryNumber = (Number(this.primaryNumber)/100).toString():null;
  //   this.previousAnswer = Number(this.primaryNumber);
  // }


  solve() {
    var x = this.primaryNumber
    var y = this.pot
    var z = 0
    if(x !== "") {
      z = (+x + +y);
    }
    this.pot = z.toString();
    this.primaryNumber = "";

  }


  // solve(flag:boolean){
  //   if(this.secondaryNumber!==null){
  //     let number1 = Number(this.primaryNumber);
  //     let number2 = Number(this.secondaryNumber);
  //     let result;
  //     switch (this.currentOperation){
  //       case "+":{
  //         result = number1 + number2
  //         break;
  //       }
  //       case "-":{
  //         result = number2 - number1;
  //         break;
  //       }
  //       case "x":{
  //         result = number1 * number2;
  //         break;
  //       }
  //       case "/":{
  //         if(number1===0){
  //           this.onError();
  //         }else{
  //           result = number2 / number1;
  //         }
  //         break;
  //       }
  //     }
  //     if(!this.error){
  //       result.toFixed(2);
  //       if(result.toString().length > 10){
  //         result = result.toExponential(3); 
  //       }
  //       this.secondaryNumber = null;
  //       this.currentOperation = null;
  //       this.previousAnswer = result;
  //       console.log(this.previousAnswer);
  //       flag ? this.primaryNumber = result.toString():this.secondaryNumber = result.toString();
  //       console.log(this.primaryNumber)
  //     }
  //   }
  // }



  // setOld(n:string){
  //   this.primaryNumber = n;
  // }
  onError(){
    this.primaryNumber = "ERROR";
    this.error = true;
    this.previousAnswer = 0;
  }
}
