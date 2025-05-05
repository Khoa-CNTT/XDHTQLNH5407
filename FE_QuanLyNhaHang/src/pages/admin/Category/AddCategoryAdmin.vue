<template>
    <div class="w-[calc(100vw-300px)] h-[calc(100vh-100px)] fixed z-0 mt-20 ms-[300px] flex flex-col p-4">
        <div class="h-full w-full flex flex-col font-semibold gap-4 overflow-y-auto">
            <!-- Tiêu đề -->
            <div class="uppercase font-bold text-3xl text-gray-800">Chỉnh sửa loại món ăn</div>

            <!-- Form chỉnh sửa -->
            <div class="w-full max-w-5xl bg-white rounded-lg shadow-md p-6 border space-y-2">
                <!-- Tên loại -->
                <div class="flex items-center gap-4">
                    <label class="w-32">Tên loại:</label>
                    <input type="text" id="name-category" class="flex-1 border rounded px-4 py-2 text-lg"
                        :placeholder="categoryData?.name || 'Nhập tên loại...'" />
                </div>

                <!-- Kiểu món ăn -->
                <div class="flex items-center gap-4">
                    <label class="w-32">Kiểu món ăn:</label>
                    <select class="border rounded px-4 py-2 w-[200px]" id="type-category">
                        <option value="monchinh">Món chính</option>
                        <option value="monchay">Món chay</option>
                        <option value="trangmieng">Tráng miệng</option>
                    </select>
                </div>

                <!-- Trạng thái -->
                <div class="flex items-center gap-4">
                    <label class="w-32">Trạng thái:</label>
                    <SwitchButton :status="categoryData?.status" @toggle="() => toggleField('status')" />
                </div>

                <!-- Danh sách món ăn -->
                <div class="grid grid-cols-2 gap-4">
                    <!-- Đã thêm -->
                    <div class="border rounded p-4 flex flex-col max-h-[350px]">
                        <p class="font-bold text-lg mb-2 text-green-600">🍽 Món đã thêm</p>
                        <div class="overflow-y-auto space-y-2 max-h-[300px]">
                            <div v-for="i in 6" :key="'added-' + i"
                                class="flex items-center gap-4 p-2 border rounded hover:bg-gray-100">
                                <img class="w-12 h-16 object-cover rounded" src="/picture/food/food 1.png" alt="">
                                <span class="flex-1">Hamberger thịt nướng bơ tỏi xả hấp các thứ</span>
                                <button class="text-red-500 hover:text-red-700 font-bold">Gỡ</button>
                            </div>
                        </div>
                    </div>

                    <!-- Chưa thêm -->
                    <div class="border rounded p-4 flex flex-col max-h-[350px]">
                        <p class="font-bold text-lg mb-2 text-blue-600">➕ Món chưa thêm</p>
                        <div class="overflow-y-auto space-y-2 max-h-[300px]">
                            <div v-for="i in 10" :key="'not-added-' + i"
                                class="flex items-center gap-4 p-2 border rounded hover:bg-gray-100">
                                <img class="w-12 h-16 object-cover rounded" src="/picture/food/food 1.png" alt="">
                                <span class="flex-1">Cơm gà lá chanh sốt mắm gừng</span>
                                <button class="text-green-500 hover:text-green-700 font-bold">Thêm</button>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Nút thao tác -->
                <div class="flex justify-end gap-4 pt-4">
                    <button class="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-400">Lưu thay đổi</button>
                    <button @click="goBack" class="border px-6 py-2 rounded hover:bg-gray-100">Trở lại</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router'
import SwitchButton from '../../../components/Admin/SwitchButton.vue';
import ConfirmDelete from '../../../components/Admin/ConfirmDelete.vue';

const router = useRouter()
const route = useRoute()
const categoryData = route.query.data ? JSON.parse(route.query.data) : null;

function goBack() {
    router.push({ name: 'admin-categories' })
}

function toggleField(field) {
    console.log("Toggled", field)
}

</script>
