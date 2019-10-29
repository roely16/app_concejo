<template>
    <b-row class="mb-3" v-if="!isLoading">
        <b-col>
            <b-card>
                <b-row>
                    <b-col cols="2">
                        <b-form-group label="ID">
                            <h5>{{ detalle_agenda.id }}</h5>
                        </b-form-group>
                    </b-col>
                    <b-col cols="3">
                        <b-form-group
                            label="Fecha"
                        >
                            <h5>{{ detalle_agenda.fecha }}</h5>
                        </b-form-group>
                    </b-col>
                    <b-col cols="3">
                        <b-form-group
                            label="Tipo de Sesión"
                        >
                            <h5>{{ detalle_agenda.tipo_agenda ? detalle_agenda.tipo_agenda.nombre : 'Cargando...' }}</h5>
                        </b-form-group>
                    </b-col>
                    <b-col cols="4">
                        <b-form-group label="Estado">   
                            <h5>
                                <b-badge :variant="detalle_agenda.bitacora ? detalle_agenda.bitacora.estado.color : 'secondary'">{{ detalle_agenda.bitacora ? detalle_agenda.bitacora.estado.nombre : 'Cargando...' }} 
                                    <font-awesome-icon :icon="detalle_agenda.bitacora ? detalle_agenda.bitacora.estado.icono : 'eye'" />
                                </b-badge>
                            </h5>
                        </b-form-group>
                    </b-col>
                </b-row>
            </b-card>
        </b-col>
    </b-row>
</template>

<script>

    import axios from 'axios'

    export default {
        data(){

            return{
                detalle_agenda: {},
                isLoading: false
            }

        },
        methods: {

            obtenerDetalle(){

                axios({

                    method: 'GET',
                    url: process.env.VUE_APP_API_URL + 'detalle_agenda/' + this.$route.params.id,

                })
                .then(response => {

                    this.detalle_agenda = response.data

                })
                .catch(error => {
                    console.log(error)
                })

            }

        },
        mounted(){

            this.obtenerDetalle()

        }
    }
</script>