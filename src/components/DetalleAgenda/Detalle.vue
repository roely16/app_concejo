<template>

    <div>
        <!-- <b-alert :variant="estado.color" show>Estado: {{ estado.nombre }}</b-alert> -->
        <b-card>
            <b-row v-if="!isLoading">
               
               <b-col cols="1">
                    <b-form-group label="ID" label-class="font-weight-bold">
                        <b-form-input v-model="agenda.id" disabled></b-form-input>
                    </b-form-group>
                </b-col>
                <b-col cols="3">
                    <b-form-group label="Fecha" label-class="font-weight-bold">
                        <date-picker v-model="agenda.fecha" :config="options_date" required :disabled="!isEditing"></date-picker>
                    </b-form-group>
                </b-col>
                <b-col cols="4">
                    <b-form-group label="Tipo de Sesión" label-class="font-weight-bold">
                        <b-form-select v-model="agenda.id_tipo" :options="tipos_agenda" :disabled="!isEditing"></b-form-select>
                    </b-form-group>
                </b-col>
                <b-col cols="4">
                    <b-form-group label="Descripción" label-class="font-weight-bold">
                        <b-form-textarea v-model="agenda.descripcion" rows="3" max-rows="6" :disabled="!isEditing"></b-form-textarea>
                    </b-form-group>
                </b-col>
            </b-row>

            <b-row class="mt-4" v-if="!isLoading">
                <b-col>

                    <b-button-group class="mr-2" v-if="isEditing || isSaving">
                        <b-button variant="outline-success" :disabled="isSaving" @click="editarActa">
                            Guardar
                            <font-awesome-icon icon="save" />
                            <b-spinner v-if="isSaving" small class="ml-2"></b-spinner>
                        </b-button>
                        <b-button variant="outline-secondary" @click="cancelarEditar">
                            Cancelar
                            <font-awesome-icon icon="times-circle" />
                        </b-button>
                    </b-button-group>

                    <b-button class="mr-2" variant="outline-primary" @click="editarActa" v-if="!isEditing && !isSaving && agenda.bitacora" :disabled="agenda.bitacora.id_estado == 5">Editar 
                        <font-awesome-icon icon="edit" />
                    </b-button>

                    <b-button class="mr-2" variant="outline-info" v-b-modal.modal-bitacora>Historial 
                        <font-awesome-icon icon="list-alt" />
                    </b-button>

                    <b-button variant="outline-danger" v-if="agenda.asistencia_congelada == 'S' && agenda.bitacora.id_estado > 3" @click="finalizarAgenda" :disabled="agenda.bitacora.id_estado == 5">Finalizar 
                        <font-awesome-icon icon="calendar-check" />
                    </b-button>

                    <!-- <b-button @click="sendMail" variant="outline-info" class="ml-2">
                        Enviar por Correo
                        <font-awesome-icon icon="envelope" />
                    </b-button> -->
                </b-col>
                
                <!-- <b-col class="text-right">
                    
                    <b-form-group
                        id="fieldset-1"
                        label="Estado"
                        label-for="input-1"
                    >
                        <b-badge :variant="estado.color" style="font-size: 0.9rem">{{ estado.nombre }} <font-awesome-icon :icon="icono" /></b-badge>    
                    </b-form-group>

                    
                </b-col> -->

                <b-col cols="4">
                    <b-alert :variant=" agenda.bitacora ? agenda.bitacora.estado.color : 'secondary'" :class="agenda.bitacora ? agenda.bitacora.estado.color : 'secondary'" show>
                        <b-row>
                            <b-col cols="10">
                                <strong>Estado: </strong>{{ agenda.bitacora ? agenda.bitacora.estado.nombre : 'Cargando...' }}
                            </b-col>
                            <b-col cols="2">
                                <font-awesome-icon :icon="agenda.bitacora ? agenda.bitacora.estado.icono : 'check'" />
                            </b-col>
                        </b-row>
                    </b-alert>
                </b-col>

            </b-row>

            <b-row class="text-center" v-if="isLoading">
                <b-col>
                    <b-spinner class="align-middle"></b-spinner>
                    <div class="mt-2">
                        <strong>Cargando datos...</strong>
                    </div>
                </b-col>
            </b-row>
            
            <!-- <ModalCorreo :destinos="destinos" /> -->
            <ModalBitacora />

        </b-card>   
    </div>

</template>

<style scoped>

	.en_analisis{
		background-color: rgba(255, 174, 13, 0.7)
	}

</style>

<script>

    import axios from 'axios'
    import datePicker from 'vue-bootstrap-datetimepicker';
    import 'pc-bootstrap4-datetimepicker/build/css/bootstrap-datetimepicker.css';
    import ModalCorreo from '../DetalleAgenda/ModalCorreo'
    import ModalBitacora from './ModalBitacora'

    export default {
        components: {
            datePicker,
            ModalCorreo,
            ModalBitacora
        },
        data(){
            return{
                tipos_agenda: [
                    { value: null, text: '-- Seleccione un tipo de agenda --' },
                    { value: 1, text: 'Ordinaria' },
                    { value: 2, text: 'Extraordinaria' },
                ],
                // agenda: {},
                // isLoading: false,
                options_date: {
                    format: 'DD/MM/YYYY',
                    useCurrent: true,
                    locale: 'es'
                },
                isEditing: false,
                isSaving: false,
                destinos: [],
                agenda: {},
                estado: {},
                isLoading: false,
                icono: '' 
            }
        },
        props: {
            // agenda: {
            //     type: Object,
            //     default: {}
            // },
            // isLoading: Boolean
        },
        methods: {
            obtenerDetalle(){
                let id_agenda = this.$route.params.id

                this.isLoading = !this.isLoading

                axios({
                    method: 'GET',
                    url: process.env.VUE_APP_API_URL + 'detalle_agenda/' + id_agenda,
                })
                .then(response => {

                    // this.icono = response.data.estado.icono
                    this.agenda = response.data
                    // this.estado = response.data.estado
                    
                    this.no_agenda = this.agenda.no_agenda
                    this.isLoading = !this.isLoading
                    
                })
                .catch(error => {
                    console.log(error)
                })
            },
            editarActa(){
                
                this.isEditing = !this.isEditing

                if (!this.isEditing) {
                    
                    this.isSaving = !this.isSaving

                    axios({
                        method: 'POST',
                        url: process.env.VUE_APP_API_URL + 'editar_agenda',
                        data: this.agenda
                    })
                    .then(response => {

                        this.isSaving = !this.isSaving

                        if (response.data.code) {
                            
                            this.isEditing = true

                            Swal.fire({
                                type: 'error',
                                title: 'Error ' + response.data.codigo_error,
                                text: response.data.message,
                            })

                        }else{

                            Swal.fire(
                                'Excelente!',
                                'Los datos del acta han sido editados exitosamente!',
                                'success'
                            )
                        }

                    })
                    .catch(error => {
                        console.log(error)
                    })

                }

            },
            cancelarEditar(){
                this.isEditing = false
            },
            sendMail(){

                axios({
                    method: 'GET',
                    url: process.env.VUE_APP_API_URL + 'personas_correo',
                })
                .then(response => {

                    this.destinos = response.data
                    this.$bvModal.show('modal-correo')

                })

            },
            mostrarBitacora(){
                
            },
            finalizarAgenda(){

                Swal.fire({

                    title: '¿Está seguro?',
                    text: "Esto no se podrá revertir, una vez finalizada no se podrá editar ningun dato de la agenda!",
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Si, FINALIZAR',
                    cancelButtonText: 'Cancelar'

                }).then((result) => {

                    if (result.value) {

                        let usuario = JSON.parse(localStorage.getItem('usuario'))

                        let data = {
                            id_agenda: this.$route.params.id,
                            id_usuario: usuario.id_persona
                        }

                        axios
                        .post( process.env.VUE_APP_API_URL + 'finalizar_agenda', data)
                        .then(response => {

                            Swal.fire(
                                'Excelente!',
                                'La agenda ha sido finalizada exitosamente.',
                                'success'
                            ).then(() =>{
                                this.obtenerDetalle()
                            })

                        })
                        
                    }

                })

            }

        },
        mounted(){
            
            this.obtenerDetalle()

        }
    }
</script>