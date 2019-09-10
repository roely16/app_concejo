<template>

    <b-modal id="modal-1" title="Nueva Agenda" hide-footer>
        <b-form @submit.prevent="guardarAgenda">
            <b-row>
                <b-col cols="12">
                    <b-form-group label="No. de Agenda">
                        <b-form-input type="text" v-model="nueva_agenda.no_agenda" autocomplete="off" required></b-form-input>
                    </b-form-group>
                </b-col>

                <b-col cols="12">
                    <b-form-group label="Fecha">
                        <!-- <b-form-input type="date" v-model="nueva_agenda.fecha" autocomplete="off" required></b-form-input> -->
                        <date-picker v-model="nueva_agenda.fecha" :config="options_date" required></date-picker>
                    </b-form-group>
                </b-col>

                <b-col cols="12">
                    <b-form-group label="Tipo">
                        <b-form-select v-model="nueva_agenda.id_tipo" :options="tipos_agenda" required></b-form-select>
                    </b-form-group>
                </b-col>
            </b-row>

            <b-row class="mt-4 text-center">
                <b-col>
                    <b-button size="lg" class="mr-2" variant="outline-danger">Cancelar 
                        <font-awesome-icon icon="times-circle" />
                    </b-button>
                    <b-button type="submit" size="lg" variant="outline-primary" :disabled="isSaving">Guardar 
                        <font-awesome-icon icon="save" />
                    </b-button>
                </b-col>
            </b-row>
        </b-form>
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
                    { value: null, text: '-- Seleccione un tipo de agenda --' },
                    { value: 1, text: 'Ordinaria' },
                    { value: 2, text: 'Extraordinaria' },
                ],
                nueva_agenda: {
                    no_agenda: null,
                    fecha: null,
                    id_tipo: null
                },
                isSaving: false,
                options_date: {
                    format: 'DD/MM/YYYY',
                    useCurrent: true,
                    locale: 'es'
                } 
            }
        },
        methods: {
            async guardarAgenda(){

                await axios({
                    method: 'POST',
                    url: process.env.VUE_APP_API_URL + 'agenda',
                    data: this.nueva_agenda
                })
                .then(response => {
                    console.log(response)
                    
                    Swal.fire(
                        'Good job!',
                        'You clicked the button!',
                        'success'
                    )

                    this.$root.$emit('obtenerAgendas')
                })
                .catch(error => {
                    console.log(error)
                })
                
            }
        }
    }
</script>