import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagNosotrosComponent } from './pag-nosotros.component';

describe('PagNosotrosComponent', () => {
  let component: PagNosotrosComponent;
  let fixture: ComponentFixture<PagNosotrosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PagNosotrosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PagNosotrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
