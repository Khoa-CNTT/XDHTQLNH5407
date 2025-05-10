<template>
    <div class="w-[calc(100vw-300px)] h-[calc(100vh-100px)] fixed z-0 mt-20 ms-[300px] flex flex-col p-2">
        <div class="h-full w-full flex flex-col font-semibold">
            <div class="uppercase font-bold text-2xl">
                Chi tiết loại món ăn
            </div>
            <div class="w-[50vw] h-full flex justify-center items-start text-xl">
                <div v-if="categoryData" class="w-full border h-fit flex flex-col">
                    <div class="flex-1 border flex flex-row">
                        <div class="border flex flex-[2] flex-col p-2 gap-2">
                            <div class="flex flex-row w-full items-center px-5">
                                <p>Tên loại:</p>

                                <p class="text-2xl flex-1 text-end">{{ categoryData.name }}</p>
                            </div>

                            <div class="flex flex-row w-full items-center px-5">
                                <p>Kiểu:</p>

                                <p class="text-2xl flex-1 text-end">{{ categoryData.type.name }} </p>
                            </div>

                            <div class="flex flex-row w-full items-center px-5">
                                <p class="flex-1">Trạng thái:</p>

                                <p v-if="categoryData.status === 1" class="bg-green-500 text-white text-end px-2">
                                    Đang mở bán
                                </p>

                                <p v-else class="bg-red-500 text-white px-2 text-end">
                                    Đang đóng
                                </p>
                            </div>

                            <div class="border p-2 h-96 flex flex-col gap-2">
                                <p class="text-xl font-bold">Danh sách các món</p>

                                <div class="overflow-y-auto max-h-full flex flex-col gap-2">
                                    <div v-for="(item, index) in categoryData.category_foods" :key="index"
                                        class="flex flex-row gap-2 justify-start items-center border endpoint p-2">
                                        <img class="object-cover w-12 h-16" :src="item.food.image"
                                            :alt="item.food.name" />

                                        <p class="text-base">{{ item.food.name }}</p>
                                    </div>

                                    <div v-if="categoryData.category_foods.length === 0" class="text-gray-500 italic">
                                        Không có món nào thuộc loại này.
                                    </div>
                                </div>
                            </div>

                            <div class="flex flex-row gap-2 p-2">
                                <div class="bg-green-500 rounded-lg p-2 flex text-white justify-center items-center flex-1 hover:text-black hover:cursor-pointer hover:bg-green-300"
                                    @click="goEdit(categoryData)">
                                    Chỉnh sửa
                                </div>

                                <div class="bg-red-500 rounded-lg p-2 flex text-white justify-center items-center flex-1 hover:text-black hover:cursor-pointer hover:bg-red-300"
                                    @click="goDelete(categoryData)">
                                    Xoá
                                </div>

                                <ConfirmDelete v-if="showConfirm" @confirm="confirmDelete" @cancel="cancelDelete" />

                                <div class="rounded-lg border p-2 flex justify-center items-center flex-1 hover:cursor-pointer hover:bg-gray-300"
                                    @click="goBack">
                                    Trở lại
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div v-else class="text-red-500 text-xl">
                    Không tìm thấy dữ liệu loại món ăn.
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
const showConfirm = ref(false)
const itemToDelete = ref(null)

const categoryData = ref(null)
try {
    if (route.query.data) {
        categoryData.value = JSON.parse(route.query.data)
    }
} catch (error) {
    console.error('Lỗi khi parse dữ liệu category:', error)
}

function goBack() {
    router.push({ name: 'admin-categories' })
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
        await axios.delete(`http://127.0.0.1:8000/api/admin/categories/${itemToDelete.value.id}`)
        alert('Đã xoá loại thành công!')
        itemToDelete.value = null
        showConfirm.value = false
        router.push({ name: 'admin-categories' }) // Redirect to categories list after deletion
    } catch (error) {
        console.error('Lỗi khi xoá loại:', error)
        alert('Không thể xoá loại.')
        showConfirm.value = false
    }
}

function cancelDelete() {
    showConfirm.value = false
    itemToDelete.value = null
}

function goEdit(item) {
    router.push({
        name: 'admin-edit-categories',
        params: { id: item.id },
        query: { data: JSON.stringify(item) }
    })
}
</script>