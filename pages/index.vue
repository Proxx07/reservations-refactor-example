<script setup lang="ts">
import type { ITableWithReserve } from '@composables/useTables/types';
import { useFloors } from '@composables/useFloors';
import { useReservations } from '@composables/useReservations';
import { useScheme } from '@composables/useScheme';
import { useTables } from '@composables/useTables';

const { tables, tableEnumIndexById, resetTablesReserves } = useTables();
const { schemesEnumByTableId } = useScheme();
const { reservations, reservationsEnum } = useReservations();
const { floors } = useFloors();

const mergeReservesToTables = () => {
  reservations.value.forEach((reservation) => {
    if (reservation.items && reservation.items.length) {
      reservation.items.forEach((table) => {
        if (tableEnumIndexById.value[table.id] /* add condition reserve date is later than swiper date */) {
          tables.value[tableEnumIndexById.value[table.id]].reserves.push(reservation.id);
        }
      });
    }
  });
};

const activeFloorId = ref<number>(floors.value[0].id);
const tablesByFloor = computed<ITableWithReserve[]>(() => {
  return tables.value.filter(table => table.floorId === activeFloorId.value);
});

// wsListener((table) => {
/* tables.value[tableEnumIndexById.value[table.id]] = {
  ...tables.value[tableEnumIndexById.value[table.id]],
  status: table.status;
} */
// })

onMounted(() => {
  // call this functions every time when get reservations
  resetTablesReserves();
  mergeReservesToTables();
});
</script>

<template>
  <div class="font-16-r" style="padding: 1rem">
    <button
      v-for="floor in floors"
      :key="floor.id"
      :class="[activeFloorId === floor.id && 'active']"
      @click="activeFloorId = floor.id"
    >
      {{ floor.name }}
    </button>
    <h1>
      {{ $t('hello-world') }}
    </h1>
    <div class="scheme-wrapper">
      <div
        v-for="table in tablesByFloor"
        :key="table.id"
        class="table"
        :style="{
          '--rotate': schemesEnumByTableId[table.id] ? schemesEnumByTableId[table.id].angle : 0,
        }"
      >
        <span>
          {{ table.number }} | {{ table.itemType }} | {{ table.id }}
          <hr>
          <div v-if="table.reserves && table.reserves.length" class="reservation-data">
            {{ reservationsEnum[table.reserves[0]]?.guestUser?.givenName }}
            <br>
            {{ reservationsEnum[table.reserves[0]].phoneNumber }}
          </div>
        </span>
      </div>
    </div>
    <hr>
  </div>
</template>

<style scoped lang="scss">
button {
  cursor: pointer;
  border: 1px solid var(--black);
  padding: 1rem;
  margin-right: .5rem;
  &.active {
    background: var(--black);
    color: var(--white);
  }
}

.scheme-wrapper {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  .table {
    border: 1px solid var(--black);
    padding: 1rem;
    border-radius: var(--radius-m);
    transform: rotateZ(calc(var(--rotate) * 1deg));
    display: flex;
    span {
      transform: rotateZ(calc(var(--rotate) * -1deg));
    }
  }
}
</style>
