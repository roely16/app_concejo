<template>
    <b-modal id="modal-nueva" title="Nueva Acta" @show="obtenerDatos" hide-footer>

        <b-form @submit.prevent="registrarActa">
            <b-row>

                <b-col cols="6">
                    <b-form-group label="No. de Acta" label-class="font-weight-bold">
                        <b-input-group>
                            <template v-slot:append>
                                <b-input-group>
                                    <b-button v-on:click="editarNoActa" variant="outline-primary"><font-awesome-icon icon="edit" /></b-button>
                                </b-input-group>
                            </template>
                            <b-form-input type="number" v-model="nueva_acta.numero" autocomplete="off" :disabled="!editNoActa" required></b-form-input>
                        </b-input-group>
                    </b-form-group>
                </b-col>

                <b-col cols="6">
                    <b-form-group label="Año" label-class="font-weight-bold">
                        <b-input-group>
                            <template v-slot:append>
                                <b-input-group>
                                    <b-button v-on:click="editarYearActa" variant="outline-primary"><font-awesome-icon icon="edit" /></b-button>
                                </b-input-group>
                            </template>
                            <b-form-input type="text" v-model="nueva_acta.year" autocomplete="off" :disabled="!editYearActa" required></b-form-input>
                        </b-input-group>
                    </b-form-group>
                </b-col>

                <b-col cols="12">
                    <b-form-group label="Agenda" label-class="font-weight-bold">
                        <!-- <b-form-input></b-form-input> -->
                        <b-form-select v-model="nueva_acta.id_agenda" :options="agendas" text-field="fecha" value-field="id" required></b-form-select>
                    </b-form-group>
                </b-col>

                <b-col>
                    <b-form-group label="Descripción" label-class="font-weight-bold">
                        <b-form-textarea rows="6" max-rows="6" v-model="nueva_acta.descripcion"></b-form-textarea>
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
                isSaving: false,
                nueva_acta: {
                },
                editNoActa: false,
                editYearActa: false,
                agendas: []
            }
        },
        methods: {
            cerrarModal(){
                this.$bvModal.hide('modal-nueva')
            },
            registrarActa(){

                console.log(this.nueva_acta)

                axios({
                    method: 'POST',
                    url: process.env.VUE_APP_API_URL + 'registrar_acta',
                    data: this.nueva_acta
                })
                .then(response => {
                   
                    console.log(response.data)
                    this.$root.$emit('obtenerActas')

                    this.$bvModal.hide('modal-nueva')
                  
                })
                .catch(error => {
                    console.log(error)
                })

            },
            obtenerDatos(){

                axios({
                    method: 'GET',
                    url: process.env.VUE_APP_API_URL + 'datos_modal_acta'
                })
                .then(response => {
                   
                    console.log(response.data)
                    this.nueva_acta = response.data.numero_acta
                    this.agendas = response.data.agendas
                  
                })
                .catch(error => {
                    console.log(error)
                })

            },
            editarNoActa(){

            },
            editarYearActa(){

            }
        }
    }
</script>