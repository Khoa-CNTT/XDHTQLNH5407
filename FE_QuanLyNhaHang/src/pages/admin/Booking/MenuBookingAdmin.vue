<template>
  <div class="w-[calc(100vw-300px)] h-[calc(100vh-100px)] fixed z-0 mt-20 ms-[300px] flex flex-col p-2">
    <div class="h-full w-full flex flex-col font-bold">
      <p class="uppercase text-2xl">Lịch sử đặt hàng</p>
      <div class="w-full h-full flex flex-col">
        <div class="w-full h-fit flex flex-row p-2">
          <div class="flex flex-row flex-1 gap-5">
            <div class="">Tất cả</div>
            <div class="">Hoàn thành</div>
            <div class="">Bị huỷ</div>
            <div class="">Đang sử dụng</div>
          </div>
          <div class="flex flex-row flex-1 gap-2 justify-end items-center">
            <Search v-model="searchQuery" />
            <input class="border border-gray-300" type="date" name="start_date" id="start_date" value="2025-04-18" />
            <p>đến</p>
            <input class="border border-gray-300" type="date" name="ebd_date" id="ebd_date" value="2025-04-19" />
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
                    <SortButton @sort="(direction) => sortBy('name', direction)" />
                    <p>Bàn</p>
                  </div>
                </th>
                <th>
                  <div class="flex flex-row justify-center items-center gap-2">
                    <SortButton @sort="(direction) => sortBy('time_start', direction)" />
                    <p>Thời gian đặt</p>
                  </div>
                </th>
                <th>
                  <div class="flex flex-row justify-center items-center gap-2">
                    <SortButton @sort="(direction) => sortBy('time_use', direction)" />

                    <p>Thời gian sử dụng</p>
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
                    <p v-if="item.status === 1" class="bg-green-500 w-32 text-center p-2">
                      Hoàn thành
                    </p>
                    <p v-else-if="item.status === 2" class="bg-red-500 w-32 text-center p-2">
                      Bị huỷ
                    </p>
                    <p v-else-if="item.status === 3" class="bg-yellow-500 w-32 text-center p-2">
                      Đang sử dụng
                    </p>
                  </div>
                </td>
                <td>
                  <div class="h-16 flex justify-center items-center px-2">
                    <p>{{ item.name }}</p>
                  </div>
                </td>
                <td>
                  <div class="h-16 flex justify-center items-center px-2">
                    <p>{{ item.time_start }}</p>
                  </div>
                </td>
                <td>
                  <div class="h-16 flex justify-center items-center px-2">
                    <p>{{ item.time_use }}</p>
                  </div>
                </td>
                <td>
                  <div class="h-16 flex justify-center items-center px-2">
                    <p>{{ item.total.toLocaleString() }}</p>
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
                        <p class="hover:bg-gray-500 text-start w-full h-full" @click="goDetailBooking">
                          Chi tiết
                        </p>
                        <p class="hover:bg-gray-500 text-start w-full h-full">
                          Chỉnh sửa
                        </p>
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
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import Search from "../../../components/Admin/Search.vue";
import SortButton from "../../../components/Admin/SortButton.vue";
import Pagination from "../../../components/Admin/Pagination.vue";

const router = useRouter();
const searchQuery = ref("");
const sortKey = ref(""); // 'name' hoặc 'qty'
const sortDirection = ref(""); // 'asc' | 'desc'

function sortBy(key, direction) {
  sortKey.value = key;
  sortDirection.value = direction;
}

const filteredItems = computed(() => {
  let result = [...allItems.value];

  // Lọc theo search nếu có
  if (searchQuery.value) {
    result = result.filter((item) =>
      item.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
  }

  // Sắp xếp nếu có key và direction
  if (sortKey.value && sortDirection.value) {
    result.sort((a, b) => {
      if (sortDirection.value === "asc") {
        return a[sortKey.value] > b[sortKey.value] ? 1 : -1;
      } else {
        return a[sortKey.value] < b[sortKey.value] ? 1 : -1;
      }
    });
  }

  return result;
});

const allItems = ref([
  {
    id: "1",
    status: Math.floor(Math.random() * 3) + 1,
    name: "bàn 1",
    time_start: "",
    time_use: "",
    total: (Math.floor(Math.random() * 10000) + 1) * 1000,
  },
  {
    id: "2",
    status: Math.floor(Math.random() * 3) + 1,
    name: "bàn 2",
    time_start: "",
    time_use: "",
    total: (Math.floor(Math.random() * 10000) + 1) * 1000,
  },
  {
    id: "3",
    status: Math.floor(Math.random() * 3) + 1,
    name: "bàn 3",
    time_start: "",
    time_use: "",
    total: (Math.floor(Math.random() * 10000) + 1) * 1000,
  },
  {
    id: "4",
    status: Math.floor(Math.random() * 3) + 1,
    name: "bàn 4",
    time_start: "",
    time_use: "",
    total: (Math.floor(Math.random() * 10000) + 1) * 1000,
  },
  {
    id: "5",
    status: Math.floor(Math.random() * 3) + 1,
    name: "bàn 5",
    time_start: "",
    time_use: "",
    total: (Math.floor(Math.random() * 10000) + 1) * 1000,
  },
  {
    id: "6",
    status: Math.floor(Math.random() * 3) + 1,
    name: "bàn 6",
    time_start: "",
    time_use: "",
    total: (Math.floor(Math.random() * 10000) + 1) * 1000,
  },
  {
    id: "7",
    status: Math.floor(Math.random() * 3) + 1,
    name: "bàn 7",
    time_start: "",
    time_use: "",
    total: (Math.floor(Math.random() * 10000) + 1) * 1000,
  },
  {
    id: "8",
    status: Math.floor(Math.random() * 3) + 1,
    name: "bàn 8",
    time_start: "",
    time_use: "",
    total: (Math.floor(Math.random() * 10000) + 1) * 1000,
  },
  {
    id: "8",
    status: Math.floor(Math.random() * 3) + 1,
    name: "bàn 8",
    time_start: "",
    time_use: "",
    total: (Math.floor(Math.random() * 10000) + 1) * 1000,
  },
  {
    id: "8",
    status: Math.floor(Math.random() * 3) + 1,
    name: "bàn 8",
    time_start: "",
    time_use: "",
    total: (Math.floor(Math.random() * 10000) + 1) * 1000,
  },
  {
    id: "8",
    status: Math.floor(Math.random() * 3) + 1,
    name: "bàn 8",
    time_start: "",
    time_use: "",
    total: (Math.floor(Math.random() * 10000) + 1) * 1000,
  },
  {
    id: "8",
    status: Math.floor(Math.random() * 3) + 1,
    name: "bàn 8",
    time_start: "",
    time_use: "",
    total: (Math.floor(Math.random() * 10000) + 1) * 1000,
  },
  {
    id: "8",
    status: Math.floor(Math.random() * 3) + 1,
    name: "bàn 8",
    time_start: "",
    time_use: "",
    total: (Math.floor(Math.random() * 10000) + 1) * 1000,
  },
  {
    id: "8",
    status: Math.floor(Math.random() * 3) + 1,
    name: "bàn 8",
    time_start: "",
    time_use: "",
    total: (Math.floor(Math.random() * 10000) + 1) * 1000,
  },
]);

const itemsPerPage = 8;
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

function goDetailBooking() {
  router.push({ name: 'admin-details-booking' })
}
</script>
