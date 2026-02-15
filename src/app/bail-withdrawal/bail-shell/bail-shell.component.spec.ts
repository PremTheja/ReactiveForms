import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BailShellComponent } from './bail-shell.component';

describe('BailShellComponent', () => {
  let component: BailShellComponent;
  let fixture: ComponentFixture<BailShellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BailShellComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BailShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
