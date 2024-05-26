import { effect } from '@angular/core';
import {
  patchState,
  signalStoreFeature,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';

export type PersistenceConfig = {
  autoSave: boolean;
  excludedKeys: string[];
  rehydrate: boolean;
  storage: Storage;
};

export const defaultPersistenceConfig: PersistenceConfig = {
  autoSave: true,
  excludedKeys: [],
  rehydrate: true,
  storage: localStorage,
};

export function withPersistence(
  storageKey?: string,
  config?: Partial<PersistenceConfig>
) {
  if (!storageKey) {
    return signalStoreFeature(withState({}));
  }

  config = { ...defaultPersistenceConfig, ...config };
  config.excludedKeys ??= [];

  if (!config.storage) {
    throw 'storage is undefined';
  }

  const { autoSave, excludedKeys, rehydrate, storage } = config;

  return signalStoreFeature(
    withMethods((state) => ({
      loadFromStorage: () =>
        patchState(state, JSON.parse(storage.getItem(storageKey) ?? '{}')),
      saveToStorage: () =>
        storage.setItem(
          storageKey,
          JSON.stringify(
            Object.keys(state)
              .filter((x) => !excludedKeys.includes(x))
              .reduce((prev, curr) => {
                // TODO: Can we type this state?
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                prev[curr as string] = (state as any)[curr]();

                return prev;
              }, {} as { [key: string]: unknown })
          )
        ),
      clearStorage: () => storage.removeItem(storageKey),
    })),
    withHooks({
      onInit: ({ loadFromStorage, saveToStorage }) => {
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
