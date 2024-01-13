import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup } from '@angular/forms';
import { tapResponse } from '@ngrx/operators';
import {
  patchState,
  signalStoreFeature,
  type,
  withMethods,
  withState,
} from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { Observable, first, tap } from 'rxjs';
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
      formValue: type<TFormValue>(),
      savingForm: false,
    }),
    withMethods((store) => ({
      connectForm: (form: FormGroup) =>
        rxMethod<TFormValue>((x$) =>
          x$.pipe(
            takeUntilDestroyed(),
            tap((formValue) => patchState(store, { formValue }))
          )
        )(form.valueChanges),
      formOnSubmit: (event: SubmitEvent, form: FormGroup) => {
        event.preventDefault();

        if (form.invalid || store.savingForm()) {
          return;
        }

        patchState(store, { savingForm: true });

        store
          .formOnSave(store.formValue())
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
