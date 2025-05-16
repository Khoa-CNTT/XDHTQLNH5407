// stores/monStore.js
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useMonStore = defineStore('monStore', () => {
  const danhSachMon = ref([])

  return {
    danhSachMon
  }
})
