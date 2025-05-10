<template>
    <div class="w-[calc(100vw-300px)] h-[calc(100vh-100px)] fixed z-0 mt-20 ms-[300px] flex flex-col p-2">
        <div class="h-full w-full flex flex-col font-semibold">
            <div class="uppercase font-bold text-2xl">Chi tiết sale</div>

            <div class="w-[30vw] h-full flex justify-center items-start text-xl">
                <div class="w-full border h-fit flex flex-col">
                    <div class="flex-1 border flex flex-row">
                        <div class="border flex flex-[2] flex-col p-2 gap-2">
                            <div class="flex flex-row w-full items-center px-5">
                                <p>Tên sale:</p>
                                <p class="text-2xl flex-1 text-end">{{ saleData.nameSale }}</p>
                            </div>
                            <div class="flex flex-row w-full items-center px-5">
                                <p class="flex-1">Trạng thái:</p>
                                <p v-if="saleData.status === 1" class="bg-green-500 text-white text-end px-2">
                                    Đang hoạt động
                                </p>
                                <p v-else class="bg-red-500 text-white px-2 text-end">
                                    Đang đóng
                                </p>
                            </div>
                            <div class="flex flex-row w-full items-center px-5">
                                <p>Phần trăm sale:</p>
                                <p class="text-2xl flex-1 text-end">{{ saleData.percent }}%</p>
                            </div>
                            <div class="flex flex-row w-full items-center px-5">
                                <p>Thời gian bắt đầu:</p>
                                <p class="text-2xl flex-1 text-end">{{ saleData.startTime }}</p>
                            </div>
                            <div class="flex flex-row w-full items-center px-5">
                                <p>Thời gian kết thúc:</p>
                                <p class="text-2xl flex-1 text-end">{{ saleData.endTime }}</p>
                            </div>

                            <div class="flex flex-row gap-2 p-2">
                                <div class="bg-green-500 rounded-lg p-2 flex justify-center items-center flex-1 text-white hover:text-black hover:cursor-pointer hover:bg-green-300"
                                    @click="goEdit(saleData)">
                                    Chỉnh sửa
                                </div>
                                <div class="bg-red-500 rounded-lg p-2 flex justify-center items-center flex-1 text-white hover:text-black hover:cursor-pointer hover:bg-red-300"
                                    @click="goDelete">
                                    Xoá
                                </div>
                                <div class="rounded-lg border p-2 flex justify-center items-center flex-1 hover:cursor-pointer hover:bg-gray-300"
                                    @click="goBack">
                                    Trở lại
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Confirm Delete Modal -->
        <ConfirmDelete v-if="showConfirm" @confirm="confirmDelete" @cancel="cancelDelete" />
    </div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router'
import { ref } from 'vue'
import ConfirmDelete from '../../../components/Admin/ConfirmDelete.vue';
import axios from 'axios'

const router = useRouter()
const route = useRoute()
const saleData = route.query.data ? JSON.parse(route.query.data) : null;
const showConfirm = ref(false)

function goBack() {
    router.push({ name: 'admin-sales' })
}

function goDelete() {
    showConfirm.value = true
}

async function confirmDelete() {
    showConfirm.value = false

    try {
        await axios.delete(`http://127.0.0.1:8000/api/admin/sales/${saleData.id}`)
        alert('Đã xoá thành công!')
        router.push({ name: 'admin-sales' })
    } catch (error) {
        console.error('Lỗi khi xoá:', error)
        alert('Không thể xoá.')
    }
}

function cancelDelete() {
    showConfirm.value = false
}

function goEdit(item) {
    router.push({
        name: 'admin-edit-sales',
        params: { id: item.id },
        query: { data: JSON.stringify(item) }
    });
}
</script>
