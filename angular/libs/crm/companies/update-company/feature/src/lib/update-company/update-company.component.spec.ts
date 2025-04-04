import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UpdateCompanyComponent } from './update-company.component';

describe('UpdateCompanyComponent', () => {
  let component: UpdateCompanyComponent;
  let fixture: ComponentFixture<UpdateCompanyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateCompanyComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UpdateCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
