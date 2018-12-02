import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'arraylenght'
})
export class ArrayLenghtPipe implements PipeTransform {

  transform(value: any[], args?: any): any {
    if(value===null || value===undefined)
    {
      return 0;
    }
    return value.length;
  }

}
