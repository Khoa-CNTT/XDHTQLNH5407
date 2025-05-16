    <template>
        <div class="w-[calc(100vw-300px)] h-[calc(100vh-100px)] fixed z-0 mt-20 ms-[300px] flex flex-col p-2">
            <div class="h-full w-full flex flex-col font-bold">
                <p class="uppercase text-2xl">Tổng hoá đơn</p>
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
                            <div @click="showCancel" :class="[
                                'hover:cursor-pointer hover:border-b-4 hover:text-red-500 hover:border-red-500',
                                statusFilter === 3 ? 'text-red-500 border-b-4 border-red-500' : '']">
                                Bị huỷ
                            </div>
                            <div @click="showUsing" :class="[
                                'hover:cursor-pointer hover:border-b-4 hover:text-red-500 hover:border-red-500',
                                statusFilter === 1 ? 'text-red-500 border-b-4 border-red-500' : '']">
                                Đang sử dụng
                            </div>

                        </div>
                        <div class="flex flex-row flex-1 gap-2 justify-end items-center">
                            <Search v-model="searchQuery" />

                            <input class="border border-gray-300" type="date" name="created_at" id="created_at"
                                value="2025-04-19" />
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
                                            <SortButton @sort="(direction) => sortBy('table.number', direction)" />
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
                                            <SortButton @sort="(direction) => sortBy('total', direction)" />
                                            <p>Tổng</p>
                                        </div>
                                    </th>
                                    <th>Thao tác</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(item, index) in paginatedItems" :key="index"
                                    class="border-2 border-gray-300">
                                    <td>
                                        <div class="h-16 flex flex-row justify-start items-center px-2">
                                            <p>#</p>
                                            <p>{{ item.id }}</p>
                                        </div>
                                    </td>
                                    <td>
                                        <div class="h-16 flex justify-center items-center">
                                            <p v-if="item.status === 1" class="bg-yellow-500 w-32 text-center p-2">
                                                Đang sử dụng
                                            </p>
                                            <p v-else-if="item.status === 2" class="bg-green-500 w-32 text-center p-2">
                                                Hoàn thành
                                            </p>
                                            <p v-else-if="item.status === 3" class="bg-red-500 w-32 text-center p-2">
                                                Bị huỷ
                                            </p>

                                        </div>
                                    </td>
                                    <td>
                                        <div class="h-16 flex justify-center items-center px-2">
                                            <p>{{ item.table?.number ?? "Không xác định" }}</p>
                                        </div>
                                    </td>
                                    <td>
                                        <div class="h-16 flex justify-center items-center px-2">
                                            <p>{{ formatToLocalDatetime(item.created_at) }}</p>
                                        </div>
                                    </td>

                                    <td>
                                        <div class="h-16 flex justify-center items-center px-2">
                                            <p>{{ item.total?.toLocaleString() ?? "0" }}</p>
                                            <p>VNĐ</p>
                                        </div>
                                    </td>
                                    <td class="text-center">
                                        <div class="flex justify-center items-center h-full">
                                            <div
                                                class="w-10 h-10 text-gray-800 hover:bg-gray-400 hover:cursor-pointer rounded-lg relative group">
                                                <svg class="w-full h-full" aria-hidden="true"
                                                    xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                    fill="none" viewBox="0 0 24 24">
                                                    <path stroke="currentColor" stroke-linecap="round" stroke-width="2"
                                                        d="M6 12h.01m6 0h.01m5.99 0h.01" />
                                                </svg>
                                                <div
                                                    class="absolute hidden group-hover:flex z-10 right-0 bg-gray-200 border-2 border-gray-400 w-40 flex-col gap-2 rounded-lg p-2 items-start">
                                                    <p class="hover:bg-gray-500 text-start w-full h-full"
                                                        @click="goDetail(item)">
                                                        Chi tiết
                                                    </p>
                                                    <p v-if="item.status === 1"
                                                        class="hover:bg-gray-500 text-start w-full h-full"
                                                        @click="goEdit(item)">
                                                        Chỉnh sửa
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
import { useRouter } from "vue-router";
import Search from "../../../components/Admin/Search.vue";
import SortButton from "../../../components/Admin/SortButton.vue";
import Pagination from "../../../components/Admin/Pagination.vue";
import { ref, computed, onMounted } from "vue";
import axios from "axios";

const router = useRouter();
const searchQuery = ref("");
const sortKey = ref("");
const sortDirection = ref(""); // 'asc' | 'desc'
const allItems = ref([]);

// Fetch invoices from the API
async function fetchInvoice() {
    try {
        const response = await axios.get("http://127.0.0.1:8000/api/admin/invoices");
        allItems.value = response.data.data.map(item => ({
            ...item,
            total: calculateFinalTotal(item.invoice_foods, item.sale)
        }));
    } catch (error) {
        console.error("Lỗi khi lấy dữ liệu:", error);
    }
}

const statusFilter = ref(null); // null = tất cả

function showAll() {
    statusFilter.value = null;
    currentPage.value = 1;
}
function showUsing() {
    statusFilter.value = 1;
    currentPage.value = 1;
}
function showSuccess() {
    statusFilter.value = 2;
    currentPage.value = 1;
}
function showCancel() {
    statusFilter.value = 3;
    currentPage.value = 1;
}

onMounted(fetchInvoice);

// Sorting function
function sortBy(key, direction) {
    sortKey.value = key;
    sortDirection.value = direction;
}

function calculateTotal(items) {
    if (!items || !items.length) return 0;
    return items.reduce((total, foodItem) => {
        return total + (foodItem.quantity || 0) * (foodItem.food?.cost || 0);
    }, 0);
}

function calculateVAT(items) {
    return calculateTotal(items) * 0.1; // 10% VAT
}

function calculateDiscount(items, sale) {
    return calculateTotal(items) * (sale?.percent || 0) / 100;
}

function calculateFinalTotal(items, sale) {
    return calculateTotal(items) + calculateVAT(items) - calculateDiscount(items, sale);
}

// Filtered and sorted items
const filteredItems = computed(() => {
    let result = [...allItems.value];

    if (statusFilter.value !== null) {
        result = result.filter((item) => item.status === statusFilter.value);
    }

    if (searchQuery.value) {
        result = result.filter((item) => {
            const customerName = item.customer?.FullName?.toLowerCase() || "";
            const userName = item.user?.name?.toLowerCase() || "";
            return customerName.includes(searchQuery.value.toLowerCase()) ||
                userName.includes(searchQuery.value.toLowerCase());
        });

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

const itemsPerPage = 8;
const currentPage = ref(1);

const totalPages = computed(() =>
    Math.ceil(filteredItems.value.length / itemsPerPage)
);

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

function formatToLocalDatetime(isoString) {
    const date = new Date(isoString);

    // Tạo chuỗi YYYY-MM-DD HH:mm:ss theo múi giờ địa phương
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}


function goEdit(item) {
    router.push({
        name: 'admin-edit-invoice',
        params: { id: item.id },
        query: { data: JSON.stringify(item) }
    })
}
function goDetail(item) {
    router.push({
        name: 'admin-detail-invoice',
        params: { id: item.id },
        query: { data: JSON.stringify(item) }
    })
}
</script>