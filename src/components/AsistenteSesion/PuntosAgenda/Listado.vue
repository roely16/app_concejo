<template>

    <div>

        <CardDetalle />

        <div v-if="puntos.length <= 0 && !isLoading">
            <b-card class="text-center">
                <h5 class="text-danger mb-4">No se han encontrado los puntos de la agenda.</h5>
                <b-button size="lg" variant="outline-primary" @click="copiarPuntos">Copiar Puntos 
                    <font-awesome-icon icon="copy" />
                </b-button>
            </b-card>
        </div>

        <div v-if="puntos.length > 0" >
            <b-row>
                <b-col cols="12" lg="4" md="6" class="mb-3">
                    <b-input-group>
                        <b-form-input v-model="busqueda" autocomplete="off"></b-form-input>

                        <b-input-group-append>
                            <b-button variant="outline-secondary" disabled>
                                <font-awesome-icon icon="search" />
                            </b-button>
                            
                        </b-input-group-append>
                        
                    </b-input-group> 
                </b-col>

                <b-col cols="12" lg="6" md="6" class="text-right mb-3">
                    
                    <b-button v-if="!ordenando" v-on:click="ordenarLista()" class="mr-2" variant="outline-success"  :disabled="isLoading">Ordenar
                        <font-awesome-icon icon="sort" />
                    </b-button>

                    <b-button-group  v-if="ordenando" class="mr-2">
                        <b-button variant="outline-success" v-on:click="ordenarLista()">Guardar
                            <font-awesome-icon icon="save" />
                        </b-button>
                        <b-button variant="outline-secondary" @click="cancelarOrdenar">Cancelar
                            <font-awesome-icon icon="times-circle" />
                        </b-button>
                    </b-button-group>

                </b-col>
            </b-row>

            <!-- Lista de Puntos -->
            <div v-if="!isLoading">
                <b-list-group id="items">
                    <b-list-group-item class="mb-2" v-for="(punto, key) in puntosFiltrados" :key="punto.id" :variant="list_variant">
                        <b-row>
                            <b-col cols="1">                                
                                <p class="lead text-justify">{{ ++key }}. </p>
                            </b-col>
                            <b-col cols="11" lg="11" md="11">
                                <p class="lead text-justify">{{ punto.descripcion }}</p>
                            </b-col>
                            
                        </b-row>

                        <b-row>
                            <b-col cols="2" lg="2" md="3" class="text-left my-handle">
                                <font-awesome-icon size="lg" v-if="ordenando" icon="arrows-alt" />
                            </b-col>
                            <b-col cols="10" lg="10" md="9" class="text-right">
                                
                                <b-button size="sm" class="mr-1" variant="outline-secondary" @click="modalInfo(punto)">
                                    <font-awesome-icon icon="info-circle" />
                                </b-button>

                                <b-button size="sm" class="mr-1" variant="outline-primary" @click="modalEditarPunto(punto)">
                                    <font-awesome-icon icon="edit" />
                                </b-button>

                                <b-button size="sm" variant="outline-danger" @click="eliminarPunto(punto.id)">
                                    <font-awesome-icon icon="trash-alt" />
                                </b-button>
                            </b-col>
                        </b-row>

                    </b-list-group-item>
                </b-list-group>
            </div>
            
            <div v-if="isLoading" class="text-center mt-4">

                <b-spinner class="align-middle"></b-spinner>
                <div class="mt-2">
                    <strong>Cargando datos...</strong>
                </div>

            </div>

            <div v-if="busqueda != '' && puntosFiltrados.length == 0" class="text-center mt-4 mb-4">
                <h5 class="text-danger">No se han encontrado resultados que coincidan con su busqueda.
                    <br> 
                    <font-awesome-icon size="lg" icon="search" class="mt-4" />
                </h5>
                
            </div>

            <b-row class="mt-4 mb-4" v-if="puntos_eliminados.length > 0 && !isLoading">
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
                                            <p class="lead text-justify">{{ punto_eliminado.descripcion }}</p>
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
        
        </div>

        <ModalDetalle :data="detallePunto" :punto="no_punto" />
        <ModalPunto :title="title_modal" :modalEdit="modalEdit" :orden="ultimo_punto" :puntoAgenda="punto_agenda" editURL="editar_punto_agenda_sesion"></ModalPunto>

    </div>

    
</template>

<style scoped>
    .highlighted {
        background-color: #9AB6F1;
    }
    .my-handle {
        cursor: move;
        cursor: -webkit-grabbing;
    }
    .blue-background-class {
        opacity: 0.4;
    }
</style>

<script>

    import axios from 'axios'
    import CardDetalle from '@/components/DetalleAgenda/CardDetalle'
    import ModalDetalle from '@/components/PuntosAgenda/ModalDetalle'
    import ModalPunto from '@/components/PuntosAgenda/ModalPunto'
    import Sortable from 'sortablejs/modular/sortable.core.esm.js';

    export default {
        components: {
            CardDetalle,
            ModalDetalle,
            ModalPunto
        },
        data(){
            return{
                puntos: [],
                busqueda: '',
                detallePunto: {},
                no_punto: '',
                title_modal: null,
                ultimo_punto: null,
                punto_agenda: null,
                modalEdit: false,
                ordenando: false,
                list_variant: '',
                backupLista: null,
                lista_ordenada: null,
                isLoading: false
            }
        },
        methods: {
            obtenerDatos(){

                this.isLoading = !this.isLoading

                axios
                .get(process.env.VUE_APP_API_URL + 'puntos_agenda_sesion/' + this.$route.params.id)
                .then(response => {
                    this.puntos = response.data.puntos
                    this.puntos_eliminados = response.data.puntos_eliminados
                    this.isLoading = !this.isLoading
                })

            },
            async copiarPuntos(){

                let result = await Swal.fire({
                    title: '¿Está seguro?',
                    text: "Este proceso no se pude deshacer!",
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Si, COPIAR',
                    cancelButtonText: 'Cancelar',
                    showLoaderOnConfirm: true,
                    allowOutsideClick: false,
                    preConfirm: () => {
                        
                        let usuario = JSON.parse(localStorage.getItem('usuario'))

                        let data = {
                            id_agenda: this.$route.params.id,
                            id_usuario: usuario.id_persona
                        }

                        return axios
                        .post(process.env.VUE_APP_API_URL + 'copiar_puntos', data)
                        .then(response => {

                            console.log(response.data)

                            this.obtenerDatos()

                        })
                        .catch(error => {
                            
                        })

                    }
                })

                if (result.value) {
                    
                    Swal.fire(
                        'Excelente!',
                        'Los puntos de la agenda han sido copiados!',
                        'success'
                    )

                }
                


            },
            modalInfo(punto){

                axios({
                    method: 'GET',
                    url: process.env.VUE_APP_API_URL + 'bitacora_punto_agenda_sesion/' + punto.id,
                })
                .then(response => {

                    console.log(response.data)
                    this.detallePunto = response.data
                    this.no_punto = punto.orden
                    this.$bvModal.show('modal-detalle')
                    
                })
                .catch(error => {
                })

            },
            modalEditarPunto(punto){

                // console.log(this.puntos.indexOf(punto))

                this.title_modal = "Editar Punto de Agenda"
                this.modalEdit = true
                this.punto_agenda = punto
                this.ultimo_punto = parseInt(this.puntos.indexOf(punto) + 1)
                this.$bvModal.show('modal-punto')   
                  
            },
            ordenarLista(){

                this.backupLista = JSON.parse(JSON.stringify(this.puntos)) 

                if (!this.ordenando) {

                    this.ordenando = !this.ordenando

                    this.list_variant = 'secondary'

                    var el = document.getElementById('items');
                    var self = this

                    this.lista_ordenada = new Sortable(el, {
                        handle: ".my-handle",
                        animation: 150,
                        ghostClass: 'blue-background-class',

                        onEnd: function (evt) {
            
                            var f = self.puntos.splice(evt.oldIndex, 1)[0];
                            self.puntos.splice(evt.newIndex, 0, f);

                        },

                    });

                }else{

                    axios
                    .post(process.env.VUE_APP_API_URL + 'reordenar_puntos_sesion', this.puntos)
                    .then(response => {

                        Swal.fire(

                            'Excelente!',
                            'Se ha registrado el nuevo orden de los puntos de la agenda.',
                            'success'

                        ).then(() =>{

                            this.obtenerDatos()
                            this.ordenando = false
                            this.list_variant = ''
                            this.lista_ordenada.destroy()

                        })
                        
                    })

                }
                
            },
            cancelarOrdenar(){

                this.puntos = this.backupLista
            
                this.ordenando = false
                this.list_variant = ''
                this.lista_ordenada.destroy()

            },
            async eliminarPunto(id){

                const {value: accept}  = await Swal.fire({

                    title: '¿Está seguro?',
                    text: "Una vez eliminado no se podrá recuperar!",
                    input: 'textarea',
                    inputPlaceholder: 'Motivo de la eliminación',
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Si, ELIMINAR',
                    cancelButtonText: 'Cancelar',
                    inputValidator: (result) => {
                        return !result && 'Debe ingresar el motivo de la eliminación.'
                    }

                })
               
                if (accept) {

                    let usuario = JSON.parse(localStorage.getItem('usuario'))

                    let data = {
                        id_punto: id,
                        motivo: accept,
                        id_persona: usuario.id_persona
                    }

                    axios
                    .post(process.env.VUE_APP_API_URL + 'eliminar_punto_sesion', data)
                    .then(response => {

                        Swal.fire(

                            'Excelente!',
                            'El punto de agenda ha sido eliminado exitosamente.',
                            'success'

                        ).then(() =>{

                            this.obtenerDatos()

                        })

                    })
                }

            }
        },
        mounted(){

            this.obtenerDatos()

            this.$root.$on('obtenerPuntos', () => {
				this.obtenerDatos()
            })

        },
        computed: {
            puntosFiltrados: function(){

                if (!this.isLoading) {
                    
                    return this.puntos.filter(punto => {
                   
                        return punto.descripcion.toLowerCase().includes(this.busqueda.toLowerCase())

                    })

                }
                

            }
        }

    }
</script>