<template>
    <b-modal id="modal-historial" title="Historial" @show="show" hide-footer size="lg">
        <!-- <p class="my-4">Hello from modal!</p> -->
        <div>
            <b-table striped hover :items="items"></b-table>
        </div>
    </b-modal> 
</template>

<script>

    import axios from 'axios'

    export default {
        data(){
            return{
                items: []
            }
        },
        methods: {
            show(){

                axios
                .get(process.env.VUE_APP_API_URL + 'historial_acta/' + this.$route.params.id)
                .then(response => {
                    this.items = response.data.items
                })

            }
        }
    }
</script>