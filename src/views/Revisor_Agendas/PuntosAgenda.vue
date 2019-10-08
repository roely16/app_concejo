<template>
    <div>
        <div class="mt-4">
            <b-breadcrumb :items="items" v-if="!isLoading"></b-breadcrumb>
        </div>

        <Listado>
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
        </Listado>
    </div>
</template>

<style scoped>
    .card-body{
        padding-bottom: 0.1rem 
    }
</style>

<script>

    import Listado from '@/components/Revisor_Agendas/Agenda/PuntosAgenda/Listado'
    import axios from 'axios'

    export default {
        components: {
            Listado
        },
        data() {
            return {
                items: [
                    {
                        text: 'Inicio',
                        href: '#/home'
                    },
                    {
                        text: 'Agendas',
                        href: '#/home/agendas_analisis'
                    },
                    {
                        // text: 'Detalle de ' + this.no_acta,
                        text: 'Detalle de Agenda',
                        href: '#/home/agendas_analisis/detalle/' + this.$route.params.id
                    },
                    {
                        text: 'Puntos de Agenda',
                        active: true
                    }
                ],
                isLoading: false,
                detalle_agenda: {}
            }
        },
        mounted(){
            this.getData()
        },
        methods: {
            getData(){

                this.isLoading = !this.isLoading

                axios({

                    method: 'GET',
                    url: process.env.VUE_APP_API_URL + 'detalle_agenda/' + this.$route.params.id,

                })
                .then(response => {

                    console.log(response.data)

                    // this.items[2].text = "Detalle de Acta " + response.data.numero_acta + ' - ' + response.data.year

                    this.isLoading = !this.isLoading
                    this.detalle_agenda = response.data

                })
                .catch(error => {
                    console.log(error)
                })

            }
        }
    }
</script>