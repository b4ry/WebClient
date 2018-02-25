import { TechnologyProjectDto } from "./technology-project.dto";
import { TechnologyTypeDto } from "./technology-type.dto";

import { TechnologyItemStateEnum } from "../enums/technnology-item-state.enum";

export class TechnologyDto {
    public name: string;
    public projects: Array<TechnologyProjectDto>;
    public technologyType: TechnologyTypeDto;
    public iconClass: string;
    public itemState: TechnologyItemStateEnum;
}