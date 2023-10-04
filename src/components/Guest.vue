<template>
    <div class="flex flex-col items-center relative">
        <button class="absolute top-10 right-14 btn btn-green" @click="show_login = true">
            Login
        </button>
        <Login v-if="show_login" @hideLogin="show_login = false" />
        <Bike class="w-[350px]" />
        <h1 class="text-5xl font-light font-shantell">
            Welcome to our <span class="text-green-30 font-bold">Bike</span> rental application
        </h1>
        <h2 class="text-xl my-5 font-light">
            Please select start and end date and we will give you the best possible offer.
        </h2>
        <div class="w-1/2 mx-auto flex space-x-10">
            <VueDatePicker v-model="start_date" range :enable-time-picker="false" />
            <VueDatePicker v-model="end_date" range :enable-time-picker="false" />
        </div>
    </div>
</template>

<script setup>
    import { ref, computed } from 'vue'
    import Bike from '../assets/bike.vue'
    import Login from './Login.vue'

    const start_date = ref()
    const end_date = ref()
    const show_login = ref(false)

</script>