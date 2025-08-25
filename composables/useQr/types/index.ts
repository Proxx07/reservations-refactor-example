import type { Options } from 'qr-code-styling/lib/types';

interface OptionsHelper {
  colorType: {
    single: boolean
    gradient: boolean
  }
  gradient?: {
    linear: boolean
    radial: boolean
    color1: string
    color2: string
    rotation: number
  }
}

export interface QrOptions extends Options {
  dotsOptionsHelper?: OptionsHelper
  backgroundOptionsHelper?: OptionsHelper
  cornersSquareOptionsHelper?: OptionsHelper
  cornersDotOptionsHelper?: OptionsHelper
}
