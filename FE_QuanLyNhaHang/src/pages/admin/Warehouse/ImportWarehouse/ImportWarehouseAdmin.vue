<template>
    <div class="w-[calc(70vw-300px)] h-[calc(100vh-100px)] fixed z-0 mt-44 ms-[300px] flex flex-col p-2 text-lg ">
        <div class="w-full h-[50vh] border-t border-black">
            <div class="w-full flex justify-end gap-2 p-2">
                <Search v-model="searchQuery" />
                <AddButton @add="goAdd" />

            </div>
            <div class="w-full">
                <table class="w-full h-fit table-auto font-semibold text-2xl">
                    <thead>
                        <tr class="border-2 border-gray-300">
                            <th>
                                <div class="flex flex-row justify-center items-center gap-2">
                                    <SortButton @sort="(key) => sortBy('name', key)" />
                                    <p class="text-start w-full">Tên</p>
                                </div>
                            </th>
                            <th>
                                <div class="flex flex-row justify-center items-center gap-2">
                                    <SortButton @sort="(direction) => sortBy('quantity', direction)" />
                                    <p>Số lượng</p>
                                </div>
                            </th>
                            <th>
                                <div class="flex flex-row justify-center items-center gap-2">
                                    <SortButton @sort="(direction) => sortBy('quantity', direction)" />
                                    <p>Ngày nhập</p>
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
                                        <img class="hover:cursor-pointer object-cover h-32 w-24 rounded-lg shadow-md border"
                                            :src="`${item.ingredient.image}`" alt="Ảnh nhân viên" />
                                        <div class="ps-5 flex flex-col gap-5">
                                            <p class="hover:cursor-pointer">{{ item.ingredient.name_ingredient }}</p>
                                        </div>
                                    </div>
                                </div>
                            </td>
                            <td class="text-center">
                                <div class="flex flex-row gap-2 justify-center">
                                    <p>{{ item.quantity.toLocaleString() }}</p>
                                    <p>{{ item.ingredient.unit }}</p>
                                </div>
                            </td>
                            <td class="text-center">
                                <div class="flex flex-row gap-2 justify-center">
                                    <p>{{ item.stock_in_date }}</p>
                                </div>
                            </td>
                            <td class="text-center">
                                <div class="flex justify-center items-center h-full">
                                    <div
                                        class="w-10 h-10 text-gray-800 hover:bg-gray-400 hover:cursor-pointer rounded-lg relative group">
                                        <svg class="w-full h-full" xmlns="http://www.w3.org/2000/svg" fill="none"
                                            viewBox="0 0 24 24">
                                            <path stroke="currentColor" stroke-linecap="round" stroke-width="2"
                                                d="M6 12h.01m6 0h.01m5.99 0h.01" />
                                        </svg>
                                        <div
                                            class="absolute hidden group-hover:flex z-10 right-0 bg-gray-200 border-2 border-gray-400 w-40 flex-col gap-2 rounded-lg p-2 items-start">
                                            <p class="hover:bg-gray-500 text-start w-full h-full"
                                                @click="goDetailFoods(item)">
                                                Chi tiết
                                            </p>
                                            <ConfirmDelete v-if="showConfirm" @confirm="confirmDelete"
                                                @cancel="cancelDelete" />
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
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import SortButton from "../../../../components/Admin/SortButton.vue";
import ConfirmDelete from "../../../../components/Admin/ConfirmDelete.vue";
import Search from "../../../../components/Admin/Search.vue";
import Pagination from "../../../../components/Admin/Pagination.vue";
import axios from "axios";
import AddButton from "../../../../components/Admin/AddButton.vue";

const showConfirm = ref(false);
const itemToDelete = ref(null)
const router = useRouter();
const searchQuery = ref("");
const sortKey = ref('')
const sortDirection = ref('')
const itemsPerPage = 4;
const currentPage = ref(1);
const allItems = ref([]);
const totalPages = computed(() => Math.ceil(filteredItems.value.length / itemsPerPage));

const paginatedItems = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage
    const end = start + itemsPerPage
    return filteredItems.value.slice(start, end)
})

const filteredItems = computed(() => {
    let result = [...allItems.value];

    if (searchQuery.value) {
        result = result.filter(item =>
            item.ingredient.name_ingredient.toLowerCase().includes(searchQuery.value.toLowerCase())
        );
    }

    if (sortKey.value && sortDirection.value) {
        result.sort((a, b) => {
            const aVal = sortKey.value === 'name' ? a.ingredient.name_ingredient : a[sortKey.value];
            const bVal = sortKey.value === 'name' ? b.ingredient.name_ingredient : b[sortKey.value];

            if (sortDirection.value === 'asc') {
                return aVal > bVal ? 1 : -1;
            } else {
                return aVal < bVal ? 1 : -1;
            }
        });
    }

    return result;
});


async function fetchWarehouse() {
    try {
        const response = await axios.get("http://127.0.0.1:8000/api/admin/warehouse-invoices");
        if (response.data.status === 1) {
            allItems.value = response.data.data; // đúng là response.data.data
        } else {
            console.error("Lỗi lấy dữ liệu: Trạng thái không hợp lệ");
        }
    } catch (error) {
        console.error("Lỗi khi lấy dữ liệu:", error);
    }
}

onMounted(fetchWarehouse);

function changePage(page) {
    if (page >= 1 && page <= totalPages.value) {
        currentPage.value = page;
    }
}

function sortBy(key, direction) {
    sortKey.value = key
    sortDirection.value = direction
}

function goAdd() {
    router.push({ name: 'add-import-warehouse-admin' });
}

function goDetailFoods(item) {
    router.push({
        name: 'detail-import-warehouse-admin',
        params: { id: item.id },
        query: { data: JSON.stringify(item) }
    });
}
</script>
