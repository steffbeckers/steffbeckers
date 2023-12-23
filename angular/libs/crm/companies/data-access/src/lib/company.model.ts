export interface Company {
  id: string;
  name: string;
}

export interface DetailedCompany extends Company {
  email?: string;
  phoneNumber?: string;
  website?: string;
}
