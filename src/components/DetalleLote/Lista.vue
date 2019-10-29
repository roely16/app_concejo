<template>
    <div>
        <b-row>
            <b-col>
                <b-card></b-card>
            </b-col>
        </b-row>

        <b-row class="mt-3">
            <b-col cols="4">
                <b-input-group>
                    <b-form-input v-model="busqueda"></b-form-input>

                    <b-input-group-append>
                        <b-button variant="outline-secondary" disabled>
                            <font-awesome-icon icon="search" />
                        </b-button>
                        
                    </b-input-group-append>
                    
                </b-input-group>
            </b-col>
        </b-row>

        <div class="mt-3">
            <b-table striped hover :items="items"></b-table>
        </div>
    </div>
</template> 

<script>

    import axios from 'axios'

    export default {
        data(){
            return{
                items: [
                    { age: 40, first_name: 'Dickerson', last_name: 'Macdonald' },
                    { age: 21, first_name: 'Larsen', last_name: 'Shaw' },
                    { age: 89, first_name: 'Geneva', last_name: 'Wilson' },
                    { age: 38, first_name: 'Jami', last_name: 'Carney' }
                ],
                busqueda: null
            }
        },
        methods: {
            obtenerHojas(){

            }
        },
        mounted(){
            this.obtenerHojas()
        }
    }
</script>