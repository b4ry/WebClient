import { TechnologyTypeEnum } from "../enums/technology-type.enum";

export class CreateTechnologyDto {
    name: string;
    technologyTypeEnum: TechnologyTypeEnum;
    iconClass: string;
}