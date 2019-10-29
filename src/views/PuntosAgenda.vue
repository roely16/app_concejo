<template>
    <div>
        <div class="mt-4">
            <b-breadcrumb :items="items" v-if="!isLoading"></b-breadcrumb>
        </div>

        <Listado :data="detalle_agenda">
            <template v-slot>
                <b-row class="mb-3">
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
                                    <b-form-group
                                        label="Estado"
                                    >   
                                        <h5>
                                            <b-badge :variant="detalle_agenda.bitacora ? detalle_agenda.bitacora.estado.color : 'secondary'">{{ detalle_agenda.bitacora ? detalle_agenda.bitacora.estado.nombre : 'Cargando...' }} 
                                                <font-awesome-icon :icon="detalle_agenda.bitacora ? detalle_agenda.bitacora.estado.icono : 'eye'" />
                                            </b-badge>
                                        </h5>
                                        <!-- <h5>{{ detalle_agenda.tipo_agenda ? detalle_agenda.tipo_agenda.nombre : 'Cargando...' }}</h5> -->
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
    .en_analisis{
		background-color: #ffae0d 
	}
</style>

<script>

    import Listado from '../components/PuntosAgenda/Listado'
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
                        href: '#/home/agenda'
                    },
                    {
                        // text: 'Detalle de ' + this.no_acta,
                        text: 'Detalle de Agenda',
                        href: '#/home/agenda/detalle/' + this.$route.params.id
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

            this.$root.$on('obtenerDetalleAgenda', () => {
                this.getData()
            })
        },
        methods: {
            getData(){

                this.isLoading = !this.isLoading

                axios({

                    method: 'GET',
                    url: process.env.VUE_APP_API_URL + 'detalle_agenda/' + this.$route.params.id,

                })
                .then(response => {

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