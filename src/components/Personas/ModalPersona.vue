<template>
    <b-modal id="modal-persona" title="Nueva Persona" hide-footer>

        <b-form @submit.prevent="registrarPersona">
            <b-row>
                <b-col cols="6">
                    <b-form-group label="Nombre">
                        <b-form-input v-model="persona.nombre" type="text" required></b-form-input>
                    </b-form-group>
                </b-col>
                <b-col cols="6">
                    <b-form-group label="Apellido">
                        <b-form-input v-model="persona.apellido" type="text" required></b-form-input>
                    </b-form-group>
                </b-col>
                <b-col cols="12">
                    <b-form-group label="Email">
                        <b-form-input v-model="persona.email" type="email" required></b-form-input>
                    </b-form-group>
                </b-col>
                <b-col cols="12">
                    <b-form-group label="Rol">
                        <b-form-select v-model="persona.rol" :options="roles" required></b-form-select>
                    </b-form-group>
                </b-col>
            </b-row>

            <b-row class="mt-4 text-center">
                <b-col>
                    <b-button @click="cancelarModal" size="lg" class="mr-2" variant="outline-danger">Cancelar 
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
        props: {
            roles: {
                type: Array,
                required: true,
                default: {}
            }
        },
        data(){
            return{
                options: [
                    { value: null, text: 'Please select an option' },
                    { value: 'a', text: 'This is First option' },
                    { value: 'b', text: 'Selected Option' },
                    { value: { C: '3PO' }, text: 'This is an option with object value' },
                    { value: 'd', text: 'This one is disabled', disabled: true }
                ],
                persona: {
                    nombre: null,
                    apellido: null,
                    email: null,
                    rol: null
                },
                isSaving: false
            }
        },
        methods: {
            cancelarModal(){
                this.$bvModal.hide('modal-persona')
            },
            registrarPersona(){
                
                axios({
                    method: 'POST',
                    url: process.env.VUE_APP_API_URL + 'registrar_persona',
                    data: this.persona
                })
                .then(response => {
                    console.log(response.data)
                })
                .catch(error => {
                    console.log(error)
                })

            },
            resetModal(){
                this.persona = {
                    nombre: null,
                    apellido: null,
                    email: null,
                    rol: null
                }
            }
        },
        mounted(){

            this.$root.$on('bv::modal::show', (bvEvent, modalId) => {

                this.resetModal()

            })

        }
    }
</script>