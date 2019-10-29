<template>
    <div>
        <b-card class="mb-3">
            <b-row>
                <b-col cols="2">
                    <b-form-group label="Acta"></b-form-group>
                </b-col>
                <b-col cols="3">
                    <b-form-group
                        label="Agenda de Fecha"
                    >
                        <h5>{{ agenda.fecha ? agenda.fecha : 'Cargando...' }}</h5>
                    </b-form-group>
                </b-col>
                <b-col cols="3">
                    <b-form-group
                        label="Tipo de Sesión"
                    >
                        <h5>{{ agenda.tipo_agenda ? agenda.tipo_agenda.nombre : 'Cargando...' }}</h5>
                    </b-form-group>
                </b-col>
                <b-col cols="4">
                    <b-form-group label="Estado"></b-form-group>
                </b-col>
            </b-row>
        </b-card>
    </div>
</template>

<script>

    import axios from 'axios'

    export default {
        data(){
            return{
                agenda: {}
            }
        },
        methods: {
            obtenerDatos(){

            }
        },
        mounted(){
            this.obtenerDatos()
        }
    }
</script>