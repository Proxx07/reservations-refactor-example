<script setup lang="ts">
import CategoryList from '@components/CategoryList.vue';
import { useMenu } from '@composables/useMenu';

const { treeList, loading, getList, postFoldersOrder } = useMenu();

onMounted(() => {
  getList();
});
</script>

<template>
  <div class="menu-wrapper">
    <h1 v-if="loading">
      Loading...
    </h1>
    <CategoryList v-model="treeList" @update:model-value="postFoldersOrder" />
  </div>
</template>

<style scoped>
.menu-wrapper {
  padding: 2rem 2rem;
  min-height: 100vh;
  font: var(--font-14-r);
}
</style>
