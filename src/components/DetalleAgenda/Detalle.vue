<template>
    <b-card>
        <b-row v-if="!isLoading">
            <b-col cols="4">
                <b-form-group
                    label="Número de Agenda"
                >
                    <b-form-input
                        v-model="agenda.no_agenda"
                        type="text"
                        required
                        disabled
                    ></b-form-input>
                </b-form-group>
            </b-col>
            <b-col cols="4">
                <b-form-group
                    label="Fecha"
                >
                    <date-picker v-model="agenda.fecha" :config="options_date" required disabled></date-picker>
                </b-form-group>
            </b-col>
            <b-col cols="4">
                <b-form-group
                    label="Tipo"
                >
                    <b-form-select v-model="agenda.id_tipo" :options="tipos_agenda" disabled></b-form-select>
                </b-form-group>
            </b-col>
        </b-row>

        <b-row>
            <b-col>
                <b-button variant="outline-primary">
                    <font-awesome-icon icon="edit" />
                </b-button>
                <b-button variant="outline-success" class="ml-2">
                    <font-awesome-icon icon="envelope" />
                </b-button>
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
        
    </b-card>    
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
                    { value: null, text: 'Please select an option' },
                    { value: 1, text: 'Ordinaria' },
                    { value: 2, text: 'Extraordinaria' },
                ],
                // agenda: {},
                // isLoading: false,
                options_date: {
                    format: 'DD/MM/YYYY',
                    useCurrent: true,
                    locale: 'es'
                } 
            }
        },
        props: {
            agenda: Object,
            isLoading: Boolean
        },
        methods: {
            async obtenerDetalle(){

                

            }
        },
        mounted(){
            
            console.log(this.agenda)

            this.obtenerDetalle()

        }
    }
</script>