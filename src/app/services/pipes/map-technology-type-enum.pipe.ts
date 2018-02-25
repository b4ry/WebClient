import { Pipe, PipeTransform } from "@angular/core";

import { TechnologyTypeEnum } from "../../models/enums/technology-type.enum";

@Pipe({name: "mapTechnologyTypeEnumPipe"})
export class MapTechnologyTypeEnumPipe implements PipeTransform {
  public transform(value: number): string {
    let mappedType: string;

    mappedType = TechnologyTypeEnum[value];

    return mappedType;
  }
}