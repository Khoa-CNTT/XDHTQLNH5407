// historyStore.js
import { reactive } from 'vue';

const state = reactive({
  orderHistory: [],
});

export function useHistoryStore() {
  return {
    orderHistory: state.orderHistory,
    addOrder(order) {
      state.orderHistory.push(order);
    },
    deleteOrder(index) {
      state.orderHistory.splice(index, 1);
    },
  };
}
