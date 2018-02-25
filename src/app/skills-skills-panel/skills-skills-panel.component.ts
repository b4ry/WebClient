import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { OnDestroy } from "@angular/core/src/metadata/lifecycle_hooks";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";

import { TechnologyTypeDto } from "../services/dtos/technology-type.dto";
import { TechnologyDto } from "../services/dtos/technology.dto";

import { StatisticsDialogComponent } from "../statistics-dialog/statistics-dialog.component";


@Component({
  selector: "app-skills-skills-panel",
  templateUrl: "./skills-skills-panel.component.html",
  styleUrls: ["./skills-skills-panel.component.css"]
})
export class SkillsSkillsPanelComponent implements OnInit, OnDestroy {

  @Input() public selectedTechnologyDto: TechnologyDto;

  @Output() public notifyChangingListOfTechIcons: EventEmitter<any> = new EventEmitter<any>();
  @Output() public notifyRebuildingListOfTechIcons: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() public notifySelectingTechnology: EventEmitter<TechnologyDto> = new EventEmitter<TechnologyDto>();

  private selectedTechTypeNames: Array<string> = new Array<string>();

  private aliveTechnologyTypesSubscription: boolean;
  private aliveTechnologiesSubscription: boolean;

  public technologyTypesDto: Array<TechnologyTypeDto> = new Array<TechnologyTypeDto>();
  public technologiesDto: Array<TechnologyDto> = new Array<TechnologyDto>();

  constructor(
    private activatedRoute: ActivatedRoute,
    private dialog: MatDialog) { }

  public ngOnInit(): void {
    this.aliveTechnologiesSubscription = true;
    this.aliveTechnologyTypesSubscription = true;
    this.activatedRoute.data.takeWhile(() => this.aliveTechnologyTypesSubscription)
      .subscribe(result => {
          this.technologyTypesDto = result["technologyTypes"];
        });
    this.activatedRoute.data.takeWhile(() => this.aliveTechnologiesSubscription)
      .subscribe(result => {
          this.technologiesDto = result["skills"];
        });

    const technologyName: string = this.activatedRoute.snapshot.queryParams.technologyName;
    const technologyTypeName: string = this.activatedRoute.snapshot.queryParams.technologyTypeName;

    if (technologyName && technologyTypeName) {
      this.selectedTechnologyDto = this.technologiesDto.find(technologyDto => technologyDto.name === technologyName);
      this.notifySelectingTechnology.emit(this.selectedTechnologyDto);
      this.selectedTechTypeNames.push(technologyTypeName);
      this.notifyChangingListOfTechIcons.emit(
        {
          techIconsArray: this.technologiesDto.filter(technologyDto => technologyDto.technologyType.name === technologyTypeName),
          expandList: true
        });
    }
  }

  public ngOnDestroy(): void {
    this.aliveTechnologiesSubscription = false;
    this.aliveTechnologyTypesSubscription = false;
  }

  private isExpandedTechType(technologyTypeName: string): boolean {
    return this.selectedTechTypeNames.includes(technologyTypeName);
  }

  public openStatisticsDialog(): void {
    const chartData: Array<number> = new Array<number>();

    this.technologyTypesDto.forEach(technologyTypeDto => {
      chartData.push(this.technologiesDto.filter(technologyDto => technologyDto.technologyType.name === technologyTypeDto.name).length);
    });

    const dialogConfig: MatDialogConfig = new MatDialogConfig();
    dialogConfig.width = "18em";
    dialogConfig.height = "18em";
    dialogConfig.position = { top: "33%", bottom: "0", left: "0", right: "0"};
    dialogConfig.data = {
      chartLabels: this.technologyTypesDto.map(technologyTypeDto => technologyTypeDto.name),
      chartData: chartData,
      chartType: "pie"
    };

    const dialogRef = this.dialog.open(StatisticsDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      console.log("The dialog was closed");
    });
  }

  public onToggleList(technologyTypeName: string): void {
    if (this.isExpandedTechType(technologyTypeName)) {
      const index = this.selectedTechTypeNames.indexOf(technologyTypeName, 0);

      if (this.selectedTechnologyDto && this.selectedTechnologyDto.technologyType.name === technologyTypeName) {
        this.selectedTechnologyDto = null;
        this.notifySelectingTechnology.emit(this.selectedTechnologyDto);
      }

      this.selectedTechTypeNames.splice(index, 1);

      this.notifyChangingListOfTechIcons.emit(
        {
          techIconsArray: this.technologiesDto.filter(technologyDto => technologyDto.technologyType.name === technologyTypeName),
          expandList: false
        });
    } else {
      this.selectedTechTypeNames.push(technologyTypeName);
      this.notifyChangingListOfTechIcons.emit(
        {
          techIconsArray: this.technologiesDto.filter(technologyDto => technologyDto.technologyType.name === technologyTypeName),
          expandList: true
        });
    }

    if (this.selectedTechTypeNames.length === 0) {
      this.selectedTechnologyDto = null;
      this.notifySelectingTechnology.emit(this.selectedTechnologyDto);
    }
  }

  public isTechnologyListVisible(technologyTypeName: string): boolean {
    return this.selectedTechTypeNames.includes(technologyTypeName);
  }

  public onSelectTechnology(technologyDto: TechnologyDto): void {
    if (technologyDto !== this.selectedTechnologyDto) {
      this.selectedTechnologyDto = technologyDto;
      this.notifySelectingTechnology.emit(this.selectedTechnologyDto);
    } else {
      this.selectedTechnologyDto = null;
      this.notifySelectingTechnology.emit(this.selectedTechnologyDto);
    }
  }
}
