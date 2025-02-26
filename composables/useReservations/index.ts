import type { IReservation } from './types';
import { reservations as reservationsList } from './models';

export const useReservations = () => {
  const reservations = ref<IReservation[]>(reservationsList);

  const reservationsEnum = computed<Record<number, IReservation>>(() => {
    return reservations.value.reduce((acc, curr) => {
      acc[curr.id] = curr;
      return acc;
    }, {} as Record<number, IReservation>);
  });

  return {
    reservations,
    reservationsEnum,
  };
};
