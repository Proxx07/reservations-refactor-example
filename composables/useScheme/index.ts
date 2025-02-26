import type { IScheme } from './types';
import { schemes as schemeList } from './models';

export const useScheme = () => {
  const schemes = ref<IScheme[]>(schemeList);

  const schemesEnumByTableId = computed<Record<number, IScheme>>(() => {
    return schemes.value.reduce((acc, curr) => {
      acc[curr.itemId] = curr;
      return acc;
    }, {} as Record<number, IScheme>);
  });

  return {
    schemes,
    schemesEnumByTableId,
  };
};
