<template>
    <b-row v-if="!isLoading">
        <b-col>
            <b-card>
                <b-row>
                    <b-col cols="2">
                        <b-form-group label="No. Lote" label-class="font-weight-bold">
                            <b-form-input v-model="detalle.lote" disabled></b-form-input>
                        </b-form-group>
                    </b-col>
                    <b-col cols="2">
                        <b-form-group label="Inicia" label-class="font-weight-bold">
                            <b-form-input v-model="detalle.inicia" disabled></b-form-input>
                        </b-form-group>
                    </b-col>
                    <b-col cols="2">
                        <b-form-group label="Finaliza" label-class="font-weight-bold">
                            <b-form-input v-model="detalle.finaliza" disabled></b-form-input>
                        </b-form-group>
                    </b-col>
                    <b-col cols="3">
                        <b-form-group label="Fecha de Registro" label-class="font-weight-bold">
                            <b-form-input v-model="detalle.fecha" disabled></b-form-input>
                        </b-form-group>
                    </b-col>
                    <b-col cols="3">
                        <b-form-group label="Registrado Por" label-class="font-weight-bold">
                            <b-form-input v-if="detalle.persona" v-model="detalle.persona.usuario.usuario" disabled></b-form-input>
                        </b-form-group>
                    </b-col>
                    <b-col cols="4">
                        <b-form-group label="Observaciones" label-class="font-weight-bold">
                            <b-form-textarea v-model="detalle.observacion" disabled></b-form-textarea>
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
                detalle: {},
                isLoading: false
            }
        },
        methods: {
            obtenerDatos(){

                this.isLoading = !this.isLoading

                axios
                .get(process.env.VUE_APP_API_URL + 'detalle_lote/' + this.$route.params.id)
                .then(response => {
                    this.detalle = response.data
                    this.isLoading = !this.isLoading
                })
            }
        },
        mounted(){
            this.obtenerDatos()
        }
    }
</script>