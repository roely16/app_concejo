<template>

    <div>
        <div v-if="!isLoading">

            <b-card class="mb-3">
                <b-row>
                    <b-col>
                        <b-form-group
                            label="Agenda de Fecha"
                        >
                            <h5>{{ agenda.fecha ? agenda.fecha : 'Cargando...' }}</h5>
                        </b-form-group>
                    </b-col>
                    <b-col>
                        <b-form-group
                            label="Tipo de Sesión"
                        >
                            <h5>{{ agenda.tipo_agenda ? agenda.tipo_agenda.nombre : 'Cargando...' }}</h5>
                        </b-form-group>
                    </b-col>
                </b-row>
            </b-card>

            <b-row class="mb-3">
                <b-col>
                    <h3>Puntos de Agenda</h3>
                </b-col>
            </b-row>

            <b-list-group>
                <b-list-group-item :to="{ name: 'detalle_punto_acta', params: {id_punto: punto.id}}" class="mb-2" v-for="(punto, key) in puntos" :key="punto.id" variant="secondary">
                    <b-row>
                        <b-col cols="1">
                            <p class="lead text-justify"><strong>{{ ++key }}.</strong> </p>
                        </b-col>
                        <b-col cols="11">
                            <p class="lead text-justify">{{ punto.descripcion }}</p>
                        </b-col>
                    </b-row>

                </b-list-group-item>
            </b-list-group>
        </div>

        <div v-if="isLoading">
            <b-row>
                <b-col>
                    <div class="text-center my-2">
                        <b-spinner class="align-middle"></b-spinner>
                        <div class="mt-2">
                        <strong>Cargando datos...</strong>
                        </div>
                    </div>
                </b-col>
            </b-row>
        </div>
    </div>

</template>

<script>

    import axios from 'axios'

    export default {
        data(){

            return{
                puntos: [],
                agenda: {},
                isLoading: false
            }

        },
        methods: {
            obtenerPuntos(){

                this.isLoading = !this.isLoading

                axios({
                    method: 'GET',
                    url: process.env.VUE_APP_API_URL + 'puntos_agenda_acta/' + this.$route.params.id,
                })
                .then(response => {
                   this.puntos = response.data.agenda.puntos_agenda
                   this.agenda = response.data.agenda
                   this.isLoading = !this.isLoading
                })
                .catch(error => {
                    console.log(error)
                })

            }
        },
        mounted(){
            this.obtenerPuntos()
        }
    }
</script>