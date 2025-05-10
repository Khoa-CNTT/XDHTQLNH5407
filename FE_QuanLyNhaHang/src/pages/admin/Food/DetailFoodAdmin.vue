<template>
    <div class="w-[calc(100vw-300px)] h-[calc(100vh-100px)] fixed z-0 mt-20 ms-[300px] flex flex-col p-2">
        <div class="h-full w-full flex flex-col font-semibold">
            <div class=" uppercase font-bold text-2xl">
                Chi tiết món ăn
            </div>

            <div class="w-[70vw] h-full flex justify-center items-start text-xl">
                <div class="w-full border h-[70vh] flex flex-col">
                    <div class="flex-1 border flex flex-row">
                        <div class="flex flex-col flex-1 justify-center items-center">
                            <img class="w-full h-full object-cover" :src="foodData.image" alt="Ảnh món ăn" />

                        </div>

                        <div class="border flex flex-[2] flex-col p-2 gap-1">
                            <div class="flex flex-row items-center">
                                <p class="text-2xl">{{ foodData.name }}</p>

                                <div v-if="foodData.best_seller === 1" class="h-10 w-10">
                                    <img class="object-cover" :src="foodData.image" alt="">
                                </div>
                            </div>

                            <div class="text-xl text-red-500 flex flex-row">
                                <p class="text-red-500">{{ foodData.cost.toLocaleString() }} VNĐ</p>
                            </div>

                            <div class="flex flex-row gap-2 items-center">
                                <p>Thể loại:</p>

                                <div class="flex flex-wrap gap-2">
                                    <p v-for="(category, index) in foodData.categories" :key="index"
                                        class="bg-red-500 text-white text-center border w-fit p-2 rounded-lg">
                                        {{ category.name }}
                                    </p>
                                </div>

                            </div>

                            <div class="flex flex-row gap-2 items-center">
                                <p>Kiểu món ăn:</p>

                                <p class="bg-red-500 text-white text-center border w-fit p-2 rounded-lg">
                                    {{ foodData.type?.name || 'Không rõ' }} </p>

                            </div>

                            <p v-if="foodData.status === 1" class="bg-green-500 text-white rounded-md w-fit p-2">
                                Đang mở bán </p>

                            <p v-else class="bg-red-500 text-white rounded-md w-fit p-2">
                                Đang đóng </p>

                            <div class="flex flex-row">
                                <svg class="w-6 h-6 text-yellow-500" aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor"
                                    viewBox="0 0 24 24">
                                    <path
                                        d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
                                </svg>

                                <p class="text-red-500">5.0</p>

                                <p>/5.0</p>

                                <p class="ps-2">từ </p>

                                <p class="px-2 text-red-500">32</p>

                                <p class="">đánh giá</p>
                            </div>

                            <p class="font-normal">{{ foodData.detail }}</p>

                            <div class="flex flex-row gap-2 p-2">
                                <div class="bg-green-500 text-white rounded-lg p-2 flex justify-center items-center flex-1 hover:cursor-pointer hover:text-black hover:bg-green-300"
                                    @click="goEdit(foodData)">
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

                    <div class="flex flex-col overflow-y-auto max-h-full">
                        <p class="uppercase font-bold text-red-500">đánh giá</p>

                        <div class="flex flex-col w-full h-[50vh] gap-2 mt-2 ps-2">
                            <div v-for="(rate, index) in filteredRates" :key="rate.id" class="flex flex-col">
                                <div class="flex flex-row">
                                    <p>{{ rate.customer?.FullName || 'Ẩn danh' }}</p>
                                    <p class="px-1 font-normal text-sm items-center flex">-</p>
                                    <p class="font-normal text-sm items-center flex">
                                        {{ new Date(rate.time).toLocaleDateString() }}
                                    </p>
                                </div>
                                <p class="font-normal">{{ rate.detail }}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import ConfirmDelete from '../../../components/Admin/ConfirmDelete.vue'
import axios from 'axios'

const router = useRouter()
const route = useRoute()
const foodData = route.query.data ? JSON.parse(route.query.data) : null;
const showConfirm = ref(false)
const allItems = ref([]);
const itemToDelete = ref(null)

onMounted(() => {
    fetchRate()
})

const fetchRate = async () => {
    try {
        const response = await axios.get("http://127.0.0.1:8000/api/admin/rates");
        allItems.value = response.data.data;
    } catch (error) {
        console.error("Lỗi khi lấy dữ liệu:", error);
    }
}

const filteredRates = computed(() => {
    return allItems.value.filter(rate => rate.id_food === foodData?.id);
});


function goBack() {
    router.push({ name: 'admin-foods' })
}

function goEdit(item) {
    router.push({
        name: 'admin-edit-foods',
        params: {
            id: item.id,
        },
        query: {
            data: JSON.stringify(item)
        }
    });
}

function goDelete() {
    showConfirm.value = true
}

async function confirmDelete() {
    showConfirm.value = false

    try {
        await axios.delete(`http://127.0.0.1:8000/api/admin/foods/${foodData.id}`)
        alert('Đã xoá thành công!')
        router.push({ name: 'admin-foods' }) // Sửa lại đúng tên route sau khi xoá
    } catch (error) {
        console.error('Lỗi khi xoá:', error)
        alert('Không thể xoá.')
    }
}

function cancelDelete() {
    showConfirm.value = false
}

</script>
