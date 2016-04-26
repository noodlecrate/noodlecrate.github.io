import {Pipe, PipeTransform} from 'angular2/core';

@Pipe({name: 'sort',
  pure: false
})
export class SortPipe implements PipeTransform {
  transform(value: Array<any>, args: Array<string>): any {

    var propertyName = args[0];

    if (propertyName[0] === "-") {
      propertyName = propertyName.substr(1);
    }

    let sortedValue = value.sort((a, b) => {
      if (a[propertyName] < b[propertyName]) {
        return -1;
      }
      else if (a[propertyName] > b[propertyName]) {
        return 1;
      }
      else {
        return 0;
      }
    });

    if (args[0][0] === "-") {
      sortedValue = sortedValue.reverse();
    }

    return sortedValue;
  }
}
