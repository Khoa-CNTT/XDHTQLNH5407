<template>
    <div class="w-[calc(100vw-300px)] h-[calc(100vh-100px)] fixed z-0 mt-20 ms-[300px] flex flex-col p-2">
        <div class="h-full w-full flex flex-col font-semibold">
            <div class=" uppercase font-bold text-2xl">
                Chỉnh sửa món ăn
            </div>
            <div class="w-[70vw] h-full flex justify-center items-start text-xl rounded-lg">
                <div class="w-full h-[70vh] flex flex-row">
                    <div class="border flex-col gap-2 p-5 flex flex-[2] rounded-s-lg">
                        <div class="w-full">
                            <p>Tên món ăn</p>
                            <input class="border w-full h-12 ps-2" placeholder="Tên món" type="text" name="name-food"
                                id="name">
                        </div>
                        <div class="w-full">
                            <p>Giá món ăn (VNĐ)</p>
                            <input class="w-full border h-12 px-2" placeholder='Giá' type="text" id="cost-food">
                        </div>
                        <div class="w-full flex flex-row gap-5">
                            <div class="flex flex-row gap-5">
                                <p>Best Seller</p>
                                <SwitchButton />

                            </div>
                            <div class="flex flex-row gap-5">
                                <p>Mở bán</p>
                                <SwitchButton />

                            </div>
                        </div>
                        <div class="w-full">
                            <p>Mô tả món ăn</p>
                            <textarea class="w-full border mt-2 h-[300px] px-2 py-2 resize-none" sid="detail-food"
                                placeholder="Nhập mô tả món ăn tại đây..."></textarea>
                        </div>

                    </div>
                    <div class="border flex flex-1 gap-2 flex-col items-center p-2 rounded-e-lg">
                        <div class="flex flex-col gap-2 justify-center items-center">
                            <div class="h-[200px] w-[200px] border rounded-lg overflow-hidden">
                                <img class="object-cover w-full h-full" src="/picture/food/food 1.png"
                                    alt="Hình ảnh hiển thị">
                            </div>
                            <input
                                class="hover:cursor-pointer hover:bg-slate-500 rounded-md w-full h-12 text-2xl px-5 bg-gray-300"
                                type="button" value="Thay đổi" id="change-picture">
                        </div>
                        <div class="w-[300px]">
                            <p>Kiểu món ăn</p>
                            <select class="h-10 w-full border-2 ps-2" name="month" id="month">
                                <option value="1">1</option>
                                <option value="2">2</option>
                            </select>
                        </div>

                        <div class="h-[500px] w-[300px]">
                            <div class="mb-2">Thể loại</div>
                            <div class="border overflow-y-auto text-sm flex flex-wrap gap-2 p-2 max-h-[200px]">
                                <div
                                    class="bg-green-500 text-white border rounded-lg px-2 flex items-center justify-center h-10">
                                    <p>ok</p>
                                </div>
                                <div v-for="(item, index) in allItems" :key="index"
                                    class="border hover:cursor-pointer rounded-lg px-2 flex items-center justify-center h-10">
                                    <p>{{ item.name }}</p>
                                </div>
                            </div>
                        </div>
                        <div class="flex flex-row gap-5">
                            <input class="bg-green-400 rounded-md w-24 h-12 text-2xl" type="button" value="Lưu"
                                id="save" @click="goSave">
                            <input class="rounded-md w-24 border border-black h-12 text-2xl" type="button"
                                value="Trở lại" id="save" @click="goBack">
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
import SwitchButton from '../../../components/Admin/SwitchButton.vue';

const router = useRouter()
const route = useRoute()

const allItems = ref([
    { name: 'Lẩu' }, { name: 'Món mặn hấp' }, { name: 'Hải sản hấp' }, { name: 'Canh chua' }, { name: 'Canh chua' },
    { name: 'Canh chua' }, { name: 'Canh chua' }, { name: 'Canh chua' }, { name: 'Canh chua' }, { name: 'Canh chua' },
    { name: 'Canh chua' }, { name: 'Canh chua' }, { name: 'Canh chua' }, { name: 'Canh chua' }, { name: 'Canh chua' }, { name: 'Canh chua' },])

const toggleStatus = (item) => {
    item.status = item.status === 1 ? 0 : 1
}

function goBack() {
    router.push({ name: 'admin-foods' })
}

</script>
