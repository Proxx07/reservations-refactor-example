import type { IFloor } from './types';
import { floors as floorsList } from './models';

export const useFloors = () => {
  const floors = ref<IFloor[]>(floorsList);

  return {
    floors,
  };
};
