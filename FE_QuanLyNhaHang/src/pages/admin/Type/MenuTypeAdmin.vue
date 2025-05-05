<template>
  <div class="w-[calc(100vw-300px)] h-[calc(100vh-100px)] fixed z-0 mt-20 ms-[300px] flex flex-col p-2">
    <div class="w-full h-12 flex flex-row justify-end pe-5 pb-2 gap-2">
      <Search v-model="searchQuery" />
      <AddButton @add="goAdd" />
    </div>
    <div class="w-full h-full border-t border-gray-400 px-2 pt-2">
      <table class="w-full h-fit table-auto font-semibold text-2xl">
        <thead>
          <tr class="border-2 border-gray-300">
            <th>
              <div class="flex flex-row justify-center items-center gap-2">
                <SortButton @sort="(key) => sortBy('name', key)" />
                <p class="text-start w-full">Tên kiểu</p>
              </div>
            </th>
            <!-- <th>
              <div class="flex flex-row justify-center items-center gap-2">
                <SortButton @sort="(direction) => sortBy('qty_category', direction)" />
                <p>Số lượng loại</p>
              </div>
            </th> -->
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in paginatedItems" :key="index" class="border-2 border-gray-300">
            <td>
              <div class="h-full flex flex-row justify-start items-center">
                <div class="h-20 flex flex-row justify-center items-center">
                  <div class="ps-5 flex flex-row gap-5">
                    <p class="hover:cursor-pointer">{{ item.name }}</p>
                    <div class="flex flex-row gap-2 items-center">
                      <div v-if="item.status === 1"
                        class="hover:cursor-pointer w-16 h-8 flex rounded-full border-2 border-black justify-end items-center p-1">
                        <div class="w-6 h-6 bg-green-500 rounded-full"></div>
                      </div>
                      <div v-else
                        class="hover:cursor-pointer w-16 h-8 flex rounded-full border-2 border-black justify-start items-center p-1">
                        <div class="w-6 h-6 bg-red-500 rounded-full"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </td>
            <!-- <td class="text-center">{{ item.qty_food }}</td> -->
            <!-- <td class="text-center">{{ item.qty_category }}</td> -->
            <td class="text-center">
              <div class="flex justify-center items-center h-full">
                <div class="w-10 h-10 text-gray-800 hover:bg-gray-400 hover:cursor-pointer rounded-lg relative group">
                  <svg class="w-full h-full" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" stroke-linecap="round" stroke-width="2"
                      d="M6 12h.01m6 0h.01m5.99 0h.01" />
                  </svg>
                  <div
                    class="absolute hidden group-hover:flex z-10 right-0 bg-gray-200 border-2 border-gray-400 w-40 flex-col gap-2 rounded-lg p-2 items-start">
                    <p class="hover:bg-gray-500 text-start w-full h-full" @click="goDetail(item)">
                      Chi tiết</p>
                    <p class="hover:bg-gray-500 text-start w-full h-full" @click="goEdit(item)">
                      Chỉnh sửa
                    </p>
                    <p class="hover:bg-gray-500 text-start w-full h-full" @click="goDelete">Xoá</p>
                    <ConfirmDelete v-if="showConfirm" @confirm="confirmDelete" @cancel="cancelDelete" />
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
import { ref, computed } from 'vue'
import { useRouter } from "vue-router";
import Search from "../../../components/Admin/Search.vue";
import AddButton from "../../../components/Admin/AddButton.vue";
import SortButton from "../../../components/Admin/SortButton.vue";
import Pagination from "../../../components/Admin/Pagination.vue";
import ConfirmDelete from '../../../components/Admin/ConfirmDelete.vue';

const router = useRouter();
const searchQuery = ref("");
const sortKey = ref(""); // 'name' hoặc 'qty'
const sortDirection = ref(""); // 'asc' | 'desc'
const showConfirm = ref(false)

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
    id: 1, name: "Thức ăn", status: 1,
  },
  {
    id: 2, name: "Nước", status: 0,
  },
]);

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

function goDelete() {
  showConfirm.value = true
}

function confirmDelete() {
  showConfirm.value = false

  console.log('Đã xác nhận xoá kiểu món ăn')
  router.push({ name: 'admin-types' })
}

function cancelDelete() {
  showConfirm.value = false
}

function goDetail(item) {
  router.push({
    name: 'admin-details-types',
    params: {
      id: item.id,
    },
    query: {
      data: JSON.stringify(item)
    }
  });
}

function goAdd() {
  router.push({
    name: 'admin-add-types',
  })
}

function goEdit(item) {
  router.push({
    name: 'admin-edit-types',
    params: {
      id: item.id,
    },
    query: {
      data: JSON.stringify(item)
    }
  });
}

</script>
