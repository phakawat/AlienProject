import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { __runInitializers } from 'tslib';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  title = 'Alien_numeral';
  outputDatial = "output";

  constructor(
    private formBuilder: FormBuilder,
  ) {}

  checkoutForm = this.formBuilder.group({
    input: ''
  });

  onSubmit(): void {
    // Process
    console.warn('Your order has been submitted', this.checkoutForm.get('input')?.getRawValue());

    let input : string = this.checkoutForm.get('input')?.getRawValue();
    var output : number = 0;

    if (this.validate(input)) {

      let alertValidinput = "some thing wrong! : the input has null or emply or can't map alien numeral";

      // alert valid
      alert(alertValidinput);

    }else {
      // string to charArray
      let chrAlienList = Array.from(input);
      let lengthChr = chrAlienList.length;

      var numBefor = 0;
      var numAffter = 0;
      
      // before < affter = - , before > affter = +
      for(let i = 0; i < lengthChr; i++){
        numAffter = this.getAlienNum(chrAlienList[lengthChr-(i+1)]);

        if (lengthChr-(i+2) >= 0) {
          numBefor = this.getAlienNum(chrAlienList[lengthChr-(i+2)]);

          //validate largest to smallest
          if (this.validateLargestToSmallest(numBefor, numAffter)) {
            let alertLargestToSmallest = "Pls Input With Condition! ( largest to smallest from left to right )";
            alert(alertLargestToSmallest);

            output = 0;
            break;
          }

        }else {
          numBefor = 0;
        }

        if ( numBefor < numAffter ) {
          output += numAffter - numBefor;
          i++;
        }
        else {
          output += numAffter;
        }

        if(this.validateSpecialCase(output, input, i)){
          output = 0;
          break;
        }

      }
    }

    // show output
    this.outputDatial = output.toString();

    // reset Form
    //this.checkoutForm.reset();
  }

  validate(input: string): boolean {
    var isValid : boolean = true;
    let mapAlienNum : Map<string, number> = this.initialData();

    //check null or emply or can't map
    if (input) {
      let chrAlienList = Array.from(input);
      isValid = chrAlienList.some( (element, index, array) => {
        return !mapAlienNum.get(element);
      } )
    }

    return isValid;
  }

  validateLargestToSmallest(charBefor: number, charAffter: number): boolean {
    var isValid : boolean = true;

    if(charBefor < charAffter) {
      switch(charBefor) { 
        case 1: { 
          if (charAffter == 1 || charAffter == 5 || charAffter == 10) {
            isValid = false;
          }
          break; 
        } 
        case 10: { 
          if (charAffter == 10 ||charAffter == 50 || charAffter == 100) {
            isValid = false;
          }
           break; 
        } 
        case 100: { 
          if (charAffter == 100 ||charAffter == 500 || charAffter == 1000) {
            isValid = false;
          }
          break; 
        } 
        default: { 
          break; 
        } 
      } 
    }else {
      isValid = false;
    }

    return isValid;
  }

  validateSpecialCase(num: number, input: string, index: number ): boolean {
    var isValid : boolean = false;
    let mapAlienPattenSpecial : Map<number,  string> = this.initialPattenSpecialData();

    let alienPattenSpecialValue = mapAlienPattenSpecial.get(num);

    if (alienPattenSpecialValue) {
      if (input.indexOf( alienPattenSpecialValue ) == -1) {

        let alertValidSpecialCase = "numeral for { "+ num +" } is not { "+ input +" }.";
        alert(alertValidSpecialCase);

        isValid = true;
      }

      let chrAlienList = Array.from(input);
      let chrAlienListLength = chrAlienList.length;

      if (chrAlienListLength - index >= 4 ) {
        if (chrAlienList[chrAlienListLength-(index+1)] == chrAlienList[chrAlienListLength- (index+2)] 
          && chrAlienList[chrAlienListLength- (index+2)] == chrAlienList[chrAlienListLength- (index+3)] 
          && chrAlienList[chrAlienListLength- (index+3)] == chrAlienList[chrAlienListLength- (index+4)]) {

            let mapAlienNum : Map<string, number> = this.initialData();
            let numOfchr = mapAlienNum.get(chrAlienList[chrAlienListLength-(index+1)]);
            var num : number = numOfchr? numOfchr :0;

            let alertValidSpecialCase = "numeral for { "+ num*4 +" } is not { "+ input.substring(chrAlienListLength-(index+4),chrAlienListLength-(index)) +" }.";
            alert(alertValidSpecialCase);
          
            isValid = true;
          
        }
      }
    }

    return isValid;
  }

  getAlienNum(input: string): number {
    var num : number = 0;
    let mapAlienNum : Map<string, number> = this.initialData();

    var tempNum = mapAlienNum.get(input);
    num = tempNum? tempNum : num;

    return num;
  }

  initialData(): Map<string, number> {
    let mapAlienNum : Map<string, number> = new Map<string, number>();

    mapAlienNum.set("A", 1);
    mapAlienNum.set("B", 5);
    mapAlienNum.set("Z", 10);
    mapAlienNum.set("L", 50);
    mapAlienNum.set("C", 100);
    mapAlienNum.set("D", 500);
    mapAlienNum.set("R", 1000);
    
    return mapAlienNum;
  }

  initialPattenSpecialData(): Map<number, string> {
    let mapAlienPattenSpecial : Map<number, string> = new Map<number, string>();

    mapAlienPattenSpecial.set(4, "AB");
    mapAlienPattenSpecial.set(9, "AZ");
    mapAlienPattenSpecial.set(40, "ZL");
    mapAlienPattenSpecial.set(90, "ZC");
    mapAlienPattenSpecial.set(400, "CD");
    mapAlienPattenSpecial.set(900, "CR");
    
    return mapAlienPattenSpecial;
  }


}
