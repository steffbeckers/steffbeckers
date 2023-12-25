export interface Contact {
  id: string;
  firstName: string;
  lastName: string;
}

export interface DetailedCompany extends Contact {
  email?: string;
  phoneNumber?: string;
}
