import { FormControl, FormGroup } from '@angular/forms';
import { tapResponse } from '@ngrx/operators';
import {
  patchState,
  signalStoreFeature,
  type,
  withMethods,
  withState,
} from '@ngrx/signals';
import { Observable, first } from 'rxjs';
import { ErrorDto } from '../dtos/error';
import { HttpErrorResponse } from '@angular/common/http';

export type ExtractFormControl<T> = {
  [K in keyof T]: T[K] extends FormControl<infer U> ? U : T[K];
};

export function withForm<TFormGroup, TFormResponse>() {
  type TFormValue = ExtractFormControl<TFormGroup>;

  return signalStoreFeature(
    {
      methods: type<{
        formOnSave(value: TFormValue): Observable<TFormResponse>;
      }>(),
    },
    withState({
      formErrorResponse: type<ErrorDto | undefined>(),
      formResponse: type<TFormResponse>(),
      savingForm: false,
    }),
    withMethods((store) => ({
      formOnSubmit: (event: SubmitEvent, form: FormGroup) => {
        event.preventDefault();

        if (form.invalid || store.savingForm()) {
          return;
        }

        patchState(store, { savingForm: true });

        store
          .formOnSave(form.value)
          .pipe(
            first(),
            tapResponse({
              next: (formResponse) =>
                patchState(store, {
                  formResponse,
                  formErrorResponse: undefined,
                }),
              error: (response: HttpErrorResponse) =>
                patchState(store, {
                  formErrorResponse: response.error.error,
                  formResponse: undefined,
                }),
              finalize: () => patchState(store, { savingForm: false }),
            })
          )
          .subscribe();
      },
    }))
  );
}
