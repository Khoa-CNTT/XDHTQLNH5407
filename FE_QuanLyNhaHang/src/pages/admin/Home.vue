<template>
    <div class="fixed w-[calc(100vw-300px)] h-[calc(100vh-100px)] mt-20 z-0 ms-[300px] flex flex-col p-2">
        <div class="flex flex-row gap-2 w-full h-[150px]">
            <div class="h-32 w-full bg-gray-300 flex flex-row justify-center items-center px-5">
                <div class="overflow-hidden w-full">
                    <img class="h-20 w-20 overflow-auto object-cover" src="/imageicon/box icon.png" alt="">
                </div>

                <div class="w-full flex flex-col justify-center items-center">
                    <p class="font-bold text-2xl">Tổng sản phẩm</p>
                    <p class="font-semibold text-xl">100</p>
                </div>
            </div>

            <div class="h-32 w-full bg-gray-300 flex flex-row justify-center items-center px-5">
                <div class="overflow-hidden w-full">
                    <img class="h-20 w-20 overflow-auto object-cover" src="/imageicon/staff icon.png" alt="">
                </div>

                <div class="w-full flex flex-col justify-center items-center">
                    <p class="font-bold text-2xl">Tổng nhân viên</p>
                    <p class="font-semibold text-xl">100</p>
                </div>
            </div>

            <div class="h-32 w-full bg-gray-300 flex flex-row justify-center items-center px-5">
                <div class="overflow-hidden w-full">
                    <img class="h-20 w-20 overflow-auto object-cover" src="/imageicon/cash icon.png" alt="">
                </div>

                <div class="w-full flex flex-col justify-center items-center">
                    <p class="font-bold text-2xl">Tổng doanh thu</p>
                    <p class="font-semibold text-xl">100</p>
                </div>
            </div>
        </div>

        <div class="flex flex-col w-full h-screen mt-4">
            <div class="flex flex-row w-full h-10 items-center gap-2 font-bold text-2xl">
                <p>Tổng doanh thu tháng</p>
                <select class="h-10 w-fit border-2 ps-2" name="month" id="month">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                    <option value="11">11</option>
                    <option value="12">12</option>
                </select>

                <p>Năm</p>
                <input class="h-10 w-24 border-2 ps-2" type="number" name="year" id="year" value="2025" min="1">
                <p>Tổng doanh thu (VNĐ)</p>
                <div class="h-10 w-24 bg-red-500"></div>
            </div>
            <div class="border-2 mt-2 w-full h-full"></div>
        </div>
    </div>
</template>
<script>
export default {

}
</script>
