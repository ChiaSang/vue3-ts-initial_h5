<template>
  <router-view v-slot="{ Component }">
    <!-- <keep-alive :include="['Organization', 'Role', 'RepairTask']"> -->
    <!-- 组件name -->
    <keep-alive :include="['BillList', 'OrderList']">
      <component :is="Component" />
    </keep-alive>
    <!-- <teleport to="body">
      <corp-picker ref="corpPickerRef" />
    </teleport> -->
  </router-view>
</template>

<script setup lang="ts">
  // This starter template is using Vue 3 <script setup> SFCs
  // Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
  // import HelloWorld from './components/HelloWorld.vue'
  import { RouterView } from 'vue-router'
</script>

<style lang="scss" scoped>
  // x
</style>
