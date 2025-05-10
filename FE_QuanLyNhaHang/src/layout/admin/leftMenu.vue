<template>
    <div
        class="h-[calc(100vh-100px)] w-[300px] fixed z-0 mt-20 flex flex-col gap-2 font-bold text-2xl ps-2 pt-2 text-black">


        <div :class="menuClass('home')" @click="onClickMenu('home')">
            <MenuIcon src="/imageicon/home icon.png" label="Trang chủ" />
        </div>

        <div :class="menuClass('admin-foods')" @click="onClickMenu('admin-foods')">
            <MenuIcon src="/imageicon/food icon.png" label="Món ăn" />
        </div>

        <div :class="menuClass('admin-categories')" @click="onClickMenu('admin-categories')">
            <MenuIcon src="/imageicon/category icon.png" label="Loại" />
        </div>

        <div :class="menuClass('admin-types')" @click="onClickMenu('admin-types')">
            <MenuIcon src="/imageicon/category icon.png" label="Kiểu" />
        </div>

        <div :class="menuClass('admin-tables')" @click="onClickMenu('admin-tables')">
            <MenuIcon src="/imageicon/table icon.png" label="Bàn" />
        </div>

        <div :class="menuClass('admin-customers')" @click="onClickMenu('admin-customers')">
            <MenuIcon src="/imageicon/customer icon.png" label="Khách hàng" />
        </div>

        <div :class="menuClass('admin-ranks')" @click="onClickMenu('admin-ranks')">
            <MenuIcon src="/imageicon/rank icon.png" label="Rank" fullImage />
        </div>

        <div :class="menuClass('admin-sales')" @click="onClickMenu('admin-sales')">
            <MenuIcon src="/imageicon/sale icon.png" label="Sale" />
        </div>

        <div :class="menuClass('admin-users')" @click="onClickMenu('admin-users')">
            <MenuIcon src="/imageicon/staff icon.png" label="Nhân viên" />
        </div>

        <div :class="menuClass('menu-warehouse-admin')" @click="onClickMenu('menu-warehouse-admin')">
            <MenuIcon src="/imageicon/warehouse icon.png" label="Kho" />
        </div>
    </div>
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router'
import MenuIcon from '../../components/Admin/MenuIcon.vue'
const router = useRouter()
const route = useRoute()

// cách ni gọn hơn nè
const onClickMenu = (link) => {
    router.push({ name: link })
}

function menuClass(name) {
    const current = route.name || 'home'  // fallback mặc định là 'home'
    return [
        'flex flex-row gap-2 justify-start items-center w-full h-[100px] rounded-lg border-2 ps-2 hover:bg-gray-500 hover:cursor-pointer',
        current === name ? 'bg-red-500 text-white' : 'bg-gray-300 text-black'
    ]
}

</script>
