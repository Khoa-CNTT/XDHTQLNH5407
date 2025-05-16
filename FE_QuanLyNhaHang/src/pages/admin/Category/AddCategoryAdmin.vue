<template>
    <div class="w-[calc(100vw-300px)] h-[calc(100vh-100px)] fixed z-0 mt-20 ms-[300px] flex flex-col p-4">
        <div class="h-full w-full flex flex-col font-semibold gap-4 overflow-y-auto">
            <div class="uppercase font-bold text-3xl text-gray-800">Thêm loại món ăn</div>

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
                        <option v-for="type in allItemsTypes" :key="type.id" :value="type.id">
                            {{ type.name }}
                        </option>
                    </select>
                </div>

                <!-- Trạng thái -->
                <div class="flex items-center gap-4">
                    <label class="w-32">Trạng thái:</label>
                    <SwitchButton v-model="form.status" @toggle="(val) => form.status = val" />
                </div>

                <!-- Danh sách món ăn -->
                <div class="grid grid-cols-2 gap-4">
                    <!-- Món đã thêm -->
                    <div class="border rounded p-4 flex flex-col max-h-[350px]">
                        <p class="font-bold text-lg mb-2 text-green-600">🍽 Món đã thêm</p>
                        <div class="overflow-y-auto space-y-2 max-h-[300px]">
                            <div v-if="addedFoods.length > 0">
                                <div v-for="item in addedFoods" :key="item.id"
                                    class="flex items-center gap-4 p-2 border rounded hover:bg-gray-100">
                                    <img class="w-12 h-16 object-cover rounded" :src="item.image" :alt="item.name" />
                                    <span class="flex-1">{{ item.name }}</span>
                                    <button class="text-red-500 hover:text-red-700 font-bold"
                                        @click="removeFood(item.id)">Gỡ</button>
                                </div>
                            </div>
                            <div v-else class="text-gray-500 italic">Chưa có món nào được thêm.</div>
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
                    <button @click="goBack" class="border px-6 py-2 rounded hover:bg-gray-100">Trở lại</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { ref, onMounted, computed, watch } from 'vue';
import axios from 'axios';
import SwitchButton from '../../../components/Admin/SwitchButton.vue';

const router = useRouter();
const form = ref({
    name: '',
    id_type: '',
    status: 1,
    foods: []
});

const allItemsTypes = ref([]);
const allFoods = ref([]);

// Computed
const addedFoods = computed(() => {
    return allFoods.value.filter(food => form.value.foods.includes(food.id));
});

const notAddedFoods = computed(() => {
    return allFoods.value.filter(food => {
        const sameType = !form.value.id_type || food.id_type === form.value.id_type;
        const notAdded = !form.value.foods.includes(food.id);
        return sameType && notAdded;
    });
});

// Watch type to filter invalid foods
watch(() => form.value.id_type, (newVal) => {
    form.value.foods = form.value.foods.filter(foodId => {
        const matched = allFoods.value.find(f => f.id === foodId);
        return matched && matched.id_type === newVal;
    });
});

// Actions
function addFood(id) {
    if (!form.value.foods.includes(id)) {
        form.value.foods.push(id);
    }
}

function removeFood(id) {
    form.value.foods = form.value.foods.filter(fId => fId !== id);
}

async function goSave() {
    try {
        const payload = {
            name: form.value.name,
            id_type: form.value.id_type,
            status: form.value.status,
            food_ids: form.value.foods
        };
        await axios.post('http://127.0.0.1:8000/api/admin/categories/create', payload);
        alert('Thêm loại thành công!');
        router.push({ name: 'admin-categories' });
    } catch (error) {
        console.error('Lỗi khi thêm loại:', error);
        alert('Không thể thêm loại món ăn.');
    }
}

function goBack() {
    router.push({ name: 'admin-categories' });
}

// On mount
onMounted(async () => {
    try {
        const resTypes = await axios.get('http://127.0.0.1:8000/api/admin/types');
        allItemsTypes.value = resTypes.data.data;

        const resFoods = await axios.get('http://127.0.0.1:8000/api/admin/foods');
        allFoods.value = resFoods.data;
    } catch (err) {
        console.error('Lỗi khi tải dữ liệu:', err);
    }
});
</script>
