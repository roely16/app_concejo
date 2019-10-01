<template>
    <div>
        <b-card>
            <b-row>
                <b-col cols="2">
                    <b-form-group label="No." label-class="font-weight-bold">
                        <b-form-input type="number" v-model="detalle.no_acta" required :disabled="!isEditing"
                        ></b-form-input>
                    </b-form-group>
                </b-col>
                <b-col cols="2">
                    <b-form-group label="Año" label-class="font-weight-bold">
                        <b-form-input type="number" v-model="detalle.year" required :disabled="!isEditing"
                        ></b-form-input>
                    </b-form-group>
                </b-col>
                <b-col cols="4">
                    <b-form-group label="Agenda" label-class="font-weight-bold">
                        <!-- <b-form-input type="number" v-model="detalle.id_agenda" required :disabled="!isEditing"
                        ></b-form-input> -->
                        <b-form-select v-model="detalle.id_agenda" :options="agendas" text-field="fecha" value-field="id" :disabled="!isEditing" required></b-form-select>
                    </b-form-group>
                </b-col>
                <b-col cols="4">
                    <b-form-group label="Descripción" label-class="font-weight-bold">
                        <b-form-textarea rows="3" v-model="detalle.descripcion" required :disabled="!isEditing"
                        ></b-form-textarea>
                    </b-form-group>
                </b-col>
            </b-row>

            <b-row>
                 <b-col>

                    <b-button-group class="mr-2" v-if="isEditing || isSaving">
                        <b-button variant="outline-success" :disabled="isSaving" @click="editarActa">
                            Guardar
                            <font-awesome-icon icon="save" />
                            <b-spinner v-if="isSaving" small class="ml-2"></b-spinner>
                        </b-button>
                        <b-button variant="outline-secondary" @click="cancelarEditar">
                            Cancelar
                            <font-awesome-icon icon="times-circle" />
                        </b-button>
                    </b-button-group>

                    <b-button class="mr-2" variant="outline-primary" @click="editarActa" v-if="!isEditing && !isSaving">Editar 
                        <font-awesome-icon icon="edit" />
                    </b-button>
                </b-col>
            </b-row>
        </b-card>
    </div>    
</template>

<script>

    import axios from 'axios'

    export default {
        data(){
            return{
                acta: {},
                isEditing: false,
                isSaving: false,
                detalle: {},
                agendas: []
            }
        },
        methods: {
            obtenerDetalle(){

                axios({
                    method: 'GET',
                    url: process.env.VUE_APP_API_URL + 'detalle_acta/' + this.$route.params.id,
                })
                .then(response => {

                    this.detalle = response.data.acta
                    this.agendas = response.data.agendas

                })
                .catch(error => {
                    console.log(error)
                })

            },
            editarActa(){
                this.isEditing = !this.isEditing

                if (!this.isEditing) {

                    axios({
                        method: 'POST',
                        url: process.env.VUE_APP_API_URL + 'editar_acta',
                        data: this.detalle
                    })
                    .then(response => {

                        this.detalle = response.data
                        Swal.fire(
                            'Excelente!',
                            'Los datos del acta han sido actualizados!',
                            'success'
                        )

                    })
                    .catch(error => {
                        console.log(error)
                    })
                }

            },
            cancelarEditar(){
                this.isEditing = false
            }
        },
        mounted(){

            this.obtenerDetalle()

        }
    }
</script>