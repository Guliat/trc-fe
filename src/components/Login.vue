<template>
    <div class="fixed inset-0 bg-white/70 backdrop-blur z-[100] flex items-center justify-center" @click.self="$emit('hide-login')">
        <div class="bg-white shadow-2xl border rounded-lg flex flex-col items-center justify-center p-10">
            <h1 class="text-3xl">
                Login
            </h1>
            <div class="w-full flex flex-col mt-10">
                <label class="text-sm text-gray-700 mb-1" for="email">
                    Email
                </label>
                <input type="email" id="email" placeholder="email" v-model="email" class="px-4 py-2 border rounded-lg" />
            </div>
            <div class="w-full flex flex-col mt-5">
                <label class="text-sm text-gray-700 mb-1" for="password">
                    Password
                </label>
                <input type="password" id="password" placeholder="password" v-model="email" class="px-4 py-2 border rounded-lg" />
            </div>
            <button type="submit" class="btn btn-green mt-10">
                Login
            </button>
        </div>
    </div>
</template>

<script setup>
    import { ref } from 'vue'

    const email = ref('')
    const password = ref('')

</script>