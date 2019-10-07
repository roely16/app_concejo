<template>
    <div>

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
                <b-button variant="outline-primary" v-on:click="nuevoDocumento">
                Nuevo Documento
                <font-awesome-icon icon="plus-circle" />
                </b-button>
            </b-col>
        </b-row>

        <slot></slot>

        <div>
            <b-table :filter="busqueda" striped hover small head-variant="dark" show-empty empty-text="Aún no se han registrado documentos" :per-page="perPage" :current-page="currentPage" empty-filtered-text="No se han encontrado documentos que coincidan con su criterio de búsqueda" :items="items" :fields="fields" @filtered="onFiltered" :busy="isLoading">

                <div slot="table-busy" class="text-center my-2">
                    <b-spinner class="align-middle"></b-spinner>
                    <div class="mt-2">
                    <strong>Cargando datos...</strong>
                    </div>
                </div>

                <template slot="[id_tipo]" slot-scope="data">
                    {{ data.item.tipo_documento.nombre }}
                </template>

                <template slot="[actions]" slot-scope="row">
                    <div class="text-right">

                        <b-button class="mr-2" variant="outline-info" @click="row.toggleDetails">
                            <font-awesome-icon icon="info-circle" />
                        </b-button>

                        <b-button class="mr-2" variant="outline-secondary" :href="row.item.link_descarga " >
                            <font-awesome-icon icon="cloud-download-alt" />
                        </b-button>

                        <b-button class="mr-2" variant="outline-primary" v-on:click="editarDocumento(row.item.id)">
                            <font-awesome-icon icon="edit" />
                        </b-button>
                        <b-button variant="outline-danger" v-on:click="eliminarDocumento(row.item.id)">
                            <font-awesome-icon icon="trash-alt" />
                        </b-button>
                    </div>
                </template>

                <template v-slot:row-details="row">
                    <b-card>
                        <b-row class="mb-2">
                            <b-col sm="3" class="text-sm-right"><b>Fecha:</b></b-col>
                            <b-col>{{ row.item.fecha_creacion }}</b-col>
                        </b-row>

                        <b-row class="mb-2">
                            <b-col sm="3" class="text-sm-right"><b>Subido Por:</b></b-col>
                            <b-col>{{ row.item.persona.usuario.usuario.toUpperCase() }}</b-col>
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
                    <b-pagination
                    v-model="currentPage"
                    :total-rows="rows"
                    :per-page="perPage"
                    aria-controls="my-table"
                    v-if="items.length > perPage"
                    align="center"
                    ></b-pagination>
                </b-col>
                <b-col></b-col>
            </b-row>

        </div> 

        <Modal :modeEdit="modeEdit" :idDocumento="id_documento" />

    </div>      
</template>

<script>

    import axios from 'axios'
    import Modal from '../Documentos/Modal'

    export default {
        components: {
            Modal
        },
        data() {
            return {
                items: [],
                busqueda: null,
                fields: [],
                modeEdit: false,
                id_documento: null,
                rows: null,
                currentPage: 1,
                perPage: 10,
                isLoading: false
            }
        },
        methods: {
            obtenerDocumentos(){

                this.isLoading = !this.isLoading

                axios({
                    method: 'GET',
                    url: process.env.VUE_APP_API_URL + 'obtener_documentos/' + this.$route.params.id
                })
                .then(response => {
                    
                    this.fields = response.data.fields
                    this.items = response.data.items
                    this.rows = this.items.length

                    this.items.forEach(element => {
                        element.link_descarga = process.env.VUE_APP_API_URL + 'descargar_archivo/' + element.id
                    });

                    this.isLoading = !this.isLoading
                  
                })
                .catch(error => {
                    console.log(error)
                })

            },
            nuevoDocumento(){
                this.modeEdit = false
                this.$bvModal.show('modal-nuevo-documento')
            },
            eliminarDocumento(id){

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
                            url: process.env.VUE_APP_API_URL + 'eliminar_documento/' + id
                        })
                        .then(response => {
                            
                            this.obtenerDocumentos()

                            Swal.fire(
                                'Excelente!',
                                'El documento ha sido eliminado exitosamente.',
                                'success'
                            )
                        
                        })
                        .catch(error => {
                            console.log(error)
                        })

                    }

                })

            },
            editarDocumento(id){
                this.modeEdit = true
                this.id_documento = id
                this.$bvModal.show('modal-nuevo-documento')
            },
            onFiltered(filteredItems){
                this.rows = filteredItems.length;
				this.currentPage = 1;
            }
        },
        mounted(){

            this.obtenerDocumentos()

            this.$root.$on("obtenerDocumentos", () => {
				this.obtenerDocumentos();
            });

        }
    }
</script>