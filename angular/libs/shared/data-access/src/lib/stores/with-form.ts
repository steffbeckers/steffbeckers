import { FormControl, FormGroup } from '@angular/forms';
import { tapResponse } from '@ngrx/operators';
import {
  patchState,
  signalStoreFeature,
  type,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { Observable, first } from 'rxjs';
import { ErrorDto } from '../dtos/error';
import { HttpErrorResponse } from '@angular/common/http';
import { effect, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

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
    withMethods(({ formOnSave, formValue, savingForm, ...store }) => ({
      connectForm: (form: FormGroup) => {
        effect(() => form.patchValue(formValue()));
      },
      formOnSubmit: (event: SubmitEvent, form: FormGroup) => {
        event.preventDefault();

        if (form.invalid || savingForm()) {
          return;
        }

        patchState(store, { savingForm: true });

        formOnSave(form.value)
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
    })),
    withHooks({
      onInit: (store, activatedRoute = inject(ActivatedRoute)) => {
        // Fill query params in form
        activatedRoute.queryParams
          .pipe(takeUntilDestroyed())
          .subscribe((queryParams) =>
            patchState(store, { formValue: queryParams as TFormValue })
          );
      },
    })
  );
}
