<script setup lang="ts">
import type { ICategory } from '@composables/useMenu/types';
import Category from '@components/Category.vue';
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
    <div v-else class="category-list">
      <Category
        v-for="category in list"
        :key="category.id"
        :category="category"
        :length="list.length"
        @go-top="handleTop"
        @go-bot="handleBot"
      />
    </div>
  </div>
</template>

<style scoped>
.menu-wrapper {
  padding: 2rem 2rem;
}
.category-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>
