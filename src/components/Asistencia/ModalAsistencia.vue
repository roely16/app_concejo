<template>
    <b-modal id="modal-asistencia" :title="tipo == 1 ? 'Llegada Tarde' : 'Ausencia'" hide-footer>

        <b-form @submit.prevent="registrarAsistencia">

            <b-row v-if="tipo">

                <b-col cols="12" class="mb-4">
                    <p style="padding-bottom: 0; margin-bottom: 0"><strong>{{ persona.persona[0].nombre + ' ' + persona.persona[0].apellido }}</strong></p>
                    <p class="font-weight-light" style="margin: 0; padding: 0">{{ persona.nombre }}</p>
                </b-col>

                <b-col cols="12" v-if="tipo == 1">
                    <b-form-group label="Hora">
                        <!-- <b-form-input type="time" v-model="hora" required></b-form-input> -->
                        <vue-timepicker v-model="hora"></vue-timepicker>
                    </b-form-group>
                </b-col>
                <b-col cols="12">
                    <b-form-group label="Motivo">
                        <b-form-textarea id="textarea" rows="6" max-rows="6" v-model="motivo" required></b-form-textarea>
                    </b-form-group>
                </b-col>
            </b-row>

            <b-row class="mt-4 text-center">
                <b-col>
                    <b-button size="lg" class="mr-2" variant="outline-danger" @click="cerrarModal">Cancelar 
                        <font-awesome-icon icon="times-circle" />
                    </b-button>
                    <b-button type="submit" size="lg" variant="outline-primary" :disabled="!tipo">Guardar 
                        <font-awesome-icon icon="save" />
                    </b-button>
                </b-col>
            </b-row>
        </b-form>

    </b-modal>
</template>

<script>

    import axios from 'axios'
    import VueTimepicker from 'vue2-timepicker/src/vue-timepicker.vue'

    export default {
        components: {
            VueTimepicker 
        },
        props: {
            persona: {
                type: Object,
                default: null
            },
            tipo: {
                type: Number,
                default: null
            }
        },
        data(){
            return{
                options: [
                    { value: null, text: '-- Seleccione una opción --' },
                    { value: 1, text: 'Llegada tarde' },
                    { value: 2, text: 'Ausencia' },
                ],
                // tipo: null,
                hora: null,
                motivo: null
            }
        },
        methods: {
            cerrarModal(){

                this.$bvModal.hide('modal-asistencia')

            },
            registrarAsistencia(){

                let data = {}

                if (this.tipo == 1) {
                    
                    data = {
                        tipo: this.tipo,
                        hora: this.hora,
                        motivo: this.motivo,
                        id_persona: this.persona.persona[0].id,
                        id_agenda: this.$route.params.id,
                        asistencia: this.persona.asistencia
                    }

                }else{

                    data = {
                        tipo: this.tipo,
                        motivo: this.motivo,
                        id_persona: this.persona.persona[0].id,
                        id_agenda: this.$route.params.id,
                        asistencia: this.persona.asistencia
                    }

                }

                console.log(data)

                axios({
                    method: 'POST',
                    url: process.env.VUE_APP_API_URL + 'registrar_asistencia_especial',
                    data: data
                })
                .then(response => {
                    console.log(response.data)

                    this.$root.$emit('obtenerAsistencia')

                    Swal.fire(
                        'Excelente!',
                        'Se ha registrado la asistencia con éxito.',
                        'success'
                    ).then(() =>{
                        this.$bvModal.hide('modal-asistencia')
                    })
                })
                .catch(error => {
                    console.log(error)
                })

            },
        },
        mounted(){

            this.$root.$on('bv::modal::show', (bvEvent, modalId) => {

                this.hora = null
                this.motivo = null

            })

        }
    }
</script>