<template>
  <div>
    <q-card
      @click="showPickups = !showPickups"
      color="secondary"
      class="generic-padding notice no-margin-bottom"
    >
      <i class="fa fa-shopping-basket on-left"/>
      {{ $tc('PICKUPLIST.JOINEDNOTICE', pickups.length, { count: pickups.length }) }}
      <div
        class="card-arrow"
        :class="{ upsideDown: showPickups }"
      >
        <i class="fa fa-angle-down"/>
      </div>
    </q-card>
    <transition name="slide-toggle">
      <transition-group
        name="list"
        tag="div"
        v-if="showPickups"
      >
        <PickupItem
          v-for="pickup in pickups"
          :key="pickup.id"
          :pickup="pickup"
          @join="$emit('join', arguments[0])"
          @leave="$emit('leave', arguments[0])"
        >
          <strong v-if="pickup.store">
            <router-link :to="{ name: 'store', params: { storeId: pickup.store.id }}">
              {{ pickup.store.name }}
            </router-link>
          </strong>
          {{ $d(pickup.date, 'dateWithDayName') }}
        </PickupItem>
      </transition-group>
    </transition>
    <hr v-if="showPickups">
  </div>
</template>

<script>
import PickupItem from '@/components/Pickups/PickupItem'
import { QCard } from 'quasar'

export default {
  components: { PickupItem, QCard },
  props: {
    pickups: { required: true, type: Array },
  },
  data () {
    return {
      showPickups: true,
    }
  },
}
</script>

<style scoped lang="stylus">
@import '~slidetoggle'
.list-leave-active
  transition: all .5s
.list-leave-to
  opacity: 0
  transform: translateX(-50px)
.q-card.notice
  cursor pointer
  transition: all .2s ease;
  .card-arrow
    float: right
    transition: all .3s ease;
  .upsideDown
    transform rotate(180deg)
.q-card.notice:hover
  box-shadow: 1px 2px 2px 1px rgba(0,0,0,0.4)
hr
  margin 1em 2em
  border solid lightgrey 1px;
.no-margin-bottom
  margin-bottom 0
</style>
