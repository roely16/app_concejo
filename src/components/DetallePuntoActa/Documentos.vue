<template>
    <div>
        <b-table small striped head-variant="dark" :items="items" :fields="fields" show-empty empty-text="Aún no se han registrado documentos">
            <template slot="[id_tipo]" slot-scope="data">
                    {{ data.item.tipo_documento.nombre }}
                </template>

                <template slot="[actions]" slot-scope="row">
                    <div class="text-right">

                        <b-button class="mr-2" variant="outline-info" @click="row.toggleDetails">
                            <font-awesome-icon icon="info-circle" />
                        </b-button>

                        <b-button size="sm" class="mr-2" variant="outline-secondary" :href="row.item.link_descarga " >
                            <font-awesome-icon icon="cloud-download-alt" />
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
    </div>
</template>

<script>

    import axios from 'axios'

    export default {
        props: {
            id_agenda: {
                type: Number,
                default: null
            }
        },
        data() {
            return {
                items: [],
                fields: [],
                rows: null,
                isLoading: false
            }
        },
        methods: {
            obtenerDocumentos(){

                // console.log(this.id_agenda)
                
                if (this.id_agenda) {

                    axios({
                        method: 'GET',
                        url: process.env.VUE_APP_API_URL + 'obtener_documentos/' + this.id_agenda
                    })
                    .then(response => {
                        
                        console.log(response.data)

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

                }

            }
        },
        mounted(){
            this.obtenerDocumentos()
        }
    }
</script>