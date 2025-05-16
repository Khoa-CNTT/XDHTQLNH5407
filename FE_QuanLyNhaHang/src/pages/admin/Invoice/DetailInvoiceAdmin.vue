<template>
    <div class="w-[calc(100vw-300px)] h-[calc(100vh-100px)] fixed z-0 mt-20 ms-[300px] flex flex-col p-2">
        <div class="h-full w-full flex flex-col font-semibold">
            <!-- Tiêu đề hóa đơn -->
            <div class="flex flex-row uppercase font-bold text-2xl mb-4">
                <p>ID #</p>
                <p class="text-red-500">{{ invoiceData?.id || 'N/A' }}</p>
            </div>

            <div class="w-full h-full flex flex-col">
                <div class="w-full h-full flex flex-row p-2 border rounded-lg">
                    <div class="flex flex-row gap-2 w-full">
                        <!-- Danh sách món ăn -->
                        <div class="flex-[3] flex flex-col w-full h-full border rounded-lg gap-2 p-2">
                            <div class="w-full h-full">
                                <div class="overflow-y-auto max-h-full">
                                    <table class="w-full h-fit table-auto text-sm">
                                        <thead>
                                            <tr class="border-2 bg-gray-100">
                                                <th class="ps-2 text-start py-2">Tên món</th>
                                                <th class="py-2">Số lượng</th>
                                                <th class="py-2">Giá</th>
                                                <th class="py-2">Tổng giá</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="foodItem in invoiceData?.invoice_foods" :key="foodItem.id"
                                                class="border-2 hover:bg-gray-50">
                                                <td>
                                                    <div class="h-full flex flex-row justify-start items-center ps-2">
                                                        <div
                                                            class="overflow-hidden flex flex-row justify-center items-center">
                                                            <img class="hover:cursor-pointer object-cover h-16 w-10"
                                                                :src="foodItem.food.image || '/imageicon/food-placeholder.png'"
                                                                :alt="foodItem.food.name" />
                                                            <div class="ps-5 flex flex-col gap-5">
                                                                <p class="hover:cursor-pointer">{{ foodItem.food.name ||
                                                                    'N/A' }}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td class="text-center">{{ foodItem.quantity || 0 }}</td>
                                                <td class="text-center">{{ (foodItem.food.cost || 0).toLocaleString() }}
                                                </td>
                                                <td class="text-center">{{ (foodItem.quantity * foodItem.food.cost ||
                                                    0).toLocaleString() }}</td>
                                            </tr>
                                            <tr v-if="!invoiceData?.invoice_foods?.length" class="border-2">
                                                <td colspan="4" class="text-center py-4">Không có món ăn nào được đặt
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <!-- Thông tin hóa đơn -->
                        <div class="flex-1 w-full h-full flex flex-col gap-2 p-2">
                            <div class="font-bold text-xl uppercase">Hoá đơn</div>
                            <div class="flex flex-col gap-2 border rounded-lg p-4">
                                <p class="font-medium">Khách hàng</p>
                                <div class="flex flex-row items-center gap-3 w-full">
                                    <img class="w-20 h-20 rounded-full object-cover"
                                        :src="invoiceData?.customer?.image || '/imageicon/staff icon.png'"
                                        alt="Ảnh khách hàng">
                                    <p>{{ invoiceData?.customer?.FullName || 'Khách vãng lai' }}</p>
                                </div>
                            </div>

                            <div class="flex flex-col gap-2 border rounded-lg p-4">
                                <div class="font-semibold">Chi tiết hóa đơn</div>
                                <div class="flex flex-row justify-between w-full">
                                    <p class="font-medium">Số bàn</p>
                                    <p>{{ invoiceData?.table?.number ?? 'Không xác định' }}</p>
                                </div>
                                <div class="flex flex-row justify-between w-full">
                                    <p class="font-medium">Người tính tiền</p>
                                    <p>{{ invoiceData?.user?.name || 'Chưa xác định' }}</p>
                                </div>
                                <div class="flex flex-row justify-between w-full">
                                    <p class="font-medium">Tên chương trình giảm giá</p>
                                    <p>{{ invoiceData?.sale?.nameSale || 'Không có' }}</p>
                                </div>
                                <div class="flex flex-row justify-between w-full">
                                    <p class="font-medium">Trạng thái</p>
                                    <div class="text-white">
                                        <p v-if="invoiceData?.status === 1" class="bg-yellow-500 p-2 rounded">
                                            Đang sử dụng</p>
                                        <p v-else-if="invoiceData?.status === 2" class="bg-green-500 p-2 rounded">
                                            Hoàn thành </p>
                                        <p v-else-if="invoiceData?.status === 3" class="bg-red-500 p-2 rounded">
                                            Bị huỷ </p>
                                    </div>
                                </div>
                                <div class="flex flex-row justify-between w-full">
                                    <p class="font-medium">Thời gian đặt</p>
                                    <p class="font-normal">{{ formatToLocalDatetime(invoiceData?.created_at) || 'N/A' }}
                                    </p>
                                </div>
                                <div class="flex flex-row justify-between w-full">
                                    <p class="font-medium">Tổng tiền món</p>
                                    <div class="flex flex-row font-normal">
                                        <p>{{ calculateTotal(invoiceData?.invoice_foods).toLocaleString() }}</p>
                                        <p class="text-sm ms-1">VNĐ</p>
                                    </div>
                                </div>
                                <div class="flex flex-row justify-between w-full">
                                    <p class="font-medium">VAT (10%)</p>
                                    <div class="flex flex-row font-normal">
                                        <p>{{ calculateVAT(invoiceData?.invoice_foods).toLocaleString() }}</p>
                                        <p class="text-sm ms-1">VNĐ</p>
                                    </div>
                                </div>
                                <div class="flex flex-row justify-between w-full">
                                    <p class="font-medium">Giảm giá ({{ invoiceData?.sale?.percent || 0 }}%)</p>
                                    <div class="flex flex-row font-normal">
                                        <p>{{ calculateDiscount(invoiceData?.invoice_foods,
                                            invoiceData?.sale).toLocaleString() }}</p>
                                        <p class="text-sm ms-1">VNĐ</p>
                                    </div>
                                </div>
                                <div class="flex flex-row justify-between w-full">
                                    <p class="font-medium">Điểm nhận được (5%)</p>
                                    <p class="font-normal">{{ (calculateTotal(invoiceData?.invoice_foods) *
                                        0.05).toLocaleString() }}</p>
                                </div>
                            </div>
                            <div class="flex flex-row gap-2 justify-between border rounded-lg p-4">
                                <p>Tổng thanh toán</p>
                                <div class="flex flex-row text-red-500">
                                    <p>{{ calculateFinalTotal(invoiceData?.invoice_foods,
                                        invoiceData?.sale).toLocaleString() }}</p>
                                    <p class="text-sm ms-1">VNĐ</p>
                                </div>
                            </div>

                            <div class="flex flex-row gap-2 border rounded-lg p-2">
                                <!-- Nếu status là 1 -->
                                <template v-if="invoiceData?.status === 1">
                                    <div class="bg-green-500 rounded-lg p-2 flex justify-center items-center flex-1 hover:cursor-pointer hover:bg-green-600"
                                        @click="() => updateInvoiceStatus(2)">
                                        Thanh toán
                                    </div>

                                    <div class="bg-red-500 rounded-lg p-2 flex justify-center items-center flex-1 hover:cursor-pointer hover:bg-red-600"
                                        @click="() => updateInvoiceStatus(3)">
                                        Huỷ
                                    </div>

                                    <div class="rounded-lg border p-2 flex justify-center items-center flex-1 hover:cursor-pointer hover:bg-gray-300"
                                        @click="goBack">
                                        Trở về
                                    </div>
                                </template>

                                <!-- Nếu status là 2 hoặc 3 -->
                                <template v-else-if="invoiceData?.status === 2 || invoiceData?.status === 3">
                                    <div class="rounded-lg border p-2 flex justify-center items-center flex-1 hover:cursor-pointer hover:bg-gray-300"
                                        @click="goBack">
                                        Trở về
                                    </div>
                                </template>
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

const router = useRouter()
const route = useRoute()

const invoiceData = route.query.data ? JSON.parse(route.query.data) : null;

function formatToLocalDatetime(isoString) {
    if (!isoString) return 'N/A';
    const date = new Date(isoString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

function calculateTotal(item) {
    if (!item || !item.length) return 0;
    return item.reduce((total, foodItem) => {
        return total + (foodItem.quantity || 0) * (foodItem.food.cost || 0);
    }, 0);
}

function calculateVAT(item) {
    return calculateTotal(item) * 0.1;
}

function calculateDiscount(item, sale) {
    return calculateTotal(item) * (sale?.percent || 0) / 100;
}

function calculateFinalTotal(item, sale) {
    return calculateTotal(item) + calculateVAT(item) - calculateDiscount(item, sale);
}

function goBack() {
    router.push({ name: 'admin-invoice' });
}

async function updateInvoiceStatus(newStatus) {
    if (!invoiceData?.id) return;

    const payload = {
        id_table: invoiceData?.table?.id || null,
        id_user: invoiceData?.user?.id || null,
        total: calculateFinalTotal(invoiceData?.invoice_foods, invoiceData?.sale),
        timeEnd: new Date().toISOString().slice(0, 19).replace('T', ' '),
        id_customer: invoiceData?.customer?.id || null,
        status: newStatus,
        foods: invoiceData?.invoice_foods?.map(item => ({
            id: item.food.id,
            quantity: item.quantity
        })) || []
    };

    console.log("🔥 Payload gửi lên:", JSON.stringify(payload, null, 2));

    try {
        await axios.put(`http://127.0.0.1:8000/api/admin/invoices/${invoiceData.id}`, payload);
        invoiceData.status = newStatus;
        alert('Thành công!');
        router.push({ name: 'admin-invoice' });
    } catch (error) {
        console.error('❌ Lỗi khi cập nhật hóa đơn:', error);
        alert('Cập nhật trạng thái thất bại!');
    }
}

</script>
