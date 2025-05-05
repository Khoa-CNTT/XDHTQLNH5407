<template>
    <div class="bg-blue-200 w-full h-screen flex flex-row justify-center items-center">
        <div
            class="border w-[25vw] h-fit bg-white rounded-[50px] shadow-lg flex flex-col gap-2 p-10 justify-start items-center">
            <div class="w-24 h-24 flex justify-center items-center rounded-full overflow-hidden">
                <img class="object-cover" src="/imageicon/phefood.png" alt="icon quên mật khẩu">
            </div>
            <p class="font-bold uppercase text-lg">Quên mật khẩu?
            </p>
            <p>Vui lòng cung cấp email đăng nhập, chúng tôi sẽ gửi link kích hoạt cho bạn.
            </p>
            <p class="w-full text-xs">
                Email
                <input class="border rounded-lg w-full ps-5 h-10 text-base" placeholder="Email" type="text" id="email">
            </p>
            <input
                class="bg-blue-500 w-52 h-10 mt-5 text-lg font-bold rounded-lg text-white hover:bg-blue-300 hover:text-black hover:cursor-pointer"
                type="button" value="Cấp lại mật khẩu">
            <input class="hover:cursor-pointer hover:text-blue-500" type="button" value="Trở lại" @click="goBack">
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

function goBack() {
    router.push({ name: 'login' });
}
</script>
