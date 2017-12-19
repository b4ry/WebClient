import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-projects-panel',
  templateUrl: './projects-panel.component.html',
  styleUrls: ['./projects-panel.component.css']
})
export class ProjectsPanelComponent implements OnInit {

  @Input() projectsPanelWidth: Number;
  @Output() notifyClosingProjectsPanel: EventEmitter<Number> = new EventEmitter<Number>();

  constructor() { }

  ngOnInit() {
  }

  closeProjectsPanel(): void {
    this.projectsPanelWidth = 0;
    this.notifyClosingProjectsPanel.emit(this.projectsPanelWidth);
  }
}
