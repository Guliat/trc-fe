<template>
    <div class="modal" @click.self="$emit('hide-update-price-period')">
        <div class="modal-box">
            <h1 class="text-2xl font-light">
                Update price period
            </h1>
            <div class="mt-10" v-if="init_loading">
                <Loading class="w-20 fill-amber-300" />
            </div>
            <div class="flex flex-col items-center" v-else>
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
                <button class="btn btn-green mt-10" :disabled="loading" @click="update()">
                    <Loading class="w-5 fill-white" v-if="loading" />
                    <span v-else>
                        Save
                    </span>
                </button>
                <button class="btn btn-text mt-3" @click="$emit('hide-update-price-period')">
                    cancel
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { ref } from 'vue'
    import axios from 'axios'
    import Loading from '../assets/loading.vue'

    const init_loading = ref(true)
    const loading = ref(false)
    const start_date = ref(new Date())
    const end_date = ref(new Date())
    const price_per_day = ref(0)
    const props = defineProps(['id'])
    const emit = defineEmits(['hide-update-price-period'])

    function update()
    {
        loading.value = true
        axios.post('/api/price-period/' + props.id, {
            start_date: start_date.value,
            end_date: end_date.value,
            price_per_day: price_per_day.value,
        })
        .then(() => {
            emit('hide-update-price-period')
        })
        .catch((error) => {
            console.log(error)
            emit('hide-update-price-period')
        })
    }

    function init()
    {
        axios.get('/api/price-period/' + props.id)
       .then((response) => {
            start_date.value = new Date(response.data.start_date)
            end_date.value = new Date(response.data.end_date)
            price_per_day.value = response.data.price_per_day
            init_loading.value = false
       })
       .catch((error) => {
            console.log(error)
       })
    }

    init()

</script>