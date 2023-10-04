<template>
    <div class="modal" @click.self="$emit('hide-add-new-price-period')">
        <div class="modal-box">
            <h1 class="text-2xl font-light">
                Add new price period
            </h1>
            <div class="mt-2 pt-8 border-t">
                <label class="text-sm text-gray-700 mb-1">
                    Start Date
                </label>
                <VueDatePicker v-model="start_date" :enable-time-picker="false" />
            </div>
            <div class="mt-5">
                <label class="text-sm text-gray-700 mb-1">
                    End Date
                </label>
                <VueDatePicker v-model="end_date" :enable-time-picker="false" />
            </div>
            <div class="w-full flex flex-col mt-5">
                <label class="text-sm text-gray-700 mb-1">
                    Price per day
                </label>
                <input type="number" min="0" class="input" v-model="price_per_day" />
            </div>
            <button class="btn btn-green mt-10" :disabled="loading" @click="save()">
                <Loading class="w-5 fill-white" v-if="loading" />
                <span v-else>
                    Save
                </span>
            </button>
            <button class="btn btn-text mt-3" @click="$emit('hide-add-new-price-period')">
                cancel
            </button>
        </div>
    </div>
</template>

<script setup>
    import { ref } from 'vue'
    import axios from 'axios'
    import Loading from '../assets/loading.vue'

    const loading = ref(false)
    const start_date = ref(new Date())
    const end_date = ref(new Date())
    const price_per_day = ref(0)
    const emit = defineEmits(['hide-add-new-price-period'])

    function save()
    {
        axios.post('/api/price-period', {
            start_date: start_date.value,
            end_date: end_date.value,
            price_per_day: price_per_day.value,
        })
        .then(() => {
            emit('hide-add-new-price-period')
        })
        .catch((error) => {
            console.log(error)
            emit('hide-add-new-price-period')
        })
    }

</script>