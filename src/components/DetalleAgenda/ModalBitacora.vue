<template>
    <b-modal id="modal-bitacora" size="lg" title="Historial" @show="show" hide-footer>
        <div>
            <b-table hover :items="items" :fields="fields" head-variant="dark" :per-page="perPage" :current-page="currentPage">
                <template slot="[estado]" slot-scope="data">
                    <!-- {{ data.item.estado }} -->
                    <b-badge :variant="data.item.estado.color" :class="data.item.estado.color">{{ data.item.estado.nombre }} 
                        <font-awesome-icon :icon="data.item.estado.icono" />
                    </b-badge>
                </template>
                <template slot="[persona]" slot-scope="data">
                    <!-- {{ data.item.persona.nombre }} {{ data.item.persona.apellido }}  -->
                    {{ data.item.persona.usuario.usuario.toUpperCase() }}
                </template>

                <template slot="[actions]" slot-scope="row">
                    <div class="text-right" v-if="row.item.correos">
                        <b-button size="sm" variant="outline-secondary" @click="row.toggleDetails">
                            <font-awesome-icon icon="info-circle" />
                        </b-button>
                    </div>
                </template>

                <template v-slot:row-details="row">
                    <b-card>
                        
                        <b-row class="mb-2">
                            <b-col sm="3" class="text-sm-right"><b>Archivo:</b></b-col>
                            <b-col>{{ row.item.historial_correos[0].nombre_archivo }} 
                                <a :href="row.item.link_descarga">
                                    <font-awesome-icon icon="cloud-download-alt" /> 
                                </a>
                            </b-col>
                        </b-row>
                        <b-row class="mb-2">
                            <b-col sm="3" class="text-sm-right"><b>Destinos:</b></b-col>
                            <b-col>
                                <ul class="lista-destinos">
                                    <li v-for="historial in row.item.historial_correos" :key="historial.id">{{ historial.persona.nombre }} {{ historial.persona.apellido }} - <b-badge variant="secondary">{{ historial.persona.puesto.nombre }}</b-badge></li>
                                    
                                </ul>
                            </b-col>
                        </b-row>

                        <b-button size="sm" class="mt-2" @click="row.toggleDetails">Ocultar Detalles</b-button>

                    </b-card>
                </template>
            </b-table>

            <div class="overflow-auto" v-if="rows > perPage">
                <b-pagination v-model="currentPage" :total-rows="rows" :per-page="perPage" aria-controls="my-table" align="center"></b-pagination>
            </div>
        </div>
    </b-modal>
</template>

<style  scoped>
    .lista-destinos {
        padding: 0;
        list-style-type: none;
    }
    .en_analisis{
		background-color: #ffae0d 
	}
</style>

<script>

    import axios from 'axios'

    export default {
        data(){
            return{
                items: [],
                fields: [],
                currentPage: 1,
                rows: null,
                perPage: 10
            }
        },
        methods: {
            show(){

                axios
                .get(process.env.VUE_APP_API_URL + 'bitacora_agenda/' + this.$route.params.id)
                .then(response =>  {
                    this.items = response.data.items
                    this.fields = response.data.fields

                    this.items.forEach(element => {
                        element.link_descarga = process.env.VUE_APP_API_URL + 'descargar_archivo_correo_agenda/' + element.id
                    });

                    this.rows = this.items.length
                })

            }
        }
    }
</script>