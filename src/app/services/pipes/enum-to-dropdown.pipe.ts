import { Pipe, PipeTransform } from "@angular/core";

@Pipe({name: 'enumToDropdown'})
export class EnumToDropdownPipe implements PipeTransform {
  transform(enumCollection) : any {
    let enumKeys = [];

    for (var enumMember in enumCollection) {
      if (parseInt(enumMember, 10)) {
        enumKeys.push({key: enumMember, value: enumCollection[enumMember]});
      } 
    }

    return enumKeys;
  }
}