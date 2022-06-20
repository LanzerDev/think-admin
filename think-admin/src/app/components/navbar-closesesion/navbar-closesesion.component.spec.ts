import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarClosesesionComponent } from './navbar-closesesion.component';

describe('NavbarClosesesionComponent', () => {
  let component: NavbarClosesesionComponent;
  let fixture: ComponentFixture<NavbarClosesesionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavbarClosesesionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarClosesesionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
