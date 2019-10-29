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
                        <b-form-select v-model="nueva_acta.id_agenda" text-field="fecha" value-field="id" :options="agendas" required>
                            <template v-slot:first>
                                <option :value="null" disabled>-- Seleccione una opción --</option>
                            </template>
                        </b-form-select>
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
                options: [],
                isSaving: false,
                nueva_acta: {
                    id_agenda: null
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

                let usuario = JSON.parse(localStorage.getItem('usuario'))
                this.nueva_acta.id_usuario = usuario.id_persona

                axios({
                    method: 'POST',
                    url: process.env.VUE_APP_API_URL + 'registrar_acta',
                    data: this.nueva_acta
                })
                .then(response => {
                   
                    this.$root.$emit('obtenerActas')

                    this.$bvModal.hide('modal-nueva')
                  
                })
                .catch(error => {
                    console.log(error)
                })

            },
            obtenerDatos(){

                // this.nueva_acta.id_agenda = null

                axios({
                    method: 'GET',
                    url: process.env.VUE_APP_API_URL + 'datos_modal_acta'
                })
                .then(response => {
                   
                    console.log(response.data)
                    this.nueva_acta.numero = response.data.numero_acta.numero
                    this.nueva_acta.year = response.data.numero_acta.year
                    this.agendas = response.data.agendas
                  
                })
                .catch(error => {
                    console.log(error)
                })

            },
            editarNoActa(){
            },
            editarYearActa(){
            },
            show(){
                // this.nueva_acta.id_agenda = null
                console.log('mostrar modal')
            }
        }
    }
</script>