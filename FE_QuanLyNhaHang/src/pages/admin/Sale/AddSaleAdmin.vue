<template>
    <div class="w-[calc(100vw-300px)] h-[calc(100vh-100px)] fixed z-0 mt-20 ms-[300px] flex flex-col p-2">
        <div class="h-full w-full flex flex-col font-semibold">
            <div class="uppercase font-bold text-2xl">Thêmt sale</div>

            <div class="w-[30vw] h-full flex justify-center items-start text-xl">
                <div class="w-full border h-fit p-4">
                    <div class="grid grid-cols-2 gap-x-6 gap-y-4">
                        <!-- Tên sale -->
                        <div class="col-span-2 flex items-center">
                            <p class="w-44">Tên sale:</p>
                            <input type="text" v-model="form.nameSale" class="flex-1 border rounded px-4 py-2 text-lg"
                                placeholder=" Nhập tên..." />
                        </div>

                        <!-- Giảm giá -->
                        <div class="col-span-2 flex items-center">
                            <p class="w-44">Phần trăm sale:</p>
                            <input type="number" v-model="form.percent"
                                class="flex-1 border rounded px-4 py-2 text-lg no-spinner" @input="validateSale"
                                placeholder="Nhập phần trăm giảm giá..." />
                        </div>

                        <!-- Trạng thái -->
                        <div class="col-span-2 flex items-center">
                            <p class="w-44">Trạng thái:</p>
                            <SwitchButton v-model="form.status"
                                @toggle="(val) => console.log('Trạng thái mới:', val)" />
                        </div>

                        <!-- Thời gian bắt đầu -->
                        <div class="col-span-2 flex items-center">
                            <p class="w-44">Bắt đầu:</p>
                            <input type="datetime-local" v-model="form.startTime"
                                class="flex-1 border rounded px-4 py-2 text-lg" />
                        </div>

                        <!-- Thời gian kết thúc -->
                        <div class="col-span-2 flex items-center">
                            <p class="w-44">Kết thúc:</p>
                            <input type="datetime-local" v-model="form.endTime"
                                class="flex-1 border rounded px-4 py-2 text-lg" />
                        </div>

                        <!-- Nút hành động -->
                        <div class="col-span-2 grid grid-cols-3 gap-2 mt-4">
                            <div class="bg-green-500 rounded-lg p-2 flex justify-center items-center text-white hover:text-black hover:cursor-pointer hover:bg-green-300"
                                @click="goSave">
                                Lưu
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
    </div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router'
import { ref, onMounted } from 'vue'
import axios from 'axios'
import SwitchButton from '../../../components/Admin/SwitchButton.vue';

const router = useRouter()
const route = useRoute()
const saleData = route.query.data ? JSON.parse(route.query.data) : null;

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
        await axios.post('http://127.0.0.1:8000/api/admin/sales/create', form.value)
        alert('Đã thêm sale mới thành công!')
        router.push({ name: 'admin-sales' })
    } catch (error) {
        console.error('Lỗi thêm sale:', error)
        alert('Không thể thêm sale.')
    }
}

function validateSale(e) {
    let val = parseInt(e.target.value)
    if (val < 0) val = 0
    if (val > 100) val = 100
    form.value.percent = val
}

function goBack() {
    router.push({ name: 'admin-sales' })
}
</script>

<style scoped>
.no-spinner::-webkit-inner-spin-button,
.no-spinner::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
}
</style>