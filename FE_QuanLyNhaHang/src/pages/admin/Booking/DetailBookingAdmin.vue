<template>
    <div class="w-[calc(100vw-300px)] h-[calc(100vh-100px)] fixed z-0 mt-20 ms-[300px] flex flex-col p-2">
        <div class="h-full w-full flex flex-col font-semibold">
            <div class="flex flex-row uppercase font-bold text-2xl">
                <p>ID #</p>
                <p class="text-red-500">{{ bookingData?.id }}</p>
            </div>

            <div class="w-full h-full flex flex-col">
                <div class="w-full h-full flex flex-row p-2 border">
                    <div class="flex flex-row gap-2 w-full">
                        <div class="flex-[3] flex flex-col w-full h-full border gap-2">
                            <div class="w-full h-full">
                                <div class="overflow-y-auto max-h-full">
                                    <table class="w-full h-fit table-auto text-sm">
                                        <thead>
                                            <tr class="border-2">
                                                <th class="ps-2 text-start">Tên món</th>
                                                <th>Số lượng</th>
                                                <th>Giá</th>
                                                <th>Tổng giá</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="foodItem in bookingData?.booking_foods" :key="foodItem.id"
                                                class="border-2">
                                                <td>
                                                    <div class="h-full flex flex-row justify-start items-center ps-2">
                                                        <div
                                                            class="overflow-hidden flex flex-row justify-center items-center">
                                                            <img class="hover:cursor-pointer overflow-auto object-cover h-16 w-10"
                                                                :src="foodItem.food.image" :alt="foodItem.food.name" />
                                                            <div class="ps-5 flex flex-col gap-5">
                                                                <p class="hover:cursor-pointer">{{ foodItem.food.name }}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td class="text-center">{{ foodItem.quantity }}</td>
                                                <td class="text-center">{{ foodItem.food.cost.toLocaleString() }}</td>
                                                <td class="text-center">{{ (foodItem.quantity *
                                                    foodItem.food.cost).toLocaleString() }}</td>
                                            </tr>
                                            <tr v-if="!bookingData?.booking_foods.length" class="border-2">
                                                <td colspan="4" class="text-center py-4">Không có món ăn nào được đặt
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <div class="flex-1 w-full h-full flex flex-col gap-2">
                            <div class="font-bold text-xl uppercase">Đặt bàn</div>
                            <div class="flex flex-col gap-2 border rounded-lg p-2">
                                <p class="font-medium">Khách hàng</p>
                                <div class="flex flex-row items-center gap-3 w-full">
                                    <img class="w-20 h-20 rounded-full object-cover" :src="bookingData?.customer.image"
                                        :alt="bookingData?.customer.FullName" />
                                    <p>{{ bookingData?.customer.FullName }}</p>
                                </div>
                            </div>

                            <div class="flex flex-col gap-2 border rounded-lg p-2">
                                <div class="font-semibold">Tổng hoá đơn</div>
                                <div class="flex flex-row justify-between w-full">
                                    <p class="font-medium">Thời gian đặt</p>
                                    <p class="font-normal">{{ bookingData?.timeBooking }}</p>
                                </div>
                                <div class="flex flex-row justify-between w-full">
                                    <p class="font-medium">Trạng thái</p>
                                    <div class="flex flex-row font-normal">
                                        <p :class="{
                                            'bg-yellow-500': bookingData?.status === 1,  // Đang chờ
                                            'bg-green-500': bookingData?.status === 2,   // Thành công
                                            'bg-gray-500': bookingData?.status === 3,    // Từ chối
                                            'bg-red-500': bookingData?.status === 4      // Bị huỷ
                                        }"
                                            class="font-semibold text-sm normal-case flex ms-2 px-2 items-center text-white rounded">
                                            {{ getStatusText(bookingData?.status) }}
                                        </p>

                                    </div>
                                </div>
                                <div class="flex flex-row justify-between w-full">
                                    <p class="font-medium">Tiền cọc món (30%)</p>
                                    <div class="flex flex-row font-normal">
                                        <p>{{ calculateFoodDeposit(bookingData?.booking_foods).toLocaleString() }}</p>
                                        <p class="text-sm">VNĐ</p>
                                    </div>
                                </div>
                                <div class="flex flex-row justify-between w-full">
                                    <p class="font-medium">Tiền cọc bàn</p>
                                    <div class="flex flex-row font-normal">
                                        <p>50,000</p>
                                        <p class="text-sm">VNĐ</p>
                                    </div>
                                </div>
                            </div>
                            <div class="flex flex-row gap-2 justify-between border rounded-lg p-2">
                                <p>Tổng thanh toán</p>
                                <div class="flex flex-row text-red-500">
                                    <p>{{ calculateTotal(bookingData?.booking_foods).toLocaleString() }}</p>
                                    <p class="text-sm">VNĐ</p>
                                </div>
                            </div>
                            <div class="flex flex-row gap-2 border rounded-lg p-2">
                                <template v-if="bookingData?.status === 1">
                                    <div class="bg-green-500 rounded-lg p-2 flex justify-center items-center flex-1 hover:cursor-pointer hover:bg-green-300"
                                        @click="acceptBooking">
                                        Chấp nhận
                                    </div>
                                    <div class="bg-red-500 rounded-lg p-2 flex justify-center items-center flex-1 hover:cursor-pointer hover:bg-red-300"
                                        @click="rejectBooking">
                                        Từ chối
                                    </div>
                                </template>
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
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';

const router = useRouter();
const route = useRoute();

const bookingData = route.query.data ? JSON.parse(route.query.data) : null;

// Get status text based on status code
function getStatusText(status) {
    switch (status) {
        case 1:
            return 'Đang chờ';
        case 2:
            return 'Thành công';
        case 3:
            return 'Từ chối';
        case 4:
            return 'Bị huỷ';
        default:
            return 'Không xác định';
    }
}

// Calculate food deposit (30% of food total)
function calculateFoodDeposit(bookingFoods) {
    if (!bookingFoods || !bookingFoods.length) return 0;
    const foodTotal = bookingFoods.reduce((total, foodItem) => {
        return total + foodItem.quantity * foodItem.food.cost;
    }, 0);
    return foodTotal * 0.3;
}

// Calculate total (food deposit + table deposit)
function calculateTotal(bookingFoods) {
    const tableDeposit = 50000;
    const foodDeposit = calculateFoodDeposit(bookingFoods);
    return foodDeposit + tableDeposit;
}

async function acceptBooking() {
    try {
        await axios.put(`http://127.0.0.1:8000/api/admin/bookings/${bookingData.id}`, {
            status: 2, // Thành công
            phoneNumber: bookingData?.customer.phoneNumber // nếu API yêu cầu số điện thoại xác thực
        });
        alert('Đã chấp nhận đặt bàn!');
        router.push({ name: 'admin-booking' });
    } catch (error) {
        console.error('Lỗi khi chấp nhận đặt bàn:', error);
        alert('Có lỗi xảy ra khi chấp nhận đặt bàn.');
    }
}

async function rejectBooking() {
    try {
        await axios.put(`http://127.0.0.1:8000/api/admin/bookings/${bookingData.id}`, {
            status: 3, // Từ chối
            phoneNumber: bookingData?.customer.phoneNumber
        });
        alert('Đã từ chối đặt bàn!');
        router.push({ name: 'admin-booking' });
    } catch (error) {
        console.error('Lỗi khi từ chối đặt bàn:', error);
        alert('Có lỗi xảy ra khi từ chối đặt bàn.');
    }
}


// Go back to booking list
function goBack() {
    router.push({ name: 'admin-booking' });
}
</script>
