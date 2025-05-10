<template>
    <div class="w-[calc(100vw-300px)] h-[calc(100vh-100px)] fixed z-0 mt-20 ms-[300px] flex flex-col p-2">
        <div class="h-full w-full flex flex-col font-semibold">
            <div class="uppercase font-bold text-2xl">Chỉnh sửa người dùng</div>

            <div class="w-[40vw] h-full flex justify-center items-start text-xl">
                <div class="w-full border h-fit flex flex-col">
                    <div class="border flex flex-row">
                        <!-- Ảnh đại diện -->
                        <div class="flex flex-col flex-1 justify-center items-center p-2">
                            <!-- <img :src="form.image"
                                class="w-[150px] h-[150px] object-cover border rounded-full cursor-pointer hover:opacity-80"
                                alt="Ảnh người dùng" /> -->
                        </div>

                        <!-- Form -->
                        <div class="border flex flex-[2] flex-col p-2 gap-1">
                            <div class="flex flex-row items-center gap-2">
                                <p class="flex flex-1">Tên người dùng:</p>
                                <input type="text" v-model="form.name" class="flex-1 border rounded px-4 py-2 text-lg"
                                    placeholder="Nhập tên người dùng..." />
                            </div>

                            <div class="flex flex-row items-center gap-2">
                                <p class="flex flex-1">Password:</p>
                                <input type="password" v-model="form.password"
                                    class="flex-1 border rounded px-4 py-2 text-lg" placeholder="Nhập Password..." />
                            </div>

                            <div class="flex flex-row items-center gap-2">
                                <p class="flex flex-1">Vai trò:</p>
                                <select v-model="form.role" class="flex-1 border rounded px-4 py-2 w-[200px]">
                                    <option disabled value="">--Vai trò--</option>
                                    <option value="admin">Quản trị viên</option>
                                    <option value="manager">Quản lý</option>
                                    <option value="staff">Nhân viên</option>
                                </select>
                            </div>

                            <div class="flex flex-row items-center gap-2">
                                <p class="flex flex-1">Trạng thái:</p>
                                <select v-model="form.status" class="flex-1 border rounded px-4 py-2 w-[200px]">
                                    <option disabled value="">--Trạng thái--</option>
                                    <option value="active">Đang làm việc</option>
                                    <option value="inactive">Nghỉ việc</option>
                                    <option value="banned">Bị ban</option>
                                </select>
                            </div>

                            <div class="flex flex-row items-center gap-2">
                                <p class="flex flex-1">Số điện thoại:</p>
                                <input type="text" v-model="form.phone_number"
                                    class="flex-1 border rounded px-4 py-2 text-lg"
                                    placeholder="Nhập số điện thoại..." />
                            </div>

                            <div class="flex flex-row items-center gap-2">
                                <p class="flex flex-1">Email:</p>
                                <input type="email" v-model="form.email" class="flex-1 border rounded px-4 py-2 text-lg"
                                    placeholder="Nhập email..." />
                            </div>

                            <div class="flex flex-row items-center gap-2">
                                <p class="flex flex-1">Ngày sinh:</p>
                                <input type="date" v-model="form.birth"
                                    class="flex-1 border rounded px-4 py-2 text-lg" />
                            </div>

                            <!-- Buttons -->
                            <div class="flex flex-row gap-2 p-2">
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
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const router = useRouter()
const fileInput = ref(null)

const form = ref({
    name: '',
    password: '',
    role: '',
    status: '',
    phone_number: '',
    email: '',
    birth: '',
    image: '', // <-- ảnh mặc định
})

async function goSave() {
    if (!form.value.name || !form.value.password || !form.value.email || !form.value.role) {
        alert('Vui lòng điền đầy đủ thông tin bắt buộc!')
        return
    }

    console.log('Dữ liệu gửi đi:', form.value) // <--- log giá trị gửi

    try {
        const response = await axios.post('http://127.0.0.1:8000/api/admin/users/create', form.value)
        alert('Đã thêm người dùng thành công!')
        router.push({ name: 'admin-users' })
    } catch (error) {
        console.error('Lỗi thêm người dùng:', error)
        if (error.response && error.response.data && error.response.data.message) {
            alert('Lỗi: ' + error.response.data.message)
        } else {
            alert('Không thể thêm người dùng.')
        }
    }
}


function goBack() {
    router.push({ name: 'admin-users' })
}
</script>
