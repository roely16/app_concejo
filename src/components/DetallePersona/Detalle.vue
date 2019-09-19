<template>
    <b-card>
        <b-form @submit.prevent="editarPersona">
            <b-row>
                <b-col cols="4">
                    <b-form-group label="Nombre">
                        <b-form-input type="text" :disabled="!enabledEdit" v-model="persona.nombre" required></b-form-input>
                    </b-form-group>
                </b-col>
                <b-col cols="4">
                    <b-form-group label="Apellido">
                        <b-form-input type="text" :disabled="!enabledEdit" v-model="persona.apellido" required></b-form-input>
                    </b-form-group>
                </b-col>
                <b-col cols="4">
                    <b-form-group label="Email">
                        <b-form-input type="email" :disabled="!enabledEdit" v-model="persona.email" required
                        ></b-form-input>
                    </b-form-group>
                </b-col>
                <b-col cols="4">
                    <b-form-group label="Rol">
                        <b-form-select :options="roles" :disabled="!enabledEdit" v-model="persona.id_rol" required></b-form-select>
                    </b-form-group>
                </b-col>
            </b-row>

            <b-row class="mt-4 text-right">
                <b-col>

                    <b-button-group class="mr-2" v-if="enabledEdit || isSaving">
                        <b-button variant="outline-success" type="submit" :disabled="isSaving">
                            Guardar
                            <font-awesome-icon icon="save" />
                            <b-spinner v-if="isSaving" small class="ml-2"></b-spinner>
                        </b-button>
                        <b-button variant="outline-secondary" @click="cancelarEditar">
                            Cancelar
                            <font-awesome-icon icon="times-circle" />
                        </b-button>
                    </b-button-group>

                    <b-button variant="outline-primary" type="submit" v-if="!enabledEdit && !isSaving">Editar 
                        <font-awesome-icon icon="edit" />
                    </b-button>
                </b-col>
            </b-row>
        </b-form>
    </b-card>    
</template>

<script>

    import axios from 'axios'

    export default {
        data() {
            return {
                selected: null,
                options: [
                    { value: null, text: 'Please select an option' },
                    { value: 'a', text: 'This is First option' },
                    { value: 'b', text: 'Selected Option' },
                    { value: { C: '3PO' }, text: 'This is an option with object value' },
                    { value: 'd', text: 'This one is disabled', disabled: true }
                ],
                enabledEdit: false,
                isSaving: false,
                persona: {},
                roles: []
            }
        },
        methods:{
            obtenerDetalle(){

                axios({
                    method: 'GET',
                    url: process.env.VUE_APP_API_URL + 'detalle_persona/' + this.$route.params.id,
                })
                .then(response => {
                    this.persona = response.data.persona
                    this.roles = response.data.roles
                })
                .catch(error => {
                    console.log(error)
                })

            },
            editarPersona(){
                this.enabledEdit = !this.enabledEdit

                if (!this.enabledEdit) {
                    
                    axios({
                        method: 'POST',
                        url: process.env.VUE_APP_API_URL + 'editar_persona',
                        data: this.persona
                    })
                    .then(response => {
                       console.log(response.data)
                    })
                    .catch(error => {
                        console.log(error)
                    })

                }
            },
            cancelarEditar(){
                 this.enabledEdit = false
            },

        },
        mounted(){
            this.obtenerDetalle()
        }
    }
</script>