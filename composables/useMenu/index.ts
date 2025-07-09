import type { ICategory } from './types';
import { menu } from '@composables/useMenu/models';

export const useMenu = () => {
  const loading = ref(true);

  const list = ref<ICategory[]>([]);
  const parentCategoriesEnum = ref<Record<number, ICategory>[]>({} as Record<number, ICategory>[]);

  const getList = async () => {
    loading.value = true;
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      const items = (menu.data.items as ICategory[]).reduce((acc, curr) => {
        if (curr.parent_id) {
          if (!acc[curr.parent_id]) {
            acc[curr.parent_id] = [curr];
          }
          else {
            const arr = [...acc[curr.parent_id], curr].sort((a, b) => a.order - b.order);
            acc[curr.parent_id] = arr;
          }
        }
        return acc;
      }, {} as Record<number, ICategory[]>);

      list.value = (menu.data.items as ICategory[])
        .sort((a, b) => a.order - b.order)
        .map((category, index) => {
          return {
            ...category,
            order: (category.parent_id && items[category.parent_id]) ? items[category.parent_id].findIndex(i => i.id === category.id) + 1 : index + 1,
          };
        });
    }
    catch (error) {
      console.log(error);
    }
    finally {
      loading.value = false;
    }
  };

  return {
    list,
    loading,
    getList,
  };
};
