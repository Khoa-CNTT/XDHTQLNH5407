<template>
    <div class="w-[calc(100vw-300px)] h-[calc(100vh-100px)] fixed z-0 mt-20 ms-[300px] flex flex-col p-2">
        <div class="h-full w-full flex flex-col font-semibold">
            <div class=" uppercase font-bold text-2xl">
                Chi tiết bàn
            </div>
            <div class="w-[30vw] h-full flex justify-center items-start text-xl">
                <div class="w-full border h-fit flex flex-col">
                    <div class="flex-1 border flex flex-row">
                        <div class="border flex flex-[2] flex-col p-2 gap-2">
                            <div class="flex items-center gap-4">
                                <label class="w-32">Tên bàn:</label>
                                <input type="text" id="name-category" class="flex-1 border rounded px-4 py-2 text-lg"
                                    :placeholder="tableData.name || 'Nhập tên loại...'" />
                            </div>

                            <!-- Kiểu món ăn -->
                            <div class="flex items-center gap-4">
                                <label class="w-32">Trạng thái:</label>
                                <select class="border rounded px-4 py-2 w-[200px]" id="status">
                                    <option value="1">Đang trống</option>
                                    <option value="2">Đang sử dụng</option>
                                    <option value="3">Đã đặt</option>
                                    <option value="0">Bị khoá</option>
                                </select>
                            </div>
                            <div class="flex flex-row gap-2 p-2">
                                <div class="bg-green-500 rounded-lg p-2 flex text-white justify-center items-center flex-1 hover:text-black hover:cursor-pointer hover:bg-green-300"
                                    @click="goEdit(tableData)">
                                    Chỉnh sửa
                                </div>
                                <div class="bg-red-500 rounded-lg p-2 flex text-white justify-center items-center flex-1 hover:text-black hover:cursor-pointer hover:bg-red-300"
                                    @click="goDelete">
                                    Xoá
                                </div>
                                <ConfirmDelete v-if="showConfirm" @confirm="confirmDelete" @cancel="cancelDelete" />
                                <div class=" rounded-lg border p-2 flex justify-center items-center flex-1 hover:cursor-pointer hover:bg-gray-300"
                                    @click="goBack">
                                    Trở lại
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { useRoute, useRouter } from 'vue-router'
import { ref } from 'vue'
import ConfirmDelete from '../../../components/Admin/ConfirmDelete.vue';

const router = useRouter()
const route = useRoute()
const tableData = route.query.data ? JSON.parse(route.query.data) : null;
const showConfirm = ref(false)

function goBack() {
    router.push({ name: 'admin-tables' })
}
function goDelete() {
    showConfirm.value = true
}

function confirmDelete() {
    showConfirm.value = false

    console.log('Đã xác nhận xoá kiểu món ăn')
    router.push({ name: 'admin-tables' })
}

function cancelDelete() {
    showConfirm.value = false
}
</script>