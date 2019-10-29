<template>
    <div>

        <slot></slot>

        <b-row class="mb-3">
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
                <b-button variant="outline-primary" v-on:click="nuevoAudio">
                Nuevo Audio
                <font-awesome-icon icon="plus-circle" />
                </b-button>
            </b-col>
        </b-row>

        <div>
            <b-table :filter="busqueda" striped small head-variant="dark" show-empty empty-text="Aún no se han registrado audios" :items="items" :fields="fields" :per-page="perPage" :current-page="currentPage" empty-filtered-text="No se han encontrado documentos que coincidan con su criterio de búsqueda" @filtered="onFiltered" :busy="isLoading">

                <div slot="table-busy" class="text-center my-2">
                    <b-spinner class="align-middle"></b-spinner>
                    <div class="mt-2">
                    <strong>Cargando datos...</strong>
                    </div>
                </div>

                <template slot="[fecha]" slot-scope="row">
                    {{ row.item.fecha_creacion }}
                </template>

                <template slot="[subido_por]" slot-scope="row">
                    {{ row.item.persona.usuario.usuario.toUpperCase() }}
                </template>

                <template slot="[actions]" slot-scope="row">
                    <div class="text-right">

                        <b-button class="mr-2" variant="outline-secondary" @click="row.toggleDetails">
                            <font-awesome-icon icon="headphones-alt" />
                        </b-button>

                        <b-button class="mr-2" variant="outline-primary" @click="editarAudio(row.item.id)">
                            <font-awesome-icon icon="edit" />
                        </b-button>
                        <b-button variant="outline-danger" @click="eliminarAudio(row.item.id)">
                            <font-awesome-icon icon="trash-alt" />
                        </b-button>
                    </div>
                </template>

                <template v-slot:row-details="row">
                    <b-card>
                        <b-row class="text-center">
                            <b-col>
                                <audio controls controlsList="nodownload">
                                    <source :src="row.item.link_audio" type="audio/mpeg">
                                    Su navegador no soporta la reproducción de audio.
                                </audio>
                            </b-col>
                        </b-row>

                        <b-button size="sm" @click="row.toggleDetails">Ocultar Detalles</b-button>
                    </b-card>
                </template>

            </b-table>

            <b-row v-if="rows > 0 && !isLoading">
                <b-col>
                    <h5>Total de registros: {{ rows }}</h5>
                </b-col>
                <b-col>
                    <b-pagination v-model="currentPage" :total-rows="rows" :per-page="perPage" aria-controls="my-table" v-if="items.length > perPage" align="center"></b-pagination>
                </b-col>
                <b-col></b-col>
            </b-row>

        </div>  

        <Modal :editMode="editMode" :idAudio="id_audio" />

    </div>   
</template>

<script>

    import Modal from './Modal'
    import axios from 'axios'

    export default {
        components: {
            Modal
        },
        data() {
            return {
                items: [],
                fields: [],
                busqueda: null,
                editMode: false,
                id_audio: null,
                rows: null,
                currentPage: 1,
                perPage: 10,
                isLoading: false
            }
        },
        methods: {
            obtenerAudios(){

                this.isLoading = !this.isLoading

                axios({
                    method: 'GET',
                    url: process.env.VUE_APP_API_URL + 'obtener_audios/' + this.$route.params.id ,
                })
                .then(response => {
                    
                    this.items = response.data.items
                    this.rows = this.items.length

                    this.items.forEach(element => {
                        element.link_audio = process.env.VUE_APP_MEDIA_URL + element.link
                    });

                    this.fields = response.data.fields
                    this.isLoading = !this.isLoading

                })
                .catch(error => {
                    console.log(error)
                })

            },
            nuevoAudio(){

                this.editMode = false
                this.$bvModal.show('modal-nuevo-audio')

            },
            editarAudio(id){

                this.editMode = true
                this.id_audio = id
                this.$bvModal.show('modal-nuevo-audio')

            },
            eliminarAudio(id){

                Swal.fire({
                    title: '¿Está seguro?',
                    text: "Una vez eliminado no se podrá recuperar!",
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Si, ELIMINAR!',
                    cancelButtonText: 'Cancelar'
                }).then((result) => {

                    if (result.value) {

                        axios({
                            method: 'GET',
                            url: process.env.VUE_APP_API_URL + 'eliminar_audio/' + id
                        })
                        .then(response => {
                            
                            this.obtenerAudios()

                            Swal.fire(
                                'Excelente!',
                                'El audio ha sido eliminado exitosamente.',
                                'success'
                            )

                        })
                        .catch(error => {
                            console.log(error)
                        })

                    }

                })

            },
            onFiltered(filteredItems){
                this.rows = filteredItems.length;
				this.currentPage = 1;
            }
        },
        mounted(){

            this.obtenerAudios()

            this.$root.$on("obtenerAudios", () => {
				this.obtenerAudios();
            });

        }
    }
</script>