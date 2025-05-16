import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useBookingHistoryStore = defineStore('bookingHistory', () => {
  const bookings = ref([]);

  const addBooking = (booking) => {
    bookings.value.push(booking);
  };

  const deleteBooking = (index) => {
    bookings.value.splice(index, 1);
  };

  const updateBookingFoods = (updatedBooking) => {
    const index = bookings.value.findIndex(b => b.id === updatedBooking.id);
    if (index !== -1) {
      bookings.value[index].foods = updatedBooking.foods;
    }
  };

  const loadFromLocalStorage = () => {
    const data = localStorage.getItem('bookingHistory');
    if (data) {
      bookings.value = JSON.parse(data);
    }
  };

  return {
    bookings,
    addBooking,
    deleteBooking,
    updateBookingFoods,
    loadFromLocalStorage,
  };
});
