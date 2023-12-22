import { effect } from '@angular/core';
import {
  patchState,
  signalStoreFeature,
  type,
  withHooks,
  withMethods,
} from '@ngrx/signals';

export type PersistenceConfig = {
  autoSave: boolean;
  keyPrefix?: string;
  rehydrate: boolean;
  storage: Storage;
};

export const defaultPersistenceConfig: PersistenceConfig = {
  autoSave: true,
  rehydrate: false,
  storage: localStorage,
};

export const withPersistence = <T extends object>(
  storageKey: string,
  keys: (keyof T)[],
  config?: Partial<PersistenceConfig>
) => {
  config = { ...defaultPersistenceConfig, ...config };

  if (!config.storage) {
    throw 'storage is undefined';
  }

  const { autoSave, keyPrefix, rehydrate, storage } = config;

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
            keys.reduce((prev, curr) => {
              // TODO
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
};
