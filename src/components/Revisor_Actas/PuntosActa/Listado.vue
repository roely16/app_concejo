<template>

    <div>
        <div v-if="!isLoading">

            <b-card class="mb-3">
                <b-row>
                    <b-col>
                        <b-form-group
                            label="Agenda de Fecha"
                        >
                            <h5>{{ agenda.fecha ? agenda.fecha : 'Cargando...' }}</h5>
                        </b-form-group>
                    </b-col>
                    <b-col>
                        <b-form-group
                            label="Tipo de Sesión"
                        >
                            <h5>{{ agenda.tipo_agenda ? agenda.tipo_agenda.nombre : 'Cargando...' }}</h5>
                        </b-form-group>
                    </b-col>
                </b-row>
            </b-card>

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
                
                <b-col cols="4" class="text-center">
                    <b-button class="mr-2" variant="outline-secondary" v-b-modal.modal-vista-previa>Vista Previa   
                        <font-awesome-icon icon="file-pdf" />
                    </b-button>
                    <b-button variant="outline-success" @click="aprobarActa">Aprobar Acta   
                        <font-awesome-icon icon="check-double" />
                    </b-button>
                </b-col>

                <!-- <b-col cols="4" class="text-center">
                    <h3>Puntos de Agenda</h3>
                </b-col> -->
                <b-col cols="4" class="text-right">
                    <!-- <b-button-group>
                        <b-button variant="outline-danger">Pendientes <b-badge variant="danger">{{ pendientes }}</b-badge></b-button>
                        <b-button variant="outline-primary">Listos <b-badge variant="primary">{{ listos }}</b-badge></b-button>
                    </b-button-group> -->
                    <!-- <div>
                        <b-dropdown
                            variant="outline-secondary"
                            text="Filtrar Puntos"
                        >
                            <b-dropdown-item href="#" @click="mostrarTodos">Todos <b-badge variant="secondary">{{ backup_puntos.length }}</b-badge></b-dropdown-item>
                            <b-dropdown-item href="#" @click="mostrarPendientes">Pendientes <b-badge variant="danger">{{ pendientes }}</b-badge></b-dropdown-item>
                            <b-dropdown-item href="#" @click="mostrarListos">Aprobados <b-badge variant="success">{{ listos }}</b-badge></b-dropdown-item>
                        </b-dropdown>
                    </div> -->
                    <b-badge variant="secondary"class="mr-1" @click="mostrarTodos" style="cursor: pointer;">Todos {{ backup_puntos.length }}</b-badge>
                    <b-badge variant="danger" class="mr-1" @click="mostrarPendientes" style="cursor: pointer;">Pendientes {{ pendientes }}</b-badge>
                    <b-badge variant="success" @click="mostrarListos" style="cursor: pointer;">Revisados {{ listos }}</b-badge>
                </b-col>
                
            </b-row>

            <b-list-group>
                <b-list-group-item :to="{ name: 'detalle_punto_acta_revision', params: {id_punto: punto.id}}" class="mb-2" v-for="(punto) in listaPuntos" :key="punto.id" :variant="punto.punto_acta.bitacora.id_accion == 4 ? 'success' : 'secondary'">
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

            <b-row align-v="center">
                <b-col></b-col>
                <b-col>
                    <div class="mt-3">
                        <b-pagination v-model="currentPage" :total-rows="rows" :per-page="perPage" aria-controls="my-table" align="center"></b-pagination>
                    </div>
                </b-col>
                <b-col class="text-right">
                    <!-- <small>Mostrando: <strong>Pendientes</strong></small> -->
                </b-col>
            </b-row>
            
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
        <!-- <ModalRevision /> -->

    </div>

</template>

<script>

    import axios from 'axios'
    import VistaPrevia from '@/components/DetalleActa/VistaPrevia'
    // import ModalRevision from './ModalRevision'

    export default {
        components: {
            VistaPrevia,
            // ModalRevision
        },
        data(){
            return{
                puntos: [],
                backup_puntos: [],
                agenda: {},
                isLoading: false,
                busqueda: null,
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
                    url: process.env.VUE_APP_API_URL + 'puntos_agenda_acta_revisar/' + this.$route.params.id,
                })
                .then(response => {

                    console.log(response.data)

                   this.puntos = response.data.agenda.puntos_agenda_acta
                   this.backup_puntos = response.data.agenda.puntos_agenda_acta
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

                let pendientes = this.backup_puntos.filter(item => item.punto_acta.bitacora.id_accion != 4)
                this.puntos = pendientes
                this.rows = pendientes.length

            },
            mostrarListos(){

                let listos = this.backup_puntos.filter(item => item.punto_acta.bitacora.id_accion == 4)
                this.puntos = listos
                this.rows = listos.length

            },
            aprobarActa(){

                Swal.fire({
                    title: '¿Está seguro?',
                    text: "Una vez aprobada se notificará a la persona responsable!",
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Si, APROBAR',
                    cancelButtonText: 'Cancelar'
                }).then((result) => {
                    if (result.value) {
                        
                        let usuario = JSON.parse(localStorage.getItem('usuario'))

                        let data = {

                            id_acta: this.$route.params.id,
                            id_usuario: usuario.id_persona

                        }

                        axios
                        .post(process.env.VUE_APP_API_URL + 'aprobar_acta', data)
                        .then(response => {

                            console.log(response.data)

                            Swal.fire(
                                'Excelente!',
                                'El acta ha sido aprobada!',
                                'success'
                            ).then( () => {

                                this.$router.push({ name: 'actas_revision' })

                            })

                        })

                    }
                })

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
                let pendientes = this.backup_puntos.filter(item => item.punto_acta.bitacora.id_accion != 4)

                return pendientes.length
            },
            listos(){
                let listos = this.backup_puntos.filter(item => item.punto_acta.bitacora.id_accion == 4)

                return listos.length    
            }
        },
        mounted(){
            this.obtenerPuntos()
        }
    }
</script>