import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserdataPanelComponent } from './userdata-panel.component';

describe('UserdataPanelComponent', () => {
  let component: UserdataPanelComponent;
  let fixture: ComponentFixture<UserdataPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserdataPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserdataPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
