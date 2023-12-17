import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CompanyListComponent } from './company-list.component';
import { CompaniesService } from '@steffbeckers/crm/data-access/proxy/crm/companies';

describe('CompanyListComponent', () => {
  let component: CompanyListComponent;
  let fixture: ComponentFixture<CompanyListComponent>;
  const companiesServiceMock = {
    getList: jest.fn(),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompanyListComponent],
      providers: [
        {
          provide: CompaniesService,
          useValue: companiesServiceMock,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CompanyListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
