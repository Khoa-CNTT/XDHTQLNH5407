<template>
    <div class="w-[calc(100vw-300px)] h-[calc(100vh-100px)] fixed z-0 mt-20 ms-[300px] flex flex-col p-2 text-lg">
        <div class="flex flex-col gap-2">
            <p class="text-3xl font-bold uppercase">Kho quản lý</p>
            <div class="flex flex-row gap-2 font-semibold">
                <p :class="menuClass('menu-warehouse-admin')" @click="goWarehouse">Tồn kho</p>
                <p :class="menuClass('import-warehouse-admin')" @click="goImport">Nhập kho</p>
                <p :class="menuClass('ingredient-warehouse-admin')" @click="goIngredient">Danh sách thành phần</p>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

const goWarehouse = () => router.push({ name: 'menu-warehouse-admin' })
const goImport = () => router.push({ name: 'import-warehouse-admin' })
const goIngredient = () => router.push({ name: 'ingredient-warehouse-admin' })

const menuClass = (name) => {
    const current = route.name || ''
    return [
        'w-52 text-center rounded-lg p-2 hover:bg-red-500 hover:text-white hover:cursor-pointer',
        current === name ? 'bg-red-500 text-white' : 'bg-gray-300 text-black'
    ]
}
</script>
