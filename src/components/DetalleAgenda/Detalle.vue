<template>
    <b-card>
        <b-row v-if="!isLoading">
            <!-- <b-col cols="2">
                <b-form-group
                    label="Número de Acta"
                >
                    <b-form-input
                        v-model="agenda.numero_acta"
                        type="number"
                        required
                        :disabled="!isEditing"
                    ></b-form-input>
                </b-form-group>
            </b-col>
            <b-col cols="2">
                <b-form-group
                    label="Año"
                >
                    <b-form-input
                        v-model="agenda.year"
                        type="number"
                        required
                        :disabled="!isEditing"
                    ></b-form-input>
                </b-form-group>
            </b-col> -->
            <b-col cols="4">
                <b-form-group
                    label="Fecha"
                >
                    <date-picker v-model="agenda.fecha" :config="options_date" required :disabled="!isEditing"></date-picker>
                </b-form-group>
            </b-col>
            <b-col cols="4">
                <b-form-group
                    label="Tipo de Sesión"
                >
                    <b-form-select v-model="agenda.id_tipo" :options="tipos_agenda" :disabled="!isEditing"></b-form-select>
                </b-form-group>
            </b-col>
            <b-col cols="4">
                <b-form-group label="Descripción">
                    <b-form-textarea v-model="agenda.descripcion" rows="3" max-rows="6" :disabled="!isEditing"></b-form-textarea>
                </b-form-group>
            </b-col>
        </b-row>

        <b-row class="mt-4">
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

                <b-button class="mr-2" variant="outline-primary" @click="editarActa" v-if="!isEditing && !isSaving">Editar 
                    <font-awesome-icon icon="edit" />
                </b-button>

                <b-button variant="outline-info">Bitácora 
                    <font-awesome-icon icon="list-alt" />
                </b-button>

                <!-- <b-button @click="sendMail" variant="outline-info" class="ml-2">
                    Enviar por Correo
                    <font-awesome-icon icon="envelope" />
                </b-button> -->
            </b-col>
            
            <b-col class="text-right">
                
                <b-form-group
                    id="fieldset-1"
                    label="Estado"
                    label-for="input-1"
                >
                    <b-badge :variant="agenda.estado.color" style="font-size: 0.9rem">{{ agenda.estado.nombre }} <font-awesome-icon :icon="agenda.estado.icono" /></b-badge>    
                </b-form-group>

                
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
        
        <ModalCorreo :destinos="destinos" />

    </b-card>    
</template>

<script>

    import axios from 'axios'
    import datePicker from 'vue-bootstrap-datetimepicker';
    import 'pc-bootstrap4-datetimepicker/build/css/bootstrap-datetimepicker.css';
    import ModalCorreo from '../DetalleAgenda/ModalCorreo'

    export default {
        components: {
            datePicker,
            ModalCorreo
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
                destinos: [] 
            }
        },
        props: {
            agenda: Object,
            isLoading: Boolean
        },
        methods: {
            editarActa(){
                
                this.isEditing = !this.isEditing

                if (!this.isEditing) {
                    
                    this.isSaving = !this.isSaving

                    axios({
                        method: 'POST',
                        url: process.env.VUE_APP_API_URL + 'editar_acta',
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

                    console.log(response.data)

                })

            },
            mostrarBitacora(){
                
            }
        },
        mounted(){
            
            console.log(this.agenda)

            // this.obtenerDetalle()

        }
    }
</script>