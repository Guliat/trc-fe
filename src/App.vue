<template>
    <div class="min-h-screen relative">
        <Login v-if="show_login" @hideLogin="show_login = false" @loginSuccessfull="is_admin = true" />
        <button class="absolute top-10 right-14 z-[99] btn btn-green" @click="show_login = true" v-if="!is_admin">
            Login
        </button>
        <button class="absolute top-10 right-14 z-[99] btn btn-red" @click="logout()" v-else>
            Logout
        </button>
        <component :is="currentComponent" />
    </div>
</template>

<script setup>
    import { ref, computed } from 'vue'
    import axios from 'axios'
    import Guest from './components/Guest.vue'
    import Admin from './components/Admin.vue'
    import Login from './components/Login.vue'

    const selectedComponent = ref('Guest')
    const show_login = ref(false)
    const is_admin = ref(false)

    const currentComponent = computed(() => {
        if (is_admin.value === true)
        {
            return Admin
        }
        else
        {
            return Guest
        }
    })

    function logout() {
        axios.get('/sanctum/csrf-cookie')
        .then(() => {
            axios.post('/api/logout')
            .then((response) => {
                if (response.status == 204) {
                    is_admin.value = false
                    selectedComponent.value = 'Guest'
                }
            })
        })
    }

    function checkAuth() {
        axios.get('/api/check-auth').then(res => {
            if (res.data == true)
            {
                is_admin.value = true
                selectedComponent.value = 'Admin'
            }
            else {
                is_admin.value = false
                selectedComponent.value = 'Guest'
            }
        })
    }

    checkAuth()
</script>