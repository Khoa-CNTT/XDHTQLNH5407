<template>
    <div class="w-[calc(100vw-300px)] h-[calc(100vh-100px)] fixed z-10 mt-20 ms-[300px] flex flex-col p-2">
        <div class="h-full w-full flex flex-col font-semibold">
            <div class="uppercase font-bold text-2xl">Chỉnh sửa món ăn</div>

            <div class="w-[70vw] h-full flex justify-center items-start text-xl rounded-lg">
                <div class="w-full h-[70vh] flex flex-row">
                    <!-- Left Section -->
                    <div class="border flex-col gap-2 p-5 flex flex-[2] rounded-s-lg">
                        <div class="w-full">
                            <p>Tên món ăn</p>
                            <input class="border w-full h-12 ps-2" v-model="foodData.name" type="text">
                        </div>

                        <div class="w-full">
                            <p>Giá món ăn (VNĐ)</p>
                            <input class="w-full border h-12 px-2" v-model="foodData.cost" type="number">
                        </div>

                        <div class="w-full flex flex-row gap-5">
                            <div class="flex flex-row gap-5">
                                <p>Best Seller</p>
                                <SwitchButton v-model="foodData.best_seller"
                                    @toggle="val => console.log('Trạng thái mới:', val)" />

                            </div>
                            <div class="flex flex-row gap-5">
                                <p>Mở bán</p>
                                <SwitchButton v-model="foodData.status"
                                    @toggle="val => console.log('Trạng thái mới:', val)" />
                            </div>
                        </div>

                        <div class="w-full">
                            <p>Mô tả món ăn</p>
                            <textarea class="w-full border mt-2 h-[300px] px-2 py-2 resize-none"
                                v-model="foodData.detail" placeholder="Nhập mô tả món ăn tại đây..."></textarea>
                        </div>
                    </div>

                    <!-- Right Section -->
                    <div class="border flex flex-1 gap-2 flex-col items-center p-2 rounded-e-lg">
                        <div class="flex flex-col gap-2 justify-center items-center">
                            <div class="h-[200px] w-[200px] border rounded-lg overflow-hidden">
                                <img class="object-cover w-full h-full" :src="foodData.image" alt="Hình ảnh hiển thị" />
                            </div>
                            <input
                                class="hover:cursor-pointer hover:bg-slate-500 rounded-md w-full h-12 text-2xl px-5 bg-gray-300"
                                type="button" value="Thay đổi" id="change-picture" />
                        </div>

                        <div class="w-[300px]">
                            <p>Kiểu món ăn</p>
                            <select class="h-10 w-full border-2 ps-2" v-model="foodData.type">
                                <option v-for="type in allItemsTypes" :key="type.id" :value="type.id">{{ type.name }}
                                </option>
                            </select>
                        </div>

                        <div class="w-[300px]">
                            <div class="mb-2">Thể loại</div>
                            <div v-if="foodData.type"
                                class="border overflow-y-auto text-sm flex flex-wrap gap-2 p-2 max-h-[200px]">
                                <div v-for="category in filteredCategories" :key="category.id"
                                    class="border hover:cursor-pointer rounded-lg px-2 flex items-center justify-center h-10"
                                    :class="{ 'bg-green-500 text-white': foodData.categories.includes(category.id) }"
                                    @click="toggleCategory(category.id)">
                                    <p>{{ category.name }}</p>
                                </div>
                            </div>
                            <div v-else class="text-sm text-gray-500">
                                Vui lòng chọn kiểu món ăn để hiển thị thể loại.
                            </div>
                        </div>

                        <div class="flex flex-row gap-5">
                            <input
                                class="bg-green-500 rounded-md w-24 hover:cursor-pointer hover:bg-green-300 hover:text-black text-white h-12 text-2xl"
                                type="button" value="Lưu" @click="goSave" />
                            <input
                                class="bg-red-500 rounded-md w-24 hover:cursor-pointer hover:bg-red-300 hover:text-black h-12 text-white text-2xl"
                                type="button" value="Xoá" @click="goDelete" />
                            <ConfirmDelete v-if="showConfirm" @confirm="confirmDelete" @cancel="cancelDelete" />
                            <input
                                class="rounded-md w-24 hover:cursor-pointer hover:bg-gray-300 border border-black h-12 text-2xl"
                                type="button" value="Trở lại" @click="goBack" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';
import SwitchButton from '../../../components/Admin/SwitchButton.vue';
import ConfirmDelete from '../../../components/Admin/ConfirmDelete.vue';

const router = useRouter();
const route = useRoute();

const showConfirm = ref(false);
const allItemsCategories = ref([]);
const allItemsTypes = ref([]);

const foodData = ref({
    id: null,
    name: '',
    cost: 0,
    best_seller: 0,
    status: 1,
    detail: '',
    image: '',
    type: null,
    categories: []
});

if (route.query.data) {
    const parsedData = JSON.parse(route.query.data);
    Object.assign(foodData.value, {
        id: parsedData.id,
        name: parsedData.name,
        cost: parsedData.cost,
        best_seller: parsedData.bestSeller,
        status: parsedData.status,
        detail: parsedData.detail,
        image: parsedData.image,
        type: parsedData.type?.id || parsedData.id_type || null,
        categories: parsedData.categories ? parsedData.categories.map(cat => cat.id) : []
    });
}

const fetchType = async () => {
    try {
        const response = await axios.get("http://127.0.0.1:8000/api/admin/types");
        allItemsTypes.value = response.data.data;
    } catch (error) {
        console.error("Lỗi khi lấy dữ liệu types:", error);
    }
};

const fetchCategory = async () => {
    try {
        const response = await axios.get("http://127.0.0.1:8000/api/admin/categories");
        allItemsCategories.value = response.data;
    } catch (error) {
        console.error("Lỗi khi lấy dữ liệu categories:", error);
    }
};

const filteredCategories = computed(() => {
    if (!foodData.value.type) return [];
    return allItemsCategories.value.filter(category => category.id_type === foodData.value.type);
});

watch(() => foodData.value.type, (newType) => {
    if (newType) {
        foodData.value.categories = foodData.value.categories.filter(categoryId =>
            allItemsCategories.value.some(category => category.id === categoryId && category.id_type === newType)
        );
    } else {
        foodData.value.categories = [];
    }
});

onMounted(() => {
    fetchType();
    fetchCategory();
});

function toggleField(field) {
    foodData.value[field] = foodData.value[field] === 1 ? 0 : 1;
}

function toggleCategory(categoryId) {
    const index = foodData.value.categories.indexOf(categoryId);
    if (index !== -1) {
        foodData.value.categories.splice(index, 1);
    } else {
        foodData.value.categories.push(categoryId);
    }
}

function goBack() {
    router.push({ name: 'admin-foods' });
}

function goDelete() {
    showConfirm.value = true;
}

async function confirmDelete() {
    showConfirm.value = false;
    try {
        await axios.delete(`http://127.0.0.1:8000/api/admin/foods/${foodData.value.id}`);
        alert('Đã xoá thành công!');
        router.push({ name: 'admin-foods' });
    } catch (error) {
        console.error('Lỗi khi xoá:', error);
        alert('Không thể xoá món ăn này.');
    }
}

function cancelDelete() {
    showConfirm.value = false;
}

async function goSave() {
    try {
        await axios.put(`http://127.0.0.1:8000/api/admin/foods/${foodData.value.id}`, {
            name: foodData.value.name,
            id_type: foodData.value.type,
            bestSeller: foodData.value.best_seller === 1,
            cost: foodData.value.cost,
            detail: foodData.value.detail,
            status: foodData.value.status,
            category_ids: foodData.value.categories,
            image: foodData.value.image || null
        });
        alert("Cập nhật thành công!");
        router.push({ name: 'admin-foods' });
    } catch (error) {
        console.error("Lỗi khi lưu:", error);
        alert("Đã xảy ra lỗi khi lưu dữ liệu.");
    }
}
</script>
