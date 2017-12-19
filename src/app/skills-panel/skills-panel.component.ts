import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-skills-panel',
  templateUrl: './skills-panel.component.html',
  styleUrls: ['./skills-panel.component.css']
})
export class SkillsPanelComponent implements OnInit {

  @Input() skillsPanelWidth: Number;
  @Output() notifyClosingSkillsPanel: EventEmitter<Number> = new EventEmitter<Number>();
  
  constructor() { }

  ngOnInit() {
  }

  closeSkillsPanel(): void {
    this.skillsPanelWidth = 0;
    this.notifyClosingSkillsPanel.emit(this.skillsPanelWidth);
  }
}
