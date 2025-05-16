<template>
    <div class="w-[calc(100vw-300px)] h-[calc(100vh-100px)] fixed z-0 mt-44 ms-[300px] flex flex-col p-2">
        <div class="h-full w-full flex flex-col font-semibold">
            <div class="w-[30vw] h-full flex justify-center items-start text-xl">
                <div class="w-full border h-fit flex flex-col">
                    <div class="flex-1 border flex flex-row">
                        <div class="border flex flex-[2] flex-col p-2 gap-2">
                            <div class="flex flex-row px-5 gap-2">
                                <p class="w-full">Hình ảnh:</p>
                                <div class="w-32 h-32 flex justify-center items-center overflow-hidden border">
                                    <img class=" w-full h-full object-cover" src="" alt="hình ảnh">
                                </div>
                            </div>
                            <div class="flex flex-row w-full items-center px-5 gap-2">
                                <p>Tên thành phần:</p>
                                <div class="flex-1 text-end">{{
                                    menuWarehouseData.ingredient.name_ingredient }}
                                </div>
                            </div>
                            <div class="flex flex-row w-full items-center px-5 gap-2">
                                <p class="flex-1">Đơn vị tính:</p>

                                <div class="flex-1 text-end">{{
                                    menuWarehouseData.ingredient.unit }}
                                </div>
                            </div>
                            <div class="flex flex-row items-center px-5 gap-2">
                                <p class="w-full">Số lượng đang có:</p>
                                <input v-model="form.quantity" class=" w-24 border rounded px-4 py-2 text-lg no-spinner"
                                    @input="validateQuantity" type="number" name="quantity" id="quantity">
                            </div>

                            <div class="flex flex-row gap-2 p-2">
                                <div class="bg-green-500 rounded-lg p-2 flex justify-center items-center flex-1 text-white hover:text-black hover:cursor-pointer hover:bg-green-300"
                                    @click="goSave(menuWarehouseData)">
                                    Lưu
                                </div>
                                <div class="bg-red-500 rounded-lg p-2 flex justify-center items-center flex-1 text-white hover:text-black hover:cursor-pointer hover:bg-red-300"
                                    @click="goDelete(menuWarehouseData)">
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
import ConfirmDelete from '../../../../components/Admin/ConfirmDelete.vue'

const router = useRouter()
const route = useRoute()
const menuWarehouseData = route.query.data ? JSON.parse(route.query.data) : null;
const showConfirm = ref(false);
const itemToDelete = ref(null)

const form = ref({
    id_ingredient: menuWarehouseData?.id_ingredient || '',
    quantity: menuWarehouseData?.quantity ?? 1
})

async function goSave() {
    try {
        const quantity = parseInt(form.value.quantity)
        if (isNaN(quantity) || quantity < 0) {
            alert("Vui lòng nhập số lượng là số nguyên không âm.")
            return
        }

        const response = await axios.put(
            `http://127.0.0.1:8000/api/admin/warehouses/update/${menuWarehouseData.id}`,
            {
                id_ingredient: form.value.id_ingredient,
                quantity: quantity.toString() // gửi dưới dạng string giống dữ liệu mẫu bạn cung cấp
            }
        )

        if (response.data.status === 1) {
            alert(response.data.message || "Cập nhật thành công!")
            router.push({ name: 'menu-warehouse-admin' })
        } else {
            alert("Cập nhật thất bại.")
        }

    } catch (error) {
        console.error("Lỗi khi lưu:", error)
        alert("Đã xảy ra lỗi khi lưu dữ liệu.")
    }
}


function validateQuantity(e) {
    let val = parseInt(e.target.value)
    if (val < 0) val = 0
    form.value.quantity = val
}

function goBack() {
    router.push({ name: 'menu-warehouse-admin' })
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
        await axios.delete(`http://127.0.0.1:8000/api/admin/warehouses/delete/${itemToDelete.value.id}`)
        alert('Đã xoá thành công!')
        router.push({ name: 'menu-warehouse-admin' }) // quay lại danh sách
    } catch (error) {
        console.error('Lỗi khi xoá:', error)
        alert('Không thể xoá.')
    } finally {
        itemToDelete.value = null
        showConfirm.value = false
    }
}


function cancelDelete() {
    showConfirm.value = false
    itemToDelete.value = null
}
</script>

<style scoped>
.no-spinner::-webkit-inner-spin-button,
.no-spinner::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
}
</style>