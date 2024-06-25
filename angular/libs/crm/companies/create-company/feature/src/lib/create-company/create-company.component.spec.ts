import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateCompanyComponent } from './create-company.component';
import { TestingModule } from '@steffbeckers/shared/utils/testing';
import { CompaniesService } from '@steffbeckers/crm/data-access';
import { BehaviorSubject } from 'rxjs';

describe('CreateCompanyComponent', () => {
  let component: CreateCompanyComponent;
  let fixture: ComponentFixture<CreateCompanyComponent>;
  const companiesServiceMock = {
    create: () =>
      new BehaviorSubject({
        id: '2',
        name: 'Company 2',
      }),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestingModule, CreateCompanyComponent],
      providers: [
        {
          provide: CompaniesService,
          useValue: companiesServiceMock,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
