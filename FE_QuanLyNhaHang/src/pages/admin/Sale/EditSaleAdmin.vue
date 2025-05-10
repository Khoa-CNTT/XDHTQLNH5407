<template>
    <div class="w-[calc(100vw-300px)] h-[calc(100vh-100px)] fixed z-0 mt-20 ms-[300px] flex flex-col p-2">
        <div class="h-full w-full flex flex-col font-semibold">
            <div class="uppercase font-bold text-2xl">Chỉnh sửa người dùng</div>

            <div class="w-[40vw] h-full flex justify-center items-start text-xl">
                <div class="w-full border h-fit p-4">
                    <div class="grid grid-cols-2 gap-x-6 gap-y-4">
                        <!-- Ảnh đại diện -->
                        <div class="col-span-2 flex items-center gap-4">
                            <p class="w-44">Ảnh đại diện:</p>
                            <input type="file" accept="image/*" @change="handleImageChange" />
                            <img v-if="previewImage" :src="previewImage" class="w-20 h-20 object-cover rounded" />
                        </div>

                        <!-- Tên -->
                        <div class="col-span-2 flex items-center">
                            <p class="w-44">Tên:</p>
                            <input type="text" v-model="form.name" class="flex-1 border rounded px-4 py-2 text-lg" />
                        </div>

                        <!-- Email -->
                        <div class="col-span-2 flex items-center">
                            <p class="w-44">Email:</p>
                            <input type="email" v-model="form.email" class="flex-1 border rounded px-4 py-2 text-lg" />
                        </div>

                        <!-- Số điện thoại -->
                        <div class="col-span-2 flex items-center">
                            <p class="w-44">SĐT:</p>
                            <input type="text" v-model="form.phone_number"
                                class="flex-1 border rounded px-4 py-2 text-lg" />
                        </div>

                        <!-- Ngày sinh -->
                        <div class="col-span-2 flex items-center">
                            <p class="w-44">Ngày sinh:</p>
                            <input type="date" v-model="form.birth" class="flex-1 border rounded px-4 py-2 text-lg" />
                        </div>

                        <!-- Vai trò -->
                        <div class="col-span-2 flex items-center">
                            <p class="w-44">Vai trò:</p>
                            <select v-model="form.role" class="flex-1 border rounded px-4 py-2 text-lg">
                                <option value="admin">Admin</option>
                                <option value="user">User</option>
                                <option value="staff">Staff</option>
                            </select>
                        </div>

                        <!-- Trạng thái -->
                        <div class="col-span-2 flex items-center">
                            <p class="w-44">Trạng thái:</p>
                            <select v-model="form.status" class="flex-1 border rounded px-4 py-2 text-lg">
                                <option value="active">Active</option>
                                <option value="inactive">Inactive</option>
                                <option value="banned">Banned</option>
                            </select>
                        </div>

                        <!-- Mật khẩu (tùy chọn) -->
                        <div class="col-span-2 flex items-center">
                            <p class="w-44">Mật khẩu:</p>
                            <input type="password" v-model="form.password"
                                class="flex-1 border rounded px-4 py-2 text-lg" placeholder="Để trống nếu không đổi" />
                        </div>

                        <!-- Nút hành động -->
                        <div class="col-span-2 grid grid-cols-2 gap-2 mt-4">
                            <div class="bg-green-500 rounded-lg p-2 flex justify-center items-center text-white hover:text-black hover:cursor-pointer hover:bg-green-300"
                                @click="goSave">
                                Lưu
                            </div>
                            <div class="rounded-lg border p-2 flex justify-center items-center hover:cursor-pointer hover:bg-gray-300"
                                @click="goBack">
                                Trở lại
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
import { ref, onMounted } from 'vue'
import axios from 'axios'

const router = useRouter()
const route = useRoute()

const userData = route.query.data ? JSON.parse(route.query.data) : null;

const previewImage = ref('')
const form = ref({
    name: '',
    email: '',
    phone_number: '',
    birth: '',
    role: '',
    status: '',
    password: '',
    image: null,
})

onMounted(() => {
    if (userData) {
        form.value.name = userData.name
        form.value.email = userData.email
        form.value.phone_number = userData.phone_number
        form.value.birth = userData.birth
        form.value.role = userData.role
        form.value.status = userData.status
        previewImage.value = userData.image
            ? `http://127.0.0.1:8000/storage/${userData.image}`
            : ''
    }
})

function handleImageChange(event) {
    const file = event.target.files[0]
    if (file) {
        form.value.image = file
        previewImage.value = URL.createObjectURL(file)
    }
}

async function goSave() {
    const formData = new FormData()
    formData.append('id', userData.id)
    formData.append('name', form.value.name)
    formData.append('email', form.value.email)
    formData.append('phone_number', form.value.phone_number)
    formData.append('birth', form.value.birth)
    formData.append('role', form.value.role)
    formData.append('status', form.value.status)

    if (form.value.password) {
        formData.append('password', form.value.password)
    }

    if (form.value.image instanceof File) {
        formData.append('image', form.value.image)
    }

    try {
        await axios.put(`http://127.0.0.1:8000/api/admin/users/update/${userData.id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
        alert('Cập nhật thành công!')
        router.push({ name: 'admin-users' })
    } catch (error) {
        console.error('Lỗi khi lưu:', error.response?.data || error)
        alert(error.response?.data?.message || 'Đã xảy ra lỗi khi lưu dữ liệu.')
    }
}

function goBack() {
    router.push({ name: 'admin-users' })
}
</script>
