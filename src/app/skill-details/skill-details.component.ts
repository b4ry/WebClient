import { Component, OnInit, Input } from '@angular/core';

import { TechnologyDto } from '../services/dtos/technology.dto';

@Component({
  selector: 'app-skill-details',
  templateUrl: './skill-details.component.html',
  styleUrls: ['./skill-details.component.css']
})
export class SkillDetailsComponent implements OnInit {

  @Input() selectedTechnologyDto: TechnologyDto;
  
  constructor() { }

  ngOnInit() {
  }

}
