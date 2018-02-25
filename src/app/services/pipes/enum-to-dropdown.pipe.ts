import { Pipe, PipeTransform } from "@angular/core";

@Pipe({name: "enumToDropdown"})
export class EnumToDropdownPipe implements PipeTransform {
  public transform(enumCollection): any {
    const enumKeys = [];

    for (const enumMember in enumCollection) {
      if (parseInt(enumMember, 10)) {
        enumKeys.push({key: enumMember, value: enumCollection[enumMember]});
      }
    }

    return enumKeys;
  }
}