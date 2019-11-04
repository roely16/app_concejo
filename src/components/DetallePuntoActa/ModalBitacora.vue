<template>
    <b-modal size="lg" id="modal-bitacora" :title="id_punto_acta_eliminado ? 'Bitácora de Punto de Acta Eliminado' : 'Bitácora de Punto de Acta'" @shown="detalleBitacora" hide-footer>
        
        <div v-if="!isLoading">
            <b-table striped hover :items="items" :fields="fields" :per-page="perPage" :current-page="currentPage" head-variant="dark">

                <template slot="[accion]" scope="data">
                   <b-badge :variant="data.item.accion.color">{{ data.item.accion.nombre }}</b-badge>
                </template>

                <template slot="[persona]" scope="data">
                   {{ data.item.persona.usuario.usuario.toUpperCase() }}
                </template>

                <template slot="[show_details]" class="text-center" slot-scope="row" v-if="row.item.id_accion != 1">
                    <b-button size="sm" @click="row.toggleDetails" variant="secondary" >
						<font-awesome-icon icon="info-circle"  />
					</b-button>
                </template>

                <template v-slot:row-details="row">
                    <b-card v-if="row.item.id_accion == 2">
                        <b-row class="mb-2">
                            <b-col sm="3" class="text-sm-right"><b>Original:</b></b-col>
                            <b-col>
                                <span v-html="row.item.original"></span>
                                <!-- {{ row.item.original }} -->
                            </b-col>
                        </b-row>

                        <b-row class="mb-2">
                            <b-col sm="3" class="text-sm-right"><b>Modificado:</b></b-col>
                            <b-col>
                                <span v-html="row.item.modificado"></span>
                                <!-- {{ row.item.modificado }} -->
                            </b-col>
                        </b-row>

                        <b-button size="sm" class="mt-2" @click="row.toggleDetails">Ocultar Detalles</b-button>
                    </b-card>

                     <b-card v-if="row.item.id_accion == 3">
                        <b-row class="mb-2">
                            <b-col sm="3" class="text-sm-right"><b>Motivo:</b></b-col>
                            <b-col>{{ row.item.motivo_eliminacion }}</b-col>
                        </b-row>

                        <b-button size="sm" class="mt-2" @click="row.toggleDetails">Ocultar Detalles</b-button>
                    </b-card>
                </template>

            </b-table>

            <b-pagination v-if="rows > perPage" v-model="currentPage" :total-rows="rows" :per-page="perPage" aria-controls="my-table" align="center"></b-pagination>

        </div>

    </b-modal> 
</template>

<script>

    import axios from 'axios'

    export default {
        data(){
            return{
                items: [],
                fields: {},
                currentPage: 1,
                rows: null,
                perPage: 10,
                isLoading: false
            }
        },
        methods: {
            detalleBitacora(){

                this.isLoading = !this.isLoading

                let id_punto = null

                if (this.id_punto_acta_eliminado) {
                    id_punto = this.id_punto_acta_eliminado
                }else{
                    id_punto = this.id_punto_acta
                }

                axios({
                    method: 'GET',
                    url: process.env.VUE_APP_API_URL + 'bitacora_punto_acta/' + id_punto
                })
                .then(response => {
                   this.items = response.data.items,
                   this.fields = response.data.fields
                   this.rows = this.items.length
                   this.currentPage = 1
                   this.isLoading = !this.isLoading
                })
                .catch(error => {
                    console.log(error)
                })

            }
        },
        props: {
            id_punto_acta: {
                type: Number,
                default: null
            },
            id_punto_acta_eliminado: {
                type: Number,
                default: null,
                required: false
            }
        }
    }
</script>