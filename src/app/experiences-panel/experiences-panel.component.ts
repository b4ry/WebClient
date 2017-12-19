import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-experiences-panel',
  templateUrl: './experiences-panel.component.html',
  styleUrls: ['./experiences-panel.component.css']
})
export class ExperiencesPanelComponent implements OnInit {

  @Input() experiencesPanelHeight: Number;
  @Output() notifyClosingExperiencesPanel: EventEmitter<Number> = new EventEmitter<Number>();
  
  constructor() { }

  ngOnInit() {
  }

  closeExperiencesPanel(): void {
    this.experiencesPanelHeight = 0;
    this.notifyClosingExperiencesPanel.emit(this.experiencesPanelHeight);
  }
}
