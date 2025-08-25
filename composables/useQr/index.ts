import QRCodeStyling from 'qr-code-styling';
import { qrGeneratorOptions, urlPattern } from './models';

export const useQrGenerator = () => {
  const imageWrapper = ref<HTMLElement>();
  const imageLoading = ref(false);

  const qrLink = ref('');
  const isLinkValid = computed(() => qrLink.value.length && urlPattern.test(qrLink.value));

  const blobFile = ref<Blob>();

  const generateQR = async () => {
    imageLoading.value = true;
    await new Promise(resolve => setTimeout(resolve, 1000));
    try {
      if (!isLinkValid.value || !imageWrapper.value) return; // warning toast
      imageWrapper.value.innerHTML = '';

      const qrCodeOptions = qrGeneratorOptions(qrLink.value);
      const qrCode = new QRCodeStyling(qrCodeOptions);
      qrCode.append(imageWrapper.value);
      blobFile.value = await qrCode.getRawData('svg') as Blob;
      console.log(blobFile.value);
    }
    catch (error) {
      console.log(error);
    }
    finally {
      imageLoading.value = false;
    }
  };

  return {
    blobFile,
    imageLoading,
    qrLink,
    imageWrapper,
    isLinkValid,
    generateQR,
  };
};
