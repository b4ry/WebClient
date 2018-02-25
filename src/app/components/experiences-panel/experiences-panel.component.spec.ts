import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { ExperiencesPanelComponent } from "./experiences-panel.component";

describe("ExperiencesPanelComponent", () => {
  let component: ExperiencesPanelComponent;
  let fixture: ComponentFixture<ExperiencesPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExperiencesPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExperiencesPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
