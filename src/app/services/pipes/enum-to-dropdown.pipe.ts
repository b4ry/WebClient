import { Pipe, PipeTransform } from "@angular/core";

@Pipe({name: 'enumToDropdown'})
export class EnumToDropdownPipe implements PipeTransform {
  transform(value) : any {
    let enumKeys = [];

    for (var enumMember in value) {
      if (parseInt(enumMember, 10)) {
        enumKeys.push({key: enumMember, value: value[enumMember]});
      } 
    }

    return enumKeys;
  }
}