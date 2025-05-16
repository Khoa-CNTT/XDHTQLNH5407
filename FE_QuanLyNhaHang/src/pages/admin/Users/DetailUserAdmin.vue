<template>
    <div class="w-[calc(100vw-300px)] h-[calc(100vh-100px)] fixed z-0 mt-20 ms-[300px] flex flex-col p-2">
        <div class="h-full w-full flex flex-col font-semibold">
            <div class="uppercase font-bold text-2xl">Chi tiết Rank</div>

            <div v-if="userData" class="w-[50vw] h-full flex justify-center items-start text-xl">
                <div class="w-full border h-fit flex flex-col">
                    <div class="border flex flex-row">
                        <!-- Ảnh -->
                        <div class="flex flex-col flex-1 justify-center items-center">
                            <img class="w-full h-full object-cover" :src="`/picture/rank/${userData.image}`"
                                alt="Ảnh rank" />
                        </div>

                        <!-- Thông tin -->
                        <div class="border flex flex-[2] flex-col p-2 gap-1">
                            <p class="text-2xl">{{ userData.name }}</p>

                            <div class="flex flex-row gap-2 items-center">
                                <p>Chức vụ:</p>
                                <p v-if="userData.role === 'admin'" class="text-red-500">Quản trị viên</p>
                                <p v-else-if="userData.role === 'staff'" class="text-red-500">Nhân viên</p>
                                <p v-if="userData.role === 'manager'" class="text-red-500">Quản lý</p>
                            </div>

                            <div class="flex flex-row gap-2 items-center">
                                <p>Trạng thái:</p>
                                <p v-if="userData.status === 'active'"
                                    class="w-44 p-2 text-center rounded-md text-white bg-green-500">Đang hoạt động</p>
                                <p v-if="userData.status === 'inactive'"
                                    class="w-44 p-2 text-center rounded-md text-white bg-yellow-500">Nghỉ làm</p>
                                <p v-if="userData.status === 'banned'"
                                    class="w-44 p-2 text-center rounded-md text-white bg-red-500">Bị ban</p>
                            </div>

                            <div class="flex flex-row gap-2 items-center">
                                <p>Số điện thoại:</p>
                                <p>{{ userData.phone_number }}</p>
                            </div>

                            <div class="flex flex-row gap-2 items-center">
                                <p>Email:</p>
                                <p>{{ userData.email }}</p>
                            </div>

                            <div class="flex flex-row gap-2 items-center">
                                <p>Ngày sinh:</p>
                                <p>{{ userData.birth }}</p>
                            </div>

                            <!-- Buttons -->
                            <div class="flex flex-row gap-2 p-2">
                                <div class="bg-green-500 text-white rounded-lg p-2 flex justify-center items-center flex-1 hover:cursor-pointer hover:text-black hover:bg-green-300"
                                    @click="goEdit(userData)">
                                    Chỉnh sửa
                                </div>

                                <div class="bg-red-500 text-white rounded-lg p-2 flex justify-center items-center flex-1 hover:cursor-pointer hover:text-black hover:bg-red-300"
                                    @click="goDelete">
                                    Xoá
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

            <!-- Xác nhận xoá -->
            <ConfirmDelete v-if="showConfirm" @confirm="confirmDelete" @cancel="cancelDelete" />
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import ConfirmDelete from '../../../components/Admin/ConfirmDelete.vue'
import axios from 'axios'

const router = useRouter()
const route = useRoute()

const userData = route.query.data ? JSON.parse(route.query.data) : null
const showConfirm = ref(false)

function goBack() {
    router.push({ name: 'admin-users' })
}

function goEdit(item) {
    router.push({
        name: 'admin-edit-users',
        params: { id: item.id },
        query: { data: JSON.stringify(item) }
    })
}

function goDelete() {
    showConfirm.value = true
}

async function confirmDelete() {
    showConfirm.value = false

    try {
        await axios.delete(`http://127.0.0.1:8000/api/admin/users/delete/${userData.id}`)
        alert('Đã xoá thành công!')
        router.push({ name: 'admin-users' })
    } catch (error) {
        console.error('Lỗi khi xoá:', error)
        alert('Không thể xoá.')
    }
}

function cancelDelete() {
    showConfirm.value = false
}
</script>
