import type { ITableWithReserve } from './types';
import { setTableWithReserve, tables as tablesList } from './models';

export const useTables = () => {
  const tables = ref<ITableWithReserve[]>([]);

  const resetTablesReserves = () => {
    tables.value = tablesList.map(table => setTableWithReserve(table));
  };

  const tableEnumIndexById = computed<Record<number, number>>(() => {
    return tables.value.reduce((acc, curr, currentIndex) => {
      acc[curr.id] = currentIndex;
      return acc;
    }, {} as Record<number, number>);
  });

  return {
    tables,
    tableEnumIndexById,

    resetTablesReserves,
  };
};
