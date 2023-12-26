export interface Contact {
  id: string;
  firstName: string;
  lastName: string;
}

export interface DetailedContact extends Contact {
  email?: string;
  phoneNumber?: string;
}
