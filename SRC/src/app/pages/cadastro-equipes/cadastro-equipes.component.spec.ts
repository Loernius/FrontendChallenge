import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroEquipesComponent } from './cadastro-equipes.component';

describe('CadastroEquipesComponent', () => {
  let component: CadastroEquipesComponent;
  let fixture: ComponentFixture<CadastroEquipesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CadastroEquipesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastroEquipesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
