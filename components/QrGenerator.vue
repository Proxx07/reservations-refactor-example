<script setup lang="ts">
import { useQrGenerator } from '@composables/useQr';

const { blobFile, imageLoading, qrLink, imageWrapper, generateQR } = useQrGenerator();

const text = computed(() => imageLoading.value ? 'Загрузка...' : 'Сгенерируйте QR указав ссылку');
</script>

<template>
  <div class="qr-wrapper">
    <div class="canvas-wrapper">
      <transition name="fade">
        <div v-if="!blobFile || imageLoading" class="canvas-placeholder" v-text="text" />
      </transition>
      <div ref="imageWrapper" />
    </div>
    <input v-model="qrLink" type="text">
    <button @click="generateQR">
      Generate image
    </button>
  </div>
</template>

<style scoped lang="scss">
.qr-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.canvas-wrapper {
  position: relative;
  width: 320px;
  height: 320px;
}

.canvas-placeholder {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.7);
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  font: var(--font-18-r);
  border-radius: 10px;
}
</style>
