import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ControleTorneioComponent } from './controle-torneio.component';

describe('ControleTorneioComponent', () => {
  let component: ControleTorneioComponent;
  let fixture: ComponentFixture<ControleTorneioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ControleTorneioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ControleTorneioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
