<template>
    <div class="w-[calc(100vw-300px)] h-[calc(100vh-100px)] fixed z-0 mt-20 ms-[300px] flex flex-col p-2">
        <div class="h-full w-full flex flex-col font-semibold">
            <div class="uppercase font-bold text-2xl">Chi tiết Rank</div>

            <div v-if="customerData" class="w-[50vw] h-full flex justify-center items-start text-xl">
                <div class="w-full border h-fit flex flex-col">
                    <div class="border flex flex-row">
                        <!-- Ảnh -->
                        <div class="flex flex-col flex-1 justify-center items-center">
                            <img class="w-full h-full object-cover" :src="`/picture/rank/${customerData.image}`"
                                alt="Ảnh rank" />
                        </div>

                        <!-- Thông tin -->
                        <div class="border flex flex-[2] flex-col p-2 gap-2">
                            <p class="text-2xl">{{ customerData.FullName }}</p>

                            <div class="flex flex-row gap-2 items-center">
                                <p>Email:</p>
                                <p class="text-red-500">{{ customerData.mail }}</p>
                            </div>

                            <div class="flex flex-row gap-2 items-center">
                                <p>Số điện thoại:</p>
                                <p>{{ customerData.phoneNumber }}</p>
                            </div>

                            <div class="flex flex-row gap-2 items-center">
                                <p>Ngày sinh:</p>
                                <p>{{ customerData.birth }}</p>
                            </div>

                            <div class="flex flex-row gap-2 items-center">
                                <p>Điểm tích luỹ:</p>
                                <p class="text-red-500">{{ customerData.point }}</p>
                            </div>
                            <div class="flex flex-row gap-2 items-center">
                                <p>Mức rank:</p>
                                <p>{{ customerData.rank.nameRank }}</p>
                                <img class="w-12 h-12" src="/picture/rank/rank_bac.png" alt="rank">
                            </div>

                            <!-- Buttons -->
                            <div class="flex flex-row gap-2 p-2">
                                <div class="bg-green-500 text-white rounded-lg p-2 flex justify-center items-center flex-1 hover:cursor-pointer hover:text-black hover:bg-green-300"
                                    @click="goEdit(customerData)">
                                    Chỉnh sửa
                                </div>

                                <div class="bg-red-500 text-white rounded-lg p-2 flex justify-center items-center flex-1 hover:cursor-pointer hover:text-black hover:bg-red-300"
                                    @click="goDelete(customerData)">
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

            <!-- Xác nhận xoá -->
            <ConfirmDelete v-if="showConfirm" @confirm="confirmDelete" @cancel="cancelDelete" />
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import ConfirmDelete from '../../../components/Admin/ConfirmDelete.vue'
import axios from 'axios'

const router = useRouter()
const route = useRoute()

const customerData = route.query.data ? JSON.parse(route.query.data) : null
const showConfirm = ref(false)

function goBack() {
    router.push({ name: 'admin-customers' })
}

function goEdit(item) {
    router.push({
        name: 'admin-edit-customers',
        params: { id: item.id },
        query: { data: JSON.stringify(item) }
    })
}

function goDelete(item) {
    itemToDelete.value = item
    showConfirm.value = true
}

async function confirmDelete() {
    if (!itemToDelete.value || !itemToDelete.value.id) {
        console.error('Không có item hoặc ID để xoá')
        showConfirm.value = false
        return
    }

    try {
        await axios.delete(`http://127.0.0.1:8000/api/admin/customers/${itemToDelete.value.id}`)
        alert('Đã xoá thành công!')
        allItems.value = allItems.value.filter(item => item.id !== itemToDelete.value.id)
        itemToDelete.value = null
        showConfirm.value = false
    } catch (error) {
        console.error('Lỗi khi xoá:', error)
        alert('Không thể xoá.')
        showConfirm.value = false
    }
}

function cancelDelete() {
    showConfirm.value = false
    itemToDelete.value = null
}
</script>
