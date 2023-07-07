import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sliceWords',
  standalone: true
})
export class SliceWordsPipe implements PipeTransform {

  transform(value: string, limit = 20): string {
    if (!value) return null;

    const words = value.split(' ');

    return words.length > limit ? words.slice(0, limit).join(' ') + '...' : value;
  }
}
