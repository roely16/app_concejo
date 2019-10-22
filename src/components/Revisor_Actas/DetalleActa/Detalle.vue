<template>
    <div>
        <b-card v-if="!isLoading">
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

            <b-row class="mt-4">
                 <b-col>

                    <!-- <b-button-group class="mr-2" v-if="isEditing || isSaving">
                        <b-button variant="outline-success" :disabled="isSaving" @click="editarActa">
                            Guardar
                            <font-awesome-icon icon="save" />
                            <b-spinner v-if="isSaving" small class="ml-2"></b-spinner>
                        </b-button>
                        <b-button variant="outline-danger" @click="cancelarEditar">
                            Cancelar
                            <font-awesome-icon icon="times-circle" />
                        </b-button>
                    </b-button-group>

                    <b-button class="mr-2" variant="outline-primary" @click="editarActa" v-if="!isEditing && !isSaving">Editar 
                        <font-awesome-icon icon="edit" />
                    </b-button> -->

                    <!-- <b-button class="mr-2" variant="outline-info" v-b-modal.modal-historial>Historial 
                        <font-awesome-icon icon="list-alt" />
                    </b-button> -->

                    <b-button class="mr-2" variant="outline-secondary" v-b-modal.modal-vista-previa>Vista Previa 
                        <font-awesome-icon icon="file-pdf" />
                    </b-button>

                </b-col>

                <b-col cols="4">
                    <b-alert :variant=" detalle.bitacora ? detalle.bitacora.estado.color : 'secondary'"  show>
                        <b-row>
                            <b-col cols="10">
                                <strong>Estado: </strong>{{ detalle.bitacora ? detalle.bitacora.estado.nombre : 'Cargando...' }}
                            </b-col>
                            <b-col cols="2">
                                <font-awesome-icon :icon="detalle.bitacora ? detalle.bitacora.estado.icono : 'check'" />
                            </b-col>
                        </b-row>
                    </b-alert>
                </b-col>

            </b-row>
        </b-card>

        <VistaPrevia />
        <Historial />

    </div>    
</template>

<script>

    import axios from 'axios'
    import VistaPrevia from '@/components/DetalleActa/VistaPrevia'
    import Historial from '@/components/DetalleActa/Historial'

    export default {
        components: {
            VistaPrevia,
            Historial
        },
        data(){
            return{
                acta: {},
                isEditing: false,
                isSaving: false,
                detalle: {},
                agendas: [],
                isLoading: false
            }
        },
        methods: {
            obtenerDetalle(){

                this.isLoading = !this.isLoading

                axios({
                    method: 'GET',
                    url: process.env.VUE_APP_API_URL + 'detalle_acta/' + this.$route.params.id,
                })
                .then(response => {

                    console.log(response.data)
                    this.detalle = response.data.acta
                    this.agendas = response.data.agendas
                    this.isLoading = !this.isLoading

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
            },
            vistaPrevia(){

                console.log('vista previa')

            }
        },
        mounted(){

            this.obtenerDetalle()

        }
    }
</script>