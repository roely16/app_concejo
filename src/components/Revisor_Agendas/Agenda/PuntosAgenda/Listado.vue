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
            
            <b-col cols="4" class="text-center">
                <b-button class="mr-2" variant="outline-secondary" @click="modalPDF" :disabled="puntos_agenda.length <= 0">Vista Previa
                    <font-awesome-icon icon="file-pdf" />
                </b-button>

                <!-- <b-button variant="outline-info" @click="sendMail" :disabled="puntos_agenda.length <= 0">Aprobación
                    <font-awesome-icon icon="envelope" />
                </b-button> -->

            </b-col>

            <!-- <b-col cols="4" class="text-right">

                <b-button v-if="!ordenando" :disabled="puntos_agenda.length <= 0" class="mr-2" variant="outline-success" v-on:click="orderLista()">Ordenar
                    <font-awesome-icon icon="sort" />
                </b-button>

                <b-button-group v-if="ordenando" class="mr-2">
                    <b-button v-on:click="orderLista()" variant="outline-success">Guardar
                        <font-awesome-icon icon="save" />
                    </b-button>
                    <b-button variant="outline-secondary" @click="cancelarOrdenar">Cancelar
                        <font-awesome-icon icon="times-circle" />
                    </b-button>
                </b-button-group>

                <b-button variant="outline-primary" v-on:click="crearPunto()">Crear Punto
                    <font-awesome-icon icon="plus-circle" />
                </b-button>
            </b-col> -->

            <b-col  cols="4" class="text-right">
                <b-button class="mr-2" variant="outline-success">Aprobar
                    <font-awesome-icon icon="check" />
                </b-button>

                <b-button variant="outline-danger">Solicitar Cambios
                    <font-awesome-icon icon="times-circle" />
                </b-button>
            </b-col>
        </b-row>

        <slot></slot>

        <div v-if="!isLoading">
            <b-list-group id="items" v-if="puntos_agenda.length > 0">
                <b-list-group-item class="mb-2" v-for="(punto, key) in puntosFiltrados" :key="punto.id" :variant="list_variant">
                    <b-row>
                        <b-col cols="1">
                            <p class="lead text-justify">{{ ++key }}. </p>
                        </b-col>
                        <b-col cols="9">
                            <p class="lead text-justify">{{ punto.descripcion }}</p>
                        </b-col>
                        <b-col cols="2" class="text-right">
                            
                            <b-button size="sm" class="mr-1" variant="outline-secondary" @click="modalInfo(punto)">
                                <font-awesome-icon icon="info-circle" />
                            </b-button>

                            <b-button size="sm" class="mr-1" variant="outline-primary" @click="modalEditarPunto(punto)">
                                <font-awesome-icon icon="edit" />
                            </b-button>

                            <!-- <b-button size="sm" variant="outline-danger" @click="eliminarPunto(punto.id)">
                                <font-awesome-icon icon="trash-alt" />
                            </b-button> -->
                        </b-col>
                    </b-row>

                    <!-- <b-row>
                        <b-col class="text-right">
                            info
                        </b-col>
                    </b-row> -->

                </b-list-group-item>
            </b-list-group>

            <div class="mt-4 text-center text-danger" v-if="puntos_agenda.length <= 0">
                <h3>Aún no se han registrado puntos de agenda.</h3>
            </div>
        </div>
        
        <div v-if="isLoading" class="text-center mt-4">

            <b-spinner class="align-middle"></b-spinner>
            <div class="mt-2">
                <strong>Cargando datos...</strong>
            </div>

        </div>

        <b-row class="mt-4 mb-4" v-if="puntos_eliminados.length > 0">
            <b-col>
                <b-button v-b-toggle.collapse-1 variant="danger">
                    Mostrar Eliminados <b-badge variant="light">{{ puntos_eliminados.length }}</b-badge>
                </b-button>

                <b-collapse id="collapse-1" class="mt-2">
                    <b-card
                        border-variant="danger"
                    >
                        <b-list-group>
                            <b-list-group-item variant="danger" class="mb-2" v-for="punto_eliminado in puntos_eliminados" :key="punto_eliminado.id">
                                <b-row>
                                    <b-col cols="10">
                                        {{ punto_eliminado.descripcion }}
                                    </b-col>
                                    <b-col cols="2" class="text-right">
                                        <b-button size="sm" variant="outline-ligth" @click="modalInfo(punto_eliminado)">
                                            <font-awesome-icon icon="info-circle" />
                                        </b-button>
                                    </b-col>
                                </b-row>
                            </b-list-group-item>
                        </b-list-group>
                        
                    </b-card>
                </b-collapse>
            </b-col>
        </b-row>

        <ModalPunto :title="title_modal" :modalEdit="modalEdit" :orden="ultimo_punto" :puntoAgenda="punto_agenda" ></ModalPunto>

        <!-- <ModalCorreo :destinos="destinos" /> -->

        <ModalDetalle :data="detallePunto" :punto="no_punto" />

        <ModalPDF />

    </div>

</template>

<script>

    import Sortable from 'sortablejs/modular/sortable.complete.esm.js';
    import ModalPunto from '@/components/PuntosAgenda/ModalPunto'
    import axios from 'axios'
    // import ModalCorreo from '../DetalleAgenda/ModalCorreo'
    import ModalDetalle from '@/components/PuntosAgenda/ModalDetalle'
    import ModalPDF from '@/components/PuntosAgenda/ModalPDF'

    export default {
        components: {
            ModalPunto,
            // ModalCorreo,
            ModalDetalle,
            ModalPDF
        },
        data() {
            return {
                title_modal: null,
                puntos_agenda: [],
                ultimo_punto: null,
                list_variant: null,
                ordenando: false,
                lista_ordenada: null,
                isLoading: false,
                modalEdit: false,
                punto_agenda: null,
                isLoading: false,
                backupLista: null,
                busqueda: '',
                destinos: [],
                detallePunto: {},
                no_punto: '',
                puntos_eliminados: {}
            }
        },
        methods:{
            crearPunto(){

                this.title_modal = "Crear Punto de Agenda"
                this.ultimo_punto = this.puntos_agenda.length + 1
                this.modalEdit = false
                this.punto_agenda = null
                this.$bvModal.show('modal-punto')                
            },
            getData(){

                this.isLoading = !this.isLoading

                axios({
                    method: 'GET',
                    url: process.env.VUE_APP_API_URL + 'puntos_agenda/' + this.$route.params.id,
                })
                .then(response => {
                    this.isLoading = !this.isLoading
                    this.puntos_agenda = response.data.puntos
                    this.puntos_eliminados = response.data.puntos_eliminados
                    this.ultimo_punto = this.puntos_agenda.length + 1
                })
                .catch(error => {
                    console.log(error)
                })

            },
            orderLista(){

                this.backupLista = JSON.parse(JSON.stringify(this.puntos_agenda)) 

                if (!this.ordenando) {
                    
                    this.ordenando = !this.ordenando
                
                    this.list_variant = 'secondary'

                    var el = document.getElementById('items');
                    var self = this

                    this.lista_ordenada = new Sortable(el, {
                        // handle: '.handle',
                        animation: 150,
                        ghostClass: 'blue-background-class',

                        onEnd: function (evt) {
            
                            var f = self.puntos_agenda.splice(evt.oldIndex, 1)[0];
                            self.puntos_agenda.splice(evt.newIndex, 0, f);

                        },

                    });

                }else{

                    axios({
                        method: 'POST',
                        url: process.env.VUE_APP_API_URL + 'reordenar',
                        data: this.puntos_agenda
                    })
                    .then(response => {
                                                
                        if (response.data.code == 200) {
                            
                            Swal.fire(

                                'Excelente!',
                                'Se ha registrado el nuevo orden de los puntos de la agenda.',
                                'success'

                            ).then(() =>{

                                this.getData()
                                this.ordenando = false
                                this.list_variant = ''
                                this.lista_ordenada.destroy()

                            })
                            
                        }
                        
                    })
                    .catch(error => {
                        console.log(error)
                    })


                }

            },
            cancelarOrdenar(){

                this.puntos_agenda = this.backupLista
            
                this.ordenando = false
                this.list_variant = ''
                this.lista_ordenada.destroy()

            },
            modalEditarPunto(punto){

                this.title_modal = "Editar Punto de Agenda"
                this.modalEdit = true
                this.punto_agenda = punto
                this.ultimo_punto = parseInt(punto.orden)
                this.$bvModal.show('modal-punto')   
                  
            },
            eliminarPunto(id){

                Swal.fire({

                    title: '¿Está seguro?',
                    text: "Una vez eliminado no se podrá recuperar!",
                    input: 'textarea',
                    inputPlaceholder: 'Motivo de la eliminación',
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Si, eliminar!',
                    cancelButtonText: 'Cancelar'

                })
                .then((result) => {

                    if (result.value != '') {

                        let data = {
                            id_punto: id,
                            motivo: result.value
                        }

                        axios({
                            method: 'POST',
                            url: process.env.VUE_APP_API_URL + 'eliminar_punto',
                            data: data
                        })
                        .then(response => {

                            if (response.data.code == 200) {

                                Swal.fire(

                                    'Excelente!',
                                    'El punto de agenda ha sido eliminado exitosamente.',
                                    'success'

                                ).then(() =>{

                                    this.getData()

                                })

                            }else{

                                Swal.fire({
                                    type: 'error',
                                    title: 'Error ' + response.data.code,
                                    text: response.data.message,
                                })

                            }

                        })
                        .catch(error => {
                        })

                    }else{

                        Swal.fire({
                            type: 'error',
                            title: 'Error',
                            text: 'Debe ingresar el motivo de la eliminación!',
                        })

                    }

                })

            },
            sendMail(){

                axios({
                    method: 'GET',
                    url: process.env.VUE_APP_API_URL + 'personas_correo',
                })
                .then(response => {

                    this.destinos = response.data
                    this.$bvModal.show('modal-correo')

                    console.log(response.data)

                })

            },
            modalInfo(punto){
                
                axios({
                    method: 'GET',
                    url: process.env.VUE_APP_API_URL + 'bitacora_punto/' + punto.id,
                })
                .then(response => {

                    console.log(punto)
                    this.detallePunto = response.data
                    this.no_punto = punto.orden
                    this.$bvModal.show('modal-detalle')
                    
                })
                .catch(error => {
                })

            },
            modalPDF(){
                this.$bvModal.show('modal-pdf')
            }
        },
        mounted(){
            this.getData();

            this.$root.$on('obtenerPuntos', () => {
				this.getData()
            })

},
        computed: {
            puntosFiltrados: function(){

                return this.puntos_agenda.filter(punto => {
                   
                    return punto.descripcion.toLowerCase().includes(this.busqueda.toLowerCase()) 
                })

            }
        }
    }
</script>