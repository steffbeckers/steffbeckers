import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ContactDetailComponent } from './contact-detail.component';
import { ContactsService } from '@steffbeckers/crm/data-access';
import { BehaviorSubject } from 'rxjs';
import { TestingModule } from '@steffbeckers/shared/utils/testing';

describe('ContactDetailComponent', () => {
  let component: ContactDetailComponent;
  let fixture: ComponentFixture<ContactDetailComponent>;
  const contactsServiceMock = {
    get: () =>
      new BehaviorSubject({
        id: '1',
        name: 'Company 1',
      }),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestingModule, ContactDetailComponent],
      providers: [
        {
          provide: ContactsService,
          useValue: contactsServiceMock,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ContactDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
