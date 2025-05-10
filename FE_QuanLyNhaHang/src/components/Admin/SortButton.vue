    <template>
        <div class="flex flex-col ps-5">
            <svg @click="$emit('sort', 'desc')" class="w-4 h-4 text-gray-800 hover:cursor-pointer hover:bg-gray-300"
                aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"
                viewBox="0 0 24 24">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="m5 15 7-7 7 7" />
            </svg>
            <svg @click="$emit('sort', 'asc')" class="w-4 h-4 text-gray-800 hover:cursor-pointer hover:bg-gray-300"
                aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"
                viewBox="0 0 24 24">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="m19 9-7 7-7-7" />
            </svg>
        </div>
    </template>
<script>
export default {

}
</script>