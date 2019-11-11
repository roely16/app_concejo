<template>
    <div>
        <!-- <b-row>
            <b-col>
                <b-card></b-card>
            </b-col>
        </b-row> -->

        <CardDetalle />

        <b-row class="mt-3">
            <b-col cols="4">
                <b-input-group>
                    <b-form-input v-model="busqueda" autocomplete="off"></b-form-input>

                    <b-input-group-append>
                        <b-button variant="outline-secondary" disabled>
                            <font-awesome-icon icon="search" />
                        </b-button>
                        
                    </b-input-group-append>
                    
                </b-input-group>
            </b-col>
            <b-col cols="8" class="text-right">
                <h5><b-badge variant="danger">Restantes {{ restantes }}</b-badge></h5>
            </b-col>
        </b-row>

        <div class="mt-3">
            <b-table small hover :items="items" :fields="fields" :per-page="perPage" :current-page="currentPage" head-variant="dark" show-empty empty-text="Aún no se han registrado impresiones." :filter="busqueda" empty-filtered-text="No se han encontrado registros que coincidan con su criterio de búsqueda" @filtered="onFiltered">
                <template slot="[acta]" slot-scope="data">
                    {{ data.item.impresion.acta.no_acta }} - {{ data.item.impresion.acta.year }} 
                    <font-awesome-icon icon="file-pdf" @click="vistaPrevia(data.item)" style="cursor: pointer;" />
                </template>

                <template slot="[estado]" slot-scope="data">
                    <b-badge variant="success" v-if="data.item.estado == 1">OK</b-badge>
                    <b-badge variant="danger" v-if="data.item.estado == 2">ERROR</b-badge>
                    <b-badge variant="secondary" v-if="data.item.estado == 3">PENDIENTE</b-badge>
                </template>

                <template slot="[actions]" slot-scope="row">
                    <b-button size="sm" class="mr-2" variant="outline-secondary" @click="row.toggleDetails" v-if="row.item.comentario_error">
                        <font-awesome-icon icon="info-circle"></font-awesome-icon>
                    </b-button>
                </template>

                <template v-slot:row-details="row">
                    <b-card>
                        <b-row class="mb-2">
                            <b-col sm="3" class="text-sm-right"><b>Comentario: </b></b-col>
                            <b-col>{{ row.item.comentario_error }}</b-col>
                        </b-row>

                        <b-button size="sm" @click="row.toggleDetails">Ocultar Detalles</b-button>
                    </b-card>
                </template>

            </b-table>

            <b-pagination v-if="rows > perPage" v-model="currentPage" :total-rows="rows" :per-page="perPage" aria-controls="my-table" align="center"></b-pagination>

        </div>

        <VistaPrevia :documento="documento" :pagina="pagina" />

    </div>
</template> 

<script>

    import CardDetalle from '@/components/DetalleLote/CardDetalle'
    import VistaPrevia from '@/components/DetalleLote/VistaPrevia'
    import axios from 'axios'

    export default {
        components: {
            CardDetalle,
            VistaPrevia
        },
        data(){
            return{
                items: [],
                fields: [],
                busqueda: null,
                documento: null,
                pagina: null,
                currentPage: 1,
                rows: null,
                perPage: 10,
                restantes: null
            }
        },
        methods: {
            obtenerHojas(){
                axios
                .get(process.env.VUE_APP_API_URL + 'hojas_usadas_lote/' + this.$route.params.id)
                .then(response => {
                    console.log(response.data)
                    this.items = response.data.items
                    this.fields = response.data.fields
                    this.restantes = response.data.restantes
                    this.rows = this.items.length
                })
            },
            vistaPrevia(item){

                this.documento = item.impresion.archivo
                this.pagina = parseInt(item.pagina_documento) 
                this.$bvModal.show('modal-vista-previa')

                console.log(item)

            },
            onFiltered(filteredItems) {
				this.rows = filteredItems.length;
				this.currentPage = 1;
			}
        },
        mounted(){
            this.obtenerHojas()
        }
    }
</script>