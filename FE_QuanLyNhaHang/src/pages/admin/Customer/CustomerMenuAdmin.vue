<template>
  <div class="w-[calc(100vw-300px)] h-[calc(100vh-100px)] fixed z-0 mt-20 ms-[300px] flex flex-col p-2">
    <div class="w-full h-12 flex flex-row justify-end pe-5 pb-2">
      <Search v-model="searchQuery" />
    </div>
    <div class="w-full h-full border-t border-gray-400 px-2 pt-2">
      <table class="w-full h-fit table-auto font-semibold text-2xl">
        <thead>
          <tr class="border-2 border-gray-300">
            <th>
              <div class="flex flex-row justify-center items-center gap-2">
                <Sort @sort="(direction) => sortBy('FullName', direction)" />
                <p class="text-start w-full">Họ tên</p>
              </div>
            </th>
            <th>
              <div class="flex flex-row justify-center items-center gap-2">
                <Sort @sort="(direction) => sortBy('point', direction)" />
                <p>Điểm</p>
              </div>
            </th>
            <th>
              <div class="flex flex-row justify-center items-center gap-2">
                <p>Ranking</p>
              </div>
            </th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in paginatedItems" :key="index" class="border-2 border-gray-300">
            <td>
              <div class="h-full flex flex-row justify-start items-center">
                <div class="overflow-hidden flex flex-row justify-center items-center">
                  <img class="hover:cursor-pointer overflow-auto object-cover h-32 w-24 rounded-lg shadow-md border"
                    :src="`/picture/profile/${item.image}`" alt="Ảnh nhân viên" />
                  <p class="ps-5 hover:cursor-pointer">{{ item.FullName }}</p>
                </div>
              </div>
            </td>
            <td class="text-center">{{ item.point }}</td>
            <td class="text-center">
              <div class="w-full flex justify-center">
                <p>{{ item.rank.nameRank }}</p>
              </div>
            </td>
            <td class="text-center">
              <div class="flex justify-center items-center h-full">
                <div class="w-10 h-10 text-gray-800 hover:bg-gray-400 hover:cursor-pointer rounded-lg relative group">
                  <svg class="w-full h-full" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" stroke-linecap="round" stroke-width="2"
                      d="M6 12h.01m6 0h.01m5.99 0h.01" />
                  </svg>
                  <div
                    class="absolute hidden group-hover:flex z-10 right-0 bg-gray-200 border-2 border-gray-400 w-40 flex-col gap-2 rounded-lg p-2 items-start">
                    <p class="hover:bg-gray-500 text-start w-full h-full" @click="goDetailCustomers">
                      Chi tiết
                    </p>
                    <p class="hover:bg-gray-500 text-start w-full h-full">Chỉnh sửa</p>
                    <p class="hover:bg-gray-500 text-start w-full h-full">Xoá</p>
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
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import Sort from "../../../components/Admin/SortButton.vue";
import Search from "../../../components/Admin/Search.vue";
import Pagination from "../../../components/Admin/Pagination.vue";

const router = useRouter();
const searchQuery = ref("");
const sortKey = ref(""); // 'FullName' hoặc 'point'
const sortDirection = ref(""); // 'asc' | 'desc'
const allItems = ref([]);

async function fetchCustomers() {
  try {
    const response = await axios.get("http://127.0.0.1:8000/api/admin/customers");
    allItems.value = response.data.customers;
  } catch (error) {
    console.error("Lỗi khi lấy dữ liệu khách hàng:", error);
  }
}

onMounted(fetchCustomers);

function sortBy(key, direction) {
  sortKey.value = key;
  sortDirection.value = direction;
}

const filteredItems = computed(() => {
  let result = [...allItems.value];
  if (searchQuery.value) {
    result = result.filter((item) =>
      item.FullName.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
  }

  if (sortKey.value && sortDirection.value) {
    result.sort((a, b) => {
      const aVal = a[sortKey.value];
      const bVal = b[sortKey.value];

      if (typeof aVal === 'string') {
        return sortDirection.value === 'asc'
          ? aVal.localeCompare(bVal)
          : bVal.localeCompare(aVal);
      }
      return sortDirection.value === 'asc' ? aVal - bVal : bVal - aVal;
    });
  }
  return result;
});

const itemsPerPage = 5;
const currentPage = ref(1);
const totalPages = computed(() => Math.ceil(filteredItems.value.length / itemsPerPage));

const paginatedItems = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return filteredItems.value.slice(start, end);
});

function changePage(page) {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
  }
}

function goDetailCustomers() {
  router.push({ name: 'admin-details-customers' });
}
</script>
