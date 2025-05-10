<template>
  <div class="w-[calc(100vw-300px)] h-[calc(100vh-100px)] fixed z-0 mt-20 ms-[300px] flex flex-col p-2">
    <div class="h-full w-full flex flex-col font-bold">
      <p class="uppercase text-2xl">Lịch sử đặt bàn</p>
      <div class="w-full h-full flex flex-col">
        <div class="w-full h-fit flex flex-row p-2">
          <div class="flex flex-row flex-1 gap-5">
            <div @click="showAll" :class="[
              'hover:cursor-pointer hover:border-b-4 hover:text-red-500 hover:border-red-500',
              statusFilter === null ? 'text-red-500 border-b-4 border-red-500' : '']">
              Tất cả
            </div>
            <div @click="showSuccess" :class="[
              'hover:cursor-pointer hover:border-b-4 hover:text-red-500 hover:border-red-500',
              statusFilter === 2 ? 'text-red-500 border-b-4 border-red-500' : '']">
              Hoàn thành
            </div>
            <div @click="showReject" :class="[
              'hover:cursor-pointer hover:border-b-4 hover:text-red-500 hover:border-red-500',
              statusFilter === 3 ? 'text-red-500 border-b-4 border-red-500' : '']">
              Từ chối
            </div>
            <div @click="showCancel" :class="[
              'hover:cursor-pointer hover:border-b-4 hover:text-red-500 hover:border-red-500',
              statusFilter === 4 ? 'text-red-500 border-b-4 border-red-500' : '']">
              Bị huỷ
            </div>
            <div @click="showWait" :class="[
              'hover:cursor-pointer hover:border-b-4 hover:text-red-500 hover:border-red-500',
              statusFilter === 1 ? 'text-red-500 border-b-4 border-red-500' : '']">
              Đang chờ
            </div>
          </div>

          <div class="flex flex-row flex-1 gap-2 justify-end items-center">
            <Search v-model="searchQuery" />
            <input class="border border-gray-300" type="time" v-model="selectedTime" />
            <input class="border border-gray-300" type="date" v-model="selectedDate" />
          </div>
        </div>
        <div class="w-full h-fit border-t border-gray-400 px-2 pt-2">
          <table class="w-full table-auto font-semibold text-sm">
            <thead>
              <tr class="border-2 border-gray-300">
                <th>
                  <div class="flex flex-row justify-center items-center gap-2">
                    <SortButton @sort="(direction) => sortBy('id', direction)" />
                    <p class="text-start w-full">ID</p>
                  </div>
                </th>
                <th>
                  <div class="flex flex-row justify-center items-center gap-2">
                    <SortButton @sort="(direction) => sortBy('status', direction)" />
                    <p>Trạng thái</p>
                  </div>
                </th>
                <th>
                  <div class="flex flex-row justify-center items-center gap-2">
                    <SortButton @sort="(direction) => sortBy('status', direction)" />
                    <p>Người đặt</p>
                  </div>
                </th>
                <th>
                  <div class="flex flex-row justify-center items-center gap-2">
                    <SortButton @sort="(direction) => sortBy('timeBooking', direction)" />
                    <p>Thời gian đặt</p>
                  </div>
                </th>
                <th>
                  <div class="flex flex-row justify-center items-center gap-2">
                    <SortButton @sort="(direction) => sortBy('total', direction)" />

                    <p>Tổng</p>
                  </div>
                </th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in paginatedItems" :key="index" class="border-2 border-gray-300">
                <td>
                  <div class="h-16 flex flex-row justify-start items-center px-2">
                    <p>#</p>
                    <p>{{ item.id }}</p>
                  </div>
                </td>
                <td>
                  <div class="h-16 flex justify-center items-center">
                    <p v-if="item.status === 1" class="bg-yellow-500 w-32 text-center p-2">
                      Đang chờ
                    </p>
                    <p v-else-if="item.status === 2" class="bg-green-500 w-32 text-center p-2">
                      Hoàn thành
                    </p>
                    <p v-else-if="item.status === 3" class="bg-red-500 w-32 text-center p-2">
                      Từ chối
                    </p>
                    <p v-else-if="item.status === 4" class="bg-red-500 w-32 text-center p-2">
                      Bị huỷ
                    </p>
                  </div>
                </td>
                <td>
                  <div class="h-16 flex justify-center items-center px-2">
                    <p>{{ item.customer.FullName }}</p>
                  </div>
                </td>
                <td>
                  <div class="h-16 flex justify-center items-center px-2">
                    <p>{{ item.timeBooking }}</p>
                  </div>
                </td>
                <td>
                  <div class="h-16 flex justify-center items-center px-2 gap-1">
                    <p>{{ calculateTotal(item.booking_foods).toLocaleString() }}</p>
                    <p>VNĐ</p>
                  </div>
                </td>
                <td class="text-center">
                  <div class="flex justify-center items-center h-full">
                    <div
                      class="w-10 h-10 text-gray-800 hover:bg-gray-400 hover:cursor-pointer rounded-lg relative group">
                      <svg class="w-full h-full" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24"
                        height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" stroke-linecap="round" stroke-width="2"
                          d="M6 12h.01m6 0h.01m5.99 0h.01" />
                      </svg>
                      <div
                        class="absolute hidden group-hover:flex z-10 right-0 bg-gray-200 border-2 border-gray-400 w-40 flex-col gap-2 rounded-lg p-2 items-start">
                        <p class="hover:bg-gray-500 text-start w-full h-full" @click="goDetail(item)">
                          Chi tiết
                        </p>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          <Pagination :current-page="currentPage" :total-pages="totalPages" @page-changed="changePage" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import Search from "../../../components/Admin/Search.vue";
import SortButton from "../../../components/Admin/SortButton.vue";
import Pagination from "../../../components/Admin/Pagination.vue";

const statusFilter = ref(null); // null = tất cả
const router = useRouter();
const searchQuery = ref("");
const sortKey = ref("");
const sortDirection = ref("");
const selectedDate = ref("");
const selectedTime = ref("");


function sortBy(key, direction) {
  sortKey.value = key;
  sortDirection.value = direction;
}

const allItems = ref([]);

const filteredItems = computed(() => {
  let result = [...allItems.value];

  if (statusFilter.value !== null) {
    result = result.filter((item) => item.status === statusFilter.value);
  }

  if (searchQuery.value) {
    result = result.filter((item) =>
      item.customer.FullName.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
  }


  // Lọc theo ngày
  if (selectedDate.value) {
    result = result.filter((item) => {
      const bookingDate = new Date(item.timeBooking).toISOString().split("T")[0];
      return bookingDate === selectedDate.value;
    });
  }

  // Lọc theo giờ
  if (selectedTime.value) {
    result = result.filter((item) => {
      const bookingTime = new Date(item.timeBooking).toTimeString().slice(0, 5); // hh:mm
      return bookingTime === selectedTime.value;
    });
  }

  if (sortKey.value && sortDirection.value) {
    result.sort((a, b) => {
      let aValue = a[sortKey.value];
      let bValue = b[sortKey.value];

      if (sortKey.value === "customer") {
        aValue = a.customer.FullName;
        bValue = b.customer.FullName;
      } else if (sortKey.value === "total") {
        aValue = calculateTotal(a.booking_foods);
        bValue = calculateTotal(b.booking_foods);
      }

      return sortDirection.value === "asc"
        ? aValue > bValue ? 1 : -1
        : aValue < bValue ? 1 : -1;
    });
  }

  return result;
});


function showAll() {
  statusFilter.value = null;
  currentPage.value = 1;
}
function showSuccess() {
  statusFilter.value = 2;
  currentPage.value = 1;
}
function showReject() {
  statusFilter.value = 3;
  currentPage.value = 1;
}
function showCancel() {
  statusFilter.value = 4;
  currentPage.value = 1;
}
function showWait() {
  statusFilter.value = 1;
  currentPage.value = 1;
}


// Calculate total cost from booking_foods
function calculateTotal(bookingFoods) {
  return bookingFoods.reduce((total, foodItem) => {
    return ((total + (foodItem.quantity * foodItem.food.cost)) * 0.3) + 50000;
  }, 50000);
}

const itemsPerPage = 8;
const currentPage = ref(1);

const totalPages = computed(() => Math.ceil(filteredItems.value.length / itemsPerPage));

const paginatedItems = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return filteredItems.value.slice(start, end);
});

async function fetchBooking() {
  try {
    const response = await axios.get("http://127.0.0.1:8000/api/admin/bookings");
    allItems.value = response.data.data;
  } catch (error) {
    console.error("Lỗi khi lấy dữ liệu đặt bàn:", error);
  }
}

onMounted(fetchBooking);

function changePage(page) {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
  }
}

function goDetail(item) {
  router.push({
    name: 'admin-detail-booking',
    params: { id: item.id },
    query: { data: JSON.stringify(item) }
  })
}
</script>