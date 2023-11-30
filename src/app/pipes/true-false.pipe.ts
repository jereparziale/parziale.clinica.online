import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'trueFalse'
})
export class TrueFalsePipe implements PipeTransform {

  transform(value: boolean): string {
    const trueImagePath = '../../../../assets/true.png';
    
    const falseImagePath = '../../../../assets/false.png';
    // Devuelve la ruta de la imagen según el valor booleano
    return value ? trueImagePath : falseImagePath;
  }
}
