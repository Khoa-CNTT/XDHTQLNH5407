<template>
    <div class="w-[calc(100vw-300px)] h-[calc(100vh-100px)] fixed z-0 mt-20 ms-[300px] flex flex-col p-2">
        <div class="h-full w-full flex flex-col font-semibold">
            <div class=" uppercase font-bold text-2xl">
                Chỉnh sửa bàn
            </div>
            <div class="w-[30vw] h-full flex justify-center items-start text-xl">
                <div class="w-full border h-fit flex flex-col">
                    <div class="flex-1 border flex flex-row">
                        <div class="border flex flex-[2] flex-col p-2 gap-2">
                            <div class="flex items-center gap-4">
                                <label class="w-32">Tên bàn:</label>
                                <input type="number" id="number" v-model="form.number"
                                    class="flex-1 border rounded px-4 py-2 text-lg no-spinner" @input="validateTable"
                                    :placeholder="tableData.number || 'Nhập tên bàn...'" />
                            </div>

                            <!-- Kiểu món ăn -->
                            <div class="flex items-center gap-4">
                                <label class="w-32">Trạng thái:</label>
                                <select v-model="form.status" class="border rounded px-4 py-2 w-[200px]" id="status">
                                    <option value="1">Đang trống</option>
                                    <option value="2">Đang sử dụng</option>
                                    <option value="3">Đã đặt</option>
                                    <option value="0">Bị khoá</option>
                                </select>
                            </div>
                            <div class="flex flex-row gap-2 p-2">
                                <div class="bg-green-500 rounded-lg p-2 flex text-white justify-center items-center flex-1 hover:text-black hover:cursor-pointer hover:bg-green-300"
                                    @click="goSave">
                                    Lưu
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
import axios from 'axios'

const router = useRouter()
const route = useRoute()
const tableData = route.query.data ? JSON.parse(route.query.data) : null;
const showConfirm = ref(false)

const form = ref({
    number: tableData?.number || '',
    status: tableData?.status ?? 1
})

function validateTable(e) {
    let val = parseInt(e.target.value)
    if (val < 0) val = 0
    form.value.number = val
}

async function goSave() {
    try {
        const response = await axios.put(`http://127.0.0.1:8000/api/admin/tables/${tableData.id}`, {
            number: form.value.number,
            status: form.value.status
        })
        alert("Cập nhật thành công!")
        router.push({ name: 'admin-tables' })
    } catch (error) {
        console.error("Lỗi khi lưu bàn:", error)
        alert("Đã xảy ra lỗi khi lưu dữ liệu.")
    }
}

function goBack() {
    router.push({ name: 'admin-tables' })
}
function goDelete() {
    showConfirm.value = true
}

async function confirmDelete() {
    showConfirm.value = false

    try {
        await axios.delete(`http://127.0.0.1:8000/api/admin/tables/${tableData.id}`)
        alert('Đã xoá bàn thành công!')
        router.push({ name: 'admin-tables' })
    } catch (error) {
        console.error('Lỗi khi xoá bàn:', error)
        alert('Không thể xoá bàn.')
    }
}

function cancelDelete() {
    showConfirm.value = false
}
</script>

<style scoped>
.no-spinner::-webkit-inner-spin-button,
.no-spinner::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
}
</style>