<template>
    <div>
        <b-card>
            <b-row>
                <b-col cols="12">
                    <b-form-group label="Punto de Agenda" label-class="font-weight-bold">
                        <!-- <b-form-textarea v-model="detalle_punto.descripcion" disabled></b-form-textarea> -->
                        <p class="text-justify">{{ detalle_punto.descripcion }}</p>
                    </b-form-group>
                </b-col>

                <b-col cols="12">
                    <b-form-group label="Punto de Acta" label-class="font-weight-bold">
                        <b-form-textarea rows="4" v-model="detalle_punto.agenda"></b-form-textarea>
                    </b-form-group>
                </b-col>

            </b-row>

            <b-row>
                <b-col cols="4">
                    <b-button class="mr-2" variant="outline-success">Guardar Cambios 
                        <font-awesome-icon icon="save" />
                    </b-button>
                    <b-button variant="outline-info">Bitácora</b-button>
                </b-col>
                <b-col cols="8" class="text-right">
                    <b-button variant="outline-danger">Eliminar 
                        <font-awesome-icon icon="trash-alt" />
                    </b-button>
                </b-col>
            </b-row>

        </b-card>

        <div class="mt-4">
            <b-card no-body>
                <b-tabs card>
                <b-tab title="Documentos" active>
                    <b-card-text>Documentos</b-card-text>
                </b-tab>
                <b-tab title="Audios">
                    <b-card-text>Audios</b-card-text>
                </b-tab>
                </b-tabs>
            </b-card>
        </div>
    </div>
</template>

<script>

    import axios from 'axios'

    export default {
        data(){
            return{
                detalle_punto: {}
            }
        },
        methods: {
            obtenerDetalle(){

                let data = {
                    id_acta: this.$route.params.id,
                    id_punto_agenda: this.$route.params.id_punto
                }

                axios({
                    method: 'POST',
                    url: process.env.VUE_APP_API_URL + 'detalle_punto_acta_agenda',
                    data: data
                })
                .then(response => {
                   console.log(response.data)
                   this.detalle_punto = response.data.punto_agenda
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