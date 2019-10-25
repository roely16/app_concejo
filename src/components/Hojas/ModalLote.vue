<template>
    <b-modal id="modal-lote" title="Nuevo Lote" @shown="show" hide-footer>
        <b-form @submit.prevent="registrarLote">
            <b-row>
                <b-col cols="6">
                    <b-form-group label="No. de Lote" label-class="font-weight-bold">
                        <b-form-input v-model="lote.lote" autocomplete="off" required></b-form-input>
                    </b-form-group>
                </b-col>
            </b-row>
            <b-row>
                <b-col cols="6">
                    <b-form-group label="Primera Página" label-class="font-weight-bold">
                        <b-form-input v-model="lote.inicia" type="number" autocomplete="off" required></b-form-input>
                    </b-form-group>
                </b-col>
                <b-col cols="6">
                    <b-form-group label="Última Página" label-class="font-weight-bold">
                        <b-form-input v-model="lote.finaliza" type="number" autocomplete="off" required></b-form-input>
                    </b-form-group>
                </b-col>
                <b-col cols="12">
                    <b-form-group label="Observaciones" label-class="font-weight-bold">
                        <b-form-textarea v-model="lote.observacion" rows="4" autocomplete="off"></b-form-textarea>
                    </b-form-group>
                </b-col>
            </b-row>

            <b-row class="mt-4 text-center">
                <b-col>
                    <b-button @click="cerrarModal" size="lg" class="mr-2" variant="outline-danger">Cancelar 
                        <font-awesome-icon icon="times-circle" />
                    </b-button>
                    <b-button type="submit" size="lg" variant="outline-primary" :disabled="isSaving">Guardar 
                        <font-awesome-icon icon="save" />
                    </b-button>
                </b-col>
            </b-row>

        </b-form>

    </b-modal>
</template>

<script>

    import axios from 'axios'

    export default {
        data(){
            return{
                isSaving: false,
                lote: {
                    lote: null,
                    inicia: null,
                    finaliza: null,
                    observacion: null,
                    fecha: null,
                    id_usuario: null
                }
            }
        },
        methods: {
            show(){

                this.lote.lote = null
                this.lote.inicia = null
                this.lote.finaliza = null
                this.lote.observacion = null

            },
            cerrarModal(){
                this.$bvModal.hide('modal-lote')
            },
            registrarLote(){

                let inicia = parseInt(this.lote.inicia)
                let finaliza = parseInt(this.lote.finaliza)

                if (inicia >= finaliza) {
                    
                    Swal.fire({
                        type: 'error',
                        title: 'Error...',
                        text: 'La última página debe ser mayor a la primera!',
                    })

                }else{

                    let usuario = JSON.parse(localStorage.getItem('usuario'))
                    this.lote.id_usuario = usuario.id_persona

                    axios
                    .post( process.env.VUE_APP_API_URL + 'registro_lote', this.lote)
                    .then(response => {

                        Swal.fire(
                            'Excelente!',
                            'El lote ha sido registrado exitosamente!',
                            'success'
                        ).then(() => {

                            this.$root.$emit('obtenerLotes')

                            this.$bvModal.hide('modal-lote')
                        })

                    })

                }
            }
        },
    }
</script>