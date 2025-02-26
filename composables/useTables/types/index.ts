import type { IFloor } from '@composables/useFloors/types';
import type { IReservation } from '@composables/useReservations/types';

export type TableType =
  'table1' | 'table2' | 'table3' | 'table4' | 'table5' |
  'table6' | 'table7' | 'table8' | 'table9' | 'table10' |
  'table11' | 'table12' | 'table13' | 'table14' | 'table15' |
  'table16' | 'table17' | 'table18' | 'table19' | 'table20';

export interface ITable {
  id: number
  count: number
  number: number
  priority: number
  canGuestReserve: boolean
  isActive: boolean
  createdTime: Date | string
  floorId: number
  floor: IFloor
  itemType: TableType

  imageUrl: null
  itemClassId: null
  typeId: null
  isPosReserved: boolean
  isPrintedBill: boolean
  isPosMapped: boolean
}

export interface ITableWithReserve extends ITable {
  reserves: IReservation['id'][]
}
