export interface ErrorDto {
  code?: string;
  data: { [key: string]: unknown };
  details?: string;
  message: string;
  validationErrors: ErrorValidationErrorDto[];
}

export interface ErrorValidationErrorDto {
  message: string;
  members: string[];
}
