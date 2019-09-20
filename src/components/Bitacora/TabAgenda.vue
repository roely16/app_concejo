<template>
    <div>
        <b-table striped hover :items="items"></b-table>
    </div>
</template>

<script>

    import axios from 'axios'

    export default {
        data() {
            return {
                items: [
                    { age: 40, first_name: 'Dickerson', last_name: 'Macdonald' },
                    { age: 21, first_name: 'Larsen', last_name: 'Shaw' },
                    { age: 89, first_name: 'Geneva', last_name: 'Wilson' },
                    { age: 38, first_name: 'Jami', last_name: 'Carney' }
                ]
            }
        },
        methods: {
            obtenerBitacora(){

                axios({
                    method: 'GET',
                    url: process.env.VUE_APP_API_URL + 'bitacora_correo',
                })
                .then(response => {

                    console.log(response)
                    this.items = response.data

                })

            }
        },
        mounted(){

            this.obtenerBitacora()

        }
    }
</script>