<template>
    <div class="h-screen relative">
        <AddNewPricePeriod v-if="show_add_modal" @hideAddNewPricePeriod="hideAddNewPricePeriod()" />
        <UpdatePricePeriod :id="show_update_modal_id" v-if="show_update_modal" @hideUpdatePricePeriod="hideUpdatePricePeriod()" />
        <DeleteConfirmation :id="show_delete_confirmation_id" v-if="show_delete_confirmation" @hideDeleteConfirmation="hideDeleteConfirmation()" />

        <div class="flex flex-col items-center justify-start pt-20">
            <button class="bg-green-500 px-10 py-3 rounded-full text-2xl text-white duration-300 hover:bg-green-600" @click="show_add_modal = true">
                Add new price period
            </button>
            <div class="mt-20">
                <table>
                    <tr class="border-b">
                        <td class="text-xl font-bold pl-5 pr-10 py-2 ">
                            Price per day
                        </td>
                        <td class="pl-5 pr-10 py-2 ">
                            Start date
                        </td>
                        <td class="pl-5 pr-10 py-2 ">
                            End date
                        </td>
                        <td class="pl-20 pr-10 py-2 ">
                            Actions
                        </td>
                    </tr>
                    <tr><td class="h-[10px]" colspan="4"></td></tr>
                    <tr class="duration-300 hover:bg-amber-100" v-for="price_period in price_periods" :key="price_period.id">
                        <td class="text-xl font-bold pl-5 pr-10 py-2 rounded-l-full">
                            {{ price_period.price_per_day }}
                        </td>
                        <td class="pl-5 pr-10 py-2 ">
                            {{ price_period.start_date }}
                        </td>
                        <td class="pl-5 pr-10 py-2 ">
                            {{ price_period.end_date }}
                        </td>
                        <td class="pl-20 pr-10 py-2 rounded-r-full">
                            <div class="flex items-center space-x-5">
                                <button @click="showUpdateModal(price_period.id)">
                                    <Pencil class="w-6 stroke-blue-400 duration-300 hover:stroke-blue-600" />
                                </button>
                                <button @click="showDeleteConfirmation(price_period.id)">
                                    <Trash class="w-7 stroke-red-400 duration-300 hover:stroke-red-600" />
                                </button>
                            </div>
                        </td>
                    </tr>
                </table>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { ref } from 'vue'
    import axios from 'axios'
    import AddNewPricePeriod from './AddNewPricePeriod.vue'
    import UpdatePricePeriod from './UpdatePricePeriod.vue'
    import DeleteConfirmation from './DeleteConfirmation.vue'
    import Trash from '../assets/trash.vue'
    import Pencil from '../assets/pencil.vue'

    const show_add_modal = ref(false)
    const show_update_modal = ref(false)
    const show_update_modal_id = ref('')
    const show_delete_confirmation = ref(false)
    const show_delete_confirmation_id = ref('')
    const price_periods = ref([])

    function getPricePeriods()
    {
        axios.get('/api/price-period')
        .then((response) => {
            price_periods.value = response.data
        })
        .catch((error) => {
        })
    }

    function showUpdateModal(id)
    {
        show_update_modal.value = true
        show_update_modal_id.value = id
    }

    function hideUpdatePricePeriod()
    {
        show_update_modal.value = false
        getPricePeriods()
    }

    function hideAddNewPricePeriod()
    {
        show_add_modal.value = false
        getPricePeriods()
    }

    function showDeleteConfirmation(id)
    {
        show_delete_confirmation_id.value = id
        show_delete_confirmation.value = true
    }

    function hideDeleteConfirmation()
    {
        show_delete_confirmation.value = false
        show_delete_confirmation_id.value = ''
        getPricePeriods()
    }

    getPricePeriods()

</script>