<template>

    <div v-if="!isLoading">

        <b-card class="mb-4"></b-card>

        <b-list-group>
            <b-list-group-item :to="{ name: 'detalle_punto_acta', params: {id_punto: punto.id}}" class="mb-2" v-for="(punto, key) in puntos" :key="punto.id" variant="secondary">
                <b-row>
                    <b-col cols="1">
                        <p class="lead text-justify"><strong>{{ ++key }}.</strong> </p>
                    </b-col>
                    <b-col cols="11">
                        <p class="lead text-justify">{{ punto.descripcion }}</p>
                    </b-col>
                    <!-- <b-col cols="2" class="text-right">
                        
                        <b-button size="sm" class="mr-1" variant="outline-secondary" @click="modalInfo(punto)">
                            <font-awesome-icon icon="info-circle" />
                        </b-button>

                        <b-button size="sm" class="mr-1" variant="outline-primary" @click="modalEditarPunto(punto)">
                            <font-awesome-icon icon="edit" />
                        </b-button>

                        <b-button size="sm" variant="outline-danger" @click="eliminarPunto(punto.id)">
                            <font-awesome-icon icon="trash-alt" />
                        </b-button>
                    </b-col> -->
                </b-row>

            </b-list-group-item>
        </b-list-group>
        </div>

</template>

<script>

    import axios from 'axios'

    export default {
        data(){

            return{
                puntos: [],
                isLoading: false
            }

        },
        methods: {
            obtenerPuntos(){

                axios({
                    method: 'GET',
                    url: process.env.VUE_APP_API_URL + 'puntos_agenda_acta/' + this.$route.params.id,
                })
                .then(response => {
                   console.log(response.data)
                   this.puntos = response.data.agenda.puntos_agenda
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