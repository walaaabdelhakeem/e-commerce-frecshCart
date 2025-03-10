import { Pipe, PipeTransform } from '@angular/core';
import { Iproduct } from '../../features/product/models/iproduct';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(products:Iproduct[],text:string):Iproduct[] {
    if (!products || !text) {
      return products;
    }

    text = text.toLowerCase();
    return products.filter((item) => item.title.toLowerCase().includes(text));
  }

}
