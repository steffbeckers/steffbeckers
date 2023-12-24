import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CompanyDetailComponent } from './company-detail.component';
import { CompaniesService } from '@steffbeckers/crm/data-access';
import { BehaviorSubject } from 'rxjs';
import { TestingModule } from '@steffbeckers/shared/utils/testing';

describe('CompanyDetailComponent', () => {
  let component: CompanyDetailComponent;
  let fixture: ComponentFixture<CompanyDetailComponent>;
  const companiesServiceMock = {
    get: () =>
      new BehaviorSubject({
        id: '1',
        name: 'Company 1',
      }),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestingModule, CompanyDetailComponent],
      providers: [
        {
          provide: CompaniesService,
          useValue: companiesServiceMock,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CompanyDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
