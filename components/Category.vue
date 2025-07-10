<script setup lang="ts">
import type { ICategory } from '@composables/useMenu/types';

const props = defineProps<{
  category: ICategory
  length: number
}>();

const emit = defineEmits<{
  (e: 'goTop', value: ICategory): void
  (e: 'goBot', value: ICategory): void
}>();

const isParent = computed(() => {
  return !props.category.parent_id;
});

const handleTop = () => {
  if (props.category.order === 1) return;
  emit('goTop', props.category);
};

const handleBottom = () => {
  if (props.category.order === props.length) return;
  emit('goBot', props.category);
};
</script>

<template>
  <div class="category" :class="[isParent && 'parent-folder']">
    <div class="category-top">
      <div class="name">
        <b>ID: {{ category.id }}</b> {{ category.name }} | order: {{ category.order }}
      </div>

      <button :disabled="category.order === 1" @click="handleTop">
        top
      </button>

      <button :disabled="category.order === length" @click="handleBottom">
        bottom
      </button>
    </div>
    <div class="folder-inner">
      <slot />
    </div>
  </div>
</template>

<style scoped lang="scss">
.category {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  font: var(--font-14-r);
  padding-left: 1rem;
  padding-right: 1rem;
  .category-top {
    display: flex;
    gap: 1rem;
    align-items: center;
    width: 100%;
    padding-bottom: .5rem;
    border-bottom: 1px solid var(--black);
    margin-bottom: .5rem;
    .name {
      margin-right: auto;
    }
    button {
      cursor: pointer;
    }
  }
  .folder-inner {
    width: 100%;
  }
  &.parent-folder {
    padding: 1rem;
    border: 1px solid #000;
    border-radius: .5rem;
  }
}
</style>
