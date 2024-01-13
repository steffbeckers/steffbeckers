import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormGroup } from '@angular/forms';
import { tapResponse } from '@ngrx/operators';
import {
  patchState,
  signalStoreFeature,
  type,
  withMethods,
  withState,
} from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { Observable, tap } from 'rxjs';

export function withForm() {
  return signalStoreFeature(
    {
      methods: type<{ formOnSave(value: object): Observable<object> }>(),
    },
    withState({
      savingForm: false,
      formValue: {},
    }),
    withMethods((store) => ({
      connectForm: (form: FormGroup) =>
        rxMethod<object>((x$) =>
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
            tapResponse({
              next: console.log,
              error: console.error,
              finalize: () => patchState(store, { savingForm: false }),
            })
          )
          .subscribe();
      },
    }))
  );
}
