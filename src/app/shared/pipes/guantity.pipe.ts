import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'guantity'
})
export class GuantityPipe implements PipeTransform {

  transform(qnt:number,limit:number):string|null{
   if(qnt>limit)
   {return null}
   else if(qnt==limit)
   {return "out of the stock"}
   else
   {
    return `only ${qnt} left` 
   }
  }

}
