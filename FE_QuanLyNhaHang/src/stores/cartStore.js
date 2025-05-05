import { ref } from 'vue';

export const cartCount = ref(0);

export function addToCart() {
  cartCount.value++;
}
