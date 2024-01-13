import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UpdateCompanyComponent } from './update-company.component';
import { TestingModule } from '@steffbeckers/shared/utils/testing';
import { CompaniesService } from '@steffbeckers/crm/data-access';
import { BehaviorSubject } from 'rxjs';

describe('UpdateCompanyComponent', () => {
  let component: UpdateCompanyComponent;
  let fixture: ComponentFixture<UpdateCompanyComponent>;
  const companiesServiceMock = {
    create: () =>
      new BehaviorSubject({
        id: '2',
        name: 'Company 2',
      }),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestingModule, UpdateCompanyComponent],
      providers: [
        {
          provide: CompaniesService,
          useValue: companiesServiceMock,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(UpdateCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
