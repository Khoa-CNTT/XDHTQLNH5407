<template>
    <div class="w-[calc(100vw-300px)] h-[calc(100vh-100px)] fixed z-0 mt-20 ms-[300px] flex flex-col p-2">
        <div class="h-full w-full flex flex-col font-semibold">
            <div class=" uppercase font-bold text-2xl">
                Thêm mới Rank
            </div>

            <div class="w-[40vw] h-full flex justify-center items-start text-xl">
                <div class="w-full border h-fit flex flex-col">
                    <div class=" border flex flex-row">
                        <div class="flex flex-col gap-2 flex-1 justify-center items-center">
                            <div class="w-44 h-44 border">
                                <img v-if="imagePreview" class="w-full h-full object-cover" :src="imagePreview"
                                    alt="Ảnh rank" />
                            </div>
                            <input class="w-24 h-12 border" type="button" value="Chọn ảnh" @click="chooseImage" />
                        </div>

                        <div class="border flex flex-[2] flex-col p-2 gap-1">
                            <div class="flex flex-row items-center gap-2">
                                <p class="flex flex-1">Tên rank:</p>
                                <input type="text" v-model="form.nameRank"
                                    class="flex-1 border rounded px-4 py-2 text-lg" placeholder="Nhập tên rank..." />
                            </div>

                            <div class="flex flex-row gap-2 items-center">
                                <p class="flex flex-1">Điểm cần đạt:</p>
                                <input type="number" v-model="form.necessaryPoint"
                                    class="flex-1 border rounded px-4 py-2 text-lg" min="0" @input="validatePoint"
                                    placeholder="Nhập điểm rank..." />
                            </div>

                            <div class="flex flex-row gap-2 items-center">
                                <p class="flex flex-1">Phần trăm giảm giá:</p>
                                <input type="number" v-model="form.saleRank"
                                    class="flex-1 border rounded px-4 py-2 text-lg" min="0" max="100"
                                    @input="validateSale" placeholder="Nhập phần trăm giảm giá..." />
                            </div>

                            <div class=" flex flex-row gap-2 p-2">
                                <div class="bg-green-500 text-white rounded-lg p-2 flex justify-center items-center flex-1 hover:cursor-pointer hover:text-black hover:bg-green-300"
                                    @click="goSave">
                                    Lưu
                                </div>

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
import { ref } from 'vue'
import axios from 'axios'

const router = useRouter()
const route = useRoute()

const form = ref({
    nameRank: '',
    necessaryPoint: '',
    saleRank: '',
    image: null
})

const imagePreview = ref(null)

function validateSale(e) {
    let val = parseInt(e.target.value)
    if (val < 0) val = 0
    if (val > 100) val = 100
    form.value.saleRank = val
}

function validatePoint(e) {
    let val = parseInt(e.target.value)
    if (val < 0) val = 0
    form.value.necessaryPoint = val
}

// Chọn hình ảnh
function chooseImage() {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = 'image/*'
    input.onchange = (e) => onFileChange(e)
    input.click()
}

function onFileChange(e) {
    const file = e.target.files[0]
    if (file) {
        form.value.image = file
        imagePreview.value = URL.createObjectURL(file)
    }
}

// Lưu rank mới
async function goSave() {
    const formData = new FormData()
    formData.append('image', form.value.image)
    formData.append('nameRank', form.value.nameRank)
    formData.append('necessaryPoint', form.value.necessaryPoint)
    formData.append('saleRank', form.value.saleRank)

    try {
        await axios.post('http://127.0.0.1:8000/api/admin/ranks/create', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        alert('Đã thêm rank mới thành công!')
        router.push({ name: 'admin-ranks' })
    } catch (error) {
        console.error('Lỗi thêm rank:', error)
        alert('Không thể thêm rank.')
    }
}

// Quay lại trang quản lý Rank
function goBack() {
    router.push({ name: 'admin-ranks' })
}
</script>
