import type { ICategory } from './types';
import { menu } from '@composables/useMenu/models';

/* const treeList = computed<ICategory[]>(() => {
  const map = new Map<number, ICategory>();
  let currentOrder = 0;

  const clonedList = list.value.map(cat => ({
    ...cat,
    child: [] as ICategory[],
  }));

  clonedList.forEach(cat => map.set(cat.id, cat));

  const roots: ICategory[] = [];

  clonedList.forEach((cat) => {
    if (cat.parent_id && map.has(cat.parent_id)) {
      map.get(cat.parent_id)!.child.push(cat);
    }
    else {
      roots.push(cat);
    }
  });

  function sortAndAssignOrder(nodes: ICategory[]) {
    nodes.sort((a, b) => a.order - b.order);
    for (const node of nodes) {
      node.order = ++currentOrder;
      if (node.child && node.child.length > 0) {
        sortAndAssignOrder(node.child);
      }
    }
  }

  sortAndAssignOrder(roots);

  return roots;
}); */

export const useMenu = () => {
  const loading = ref(true);

  const list = ref<ICategory[]>([]);

  const listEnum = computed<Record<number, ICategory>>(() => {
    return list.value.reduce((acc, curr) => {
      acc[curr.id] = curr;
      return acc;
    }, {} as Record<number, ICategory>);
  });

  const listByIndex = computed<Record<number, number>>(() => {
    return list.value.reduce((acc, curr, currentIndex) => {
      acc[curr.id] = currentIndex;
      return acc;
    }, {} as Record<number, number>);
  });

  const treeList = ref<ICategory[]>([]);

  const getList = async () => {
    loading.value = true;
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      list.value = (menu.data.items as ICategory[]).sort((a, b) => a.order - b.order).map((category, index) => ({ ...category, order: index }));
      const arrayClone = list.value.map(i => i);
      nextTick(() => {
        let count = 0;
        for (const item of arrayClone) {
          if (!item.parent_id && !listEnum.value[item.id].parent_id) {
            treeList.value.push({ ...item, order: ++count });
          }
        }
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
