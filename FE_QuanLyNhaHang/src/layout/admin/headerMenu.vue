<template>
    <div class="w-screen h-[80px] flex flex-row p-2 border fixed z-10">
        <div class="h-full flex hover:cursor-pointer" @click="goHome">
            <img src="/imageicon/logo.png" alt="Logo" />
        </div>
        <div class="h-full flex flex-row justify-end items-center flex-1">
            <div class="flex h-full bg-gray-200 justify-center items-center relative rounded-2xl me-20 p-5 hover:cursor-pointer hover:bg-gray-500"
                @click="goBooking">
                <div class="flex flex-row justify-center items-center text-2xl">
                    <svg class="w-10 h-10 text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                        fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M12 5.365V3m0 2.365a5.338 5.338 0 0 1 5.133 5.368v1.8c0 2.386 1.867 2.982 1.867 4.175 0 .593 0 1.193-.538 1.193H5.538c-.538 0-.538-.6-.538-1.193 0-1.193 1.867-1.789 1.867-4.175v-1.8A5.338 5.338 0 0 1 12 5.365Zm-8.134 5.368a8.458 8.458 0 0 1 2.252-5.714m14.016 5.714a8.458 8.458 0 0 0-2.252-5.714M8.54 17.901a3.48 3.48 0 0 0 6.92 0H8.54Z" />
                    </svg>
                    <p class="ms-2">Đặt bàn</p>
                </div>
                <div
                    class="absolute -right-5 -top-2 h-10 w-10 bg-red-600 flex justify-center items-center rounded-full font-bold text-2xl text-white">
                    <p>{{ totalBooking }}</p>
                </div>
            </div>
            <div class="flex h-full bg-gray-200 justify-center items-center relative rounded-2xl me-20 p-5 hover:cursor-pointer hover:bg-gray-500"
                @click="goInvoice">
                <div class="flex flex-row justify-center items-center text-2xl">
                    <svg class="w-10 h-10 text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                        fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M12 5.365V3m0 2.365a5.338 5.338 0 0 1 5.133 5.368v1.8c0 2.386 1.867 2.982 1.867 4.175 0 .593 0 1.193-.538 1.193H5.538c-.538 0-.538-.6-.538-1.193 0-1.193 1.867-1.789 1.867-4.175v-1.8A5.338 5.338 0 0 1 12 5.365Zm-8.134 5.368a8.458 8.458 0 0 1 2.252-5.714m14.016 5.714a8.458 8.458 0 0 0-2.252-5.714M8.54 17.901a3.48 3.48 0 0 0 6.92 0H8.54Z" />
                    </svg>
                    <p class="ms-2">Thanh toán</p>
                </div>
                <div
                    class="absolute -right-5 -top-2 h-10 w-10 bg-red-600 flex justify-center items-center rounded-full font-bold text-2xl text-white">
                    <p>{{ totalInvoice }}</p>
                </div>
            </div>

            <div class="flex flex-row hover:cursor-pointer hover:bg-gray-500 justify-center items-center font-bold text-2xl p-2 rounded-lg"
                @click="goProfile">
                <p>{{ user.name }}</p>
                <div class="w-12 h-12 rounded-full border border-black overflow-hidden">
                    <img class="w-full h-full  object-cover" :src="user.image" alt="img">
                </div>
            </div>
        </div>
    </div>

</template>

<script setup>
import { useRouter } from 'vue-router'
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'

const router = useRouter()

const user = ref(
    JSON.parse(localStorage.getItem('user')) || {
        name: 'Unknown User',
        email: 'unknown@example.com',
        phone_number: 'N/A',
        role: 'N/A',
        status_user: 'inactive',
        image: null,
    }
)

const allItemsInvoice = ref([])
const allItemsBooking = ref([])

const totalInvoice = computed(() =>
    allItemsInvoice.value.filter(item => item.status === 1).length
)

const totalBooking = computed(() =>
    allItemsBooking.value.filter(item => item.status === 1).length
)

async function fetchInvoice() {
    try {
        const response = await axios.get("http://127.0.0.1:8000/api/admin/invoices")
        console.log('Invoice API response:', response.data)
        const invoiceData = response.data.data
        allItemsInvoice.value = Array.isArray(invoiceData) ? invoiceData : []
    } catch (error) {
        console.error("Lỗi khi lấy dữ liệu hóa đơn:", error)
        allItemsInvoice.value = []
    }
}

async function fetchBooking() {
    try {
        const response = await axios.get("http://127.0.0.1:8000/api/admin/bookings")
        console.log('Booking API response:', response.data)
        allItemsBooking.value = Array.isArray(response.data.data) ? response.data.data : []
    } catch (error) {
        console.error("Lỗi khi lấy dữ liệu đặt bàn:", error)
        allItemsBooking.value = []
    }
}

onMounted(() => {
    fetchInvoice()
    fetchBooking()
})

function goHome() {
    router.push({ name: 'home' })
}

function goBooking() {
    router.push({ name: 'admin-booking' })
}

function goInvoice() {
    router.push({ name: 'admin-invoice' })
}

function goProfile() {
    router.push({ name: 'profile' })
}
</script>
