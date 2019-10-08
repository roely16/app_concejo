<template>

    <b-modal id="modal-nueva-acta" title="Nueva Agenda" hide-footer>

        <b-form @submit.prevent="guardarAgenda" v-if="!isLoading">
            <b-row>
                <!-- <b-col cols="6">
                    <b-form-group label="No. de Acta">
                        <b-input-group>
                            <template v-slot:append>
                                <b-input-group>
                                    <b-button v-on:click="editarNoActa" variant="outline-primary"><font-awesome-icon icon="edit" /></b-button>
                                </b-input-group>
                            </template>
                            <b-form-input type="number" v-model="nueva_agenda.no_agenda" autocomplete="off" :disabled="!editNoActa" required></b-form-input>
                        </b-input-group>
                    </b-form-group>
                </b-col>

                <b-col cols="6">
                    <b-form-group label="Año">
                        <b-input-group>
                            <template v-slot:append>
                                <b-input-group>
                                    <b-button v-on:click="editarYearActa" variant="outline-primary"><font-awesome-icon icon="edit" /></b-button>
                                </b-input-group>
                            </template>
                            <b-form-input type="text" v-model="nueva_agenda.year" autocomplete="off" :disabled="!editYearActa" required></b-form-input>
                        </b-input-group>
                    </b-form-group>
                </b-col> -->

                <b-col cols="12">
                    <b-form-group label="Fecha">
                        <!-- <b-form-input type="date" v-model="nueva_agenda.fecha" autocomplete="off" required></b-form-input> -->
                        <date-picker v-model="nueva_agenda.fecha" :config="options_date" required></date-picker>
                    </b-form-group>
                </b-col>

                <b-col cols="12">
                    <b-form-group label="Tipo de Sesión">
                        <b-form-select v-model="nueva_agenda.id_tipo" :options="tipos_agenda" required></b-form-select>
                    </b-form-group>
                </b-col>

                <b-col cols="12">
                    <b-form-group label="Descripción">
                        <b-form-textarea v-model="nueva_agenda.descripcion" rows="6" max-rows="6"></b-form-textarea>
                    </b-form-group>
                </b-col>

            </b-row>

            <b-row class="mt-4 text-center">
                <b-col>
                    <b-button @click="cerrarModal" size="lg" class="mr-2" variant="outline-danger">Cancelar 
                        <font-awesome-icon icon="times-circle" />
                    </b-button>
                    <b-button type="submit" size="lg" variant="outline-primary" :disabled="isSaving">Guardar 
                        <font-awesome-icon icon="save" />
                    </b-button>
                </b-col>
            </b-row>
        </b-form>

        
        <div class="text-center my-2" v-if="isLoading">
            <b-spinner class="align-middle"></b-spinner>
            <div class="mt-2">
                <strong>Cargando datos...</strong>
            </div>
        </div>

    </b-modal>

</template>

<script>

    import axios from 'axios'
    import datePicker from 'vue-bootstrap-datetimepicker';
    import 'pc-bootstrap4-datetimepicker/build/css/bootstrap-datetimepicker.css';

    export default {
        components: {
            datePicker
        },
        data(){
            return{
                tipos_agenda: [
                    { value: null, text: '-- Seleccione un tipo --' },
                    { value: 1, text: 'Ordinaria' },
                    { value: 2, text: 'Extraordinaria' },
                ],
                nueva_agenda: {
                    no_agenda: null,
                    year: null,
                    fecha: null,
                    id_tipo: null,
                    descripcion: null
                },
                isSaving: false,
                options_date: {
                    format: 'DD/MM/YYYY',
                    useCurrent: true,
                    locale: 'es'
                },
                isLoading: false,
                editNoActa: false,
                editYearActa: false 
            }
        },
        methods: {
            guardarAgenda(){

                let usuario = JSON.parse(localStorage.getItem('usuario'))
                this.nueva_agenda.id_usuario = usuario.id_persona

                axios({
                    method: 'POST',
                    url: process.env.VUE_APP_API_URL + 'registrar_agenda',
                    data: this.nueva_agenda
                })
                .then(response => {
                   
                    console.log(response.data)

                    Swal.fire(
                        'Excelente!',
                        'La agenda ha sido creada exitosamente!',
                        'success'
                    ).then( () =>{
                        this.$bvModal.hide('modal-nueva-acta')
                    })

                    this.$root.$emit('obtenerAgendas')
                })
                .catch(error => {
                    console.log(error)
                })
                
            },
            editarNoActa(){
                this.editNoActa = !this.editNoActa
            },
            editarYearActa(){
                this.editYearActa = !this.editYearActa
            },
            cerrarModal(){
                this.$bvModal.hide('modal-nueva-acta')
            },
            resetModal(){
                this.nueva_agenda.no_agenda = null
                this.nueva_agenda.year = null
                this.nueva_agenda.fecha = null
                this.nueva_agenda.id_tipo = null
                this.nueva_agenda.descripcion = null
            }
        },
        mounted(){

            this.$root.$on('bv::modal::show', (bvEvent, modalId) => {

                this.resetModal()
                // this.isLoading = !this.isLoading

                // Realiza la petición para obtener los tipos de actas y el correlativo correspondiente

                // axios({
                //     method: 'GET',
                //     url: process.env.VUE_APP_API_URL + 'datos_modal_acta',
                // })
                // .then(response => {
                    
                //     this.isLoading = !this.isLoading
                //     this.nueva_agenda.no_agenda = response.data.numero_acta.numero
                //     this.nueva_agenda.year = response.data.numero_acta.year
                    
                // })
                // .catch(error => {
                //     console.log(error)
                // })

            })
            
        }
    }
</script>