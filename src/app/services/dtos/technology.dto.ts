import { TechnologyProjectDto } from "./technology-project.dto";
import { TechnologyTypeDto } from "./technology-type.dto";

import { TechnologyItemStateEnum } from "../enums/technnology-item-state.enum";

export class TechnologyDto {
    name: string;
    projects: TechnologyProjectDto[];
    technologyType: TechnologyTypeDto;
    iconClass: string;
    itemState: TechnologyItemStateEnum;
}