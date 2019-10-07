<template>
    <div>
        <div class="mt-4">
            <b-breadcrumb :items="items"></b-breadcrumb>
        </div>

        <Lista>
            <template v-slot>
                <b-row class="mb-3">
                    <b-col>
                        <b-card>
                            <b-row>
                                <b-col>
                                    <b-form-group
                                        label="Fecha"
                                    >
                                        <h5>{{ detalle_agenda.fecha }}</h5>
                                    </b-form-group>
                                </b-col>
                                <b-col>
                                    <b-form-group
                                        label="Tipo de Sesión"
                                    >
                                        <h5>{{ detalle_agenda.tipo_agenda ? detalle_agenda.tipo_agenda.nombre : 'Cargando...' }}</h5>
                                    </b-form-group>
                                </b-col>
                            </b-row>
                        </b-card>
                    </b-col>
                </b-row>
            </template>
        </Lista>

    </div>    
</template>

<style scoped>
    .card-body{
        padding-bottom: 0.1rem 
    }
</style>

<script>

    import Lista from '../components/Audios/Lista'
    import axios from 'axios'

    export default {
        components: {
            Lista
        },
        data(){
            return{
                items: [
                    {
                        text: 'Inicio',
                        href: '#/home'
                    },
                    {
                        text: 'Agendas',
                        href: '#/home/agenda'

                    },
                    {
                        text: 'Detalle de Agenda ',
                        href: '#/home/agenda/detalle/' + this.$route.params.id
                    },
                    {
                        text: 'Audios',
                        active: true
                    }
                ],
                detalle_agenda: {}
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