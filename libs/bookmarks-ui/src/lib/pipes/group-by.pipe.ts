import { Pipe, PipeTransform } from '@angular/core';
import { cloneDeep, get, groupBy, set } from 'lodash-es';

@Pipe({name: 'groupBy'})
export class GroupByPipe implements PipeTransform {
  public transform<T extends object>(arr: T[], path: string = 'id'): {[index: string]: T[]} | null {
    if (!arr?.length) {
      return null;
    }
    return groupBy(arr.map(i => set(cloneDeep(i), path, get(i, path).toLowerCase())), path);
  }
}
