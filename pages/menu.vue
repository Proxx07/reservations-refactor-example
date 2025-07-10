<script setup lang="ts">
import type { ICategory } from '@composables/useMenu/types';
import { useMenu } from '@composables/useMenu';

const { list, loading, getList } = useMenu();

const handleTop = (category: ICategory) => {
  console.log('top', category);
};

const handleBot = (category: ICategory) => {
  console.log('bot', category);
};

onMounted(() => {
  getList();
});
</script>

<template>
  <div class="menu-wrapper">
    <h1 v-if="loading">
      Loading...
    </h1>
    <div v-else class="category-list font-14-r" v-html="list.map(i => JSON.stringify(i)).join('<br/> <br/>')" />
  </div>
</template>

<style scoped>
.menu-wrapper {
  padding: 2rem 2rem;
}
</style>
