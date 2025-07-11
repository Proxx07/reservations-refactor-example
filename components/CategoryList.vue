<script setup lang="ts">
import type { ICategory } from '@composables/useMenu/types';

const props = defineProps<{
  modelValue: ICategory[]
  isChild?: boolean
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: ICategory[]): void
}>();

const handleTop = (category: ICategory) => {
  if (category.order === 1) return;
  const categoryIndex = props.modelValue.findIndex(c => c.id === category.id)!;
  const foldersClone = JSON.parse(JSON.stringify(props.modelValue)) as ICategory[];
  [foldersClone[categoryIndex - 1], foldersClone[categoryIndex]] = [foldersClone[categoryIndex], foldersClone[categoryIndex - 1]];
  emit('update:modelValue', foldersClone.map((f, i) => ({ ...f, order: i + 1 })));
};

const handleBottom = (category: ICategory) => {
  if (category.order === props.modelValue.length) return;
  const categoryIndex = props.modelValue.findIndex(c => c.id === category.id)!;
  const foldersClone = JSON.parse(JSON.stringify(props.modelValue)) as ICategory[];
  [foldersClone[categoryIndex], foldersClone[categoryIndex + 1]] = [foldersClone[categoryIndex + 1], foldersClone[categoryIndex]];
  emit('update:modelValue', foldersClone.map((f, i) => ({ ...f, order: i + 1 })));
};

const childUpdated = (category: ICategory) => {
  const foldersClone = JSON.parse(JSON.stringify(props.modelValue)) as ICategory[];
  emit('update:modelValue', foldersClone.map(f => f.id === category.id ? category : f));
};
</script>

<template>
  <div class="category-wrapper" :class="[isChild && 'category-wrapper--child']">
    <transition-group name="list-sort">
      <div v-for="category in props.modelValue" :key="category.id" class="category">
        <div class="category__top">
          <div class="name">
            <b>ID: {{ category.id }}</b>
            {{ category.name }} | order: {{ category.order }}
          </div>

          <div class="actions">
            <button :disabled="category.order === 1" @click="handleTop(category)">
              top
            </button>
            <button :disabled="category.order === props.modelValue.length" @click="handleBottom(category)">
              bottom
            </button>
          </div>
        </div>
        <template v-if="category.child && category.child.length">
          <CategoryList v-model="category.child" is-child @update:model-value="childUpdated({ ...category })" />
        </template>
        <template v-else-if="category.products">
          <div class="product-list">
            <div v-for="product in category.products" :key="product.id" class="product">
              <div class="image">
                <img :src="product.image_url">
              </div>
              <b>{{ product.name }}</b>
            </div>
          </div>
        </template>
      </div>
    </transition-group>
  </div>
</template>

<style scoped lang="scss">
.category-wrapper {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  &--child {
    padding-top: 0.2rem;
    gap: 0;
    padding-left: 1rem;
    padding-right: 1rem;
    border: 0;
    .category {
      padding: 0;
      border: none;
      border-radius: 0;
      border-bottom: 1px solid var(--black);
    }
  }
}

.category {
  width: 100%;
  padding: 2rem;
  border: 1px solid var(--black);
  border-radius: 10px;
  &__top {
    display: flex;
    gap: 1rem;
    .name {
      margin-right: auto;
    }
    .actions {
      display: flex;
      gap: 1rem;
    }
  }
}

.product-list {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  width: 100%;
  gap: 1rem;
  .product {
    .image {
      width: 100%;
      img {
        width: 100%;
        height: 200px;
        object-fit: cover;
      }
    }
  }
}
</style>
