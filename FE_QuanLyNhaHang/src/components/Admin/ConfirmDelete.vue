<template>
    <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div class="bg-white p-5 rounded-lg w-[400px] text-center shadow-lg">
            <h2 class="text-xl font-semibold mb-4">Bạn có chắc chắn muốn xoá?</h2>
            <div class="flex justify-center gap-4 mt-4">
                <button class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded" @click="$emit('confirm')">
                    Đồng ý
                </button>
                <button class="bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded" @click="$emit('cancel')">
                    Huỷ
                </button>
            </div>
        </div>
    </div>
</template>
