<template>
    <div class="w-[calc(100vw-300px)] h-[calc(100vh-100px)] fixed z-0 mt-20 ms-[300px] flex flex-col p-2">
        <div class="h-full w-full flex flex-col font-semibold">
            <div class=" uppercase font-bold text-2xl">
                Chi tiết Rank
            </div>

            <div class="w-[50vw] h-full flex justify-center items-start text-xl">
                <div class="w-full border h-fit flex flex-col">
                    <div class=" border flex flex-row">
                        <div class="flex flex-col flex-1 justify-center items-center">
                            <img class="w-full h-full object-cover" :src="`/picture/rank/${rankData.image}`"
                                alt="Ảnh rank" />
                        </div>

                        <div class="border flex flex-[2] flex-col p-2 gap-1">
                            <div class="flex flex-row items-center">
                                <p class="text-2xl">{{ rankData.nameRank }}</p>
                            </div>

                            <div class="flex flex-row gap-2 items-center">
                                <p>Điểm cần đạt:</p>

                                <p> {{ rankData.necessaryPoint }}</p>
                            </div>

                            <div class="flex flex-row gap-2 items-center">
                                <p>Phần trăm giảm giá:</p>

                                <p> {{ rankData.saleRank }}%</p>
                            </div>


                            <div class="flex flex-row gap-2 p-2">
                                <div class="bg-green-500 text-white rounded-lg p-2 flex justify-center items-center flex-1 hover:cursor-pointer hover:text-black hover:bg-green-300"
                                    @click="goEdit(rankData)">
                                    Chỉnh sửa
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
import axios from 'axios'
import ConfirmDelete from '../../../components/Admin/ConfirmDelete.vue'

const router = useRouter()
const route = useRoute()
const rankData = route.query.data ? JSON.parse(route.query.data) : null
const showConfirm = ref(false)

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

function goEdit(item) {
    router.push({
        name: 'admin-edit-ranks',
        params: {
            id: item.id,
        },
        query: {
            data: JSON.stringify(item)
        }
    })
}
</script>
