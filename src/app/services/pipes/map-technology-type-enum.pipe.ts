import { Pipe, PipeTransform } from '@angular/core';

import { TechnologyTypeEnum } from '../enums/technology-type.enum';

@Pipe({name: 'mapTechnologyTypeEnumPipe'})
export class MapTechnologyTypeEnumPipe implements PipeTransform {
  transform(value: number): string {
    let mappedType: string;

    mappedType = TechnologyTypeEnum[value];

    return mappedType;
  }
}