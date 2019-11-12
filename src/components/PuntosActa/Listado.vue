<template>

    <div>
        <div v-if="!isLoading">

            <CardDetalle />
            
            <b-row class="mb-3" align-v="center">
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
                
                <b-col cols="5" class="text-center">
                    <b-button class="mr-2" variant="outline-secondary" v-b-modal.modal-vista-previa>Vista Previa   
                        <font-awesome-icon icon="file-pdf" />
                    </b-button>
                    <b-button variant="outline-info" v-b-modal.modal-revision>Revisión   
                        <font-awesome-icon icon="envelope" />
                    </b-button>
                </b-col>

                <!-- <b-col cols="4" class="text-center">
                    <h3>Puntos de Agenda</h3>
                </b-col> -->
                <b-col cols="3" class="text-right">
                    <!-- <b-button-group>
                        <b-button variant="outline-danger">Pendientes <b-badge variant="danger">{{ pendientes }}</b-badge></b-button>
                        <b-button variant="outline-primary">Listos <b-badge variant="primary">{{ listos }}</b-badge></b-button>
                    </b-button-group> -->
                    <div>
                        <!-- <b-dropdown
                            variant="outline-secondary"
                            text="Filtrar Puntos"
                        >
                            <b-dropdown-item href="#" @click="mostrarTodos">Todos <b-badge variant="secondary">{{ backup_puntos.length }}</b-badge></b-dropdown-item>
                            <b-dropdown-item href="#" @click="mostrarPendientes">Pendientes <b-badge variant="danger">{{ pendientes }}</b-badge></b-dropdown-item>
                            <b-dropdown-item href="#" @click="mostrarListos">Listos <b-badge variant="primary">{{ listos }}</b-badge></b-dropdown-item>
                        </b-dropdown> -->

                        <b-badge variant="secondary" class="mr-1" @click="mostrarTodos" style="cursor: pointer;">Todos {{ backup_puntos.length }}</b-badge>
                        <b-badge variant="danger" class="mr-1" @click="mostrarPendientes" style="cursor: pointer;">Pendientes {{ pendientes }}</b-badge>
                        <b-badge variant="success" @click="mostrarListos" style="cursor: pointer;">Listos {{ listos }}</b-badge>
                    </div>
                </b-col>
                
            </b-row>

            <b-list-group>
                <b-list-group-item :to="{ name: 'detalle_punto_acta', params: {id_punto: punto.id}}" class="mb-2" v-for="(punto) in puntosFiltrados" :key="punto.id" :variant="punto.punto_acta ? punto.punto_acta.color : 'secondary'">
                    <b-row>
                        <b-col cols="1">
                            <p class="lead text-justify"><strong>{{ punto.orden }}.</strong> </p>
                        </b-col>
                        <b-col cols="11">
                            <p class="lead text-justify">{{ punto.descripcion }}</p>
                        </b-col>
                    </b-row>

                </b-list-group-item>
            </b-list-group>

            <!-- Si no se ha encontrado nada al buscar -->
            <div v-if="puntosFiltrados.length == 0">
                <b-row class="mt-3">
                    <b-col>
                        <h5 class="text-danger text-center">No se ha encontrado ningún punto que coincida con su criterio de búsqueda.</h5>
                    </b-col>
                </b-row>
            </div>

            <!-- <div class="mt-3">
                <b-pagination v-model="currentPage" :total-rows="rows" :per-page="perPage" aria-controls="my-table" align="center"></b-pagination>
            </div> -->
            
        </div>

        <div v-if="isLoading">
            <b-row>
                <b-col>
                    <div class="text-center my-2">
                        <b-spinner class="align-middle"></b-spinner>
                        <div class="mt-2">
                        <strong>Cargando datos...</strong>
                        </div>
                    </div>
                </b-col>
            </b-row>
        </div>

        <VistaPrevia />
        <ModalRevision />

    </div>

</template>

<script>

    import axios from 'axios'
    import VistaPrevia from '../DetalleActa/VistaPrevia'
    import ModalRevision from './ModalRevision'
    import CardDetalle from '@/components/DetalleActa/CardDetalle'

    export default {
        components: {
            VistaPrevia,
            ModalRevision,
            CardDetalle
        },
        data(){
            return{
                puntos: [],
                backup_puntos: [],
                agenda: {},
                isLoading: false,
                busqueda: '',
                currentPage: 1,
                rows: null,
                perPage: 3
            }
        },
        methods: {
            obtenerPuntos(){

                this.isLoading = !this.isLoading

                axios({
                    method: 'GET',
                    url: process.env.VUE_APP_API_URL + 'puntos_agenda_acta/' + this.$route.params.id,
                })
                .then(response => {

                    console.log(response.data)

                    this.puntos = response.data.agenda.puntos_agenda
                    this.backup_puntos = response.data.agenda.puntos_agenda
                    this.agenda = response.data.agenda
                    this.rows = this.puntos.length
                    this.isLoading = !this.isLoading
                })
                .catch(error => {
                    console.log(error)
                })

            },
            mostrarTodos(){

                this.puntos = this.backup_puntos
                this.rows = this.puntos.length
            },
            mostrarPendientes(){

                let pendientes = this.backup_puntos.filter(item => !item.punto_acta)
                this.puntos = pendientes
                this.rows = pendientes.length

            },
            mostrarListos(){

                let listos = this.backup_puntos.filter(item => item.punto_acta)
                this.puntos = listos
                this.rows = listos.length

            }
        },
        computed: {
            listaPuntos(){

                return this.puntos.slice(
                    (this.currentPage - 1) * this.perPage,
                    this.currentPage * this.perPage
                )

            },
            pendientes(){
                let pendientes = this.backup_puntos.filter(item => !item.punto_acta)

                return pendientes.length
            },
            listos(){
                let listos = this.backup_puntos.filter(item => item.punto_acta)

                return listos.length    
            },
            puntosFiltrados: function(){

                return this.puntos.filter(punto => {
                   
                    return punto.descripcion.toLowerCase().includes(this.busqueda.toLowerCase()) 
                })

            }
        },
        mounted(){
            this.obtenerPuntos()
        }
    }
</script>