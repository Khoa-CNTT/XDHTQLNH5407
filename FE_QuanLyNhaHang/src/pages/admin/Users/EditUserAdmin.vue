<template>
    <div class="w-[calc(100vw-300px)] h-[calc(100vh-100px)] fixed z-0 mt-20 ms-[300px] flex flex-col p-2">
        <div class="h-full w-full flex flex-col font-semibold">
            <div class=" uppercase font-bold text-2xl">
                Chỉnh sửa người dùng
            </div>

            <div class="w-[40vw] h-full flex justify-center items-start text-xl">
                <div class="w-full border h-fit flex flex-col">
                    <div class=" border flex flex-row">
                        <div class="flex flex-col flex-1 justify-center items-center">
                            <!-- <img class="w-full h-full object-cover" :src="`/picture/rank/${userData.image}`"
                                alt="Ảnh người dùng" /> -->
                        </div>

                        <div class="border flex flex-[2] flex-col p-2 gap-1">
                            <div class="flex flex-row items-center gap-2">
                                <p class="flex flex-1">Tên người dùng:</p>

                                <input type="text" id="name" v-model="form.name"
                                    class="flex-1 border rounded px-4 py-2 text-lg"
                                    :placeholder="userData.name || 'Nhập tên người dùng...'" />
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

                                <input type="text" id="phone_number" v-model="form.phone_number"
                                    class="flex-1 border rounded px-4 py-2 text-lg"
                                    :placeholder="userData.phone_number || 'Nhập số điện thoại...'" />
                            </div>
                            <div class="flex flex-row items-center gap-2">
                                <p class="flex flex-1">Email:</p>

                                <input type="text" id="email" v-model="form.email"
                                    class="flex-1 border rounded px-4 py-2 text-lg"
                                    :placeholder="userData.email || 'Nhập email...'" />
                            </div>
                            <div class="flex flex-row items-center gap-2">
                                <p class="flex flex-1">Ngày sinh:</p>

                                <input :placeholder="userData.birth" v-model="form.birth"
                                    class=" flex-1 border rounded px-4 py-2 text-lg" type="date" name="birth"
                                    id="birth">
                            </div>

                            <div class="flex flex-row gap-2 p-2">
                                <div class="bg-green-500 text-white rounded-lg p-2 flex justify-center items-center flex-1 hover:cursor-pointer hover:text-black hover:bg-green-300"
                                    @click="goSave">
                                    Lưu
                                </div>

                                <div class="bg-red-500 text-white rounded-lg p-2 flex justify-center items-center flex-1 hover:cursor-pointer hover:text-black hover:bg-red-300"
                                    @click="goDelete">
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
import ConfirmDelete from '../../../components/Admin/ConfirmDelete.vue';
import axios from 'axios'

const router = useRouter()
const route = useRoute()
const userData = route.query.data ? JSON.parse(route.query.data) : null;
console.log("User data:", userData);

const showConfirm = ref(false)

const form = ref({
    id: userData?.id || '',
    // image: userData?.image || '',
    name: userData?.name || '',
    role: userData?.role || '',
    phone_number: userData?.phone_number || '',
    email: userData?.email || '',
    // password: userData?.password || '',
    birth: userData?.birth || '',
    status: userData?.status || ''

})

async function goSave() {
    // Kiểm tra các trường bắt buộc trước khi gửi dữ liệu
    if (!form.value.name || !form.value.email || !form.value.birth) {
        alert("Vui lòng điền đầy đủ Tên, Email và Ngày sinh.");
        return;
    }

    // Nếu không có lỗi, gửi dữ liệu lên server
    try {
        const response = await axios.put(`http://127.0.0.1:8000/api/admin/users/update/${userData.id}`, {
            id: form.value.id,
            name: form.value.name,
            role: form.value.role,
            status: form.value.status,
            phone_number: form.value.phone_number,
            email: form.value.email,
            birth: form.value.birth,
            // password: form.value.password,
            // image: form.value.image
        });

        // Kiểm tra response và thông báo cho người dùng
        if (response.status === 200) {
            alert("Cập nhật thành công!");
            router.push({ name: 'admin-users' });
        } else {
            alert("Không thể cập nhật dữ liệu. Vui lòng thử lại.");
        }
    } catch (error) {
        console.error("Lỗi khi lưu:", error);
        if (error.response) {
            // Nếu lỗi có phản hồi từ server, thông báo chi tiết
            alert(`Đã xảy ra lỗi: ${error.response.data.message || 'Lỗi không xác định.'}`);
        } else {
            // Lỗi không có phản hồi
            alert("Đã xảy ra lỗi khi kết nối với server.");
        }
    }
}


function goBack() {
    router.push({ name: 'admin-users' })
}
function goDelete() {
    showConfirm.value = true
}

async function confirmDelete() {
    showConfirm.value = false

    try {
        await axios.delete(`http://127.0.0.1:8000/api/admin/users/delete/${userData.id}`)
        alert('Đã xoá  thành công!')
        router.push({ name: 'admin-users' })
    } catch (error) {
        console.error('Lỗi khi xoá :', error)
        alert('Không thể xoá .')
    }
}

function cancelDelete() {
    showConfirm.value = false
}
</script>
