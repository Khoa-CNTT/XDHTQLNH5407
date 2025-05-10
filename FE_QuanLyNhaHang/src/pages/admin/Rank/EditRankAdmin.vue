<template>
    <div class="w-[calc(100vw-300px)] h-[calc(100vh-100px)] fixed z-0 mt-20 ms-[300px] flex flex-col p-2">
        <div class="h-full w-full flex flex-col font-semibold">
            <div class=" uppercase font-bold text-2xl">
                Chỉnh sửa Rank
            </div>

            <div class="w-[40vw] h-full flex justify-center items-start text-xl">
                <div class="w-full border h-fit flex flex-col">
                    <div class=" border flex flex-row">
                        <div class="flex flex-col flex-1 justify-center items-center">
                            <img class="w-full h-full object-cover" :src="`/picture/rank/${rankData.image}`"
                                alt="Ảnh rank" />
                        </div>

                        <div class="border flex flex-[2] flex-col p-2 gap-1">
                            <div class="flex flex-row items-center gap-2">
                                <p class="flex flex-1">Tên rank:</p>

                                <input type="text" id="name" v-model="form.nameRank"
                                    class="flex-1 border rounded px-4 py-2 text-lg"
                                    :placeholder="rankData.nameRank || 'Nhập tên rank...'" />
                            </div>

                            <div class="flex flex-row gap-2 items-center">
                                <p class="flex flex-1">Điểm cần đạt:</p>

                                <input type="number" id="name" v-model="form.necessaryPoint"
                                    class="flex-1 border rounded px-4 py-2 text-lg no-spinner" @input="validatePoint"
                                    :placeholder="rankData.necessaryPoint || 'Nhập điểm rank...'" />

                            </div>

                            <div class="flex flex-row gap-2 items-center">
                                <p class="flex flex-1">Phần trăm giảm giá:</p>

                                <input type="number" id="name" v-model="form.saleRank"
                                    class="flex-1 border rounded px-4 py-2 text-lg no-spinner" @input="validateSale"
                                    :placeholder="rankData.saleRank || 'Nhập phần trăm giảm giá...'" />
                            </div>


                            <div class="flex flex-row gap-2 p-2">
                                <div class="bg-green-500 text-white rounded-lg p-2 flex justify-center items-center flex-1 hover:cursor-pointer hover:text-black hover:bg-green-300"
                                    @click="goSave(rankData)">
                                    Lưu
                                </div>

                                <div class="bg-red-500 text-white rounded-lg p-2 flex justify-center items-center flex-1 hover:cursor-pointer hover:text-black hover:bg-red-300"
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
const rankData = route.query.data ? JSON.parse(route.query.data) : null;
const showConfirm = ref(false)

const form = ref({
    nameRank: rankData?.nameRank || '',
    necessaryPoint: rankData?.necessaryPoint || '',
    saleRank: rankData?.saleRank || '',
    image: rankData?.image || '',
})


async function goSave() {
    try {
        const response = await axios.put(`http://127.0.0.1:8000/api/admin/ranks/${rankData.id}`, {
            nameRank: form.value.nameRank,
            necessaryPoint: form.value.necessaryPoint,
            saleRank: form.value.saleRank,
            image: form.value.image // <-- thêm dòng này nếu cần gửi ảnh mặc định
        })

        alert("Cập nhật thành công!")
        router.push({ name: 'admin-ranks' })
    } catch (error) {
        console.error("Lỗi khi lưu rank:", error)
        alert("Đã xảy ra lỗi khi lưu dữ liệu.")
    }
}

function validatePoint(e) {
    const val = parseInt(e.target.value)
    if (val < 0) {
        form.value.necessaryPoint = 0
    }
}

function validateSale(e) {
    let val = parseInt(e.target.value)
    if (val < 0) val = 0
    if (val > 100) val = 100
    form.value.saleRank = val
}


function goBack() {
    router.push({ name: 'admin-ranks' })
}
function goDelete() {
    showConfirm.value = true
}

async function confirmDelete() {
    showConfirm.value = false

    try {
        await axios.delete(`http://127.0.0.1:8000/api/admin/ranks/${rankData.id}`)
        alert('Đã xoá rank thành công!')
        router.push({ name: 'admin-ranks' })
    } catch (error) {
        console.error('Lỗi khi xoá rank:', error)
        alert('Không thể xoá rank.')
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