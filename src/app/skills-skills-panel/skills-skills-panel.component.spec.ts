import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SkillsSkillsPanelComponent } from './skills-skills-panel.component';

describe('SkillsSkillsPanelComponent', () => {
  let component: SkillsSkillsPanelComponent;
  let fixture: ComponentFixture<SkillsSkillsPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SkillsSkillsPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SkillsSkillsPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
