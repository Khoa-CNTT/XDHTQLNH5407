<template>
    <div class="w-[calc(100vw-300px)] h-[calc(100vh-100px)] fixed z-0 mt-20 ms-[300px] flex flex-col p-2">
        <!-- Thanh tìm kiếm và nút thêm -->
        <div class="w-full h-12 flex flex-row justify-end pe-5 pb-2 gap-2">
            <Search v-model="searchQuery" />
            <AddButton @add="goAdd"></AddButton>
        </div>

        <!-- Bảng dữ liệu -->
        <div class="w-full h-full border-t border-gray-400 px-2 pt-2">
            <table class="w-full h-fit table-auto font-semibold text-2xl">
                <thead>
                    <tr class="border-2 border-gray-300">
                        <th>
                            <div class="flex flex-row justify-center items-center gap-2">
                                <SortButton @sort="(key) => sortBy('nameRank', key)" />
                                <p class="ps-2 text-start w-full">Tên Rank</p>
                            </div>
                        </th>
                        <th>
                            <div class="flex flex-row justify-center items-center gap-2">
                                <SortButton @sort="(direction) => sortBy('necessaryPoint', direction)" />
                                <p>Điểm</p>
                            </div>
                        </th>
                        <th>
                            <div class="flex flex-row justify-center items-center gap-2">
                                <SortButton @sort="(direction) => sortBy('saleRank', direction)" />
                                <p>Giảm giá</p>
                            </div>
                        </th>
                        <th>Thao tác</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, index) in paginatedItems" :key="`${item.id}-${index}`"
                        class="border-2 border-gray-300">
                        <td>
                            <div class="h-full flex flex-row justify-start items-center">
                                <div class="overflow-hidden flex flex-row justify-center items-center">
                                    <img v-if="item.image"
                                        class="hover:cursor-pointer overflow-hidden object-cover h-32 w-24 rounded-lg shadow-md border"
                                        :src=item.image alt="Ảnh rank" />
                                    <p class="ps-5 hover:cursor-pointer">{{ item.nameRank }}</p>
                                </div>
                            </div>
                        </td>
                        <td class="text-center">{{ item.necessaryPoint }}</td>
                        <td class="text-center">{{ item.saleRank }}%</td>
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
                                        <p class="hover:bg-gray-500 text-start w-full h-full" @click="goDetail(item)">
                                            Chi tiết </p>
                                        <p class="hover:bg-gray-500 text-start w-full h-full" @click="goEdit(item)">
                                            Chỉnh sửa </p>
                                        <p class="hover:bg-gray-500 text-start w-full h-full" @click="goDelete(item)">
                                            Xoá </p>

                                        <ConfirmDelete v-if="showConfirm" @confirm="confirmDelete"
                                            @cancel="cancelDelete" />
                                    </div>
                                </div>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>

            <!-- Phân trang -->
            <Pagination :current-page="currentPage" :total-pages="totalPages" @page-changed="changePage" />
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue' // <- thêm onMounted
import { useRouter } from 'vue-router'
import Search from '../../../components/Admin/Search.vue'
import AddButton from '../../../components/Admin/AddButton.vue'
import Pagination from '../../../components/Admin/Pagination.vue'
import ConfirmDelete from '../../../components/Admin/ConfirmDelete.vue'
import axios from 'axios'
import SortButton from '../../../components/Admin/SortButton.vue'

const router = useRouter();
const searchQuery = ref("");
const sortKey = ref("");
const sortDirection = ref("");
const showConfirm = ref(false);
const itemToDelete = ref(null);
const itemsPerPage = 5;
const currentPage = ref(1);
const allItems = ref([]);

const fetchRank = async () => {
    try {
        const response = await axios.get("http://127.0.0.1:8000/api/admin/ranks");

        if (Array.isArray(response.data)) {
            allItems.value = response.data;
        } else if (response.data && Array.isArray(response.data.data)) {
            allItems.value = response.data.data;
        } else {
            allItems.value = [];
        }
    } catch (error) {
        console.error("Lỗi khi lấy dữ liệu:", error);
    }
};


onMounted(() => {
    fetchRank()
})

const filteredItems = computed(() => {
    let result = [...allItems.value];

    if (searchQuery.value) {
        result = result.filter((item) =>
            item.nameRank.toLowerCase().includes(searchQuery.value.toLowerCase())
        );
    }

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

const totalPages = computed(() =>
    Math.ceil(filteredItems.value.length / itemsPerPage)
)

const paginatedItems = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage
    const end = start + itemsPerPage
    return filteredItems.value.slice(start, end)
})

function changePage(page) {
    if (page >= 1 && page <= totalPages.value) {
        currentPage.value = page
    }
}

function sortBy(key, direction) {
    sortKey.value = key;
    sortDirection.value = direction;
}

function goDelete(item) {
    itemToDelete.value = item
    showConfirm.value = true
}


async function confirmDelete() {
    showConfirm.value = false
    if (!itemToDelete.value) return

    try {
        await axios.delete(`http://127.0.0.1:8000/api/admin/ranks/${itemToDelete.value.id}`)
        alert('Đã xoá rank thành công!')

        allItems.value = allItems.value.filter(item => item.id !== itemToDelete.value.id)
        itemToDelete.value = null
    } catch (error) {
        console.error('Lỗi khi xoá rank:', error)
        alert('Không thể xoá rank.')
    }
}

function cancelDelete() {
    showConfirm.value = false
}

function goDetail(item) {
    router.push({
        name: 'admin-detail-ranks',
        params: { id: item.id },
        query: { data: JSON.stringify(item) }
    });
}

function goEdit(item) {
    router.push({
        name: 'admin-edit-ranks',
        params: { id: item.id },
        query: { data: JSON.stringify(item) }
    });
}

function goAdd() {
    router.push({ name: 'admin-add-ranks' })
}
</script>
