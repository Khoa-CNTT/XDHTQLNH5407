<template>
    <div class="w-[calc(100vw-300px)] h-[calc(100vh-100px)] fixed z-0 mt-44 ms-[300px] flex flex-col p-2">
        <div class="h-full w-full flex flex-col font-semibold">
            <div class="w-[30vw] h-full flex justify-center items-start text-xl">
                <div class="w-full border h-fit flex flex-col">
                    <div class="flex-1 border flex flex-row">
                        <div class="border flex flex-[2] flex-col p-2 gap-2">
                            <!-- Hình ảnh -->
                            <div class="flex flex-row w-full items-center px-5 gap-4">
                                <p class="flex-1">Hình ảnh:</p>
                                <div class="flex flex-col gap-2">
                                    <div class="overflow-hidden">
                                        <img v-if="imagePreview" class="w-32 h-32 border object-cover"
                                            :src="imagePreview" alt="Preview" />
                                        <img v-else-if="rankData?.image" class="w-32 h-32 border object-cover"
                                            :src=rankData.image alt="Current" />
                                    </div>
                                    <input ref="fileInput" type="file" class="hidden" @change="onFileChange"
                                        accept="image/*" />
                                    <input
                                        class="w-32 border bg-gray-400 p-2 hover:cursor-pointer hover:bg-gray-300 text-center"
                                        type="button" value="Chọn ảnh" @click="$refs.fileInput.click()" />
                                </div>
                            </div>

                            <!-- Tên Rank -->
                            <div class="flex flex-row w-full items-center px-5 gap-4">
                                <p class="flex-1">Tên Rank:</p>
                                <input v-model="form.nameRank" type="text" class="flex-1 border rounded px-4 py-2" />
                            </div>

                            <!-- Điểm cần đạt -->
                            <div class="flex flex-row w-full items-center px-5 gap-4">
                                <p class="flex-1">Điểm cần đạt:</p>
                                <input v-model="form.necessaryPoint" type="number"
                                    class="flex-1 border rounded px-4 py-2 no-spinner" @input="validatePoint" />
                            </div>

                            <!-- Phần trăm giảm giá -->
                            <div class="flex flex-row w-full items-center px-5 gap-4">
                                <p class="flex-1">Phần trăm giảm:</p>
                                <input v-model="form.saleRank" type="number"
                                    class="flex-1 border rounded px-4 py-2 no-spinner" @input="validateSale" />
                            </div>

                            <!-- Nút thao tác -->
                            <div class="flex flex-row gap-2 p-2">
                                <div class="bg-green-500 rounded-lg p-2 flex justify-center items-center flex-1 text-white hover:text-black hover:cursor-pointer hover:bg-green-300"
                                    @click="goSave" :class="{ 'opacity-50 cursor-not-allowed': isSaving }">
                                    <span v-if="isSaving">Đang lưu...</span>
                                    <span v-else>Lưu</span>
                                </div>

                                <div class="bg-red-500 rounded-lg p-2 flex justify-center items-center flex-1 text-white hover:text-black hover:cursor-pointer hover:bg-red-300"
                                    @click="showConfirm = true">
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
            </div>
        </div>
    </div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'
import ConfirmDelete from '../../../components/Admin/ConfirmDelete.vue'
import { onMounted, ref, reactive } from 'vue'

const router = useRouter()
const route = useRoute()

const showConfirm = ref(false)
const isSaving = ref(false)
const imagePreview = ref(null)
const fileInput = ref(null)
const id = route.params.id
const rank = ref(null)
const rankData = ref({})


onMounted(async () => {
    try {
        const response = await axios.get(`http://127.0.0.1:8000/api/admin/ranks/${id}`)
        rank.value = response.data
        form.id = response.data.id
        form.nameRank = response.data.nameRank
        form.necessaryPoint = response.data.necessaryPoint
        form.saleRank = response.data.saleRank
        form.originImg = response.data.image
    } catch (error) {
        console.error("Lỗi khi lấy thông tin rank:", error)
    }
})

const form = reactive({
    id: '',
    nameRank: '',
    necessaryPoint: 0,
    saleRank: 0,
    image: '',
    originImg: ''
})


function onFileChange(e) {
    const file = e.target.files[0]
    if (file) {
        form.image = file
        imagePreview.value = URL.createObjectURL(file)
    }
}

function validatePoint(e) {
    const val = parseInt(e.target.value)
    if (val < 0) form.necessaryPoint = 0
}

function validateSale(e) {
    let val = parseInt(e.target.value)
    if (val < 0) val = 0
    if (val > 100) val = 100
    form.saleRank = val
}

function goBack() {
    router.push({ name: 'admin-ranks' })
}

async function goSave() {
    isSaving.value = true
    const formData = new FormData()
    formData.append('_method', 'PUT')
    formData.append('nameRank', form.nameRank)
    formData.append('necessaryPoint', form.necessaryPoint)
    formData.append('saleRank', form.saleRank)
    formData.append('originImg', form.originImg)

    if (form.image) {
        formData.append('image', form.image)
    }

    try {
        const response = await axios.post(
            `http://127.0.0.1:8000/api/admin/ranks/${form.id}`,
            formData,
            { headers: { 'Content-Type': 'multipart/form-data' } }
        )
        if (response.data.status === 1) {
            alert(response.data.message || 'Cập nhật thành công!')
            router.push({ name: 'admin-ranks' })
        } else {
            alert('Cập nhật thất bại.')
        }
    } catch (error) {
        console.error('Lỗi khi lưu:', error)
        alert('Có lỗi xảy ra khi cập nhật.')
    } finally {
        isSaving.value = false
    }
}

async function confirmDelete() {
    showConfirm.value = false
    try {
        const response = await axios.delete(`http://127.0.0.1:8000/api/admin/ranks/${form.id}`)
        if (response.data.status === 1) {
            alert('Đã xoá rank thành công!')
            router.push({ name: 'admin-ranks' })
        } else {
            alert('Không thể xoá rank.')
        }
    } catch (error) {
        console.error('Lỗi khi xoá rank:', error)
        alert('Có lỗi xảy ra khi xoá.')
    }
}

function cancelDelete() {
    showConfirm.value = false
}
</script>

<style scoped>
.no-spinner::-webkit-inner-spin-button,
.no-spinner::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
}
</style>
