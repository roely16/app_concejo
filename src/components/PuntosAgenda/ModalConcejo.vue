<template>
    <b-modal id="modal-concejo" title="Enviar Agenda al Concejo" @show="show" hide-footer size="xl">

        <b-tabs vertical  card>
            <b-tab title="Destinos" active>
                <b-row class="mb-3" align-v="center">
                    <b-col cols="5">
                        <b-input-group>
                            <b-form-input v-model="busqueda" autocomplete="off"></b-form-input>

                            <b-input-group-append>
                                <b-button variant="outline-secondary" disabled>
                                    <font-awesome-icon icon="search" />
                                </b-button>
                                
                            </b-input-group-append>
                            
                        </b-input-group> 
                    </b-col>
                    <b-col class="text-right">
                        <b-button class="mr-2" size="sm" variant="outline-success" @click="marcarTodoConcejo">
                            <font-awesome-icon icon="check" />
                        </b-button>
                        <b-button variant="outline-danger" size="sm" @click="desmarcarTodoConcejo">
                            <font-awesome-icon icon="times-circle" />
                        </b-button>
                    </b-col>
                </b-row>

                <div>
                    <b-table small hover :items="items" :fields="fields" head-variant="dark" :busy="isLoading" :filter="busqueda" show-empty empty-filtered-text="No se han encontrado registros que coincidan con su criterio de búsqueda.">

                        <div slot="table-busy" class="text-center my-2">
                            <b-spinner class="align-middle"></b-spinner>
                            <div class="mt-2">
                            <strong>Cargando datos...</strong>
                            </div>
                        </div>

                        <template slot="[nombre]" slot-scope="data">
                            {{ data.item.nombre }} {{ data.item.apellido }}
                        </template>

                        <template slot="[puesto]" slot-scope="data">
                            {{ data.item.puesto.nombre }}
                        </template>

                        <template slot="[enviar_agenda]" slot-scope="data">
                            <b-button size="sm" :variant="data.item.enviar ? 'outline-success' :  'outline-danger'" @click="marcarEnviar(data.item)">
                                <font-awesome-icon :icon="data.item.enviar ? 'check' : 'times-circle'" />
                            </b-button>
                        </template>
                    </b-table>
                </div>

                
            </b-tab>
            <b-tab title="Archivo Adjunto">

                <b-row>
                    <b-col cols="6">
                        <div class="mb-4">
                            <h5>Agenda</h5>
                            <b-list-group>
                                <b-list-group-item variant="secondary">
                                    <b-row>
                                        <b-col cols="1">
                                            <b-form-checkbox v-model="include_agenda" size="lg" disabled></b-form-checkbox>
                                        </b-col>
                                        <b-col cols="9">
                                            <h5>
                                                {{ agenda.fecha }}
                                            </h5>
                                        </b-col>
                                        <b-col cols="2" class="text-right">
                                            <b-button size="sm" variant="outline-secondary" @click="vistaPreviaAgenda">
                                                <font-awesome-icon icon="eye" />
                                            </b-button>
                                        </b-col>
                                    </b-row>
                                </b-list-group-item>
                            </b-list-group>
                        </div>

                        <div class="mb-3">
                            
                            <b-row class="mb-3">
                                <b-col cols="8">
                                    <h5>Documentos</h5>
                                </b-col>
                                <b-col cols="4" class="text-right">
                                    <b-button style="width: 2rem" class="mr-2" size="sm" variant="outline-secondary" @click="ordenarLista" :disabled="documentos.length <= 0">
                                        <font-awesome-icon :icon="ordenando ? 'ban' : 'sort'" />
                                    </b-button>
                                    <b-button style="width: 2rem" class="mr-2" size="sm" variant="outline-success" @click="marcarTodos" :disabled="documentos.length <= 0">
                                        <font-awesome-icon icon="check" />
                                    </b-button>
                                    <b-button style="width: 2rem" size="sm" variant="outline-danger" @click="desmarcarTodos" :disabled="documentos.length <= 0">
                                        <font-awesome-icon icon="times-circle" />
                                    </b-button>
                                </b-col>
                            </b-row>

                            <b-list-group id="lista-documentos" v-if="documentos.length > 0">
                                <b-list-group-item :variant="ordenando ? 'dark' : 'secondary'" v-for="documento in documentos" :key="documento.id" class="mb-2">
                                    <b-row>
                                        <b-col cols="1">
                                            <b-form-checkbox v-model="documento.marcado" size="lg"></b-form-checkbox>
                                        </b-col>
                                        <b-col cols="9">
                                            <h5>
                                                {{ documento.nombre }}
                                            </h5>
                                        </b-col>
                                        <b-col cols="2" class="text-right">
                                            <b-button size="sm" variant="outline-secondary" @click="vistaPreviaDocumento(documento)">
                                                <font-awesome-icon icon="eye" />
                                            </b-button>
                                        </b-col>
                                    </b-row>
                                </b-list-group-item>
                                
                            </b-list-group>

                            <h5 v-if="documentos.length == 0" class="text-center text-danger">
                                No se han registrado documento en formato PDF
                            </h5>
                        </div>

                        <!-- <b-pagination v-if="documentos.length > perPage" v-model="currentPage" :total-rows="rows" :per-page="perPage" aria-controls="my-table" align="center"></b-pagination> -->
                    </b-col>
                    <b-col cols="6">
                        <b-card style="height: 39rem">
            
                            <div id="vista-previa"></div>
                            
                        </b-card>
                        <b-row>
                            <b-col>
                                <small>{{ documento_mostrando }}</small>
                            </b-col>
                            <b-col class="text-right">
                                <b-spinner class="align-middle" v-if="loadingDocument" small ></b-spinner>
                            </b-col>
                        </b-row>
                        
                        <b-row class="text-center">
                            <b-col>
                                <b-button class="mt-3" size="sm" variant="outline-secondary" @click="vistaPreviaAdjunto">Vista Previa Adjunto</b-button>
                            </b-col>
                        </b-row>
                    </b-col>
                </b-row>
                

            </b-tab>
        </b-tabs>
        
        <b-row class="text-center mb-2">
            <b-col>
                <b-button @click="cerrarModal" size="lg" class="mr-2" variant="outline-danger">Cancelar 
                    <font-awesome-icon icon="times-circle" />
                </b-button>
                <b-button size="lg" variant="outline-primary" :disabled="!checkEnviar || isSending" @click="enviarAgenda">{{ isSending ? 'Enviando...' : 'Enviar Agenda' }} 
                    <font-awesome-icon icon="save" />  
                </b-button>
            </b-col>
        </b-row>

    </b-modal>
</template>

<style scoped>
    .pdfobject-container { height: 36.5rem; }
    .blue-background-class {
        opacity: 0.4;
    }
</style>

<script>

    import axios from 'axios'
    import  Sortable from 'sortablejs/modular/sortable.core.esm.js';

    export default {
        data(){
            return{
                items: [],
                archivos: [],
                documentos: [],
                fields: [],
                busqueda: '',
                isSending: false,
                isLoading: false,
                include_agenda: true,
                currentPage: 1,
                perPage: 7,
                rows: null,
                ordenando: false,
                lista_ordenada: null,
                documento_mostrando: null,
                loadingDocument: false,
                agenda: {}
            }
        },
        methods: {
            show(){
                
                this.isLoading = !this.isLoading

                axios
                .get( process.env.VUE_APP_API_URL + 'obtener_concejo/' + this.$route.params.id)
                .then(response => {

                    console.log(response.data.items)
                    this.items = response.data.items
                    this.fields = response.data.fields
                    this.documentos = response.data.documentos
                    this.agenda = response.data.agenda
                    this.rows = this.documentos.length
                    this.isLoading = !this.isLoading
                    
                })
            },
            marcarEnviar(item){
                item.enviar = !item.enviar
            },
            cerrarModal(){
                this.$bvModal.hide('modal-concejo')	
            },
            enviarAgenda(){

                Swal.fire({
                    title: '¿Está seguro?',
                    text: "La agenda será enviada a todas las personas seleccionadas!",
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Si, ENVIAR!',
                    cancelButtonText: 'Cancelar'
                }).then((result) => {

                    let usuario = JSON.parse(localStorage.getItem('usuario'))

                    let documentos = this.documentos.filter(item => item.marcado)

                    let data = {
                        personas: this.items.filter(item => item.enviar),
                        id_agenda: this.$route.params.id,
                        id_usuario: usuario.id_persona,
                        documentos: documentos
                    }

                    // console.log(data)

                    if (result.value) {
                                                
                        this.isSending = !this.isSending

                        axios
                        .post( 'https://udicat.muniguate.com/apps/api_concejo/public/api/enviar_agenda_concejo', data)
                        .then(response => {

                            this.isSending = !this.isSending

                            Swal.fire(
                                'Excelente!',
                                'La agenda ha sido enviada a las personas correspondientes!',
                                'success'
                            ).then(()=>{

                                this.$bvModal.hide('modal-concejo')
                                this.$root.$emit('recargarDetalleAgenda')

                            })

                        })

                    }

                })

            },
            vistaPreviaDocumento(documento){

                this.loadingDocument = !this.loadingDocument
                this.documento_mostrando = documento.nombre

                axios({
                    method: 'GET',
                    url: process.env.VUE_APP_API_URL + 'vista_previa_documento_agenda/' + documento.id,
                    responseType: 'arraybuffer'
                })
                .then(response => {

                    this.loadingDocument = !this.loadingDocument

                    let blob = new Blob([response.data], { type: 'application/pdf' })
                    let link = document.createElement('a')
                    link.href = window.URL.createObjectURL(blob)

                    PDFObject.embed(link.href + '#toolbar=0', "#vista-previa")
                    
                })

            },
            vistaPreviaAgenda(){

                this.loadingDocument = !this.loadingDocument
                this.documento_mostrando = 'Agenda ' + this.agenda.fecha

                axios({
                    method: 'GET',
                    url: process.env.VUE_APP_API_URL + 'pdf_agenda/' + this.$route.params.id,
                    responseType: 'arraybuffer'
                })
                .then(response => {
                    
                    this.loadingDocument = !this.loadingDocument

                    let blob = new Blob([response.data], { type: 'application/pdf' })
                    let link = document.createElement('a')
                    link.href = window.URL.createObjectURL(blob)

                    PDFObject.embed(link.href + '#toolbar=0', "#vista-previa")

                })
                .catch(error => {
                    console.log(error)
                })

            },
            ordenarLista(){

                this.ordenando = !this.ordenando

                if (this.ordenando) {
                    
                    var el = document.getElementById('lista-documentos');
                    var self = this

                    this.lista_ordenada = new Sortable(el, {
                        animation: 150,
                        ghostClass: 'blue-background-class',

                        onEnd: function (evt) {
            
                            var f = self.documentos.splice(evt.oldIndex, 1)[0];
                            self.documentos.splice(evt.newIndex, 0, f);

                        },

                    });

                }else{

                    this.lista_ordenada.destroy()

                }

            },
            marcarTodos(){

                this.documentos.forEach(element => {
                    
                    element.marcado = true

                });

            },
            desmarcarTodos(){

                this.documentos.forEach(element => {
                    
                    element.marcado = false

                });

            },
            vistaPreviaAdjunto(){

                this.loadingDocument = !this.loadingDocument
                this.documento_mostrando = "Archivo Adjunto"

                let documentos = this.documentos.filter(item => item.marcado)

                let data = {
                    documentos: documentos,
                    id_agenda: this.$route.params.id
                }

                axios({
                    method: 'POST',
                    url: process.env.VUE_APP_API_URL + 'vista_previa_adjunto',
                    data: data,
                    responseType: 'arraybuffer'
                })
                .then(response => { 

                    this.loadingDocument = !this.loadingDocument

                    let blob = new Blob([response.data], { type: 'application/pdf' })
                    let link = document.createElement('a')
                    link.href = window.URL.createObjectURL(blob)

                    PDFObject.embed(link.href + '#toolbar=0', "#vista-previa")

                })

            },
            marcarTodoConcejo(){

                this.items.forEach(element => {
                    element.enviar = true
                });

            },
            desmarcarTodoConcejo(){

                this.items.forEach(element => {
                    element.enviar = false
                });

            }
        },
        computed: {
            checkEnviar(){

                let personas_enviar = this.items.filter(item => item.enviar)

                if (personas_enviar.length <= 0 ) {
                    return false
                }else{
                    return true
                }

            },
            listaDocumentos(){

                return this.documentos.slice(
                    (this.currentPage - 1) * this.perPage,
                    this.currentPage * this.perPage
                )

            },
            todosMarcados(){

                let no_marcados = this.documentos.filter(item => !item.marcado)

                console.log(no_marcados.length)

                if (no_marcados.length == 0) {
                    
                    return true

                }else{

                    return false

                }

            }
        }    
    }
</script>