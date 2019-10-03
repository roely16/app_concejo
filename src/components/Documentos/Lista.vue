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

        <div>
            <b-table striped hover :items="items" :fields="fields">

                <template slot="[id_tipo]" slot-scope="data">
                    {{ data.item.tipo_documento.nombre }}
                </template>

                <template slot="[actions]" slot-scope="data">
                    <div class="text-right">

                        <b-button class="mr-2" variant="outline-secondary" :href=" process.env.VUE_APP_API_URL + 'descargar_archivo/' + data.item.id " >
                            <font-awesome-icon icon="cloud-download-alt" />
                        </b-button>

                        <b-button class="mr-2" variant="outline-primary" v-on:click="editarDocumento(data.item.id)">
                            <font-awesome-icon icon="edit" />
                        </b-button>
                        <b-button variant="outline-danger" v-on:click="eliminarDocumento(data.item.id)">
                            <font-awesome-icon icon="trash-alt" />
                        </b-button>
                    </div>
                </template>
            </b-table>
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
                id_documento: null
            }
        },
        methods: {
            obtenerDocumentos(){

                axios({
                    method: 'GET',
                    url: process.env.VUE_APP_API_URL + 'obtener_documentos/' + this.$route.params.id
                })
                .then(response => {
                    
                    console.log(response.data)
                    this.fields = response.data.fields
                    this.items = response.data.items
                  
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

            },
            editarDocumento(id){
                this.modeEdit = true
                this.id_documento = id
                this.$bvModal.show('modal-nuevo-documento')
            },
        },
        mounted(){

            this.obtenerDocumentos()

            this.$root.$on("obtenerDocumentos", () => {
				this.obtenerDocumentos();
            });

        }
    }
</script>