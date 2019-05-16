<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="glossy" v-if="this.$logged.logged">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          aria-label="Menu"
          icon="menu"
        />

        <q-toolbar-title>
          Admin Dashboard
        </q-toolbar-title>

        <div>Quasar v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      bordered
      content-class="bg-grey-2"
      v-if="this.$logged.logged"
    >
      <q-list>
        <q-item-label header> Opciones </q-item-label>
        <q-item clickable @click="list">
          <q-item-label>Listar usuarios</q-item-label>
        </q-item>
        <q-item clickable @click="products">
          <q-item-label>Productos</q-item-label>
        </q-item>
        <q-item clickable @click="sales">
          <q-item-label>Nueva venta</q-item-label>
        </q-item>
        <q-item clickable @click="simulate">
          <q-item-label>Simulación ventas</q-item-label>
        </q-item>
        <q-item clickable @click="ListSales">
          <q-item-label>Ver ventas</q-item-label>
        </q-item>
      </q-list>

    </q-drawer>

    <q-page-container>
      <router-view/>
    </q-page-container>
  </q-layout>
</template>

<script>
import router from '@/router'
export default {
  name: 'LayoutDefault',
  data () {
    return {
      leftDrawerOpen: this.$q.platform.is.desktop
    }
  },
  methods: {
    list() {
      router.push({name: 'ListUsers'})
    },
    sales(){
      router.push({name: 'NewSale'})
    },
    products(){
      router.push({name: 'Products'})
    },
    simulate() {
      router.push({name: 'Simulate'})
    },
    ListSales(){
      router.push({name: 'ListSales'})
    }
  }
}
</script>

<style>
</style>
