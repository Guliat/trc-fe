<template>
    <div class="min-h-screen">
        <component :is="currentComponent" />
    </div>
</template>

<script setup>
    import { ref, computed } from 'vue'
    import Guest from './components/Guest.vue'
    import Admin from './components/Admin.vue'

    const selectedComponent = ref('Guest')

    const currentComponent = computed(() => {
        if (selectedComponent.value === 'Admin')
        {
            return Admin
        }
        else
        {
            return Guest
        }
    })
</script>