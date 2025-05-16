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
                    <input type="text" v-model="form.name" class="flex-1 border rounded px-4 py-2 text-lg"
                        placeholder="Nhập tên loại..." />
                </div>

                <!-- Kiểu món ăn -->
                <div class="flex items-center gap-4">
                    <label class="w-32">Kiểu món ăn:</label>
                    <select v-model="form.id_type" class="border rounded px-4 py-2 w-[200px]">
                        <option disabled value="">Chọn kiểu</option>
                        <option v-for="type in allItemsTypes" :key="type.id" :value="type.id">
                            {{ type.name }}
                        </option>
                    </select>
                </div>

                <!-- Trạng thái -->
                <div class="flex items-center gap-4">
                    <label class="w-32">Trạng thái:</label>
                    <SwitchButton v-model="form.status" @toggle="val => console.log('Trạng thái mới:', val)" />
                </div>

                <!-- Danh sách món ăn -->
                <div class="grid grid-cols-2 gap-4">
                    <!-- Món đã thêm -->
                    <div class="border rounded p-4 flex flex-col max-h-[350px]">
                        <p class="font-bold text-lg mb-2 text-green-600">🍽 Món đã thêm</p>
                        <div class="overflow-y-auto space-y-2 max-h-[300px]">
                            <div v-if="addedFoods.length > 0">
                                <div v-for="(item, index) in addedFoods" :key="index"
                                    class="flex flex-row gap-4 items-center border rounded p-2 hover:bg-gray-100">
                                    <img class="object-cover w-12 h-16 rounded" :src="item.image" :alt="item.name" />
                                    <p class="flex-1 text-base">{{ item.name }}</p>
                                    <button class="text-red-500 hover:text-red-700 font-bold"
                                        @click="removeFood(item.id)">Gỡ</button>
                                </div>
                            </div>
                            <div v-else class="text-gray-500 italic">Không có món nào thuộc loại này.</div>
                        </div>
                    </div>

                    <!-- Món chưa thêm -->
                    <div class="border rounded p-4 flex flex-col max-h-[350px]">
                        <p class="font-bold text-lg mb-2 text-blue-600">➕ Món chưa thêm</p>
                        <div class="overflow-y-auto space-y-2 max-h-[300px]">
                            <div v-if="notAddedFoods.length > 0">
                                <div v-for="item in notAddedFoods" :key="item.id"
                                    class="flex items-center gap-4 p-2 border rounded hover:bg-gray-100">
                                    <img class="w-12 h-16 object-cover rounded" :src="item.image" :alt="item.name" />
                                    <span class="flex-1">{{ item.name }}</span>
                                    <button class="text-green-500 hover:text-green-700 font-bold"
                                        @click="addFood(item.id)">Thêm</button>
                                </div>
                            </div>
                            <div v-else class="text-gray-500 italic">Tất cả món đã được thêm.</div>
                        </div>
                    </div>
                </div>

                <!-- Nút thao tác -->
                <div class="flex justify-end gap-4 pt-4">
                    <button class="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-400"
                        @click="goSave">Lưu</button>
                    <button class="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-400"
                        @click="goDelete">Xoá</button>
                    <ConfirmDelete v-if="showConfirm" @confirm="confirmDelete" @cancel="cancelDelete" />
                    <button @click="goBack" class="border px-6 py-2 rounded hover:bg-gray-100">Trở lại</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive, onMounted, computed, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';

import SwitchButton from '../../../components/Admin/SwitchButton.vue';
import ConfirmDelete from '../../../components/Admin/ConfirmDelete.vue';

const router = useRouter();
const route = useRoute();

const showConfirm = ref(false);
const allItemsTypes = ref([]);
const allFoods = ref([]);
const categoryData = ref(null);

const form = reactive({
    id: null,
    name: '',
    id_type: null,
    status: 1,
    foods: []
});

function populateFormFromCategory(data) {
    form.id = data.id || null;
    form.name = data.name || '';
    form.id_type = data.id_type || null;
    form.status = data.status || 1;
    form.foods = data.category_foods.map(item => item.id_food);
}

const fetchType = async () => {
    try {
        const res = await axios.get('http://127.0.0.1:8000/api/admin/types');
        allItemsTypes.value = res.data.data;
    } catch (err) {
        console.error('Lỗi khi lấy types:', err);
    }
};

const fetchFoods = async () => {
    try {
        const res = await axios.get('http://127.0.0.1:8000/api/admin/foods');
        allFoods.value = res.data;
    } catch (err) {
        console.error('Lỗi khi lấy foods:', err);
    }
};

const addedFoods = computed(() => {
    return allFoods.value.filter(food => form.foods.includes(food.id));
});

const notAddedFoods = computed(() => {
    return allFoods.value.filter(
        food => (!form.id_type || food.id_type === form.id_type) && !form.foods.includes(food.id)
    );
});

watch(() => form.id_type, (newType) => {
    if (newType) {
        form.foods = form.foods.filter(foodId =>
            allFoods.value.some(food => food.id === foodId && food.id_type === newType)
        );
    }
});

function addFood(foodId) {
    if (!form.foods.includes(foodId)) {
        form.foods.push(foodId);
    }
}

function removeFood(foodId) {
    form.foods = form.foods.filter(id => id !== foodId);
}

function goBack() {
    router.push({ name: 'admin-categories' });
}

function goDelete() {
    showConfirm.value = true;
}

async function confirmDelete() {
    showConfirm.value = false;
    try {
        await axios.delete(`http://127.0.0.1:8000/api/admin/categories/${form.id}`);
        alert('Đã xoá thành công!');
        router.push({ name: 'admin-categories' });
    } catch (err) {
        console.error('Lỗi khi xoá:', err);
        alert('Không thể xoá thể loại này.');
    }
}

function cancelDelete() {
    showConfirm.value = false;
}

async function goSave() {
    try {
        await axios.put(`http://127.0.0.1:8000/api/admin/categories/${form.id}`, {
            name: form.name,
            id_type: form.id_type,
            status: form.status,
            food_ids: form.foods
        });
        alert('Cập nhật thành công!');
        router.push({ name: 'admin-categories' });
    } catch (err) {
        console.error('Lỗi khi lưu:', err);
        alert('Đã xảy ra lỗi khi lưu dữ liệu.');
    }
}

onMounted(async () => {
    if (route.query.data) {
        categoryData.value = JSON.parse(route.query.data);
    }

    await fetchType();
    await fetchFoods();

    if (categoryData.value) {
        populateFormFromCategory(categoryData.value);
    }
});
</script>
