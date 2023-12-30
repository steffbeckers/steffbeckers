import { effect } from '@angular/core';
import {
  patchState,
  signalStoreFeature,
  type,
  withHooks,
  withMethods,
} from '@ngrx/signals';
import { NamedEntityState } from '@ngrx/signals/entities';

export type PersistenceConfig<T> = {
  autoSave: boolean;
  excludedKeys: (keyof T)[];
  keyPrefix?: string;
  rehydrate: boolean;
  storage: Storage;
};

export const defaultPersistenceConfig: PersistenceConfig<object> = {
  autoSave: true,
  excludedKeys: [],
  rehydrate: true,
  storage: localStorage,
};

export function withPersistence<T extends object | NamedEntityState<T, string>>(
  storageKey: string,
  config?: Partial<PersistenceConfig<T>>
) {
  config = { ...defaultPersistenceConfig, ...config };
  config.excludedKeys ??= [];

  if (!config.storage) {
    throw 'storage is undefined';
  }

  const { autoSave, excludedKeys, keyPrefix, rehydrate, storage } = config;

  return signalStoreFeature(
    { state: type<T>() },
    withMethods((state) => ({
      loadFromStorage: () =>
        patchState(
          state,
          JSON.parse(storage.getItem(`${keyPrefix ?? ''}${storageKey}`) ?? '{}')
        ),
      saveToStorage: () =>
        storage.setItem(
          `${keyPrefix ?? ''}${storageKey}`,
          JSON.stringify(
            Object.keys(state)
              .filter((x) => !excludedKeys.includes(x as keyof T))
              .reduce((prev, curr) => {
                // TODO: Can we type this state?
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                prev[curr as string] = (state as any)[curr]();

                return prev;
              }, {} as { [key: string]: unknown })
          )
        ),
      clearStorage: () => storage.removeItem(`${keyPrefix ?? ''}${storageKey}`),
    })),
    withHooks({
      onInit({ loadFromStorage, saveToStorage }) {
        if (rehydrate) {
          loadFromStorage();
        }

        if (autoSave) {
          effect(() => {
            saveToStorage();
          });
        }
      },
    })
  );
}
