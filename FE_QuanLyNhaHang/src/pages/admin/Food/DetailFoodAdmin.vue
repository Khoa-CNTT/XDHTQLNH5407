<template>
    <div class="w-[calc(100vw-300px)] h-[calc(100vh-100px)] fixed z-0 mt-20 ms-[300px] flex flex-col p-2">
        <div class="h-full w-full flex flex-col font-semibold">
            <div class=" uppercase font-bold text-2xl">
                Chi tiết món ăn
            </div>

            <div class="w-[70vw] h-full flex justify-center items-start text-xl">
                <div class="w-full border h-[70vh] flex flex-col">
                    <div class="flex-1 border flex flex-row">
                        <div class="flex flex-col flex-1 justify-center items-center">
                            <img class="w-96 h-96 object-cover" :src="foodData.image" alt="Ảnh món ăn" />
                        </div>

                        <div class="border flex flex-[2] flex-col p-2 gap-1">
                            <div class="flex flex-row items-center">
                                <p class="text-2xl">{{ foodData.name }}</p>
                                <div v-if="foodData.bestSeller === 1" class="h-10 w-10">
                                    <img class="object-cover" src="/imageicon/best seller icon.png" alt="best">
                                </div>
                            </div>

                            <div class="text-xl text-red-500 flex flex-row">
                                <p class="text-red-500">{{ foodData.cost.toLocaleString() }} VNĐ</p>
                            </div>

                            <div class="flex flex-col gap-2">
                                <p>Thể loại:</p>
                                <div class="flex flex-wrap gap-2 max-h-40 overflow-y-auto">
                                    <p v-for="(category, index) in foodData.categories" :key="index"
                                        class="bg-red-500 text-white text-center border w-fit p-2 rounded-lg">
                                        {{ category.name }}
                                    </p>
                                </div>
                            </div>

                            <div class="flex flex-row gap-2 items-center">
                                <p>Kiểu món ăn:</p>
                                <p class="bg-red-500 text-white text-center border w-fit p-2 rounded-lg">
                                    {{ foodData.type.name }}</p>
                            </div>

                            <p v-if="foodData.status === 1" class="bg-green-500 text-white rounded-md w-fit p-2">
                                Đang mở bán
                            </p>
                            <p v-else class="bg-red-500 text-white rounded-md w-fit p-2">
                                Đang đóng
                            </p>

                            <div class="flex flex-row">
                                <svg class="w-6 h-6 text-yellow-500" aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor"
                                    viewBox="0 0 24 24">
                                    <path
                                        d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
                                </svg>
                                <p class="text-red-500">{{ calculateAverageRating().toFixed(1) }}</p>
                                <p>/5.0</p>
                                <p class="ps-2">từ</p>
                                <p class="px-2 text-red-500">{{ reviews.length }}</p>
                                <p>đánh giá</p>
                            </div>

                            <p class="font-normal">{{ foodData.detail }}</p>

                            <div class="flex flex-row gap-2 p-2">
                                <div class="bg-green-500 text-white rounded-lg p-2 flex justify-center items-center flex-1 hover:cursor-pointer hover:text-black hover:bg-green-300"
                                    @click="goEdit(foodData)">
                                    Chỉnh sửa
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
                    <div class="flex flex-col overflow-y-auto max-h-full">
                        <p class="uppercase font-bold">Đánh giá</p>

                        <div class="flex flex-col w-full h-[50vh] gap-2 mt-2 ps-2">
                            <div v-for="(review, index) in reviews" :key="index"
                                class="flex flex-col border rounded-md p-2">
                                <div class="flex flex-row">
                                    <p>{{ review.customer.FullName }}</p>
                                    <p class="px-1 font-normal text-sm items-center flex">-</p>
                                    <p class="font-normal text-sm items-center flex">{{ review.time }}</p>
                                </div>
                                <div class="flex flex-row">
                                    <div v-for="n in review.star" :key="n">
                                        <svg class="w-6 h-6 text-yellow-500" aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                            fill="currentColor" viewBox="0 0 24 24">
                                            <path
                                                d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
                                        </svg>
                                    </div>
                                </div>
                                <p class="font-normal">{{ review.detail }}</p>

                                <!-- Manager Reply Section -->
                                <div v-if="review.managerReply" class="mt-2 border-l-4 border-blue-500 pl-4">
                                    <p class="font-semibold">Phản hồi từ {{ review.managerReply.Name }}:</p>
                                    <p class="font-normal">{{ review.managerReply.comment }}</p>
                                </div>

                                <div class="mt-2">
                                    <button
                                        class="bg-blue-500 text-white rounded-lg p-2 hover:bg-blue-300 hover:text-black"
                                        @click="toggleReplyInput(index)">
                                        {{ review.showReplyInput ? 'Hủy' : 'Phản hồi' }}
                                    </button>
                                    <div v-if="review.showReplyInput" class="mt-2 flex flex-col gap-2">
                                        <textarea v-model="review.replyComment" class="border rounded-md p-2"
                                            placeholder="Nhập phản hồi của bạn..." rows="3"></textarea>
                                        <button
                                            class="bg-green-500 text-white rounded-lg p-2 hover:bg-green-300 hover:text-black"
                                            @click="submitReply(index)">
                                            Gửi phản hồi
                                        </button>
                                    </div>
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
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import ConfirmDelete from '../../../components/Admin/ConfirmDelete.vue'
import axios from 'axios'

const router = useRouter()
const route = useRoute()
const foodData = route.query.data ? JSON.parse(route.query.data) : null
const showConfirm = ref(false)
const reviews = ref([])

function goBack() {
    router.push({ name: 'admin-foods' })
}

const user = ref({
    id: null,
    name: 'Unknown User',
    email: 'unknown@example.com',
    phone_number: 'N/A',
    role: 'N/A',
    status_user: 'inactive',
    image: null,
    birth: null,
})

const isUserLoading = ref(false)
const userErrorMessage = ref('')

async function fetchManagerProfile() {
    isUserLoading.value = true
    userErrorMessage.value = ''

    try {
        const token = localStorage.getItem('auth_token')
        if (!token) throw new Error('No authentication token found.')

        const response = await axios.get('http://127.0.0.1:8000/api/admin/users/profile', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })

        user.value = response.data.data
    } catch (error) {
        console.error('Lỗi tải hồ sơ:', error.response?.data || error.message)
        userErrorMessage.value = error.response?.data?.message || 'Không thể tải hồ sơ quản lý!'
        if (error.response?.status === 401) {
            localStorage.removeItem('auth_token')
            localStorage.removeItem('user')
            router.push({ name: 'admin-login' })
        }
    } finally {
        isUserLoading.value = false
    }
}


const calculateAverageRating = () => {
    if (reviews.value.length === 0) return 0;
    const totalRating = reviews.value.reduce((sum, review) => sum + review.star, 0);
    return totalRating / reviews.value.length;
}

onMounted(async () => {
    await fetchManagerProfile()

    try {
        if (foodData && foodData.id) {
            // Gọi API đánh giá
            const ratesRes = await axios.get(`http://127.0.0.1:8000/api/admin/rates`)
            // Gọi API phản hồi của quản lý
            const repliesRes = await axios.get(`http://127.0.0.1:8000/api/admin/review-management`)

            if (ratesRes.data.status === 1 && Array.isArray(ratesRes.data.data)) {
                const rates = ratesRes.data.data.filter(review => review.id_food === foodData.id)

                // Tạo một map với id_rate làm key cho phản hồi
                const repliesMap = {}
                if (repliesRes.data.data && Array.isArray(repliesRes.data.data)) {
                    repliesRes.data.data.forEach(reply => {
                        if (!repliesMap[reply.id_rate]) repliesMap[reply.id_rate] = []
                        repliesMap[reply.id_rate].push(reply)
                    })
                }

                // Gán phản hồi vào từng review tương ứng
                reviews.value = rates.map(review => ({
                    ...review,
                    showReplyInput: false,
                    replyComment: '',
                    managerReply: repliesMap[review.id]?.map(r => ({
                        Name: r.user.name,
                        comment: r.comment
                    }))?.[0] || null // lấy phản hồi đầu tiên nếu có
                }))
            } else {
                console.error('Dữ liệu đánh giá không hợp lệ:', ratesRes.data)
            }
        }
    } catch (error) {
        console.error('Lỗi khi tải dữ liệu:', error)
    }
})


function goEdit(item) {
    router.push({
        name: 'admin-edit-foods',
        params: {
            id: item.id,
        },
        query: {
            data: JSON.stringify(item)
        }
    })
}

function goDelete() {
    showConfirm.value = true
}

function confirmDelete() {
    showConfirm.value = false
    console.log('Đã xác nhận xoá món ăn')
    router.push({ name: 'admin-foods' })
}

function cancelDelete() {
    showConfirm.value = false
}

// Toggle reply input visibility
function toggleReplyInput(index) {
    reviews.value[index].showReplyInput = !reviews.value[index].showReplyInput
}

// Simulate submitting a reply (for demo purposes)
async function submitReply(index) {
    const review = reviews.value[index];

    if (review.replyComment.trim()) {
        try {
            const payload = {
                id_rate: review.id,
                id_user: user.value.id,
                comment: review.replyComment
            };

            const response = await axios.post('http://127.0.0.1:8000/api/admin/review-management/create', payload);

            if (response.data.status === 1) {
                review.managerReply = {
                    Name: user.value.name,
                    comment: review.replyComment
                };
                review.replyComment = '';
                review.showReplyInput = false;
            } else {
                console.error('Phản hồi thất bại:', response.data.message);
            }
        } catch (error) {
            if (error.response && error.response.status === 422) {
                console.error('Lỗi xác thực:', error.response.data.errors);
            } else {
                console.error('Lỗi khi gửi phản hồi:', error);
            }
        }
    }
}

</script>