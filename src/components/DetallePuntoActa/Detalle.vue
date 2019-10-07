<template>

    <div>

        <div v-if="!isLoading">

            <b-card class="mb-3">
                <b-row>
                    <b-col>
                        <b-form-group
                            label="Agenda de Fecha"
                        >
                            <h5>{{ detalle_punto.agenda ? detalle_punto.agenda.fecha : 'Cargando...' }}</h5>
                        </b-form-group>
                    </b-col>
                    <b-col>
                        <b-form-group
                            label="Tipo de Sesión"
                        >
                            <h5>{{ detalle_punto.agenda ? detalle_punto.agenda.tipo_agenda.nombre : 'Cargando...' }}</h5>
                        </b-form-group>
                    </b-col>
                </b-row>
            </b-card>

            <b-card>
                <b-row>
                    <b-col cols="12">
                        <b-form-group label="Punto de Agenda" label-class="font-weight-bold">
                            <!-- <b-form-textarea v-model="detalle_punto.descripcion" disabled></b-form-textarea> -->
                            <p class="text-justify">{{ detalle_punto.descripcion }}</p>
                        </b-form-group>
                    </b-col>

                </b-row>

                <b-row v-if="detalle_punto_acta != null">

                    <b-col cols="12">
                        <b-form-group label="Punto de Acta" label-class="font-weight-bold">
                            <b-form-textarea rows="4" v-model="detalle_punto_acta.descripcion" :disabled="!isEditing"></b-form-textarea>
                        </b-form-group>
                    </b-col>

                    <b-col cols="4">

                        <b-button-group class="mr-2" v-if="isEditing">
                            <b-button variant="outline-success" :disabled="!isChange" @click="editarPuntoActa">
                                Guardar
                                <font-awesome-icon icon="save" />
                                <b-spinner v-if="isSaving" small class="ml-2"></b-spinner>
                            </b-button>
                            <b-button variant="outline-secondary" @click="cancelarEditar">
                                Cancelar
                                <font-awesome-icon icon="times-circle" />
                            </b-button>
                        </b-button-group>

                        <b-button class="mr-2" v-if="!isEditing" @click="editarPuntoActa" variant="outline-primary">Editar 
                            <font-awesome-icon icon="edit" />
                        </b-button>
                        <b-button variant="outline-info" v-b-modal.modal-bitacora>Bitácora 
                            <font-awesome-icon icon="list-alt" />
                        </b-button>
                    </b-col>
                    <b-col cols="8" class="text-right">
                        <b-button variant="outline-danger" @click="eliminarPunto">Eliminar 
                            <font-awesome-icon icon="trash-alt" />
                        </b-button>
                    </b-col>
                </b-row>

                <b-row align-h="center" v-if="!agregar_punto_acta && detalle_punto_acta == null">
                    <b-col cols="3">
                        <b-button variant="outline-success" @click="agregarPunto">Agregar Punto de Acta 
                            <font-awesome-icon icon="plus-circle" />
                        </b-button>
                    </b-col>
                </b-row>

                <b-form @submit.prevent="registrarPunto" v-if="agregar_punto_acta && detalle_punto_acta == null">
                    <b-row>

                            <b-col cols="12">
                                <b-form-group label="Punto de Acta" label-class="font-weight-bold">
                                    <b-form-textarea rows="4" v-model="descripcion" required></b-form-textarea>
                                </b-form-group>
                            </b-col>

                            <b-col cols="4">
                                <b-button type="submit" class="mr-2" variant="outline-success">Guardar 
                                    <font-awesome-icon icon="save" />
                                </b-button>
                                <b-button variant="outline-secondary" @click="cancelarRegistro">Cancelar
                                    <font-awesome-icon icon="times-circle" />
                                </b-button>
                            </b-col>
                        
                    </b-row>
                </b-form>

            </b-card>

            <div class="mt-3">
                <b-card no-body>
                    <b-tabs card>
                    <b-tab title="Documentos" active>
                        <Documentos :id_agenda="detalle_punto.agenda ? detalle_punto.agenda.id : null"/>
                    </b-tab>
                    <b-tab title="Audios">
                        <Audios :id_agenda="detalle_punto.agenda ? detalle_punto.agenda.id : null"/>
                    </b-tab>
                    </b-tabs>
                </b-card>
            </div>

            <ModalBitacora :id_punto_acta="detalle_punto_acta ? detalle_punto_acta.id : null" />

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

    </div>
</template>

<script>

    import axios from 'axios'
    import ModalBitacora from './ModalBitacora'
    import Documentos from './Documentos'
    import Audios from './Audios'

    export default {
        components: {
            ModalBitacora,
            Documentos,
            Audios
        },
        data(){
            return{
                detalle_punto: {},
                detalle_punto_acta: {},
                agregar_punto_acta: false,
                descripcion: '',
                isEditing: false,
                isSaving: false,
                isLoading: false,
                backup_punto_acta: '',
                id_agenda: null
            }
        },
        methods: {
            obtenerDetalle(){

                this.isLoading = !this.isLoading

                let data = {
                    id_acta: this.$route.params.id,
                    id_punto_agenda: this.$route.params.id_punto
                }

                axios({
                    method: 'POST',
                    url: process.env.VUE_APP_API_URL + 'detalle_punto_acta_agenda',
                    data: data
                })
                .then(response => {

                   console.log(response.data)
                   this.detalle_punto = response.data.punto_agenda
                   this.detalle_punto_acta = response.data.punto_acta
                   this.isLoading = !this.isLoading

                })
                .catch(error => {
                    console.log(error)
                })
            },
            agregarPunto(){
                this.agregar_punto_acta = true
            },
            registrarPunto(){

                let data = {
                    descripcion: this.descripcion,
                    id_acta: this.$route.params.id,
                    id_punto_agenda: this.$route.params.id_punto
                }

                axios({
                    method: 'POST',
                    url: process.env.VUE_APP_API_URL + 'registro_punto_acta',
                    data: data
                })
                .then(response => {
                   console.log(response.data)
                   Swal.fire(
                        'Excelente!',
                        'El punto de acta ha creado exitosamente!',
                        'success'
                    )
                   this.obtenerDetalle()
                })
                .catch(error => {
                    console.log(error)
                })

            },
            cancelarRegistro(){
                this.agregar_punto_acta = false
            },
            editarPuntoActa(){

                this.isEditing = !this.isEditing

                if (!this.isEditing) {

                    let data = {
                        descripcion: this.detalle_punto_acta.descripcion,
                        id: this.detalle_punto_acta.id,
                        id_acta: this.detalle_punto_acta.id_acta,
                        id_punto_agenda: this.detalle_punto_acta.id_punto,
                        original: this.backup_punto_acta
                    }

                    console.log(data)

                    axios({
                        method: 'POST',
                        url: process.env.VUE_APP_API_URL + 'editar_punto_acta',
                        data: data
                    })
                    .then(response => {

                        Swal.fire(
                            'Excelente!',
                            'El punto de acta ha sido editado exitosamente!',
                            'success'
                        )

                    })
                    .catch(error => {
                        console.log(error)
                    })

                }else{
                    this.backup_punto_acta = this.detalle_punto_acta.descripcion
                }

            },
            cancelarEditar(){

                this.isEditing = false
                this.detalle_punto_acta.descripcion = this.backup_punto_acta

            },
            eliminarPunto(){

                Swal.fire({
                    title: '¿Está seguro?',
                    text: "Una vez eliminado no se podrá recuperar!",
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Si, ELIMINAR',
                    cancelButtonText: 'Cancelar',
                    input: 'textarea',
                    inputPlaceholder: 'Ingrese la razón por la cual desea eliminar el punto de acta.'
                }).then((result) => {
                    
                    if (result.value != '' && !result.dismiss) {
                        
                        let data = {
                            id_punto_acta: this.detalle_punto_acta.id,
                            descripcion: this.detalle_punto_acta.descripcion,
                            motivo_eliminacion: result.value
                        }

                        axios({
                            method: 'POST',
                            url: process.env.VUE_APP_API_URL + 'eliminar_punto_acta',
                            data: data
                        })
                        .then(response => {
                            console.log(response.data)
                        })
                        .catch(error => {
                            console.log(error)
                        })

                    }else if(result.value == ''){

                        Swal.fire({
                            type: 'error',
                            title: 'Error',
                            text: 'Debe ingresar la razón de la eliminación!',
                        })

                    }

                })

            }
        },
        mounted(){
            this.obtenerDetalle()
        },
        computed: {
            isChange: function(){

                if (this.backup_punto_acta == this.detalle_punto_acta.descripcion) {
                    
                    return false

                }else{

                    return true
                }

            }
        }
    }
</script>