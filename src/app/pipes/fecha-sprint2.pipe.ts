import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fechaSprint2'
})
export class FechaSprint2Pipe implements PipeTransform {


  transform(value: any): any {
    // Parse the input date string into a JavaScript Date object
    const dateParts = value.fecha.split('/');
    const timeParts = value.horario.split(':');
    const formattedDate = new Date(+dateParts[2], +dateParts[1] - 1, +dateParts[0], +timeParts[0], +timeParts[1]);

    // Use the DatePipe to format the date
    const datePipe = new DatePipe('en-US');
    let formattedDateString = datePipe.transform(formattedDate, 'yyyy-MM-dd h:mm a');

    return `(${formattedDateString})`;
  }

}