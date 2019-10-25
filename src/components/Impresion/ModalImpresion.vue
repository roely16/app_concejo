<template>
    <b-modal id="modal-impresion" size="lg" title="Impresión de Acta No. 7 - 2019" @shown="show" hide-footer>
        <b-row>
            <b-col>
                <b-button size="lg" variant="outline-secondary">Enviar a Imprimir 
                    <font-awesome-icon icon="print" />
                </b-button>
            </b-col>

            <b-col class="text-right">
                <b-button class="mr-2" size="lg" variant="outline-success">
                    <font-awesome-icon icon="check" />
                </b-button>

                <b-button size="lg" variant="outline-danger">
                    <font-awesome-icon icon="times-circle" />
                </b-button>
            </b-col>

        </b-row>

        <b-row class="mt-4">
            <b-col>
                <div>
                    <b-table striped hover :items="items" :fields="fields" :perPage="perPage" :currentPage="currentPage" small></b-table>

                    <b-pagination v-model="currentPage" :total-rows="rows" :per-page="perPage" aria-controls="my-table" align="center"
                    ></b-pagination>

                </div>
            </b-col>
        </b-row>

        <b-row class="mt-4 text-center">
            <b-col>
                <b-button  size="lg" class="mr-2" variant="outline-danger">Cancelar 
                    <font-awesome-icon icon="times-circle" />
                </b-button>
                <b-button size="lg" variant="outline-primary">Guardar 
                    <font-awesome-icon icon="save" />
                </b-button>
            </b-col>
        </b-row>

    </b-modal>  
</template>

<script>

    import axios from 'axios'

    export default {
        data() {
            return {
                items: [
                    { no_pagina: 40, hoja_contraloria: 'Dickerson', estado: 'Macdonald' },
                    { age: 21, first_name: 'Larsen', last_name: 'Shaw' },
                    { age: 89, first_name: 'Geneva', last_name: 'Wilson' },
                    { age: 38, first_name: 'Jami', last_name: 'Carney' }
                ],
                fields: [],
                perPage: 10,
                currentPage: 1,
                rows: null
            }
        },
        methods: {
            show(){

                axios
                .get(process.env.VUE_APP_API_URL +  'paginas_impresion/15')
                .then(response => {
                    console.log(response.data)
                    this.items = response.data.items
                    this.fields = response.data.fields
                    this.rows = this.items.length
                })

            }
        }
    }
</script>