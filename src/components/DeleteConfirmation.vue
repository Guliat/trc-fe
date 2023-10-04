<template>
    <div class="modal" @click.self="$emit('hide-delete-confirmation')">
        <div class="modal-box">
            <h1 class="text-2xl font-light mb-10">
                Please confirm the deletion!
            </h1>
            <Trash class="w-24 stroke-red-500" />
            <button class="btn btn-red text-2xl !font-normal mt-14" :disabled="loading" @click="destroy()">
                <Loading class="w-5 fill-white" v-if="loading" />
                <span v-else>
                    Yes, Delete
                </span>
            </button>
            <button class="btn btn-text mt-10" @click="$emit('hide-delete-confirmation')">
                cancel
            </button>
        </div>
    </div>
</template>

<script setup>
    import { ref } from 'vue'
    import axios from 'axios'
    import Loading from '../assets/loading.vue'
    import Trash from '../assets/trash.vue'

    const loading = ref(false)
    const props = defineProps(['id'])
    const emit = defineEmits(['hide-delete-confirmation'])

    function destroy()
    {
        loading.value = true
        axios.delete('/api/price-period/' + props.id)
        .then(() => {
            loading.value = false
            emit('hide-delete-confirmation')
        })
        .catch(() => {
            loading.value = false
            emit('hide-delete-confirmation')
        })
    }
</script>