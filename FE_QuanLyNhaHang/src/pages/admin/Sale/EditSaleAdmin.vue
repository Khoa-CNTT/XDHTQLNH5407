<template>
    <div class="w-[calc(100vw-300px)] h-[calc(100vh-100px)] fixed z-0 mt-20 ms-[300px] flex flex-col p-2">
        <div class="h-full w-full flex flex-col font-semibold">
            <div class="uppercase font-bold text-2xl">Chỉnh sửa sale</div>

            <div class="w-[30vw] h-full flex justify-center items-start text-xl">
                <div class="w-full border h-fit p-4">
                    <div class="grid grid-cols-2 gap-x-6 gap-y-4">
                        <!-- Tên sale -->
                        <div class="col-span-2 flex items-center">
                            <p class="w-32">Tên sale:</p>
                            <input type="text" v-model="form.nameSale" class="flex-1 border rounded px-4 py-2 text-lg"
                                :placeholder="saleData?.nameSale || 'Nhập tên...'" />
                        </div>

                        <!-- Giảm giá -->
                        <div class="col-span-2 flex items-center">
                            <p class="w-32">Tên sale:</p>
                            <input type="text" v-model="form.percent" class="flex-1 border rounded px-4 py-2 text-lg"
                                :placeholder="saleData?.percent || 'Nhập phần trăm giảm giá...'" />
                        </div>

                        <!-- Trạng thái -->
                        <div class="col-span-2 flex items-center">
                            <p class="w-32">Trạng thái:</p>
                            <SwitchButton v-model="form.status"
                                @toggle="(val) => console.log('Trạng thái mới:', val)" />
                        </div>

                        <!-- Thời gian bắt đầu -->
                        <div class="col-span-2 flex items-center">
                            <p class="w-32">Bắt đầu:</p>
                            <input type="datetime-local" v-model="form.startTime"
                                class="flex-1 border rounded px-4 py-2 text-lg" />
                        </div>

                        <!-- Thời gian kết thúc -->
                        <div class="col-span-2 flex items-center">
                            <p class="w-32">Kết thúc:</p>
                            <input type="datetime-local" v-model="form.endTime"
                                class="flex-1 border rounded px-4 py-2 text-lg" />
                        </div>

                        <!-- Nút hành động -->
                        <div class="col-span-2 grid grid-cols-3 gap-2 mt-4">
                            <div class="bg-green-500 rounded-lg p-2 flex justify-center items-center text-white hover:text-black hover:cursor-pointer hover:bg-green-300"
                                @click="goSave">
                                Lưu
                            </div>
                            <div class="bg-red-500 rounded-lg p-2 flex justify-center items-center text-white hover:text-black hover:cursor-pointer hover:bg-red-300"
                                @click="goDelete">
                                Xoá
                            </div>
                            <div class="rounded-lg border p-2 flex justify-center items-center hover:cursor-pointer hover:bg-gray-300"
                                @click="goBack">
                                Trở lại
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <ConfirmDelete v-if="showConfirm" @confirm="confirmDelete" @cancel="cancelDelete" />
    </div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router'
import ConfirmDelete from '../../../components/Admin/ConfirmDelete.vue';
import { ref, onMounted } from 'vue'
import axios from 'axios'
import SwitchButton from '../../../components/Admin/SwitchButton.vue';

const router = useRouter()
const route = useRoute()
const saleData = route.query.data ? JSON.parse(route.query.data) : null;
const showConfirm = ref(false)

const form = ref({
    nameSale: '',
    percent: '',
    status: 1,
    startTime: '',
    endTime: ''
})

onMounted(() => {
    if (saleData) {
        form.value.nameSale = saleData.nameSale
        form.value.percent = saleData.percent
        form.value.status = saleData.status
        form.value.startTime = saleData.startTime
        form.value.endTime = saleData.endTime
    }
})

async function goSave() {
    try {
        const response = await axios.put(`http://127.0.0.1:8000/api/admin/sales/${saleData.id}`, {
            nameSale: form.value.nameSale,
            percent: form.value.percent, // ✅ THÊM DÒNG NÀY
            status: form.value.status,
            startTime: form.value.startTime,
            endTime: form.value.endTime,
        })

        alert("Cập nhật thành công!")
        router.push({ name: 'admin-sales' })
    } catch (error) {
        console.error("Lỗi khi lưu:", error)
        alert("Đã xảy ra lỗi khi lưu dữ liệu.")
    }
}


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
</script>