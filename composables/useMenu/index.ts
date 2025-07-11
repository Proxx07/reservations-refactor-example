import type { ICategory } from './types';
import { menu, setFlatList, setTreeList } from './models';

export const useMenu = () => {
  const loading = ref(true);

  const treeList = ref<ICategory[]>([]);

  const foldersOrderList = computed<Array<{ id: number, order: number }>>(() => {
    return setFlatList(treeList.value).map(folder => ({ id: folder.id, order: folder.order }));
  });

  const getList = async () => {
    loading.value = true;
    try {
      await new Promise(resolve => setTimeout(resolve, 1000)); // const result = await $axios.get('/menu');
      const array = (menu.data.items as ICategory[]) // result.data.items;
        .sort((a, b) => a.order - b.order)
        .map((category, index) => ({ ...category, order: index }));

      treeList.value = setTreeList(array);
    }
    catch (error) {
      console.log(error);
    }
    finally {
      loading.value = false;
    }
  };

  const postFoldersOrder = async () => {
    try {
      // await $axios.patch('/order', {body: foldersOrderList.value})
      console.log(foldersOrderList.value);
    }
    catch (error) {
      console.log(error);
    }
  };

  return {
    treeList,
    loading,
    getList,
    postFoldersOrder,
  };
};
