import { TechnologyTypeEnum } from "../enums/technology-type.enum";

export class CreateTechnologyDto {
    public name: string;
    public technologyTypeEnum: TechnologyTypeEnum;
    public iconClass: string;
}