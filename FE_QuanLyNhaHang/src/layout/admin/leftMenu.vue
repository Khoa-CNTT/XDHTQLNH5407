<template>
    <div
        class="h-[calc(100vh-100px)] w-[300px] fixed z-0 mt-20 flex flex-col gap-2 font-bold text-2xl ps-2 pt-2 text-black">
        <div :class="menuClass('home')" @click="goHome">
            <MenuIcon src="/imageicon/home icon.png" label="Trang chủ" />
        </div>

        <div :class="menuClass('admin-foods')" @click="goFood">
            <MenuIcon src="/imageicon/food icon.png" label="Món ăn" />
        </div>

        <div :class="menuClass('admin-categories')" @click="goCategory">
            <MenuIcon src="/imageicon/category icon.png" label="Loại" />
        </div>

        <div :class="menuClass('admin-types')" @click="goType">
            <MenuIcon src="/imageicon/category icon.png" label="Kiểu" />
        </div>

        <div :class="menuClass('admin-tables')" @click="goTable">
            <MenuIcon src="/imageicon/table icon.png" label="Bàn" />
        </div>

        <div :class="menuClass('admin-customers')" @click="goCustomer">
            <MenuIcon src="/imageicon/customer icon.png" label="Khách hàng" />
        </div>

        <div :class="menuClass('admin-ranks')" @click="goRank">
            <MenuIcon src="/imageicon/rank icon.png" label="Rank" fullImage />
        </div>

        <div :class="menuClass('admin-sales')" @click="goSale">
            <MenuIcon src="/imageicon/sale icon.png" label="Sale" />
        </div>

        <div :class="menuClass('admin-users')" @click="goUser">
            <MenuIcon src="/imageicon/staff icon.png" label="Nhân viên" />
        </div>

        <div
            class="flex flex-row gap-2 bg-gray-300 justify-start items-center w-full h-[100px] rounded-lg border-2 ps-2 hover:bg-gray-500 hover:cursor-pointer">
            <div class="rounded-full border-black border-2 h-16 w-16 overflow-hidden flex justify-center items-center">
                <img class="w-12 h-12 object-cover" src="/imageicon/warehouse icon.png" alt="" />
            </div>
            <p>Kho</p>
        </div>
    </div>
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router'
import MenuIcon from '../../components/Admin/MenuIcon.vue'
const router = useRouter()
const route = useRoute()

function goHome() {
    router.push({ name: 'home' })
}
function goFood() {
    router.push({ name: 'admin-foods' })
}
function goUser() {
    router.push({ name: 'admin-users' })
}
function goTable() {
    router.push({ name: 'admin-tables' })
}
function goType() {
    router.push({ name: 'admin-types' })
}
function goCategory() {
    router.push({ name: 'admin-categories' })
}
function goSale() {
    router.push({ name: 'admin-sales' })
}
function goRank() {
    router.push({ name: 'admin-ranks' })
}
function goCustomer() {
    router.push({ name: 'admin-customers' })
}

function menuClass(name) {
    const current = route.name || 'home'  // fallback mặc định là 'home'
    return [
        'flex flex-row gap-2 justify-start items-center w-full h-[100px] rounded-lg border-2 ps-2 hover:bg-gray-500 hover:cursor-pointer',
        current === name ? 'bg-red-500 text-white' : 'bg-gray-300 text-black'
    ]
}

</script>
