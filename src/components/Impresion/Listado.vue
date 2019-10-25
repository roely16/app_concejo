<template>
    <div>
        <b-row class="mb-4">
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

            <b-col cols="8" class="text-right">
                <b-button variant="outline-primary" v-b-modal.modal-archivo>Generar Archivo
                    <font-awesome-icon icon="print" />
                </b-button>
            </b-col>
        </b-row>

        <div>
            <b-table hover :items="items" :fields="fields" :per-page="perPage" :current-page="currentPage" head-variant="dark" show-empty empty-text="Aún no se han registrado impresiones" small>
                
                <template slot="[fecha_impresion]" slot-scope="data">
                    <b-badge variant="danger" v-if="!data.item.fecha_impresion">Pendiente</b-badge>
                    <strong v-else>{{ data.item.fecha_impresion }}</strong>
                </template>

                 <template slot="[fecha_creacion]" slot-scope="data">
                    <strong>{{ data.item.fecha_creacion }}</strong>
                </template>
            
                <template slot="[actions]" slot-scope="data">
                    <div class="text-right">
                        <!-- <b-button
                            :to="{ name: 'detalle_acta', params: { id: data.item.id } }"
                            class="mr-2"
                            variant="outline-success"
                        >
                            <font-awesome-icon icon="eye" />
                        </b-button> -->

                        <b-button v-if="!data.item.fecha_impresion" class="mr-2" variant="outline-secondary" v-b-modal.modal-impresion>
                            <font-awesome-icon icon="print" />
                        </b-button>

                        <!-- <b-button class="mr-2" v-if="data.item.fecha_impresion" variant="outline-primary" v-on:click="detalleImpresion(data.item.id)">
                            <font-awesome-icon icon="eye" />
                        </b-button> -->

                        <b-button :disabled="data.item.fecha_impresion ? true : false" variant="outline-danger" v-on:click="eliminarImpresion(data.item.id)">
                            <font-awesome-icon icon="trash-alt" />
                        </b-button>

                        

                    </div>
                </template>
                
            </b-table>

            <b-pagination v-model="currentPage" :total-rows="rows" :per-page="perPage" aria-controls="my-table" align="center" v-if="rows > 10"></b-pagination>
        </div>

        <ModalArchivo />
        <ModalImpresion />

    </div>    
</template>

<script>

    import axios from 'axios'
    import ModalArchivo from '@/components/Impresion/ModalArchivo.vue'
    import ModalImpresion from '@/components/Impresion/ModalImpresion.vue'
    import print from 'print-js'

    export default {
        components: {
            ModalArchivo,
            ModalImpresion
        },
        data(){
            return{
                busqueda: null,
                currentPage: 1,
                perPage: 100,
                rows: null,
                items: [],
                fields: []
            }
        },
        methods: {
            
            obtenerImpresiones(){

                axios
                .get(process.env.VUE_APP_API_URL + 'obtener_impresiones/' + this.$route.params.id )
                .then(response => {

                    console.log(response.data)
                    this.items = response.data.items
                    this.fields = response.data.fields

                })

            },
            imprimirArchivo(id){

                axios({
                    method: 'GET',
                    url: process.env.VUE_APP_API_URL + 'archivo_imprimir/' + id,
                    responseType: 'arraybuffer'
                })
                .then(response => {
                    
                    console.log(response.data)

                    let blob = new Blob([response.data], { type: 'application/pdf' })
                    let link = document.createElement('a')
                    link.href = window.URL.createObjectURL(blob)
                
                    console.log(link.href)                        

                    printJS(link.href)

                })
                .catch(error => {
                    console.log(error)
                })

            },
            eliminarImpresion(){

            },
            detalleImpresion(){

            }

        },
        mounted(){

            this.obtenerImpresiones()

        }
    }
</script>