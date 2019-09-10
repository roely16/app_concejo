<template>
    <b-modal id="modal-punto" :title="title" hide-footer>
        <b-form @submit.prevent="registrarPunto">

            <b-form-group
                label="Orden:"
            >
                <b-form-input
                    v-model="orden"
                    type="text"
                    disabled
                    required
                ></b-form-input>
            </b-form-group>

            <b-form-group
                label="Descripción"
            >
                <b-form-textarea  
                    rows="5"
                    v-model="descripcion"
                    required
                ></b-form-textarea>
            </b-form-group>

            <b-row class="mt-4 text-center">
                <b-col>
                    <b-button size="lg" class="mr-2" variant="outline-danger">Cancelar 
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
        props:{
            title: String,
            orden: Number
        },
        data(){
            return{
                isSaving: false,
                descripcion: '',
            }
        },
        methods: {
            async registrarPunto(){

                let nuevo_punto = {
                    descripcion: this.descripcion,
                    id_agenda: this.$route.params.id,
                    orden: this.orden
                }

                await axios({
                    method: 'POST',
                    url: 'https://udicat.muniguate.com/apps/api_consejo/public/api/registrar_punto_agenda',
                    data: nuevo_punto
                })
                .then(response => {
                    
                    console.log(response)
                    this.$root.$emit('obtenerPuntos')

                })
                .catch(error => {
                    console.log(error)
                })

            }
        },
        mounted(){

            this.$root.$on('bv::modal::show', (bvEvent, modalId) => {
                this.descripcion = ''
            })

        }
    }
</script>