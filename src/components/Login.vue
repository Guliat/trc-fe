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
                <input type="password" id="password" placeholder="password" v-model="password" class="px-4 py-2 border rounded-lg" @keyup.enter="login()" />
            </div>
            <button class="btn btn-green mt-10" @click="login()">
                Login
            </button>
            <button class="btn btn-text mt-3" @click="$emit('hide-login')">
                cancel
            </button>
        </div>
    </div>
</template>

<script setup>
    import { ref } from 'vue'
    import axios from 'axios'

    const email = ref('admin@trc.bg')
    const password = ref('password')
    const emit = defineEmits(['login-successfull'])

    function login()
    {
        axios.get('/sanctum/csrf-cookie')
        .then(() => {
            axios.post('/api/login', {email: email.value, password: password.value})
            .then((response) => {
                if (response.status === 200) {
                    emit('hide-login')
                    emit('login-successfull')
                }
            })
        })
    }
</script>