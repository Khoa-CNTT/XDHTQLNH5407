<template>
    <div class="fixed w-[calc(100vw-300px)] h-[calc(100vh-100px)] mt-20 z-0 ms-[300px] flex flex-col p-2">
        <!-- Thống kê tổng quan -->
        <div class="flex flex-row gap-2 w-full h-[150px]">
            <div class="h-32 w-full bg-gray-300 flex flex-row justify-center items-center px-5">
                <div class="overflow-hidden w-full">
                    <img class="h-20 w-20 overflow-auto object-cover" src="/imageicon/food icon.png" alt="">
                </div>
                <div class="w-full flex flex-col justify-center items-center">
                    <p class="font-bold text-2xl">Tổng các món ăn</p>
                    <p class="font-semibold text-xl">{{ totalFoods }}</p>
                </div>
            </div>

            <div class="h-32 w-full bg-gray-300 flex flex-row justify-center items-center px-5">
                <div class="overflow-hidden w-full">
                    <img class="h-20 w-20 overflow-auto object-cover" src="/imageicon/staff icon.png" alt="">
                </div>
                <div class="w-full flex flex-col justify-center items-center">
                    <p class="font-bold text-2xl">Tổng khách hàng</p>
                    <p class="font-semibold text-xl">{{ totalCustomers }}</p>
                </div>
            </div>

            <div class="h-32 w-full bg-gray-300 flex flex-row justify-center items-center px-5">
                <div class="overflow-hidden w-full">
                    <img class="h-20 w-20 overflow-auto object-cover" src="/imageicon/cash icon.png" alt="">
                </div>
                <div class="w-full flex flex-col justify-center items-center">
                    <p class="font-bold text-2xl">Doanh thu tháng</p>
                    <p class="font-semibold text-xl">{{ totalRevenue.toLocaleString() }} VNĐ</p>
                </div>
            </div>
        </div>

        <!-- Dashboard biểu đồ -->
        <div class="flex flex-col w-full h-screen mt-4 overflow-y-hidden">
            <div class="h-full overflow-y-auto">
                <!-- Bộ lọc -->
                <div class="flex flex-row w-full h-10 items-center gap-2 font-bold text-2xl mb-4">
                    <p>Chọn thời gian</p>
                    <select class="h-10 w-fit border-2 ps-2" v-model="selectedMonth">
                        <option v-for="m in 12" :key="m" :value="m">{{ m }}</option>
                    </select>
                    <p>Năm</p>
                    <input class="h-10 w-24 border-2 ps-2" type="number" v-model="selectedYear" min="2000">
                    <p>Tổng doanh thu (VNĐ)</p>
                    <div
                        class="h-10 min-w-32 px-4 py-1 bg-green-500 text-white font-semibold flex items-center rounded">
                        {{ totalRevenue.toLocaleString() }}
                    </div>
                </div>

                <!-- Biểu đồ doanh thu theo tháng -->
                <div class="border-2 w-full h-[400px] p-4 bg-white rounded-xl shadow">
                    <p class="text-xl font-bold mb-4">Biểu đồ doanh thu theo tháng (Năm {{ selectedYear }})</p>
                    <canvas ref="revenueChart" height="100"></canvas>
                </div>

                <!-- Biểu đồ doanh thu theo ngày -->
                <div class="border-2 mt-4 w-full h-[400px] p-4 bg-white rounded-xl shadow">
                    <p class="text-xl font-bold mb-4">Biểu đồ doanh thu theo ngày (Tháng {{ selectedMonth }} / {{
                        selectedYear }})</p>
                    <canvas ref="dailyRevenueChart" height="100"></canvas>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import axios from 'axios'
import Chart from 'chart.js/auto'

const totalRevenue = ref(0)
const totalFoods = ref(0)
const totalCustomers = ref(0)
const invoices = ref([])
const revenueChart = ref(null)
const dailyRevenueChart = ref(null)
let revenueChartInstance = null
let dailyChartInstance = null

const selectedMonth = ref(new Date().getMonth() + 1)
const selectedYear = ref(new Date().getFullYear())

const fetchFood = async () => {
    try {
        const response = await axios.get("http://127.0.0.1:8000/api/admin/foods");
        totalFoods.value = response.data.length
    } catch (error) {
        console.error("Lỗi khi lấy dữ liệu món ăn:", error)
    }
}

const fetchCustomer = async () => {
    try {
        const response = await axios.get("http://127.0.0.1:8000/api/admin/customers")
        totalCustomers.value = response.data.customers.length
    } catch (error) {
        console.error("Lỗi khi lấy dữ liệu khách hàng:", error)
    }
}

const fetchInvoice = async () => {
    try {
        const response = await axios.get("http://127.0.0.1:8000/api/admin/invoices")
        invoices.value = response.data.data
        updateTotalRevenue()
        updateMonthlyRevenue()
        updateDailyRevenue()
    } catch (error) {
        console.error("Lỗi khi lấy dữ liệu hóa đơn:", error)
    }
}

const updateTotalRevenue = () => {
    totalRevenue.value = invoices.value
        .filter(invoice =>
            invoice.status === 2 &&
            new Date(invoice.timeEnd).getMonth() + 1 === selectedMonth.value &&
            new Date(invoice.timeEnd).getFullYear() === selectedYear.value
        )
        .reduce((sum, invoice) => sum + invoice.total, 0)
}

const updateMonthlyRevenue = () => {
    const monthly = Array(12).fill(0)
    invoices.value.forEach(inv => {
        if (inv.status === 2) {
            const date = new Date(inv.timeEnd)
            if (date.getFullYear() === selectedYear.value) {
                const month = date.getMonth()
                monthly[month] += inv.total
            }
        }
    })

    if (revenueChartInstance) revenueChartInstance.destroy()
    revenueChartInstance = new Chart(revenueChart.value, {
        type: 'bar',
        data: {
            labels: Array.from({ length: 12 }, (_, i) => `Tháng ${i + 1}`),
            datasets: [{
                label: 'Doanh thu (VNĐ)',
                data: monthly,
                backgroundColor: '#60a5fa'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: value => value.toLocaleString()
                    }
                }
            }
        }
    })
}

const updateDailyRevenue = () => {
    const daysInMonth = new Date(selectedYear.value, selectedMonth.value, 0).getDate()
    const daily = Array(daysInMonth).fill(0)

    invoices.value.forEach(inv => {
        if (inv.status === 2) {
            const date = new Date(inv.timeEnd)
            if (
                date.getMonth() + 1 === selectedMonth.value &&
                date.getFullYear() === selectedYear.value
            ) {
                const day = date.getDate()
                daily[day - 1] += inv.total
            }
        }
    })

    if (dailyChartInstance) dailyChartInstance.destroy()
    dailyChartInstance = new Chart(dailyRevenueChart.value, {
        type: 'line',
        data: {
            labels: Array.from({ length: daysInMonth }, (_, i) => `Ngày ${i + 1}`),
            datasets: [{
                label: 'Doanh thu theo ngày (VNĐ)',
                data: daily,
                borderColor: '#10b981',
                backgroundColor: 'rgba(16, 185, 129, 0.2)',
                tension: 0.3,
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: value => value.toLocaleString()
                    }
                }
            }
        }
    })
}

watch([selectedMonth, selectedYear], () => {
    updateTotalRevenue()
    updateMonthlyRevenue()
    updateDailyRevenue()
})

onMounted(() => {
    fetchFood()
    fetchCustomer()
    fetchInvoice()
})
</script>

<style scoped>
canvas {
    max-height: 100%;
    width: 100%;
}
</style>