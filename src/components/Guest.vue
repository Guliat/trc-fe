<template>
    <div class="flex flex-col items-center relative">
        <Bike class="w-[250px]" />
        <h1 class="text-5xl font-light font-shantell">
            Welcome to our <span class="text-green-30 font-bold">Bike</span> rental application
        </h1>
        <h2 class="text-lg my-5 font-light">
            Please select start and end date and we will give you the best possible offer.
        </h2>
        <div class="w-1/3 mx-auto flex flex-col items-center space-x-10 mt-10">
            <VueDatePicker v-model="date_range" range :enable-time-picker="false" :min-date="new Date() + 1" />
            <button class="btn btn-green mt-5" :disabled="date_range.length == 0" @click="getPrices()">
                Search
                <Search class="w-7 stroke-white ml-2" />
            </button>
        </div>
        <div class="mt-5" v-if="loading">
            <Loading class="w-20 fill-amber-500" />
        </div>
        <div class="w-1/2 mx-auto" v-else>
            <div v-if="prices">
                <div class="text-3xl text-center my-10">
                    <small>
                        For this period you will pay
                    </small>
                    ${{ prices.total_price }}
                    <small>
                        total for
                    </small>
                    {{ prices.periods.length }}
                    <small>
                        days
                    </small>
                </div>
                <template v-for="price in prices.periods">
                    <div class="p-2 border my-3 flex items-center justify-between">
                        <span class="text-xl">
                            {{ price.date }}
                        </span>
                        <span class="text-2xl">
                            ${{ price.price_per_day }}
                        </span>
                    </div>
                </template>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { ref } from 'vue'
    import axios from 'axios'
    import Bike from '../assets/bike.vue'
    import Search from '../assets/search.vue'
    import Loading from '../assets/loading.vue'

    const loading = ref(false)
    // const date_range = ref([])
    const date_range = ref(["2024-01-08T13:05:00.000Z", "2024-01-11T13:05:00.000Z"])
    const prices = ref(null)

    function getPrices()
    {
        loading.value = true
        axios.post('/api/prices', {
            start_date: date_range.value[0],
            end_date: date_range.value[1]
        })
        .then(response => {
            prices.value = response.data
            loading.value = false
        })
        .catch((error) => {

        })
    }
</script>