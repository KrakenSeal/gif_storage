import { Pipe, PipeTransform } from '@angular/core';
import { GifMeta } from '../models/gif-meta.model';

@Pipe({
  name: 'filterByText',
})
export class FilterByTextPipe implements PipeTransform {
  transform(items: GifMeta[], searchText: string): any[] {
    if (!items) {
      return [];
    }
    if (!searchText) {
      return items;
    }
    searchText = searchText.toLowerCase();
    return items.filter((item) => {
      return !!item.name && item.name.toLowerCase().includes(searchText);
    });
  }
}
