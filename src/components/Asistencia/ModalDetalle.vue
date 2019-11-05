<template>
    <b-modal id="modal-historial-asistencia" title="Asistencia" size="lg" @shown="reset" hide-footer>
        
        <b-row>
            <b-col>
                <b-form-group label="Nombre" label-class="font-weight-bold">
                    {{ persona.nombre }} {{ persona.apellido }}
                </b-form-group>
            </b-col>

            <b-col>
                <b-form-group label="Puesto" label-class="font-weight-bold">
                    <b-badge>{{ persona.puesto ? persona.puesto.nombre : 'Cargando...' }}</b-badge>
                </b-form-group>
            </b-col>
        </b-row>

        <b-row align-h="center" v-if="!nuevo_registro">
            <b-col cols="6">
                <b-button block variant="outline-primary" @click="mostrarForm" :disabled="asistencia_congelada">Nuevo Registro
                    <font-awesome-icon icon="plus-circle" />
                </b-button>
            </b-col>
        </b-row>
        
        <b-form v-if="nuevo_registro" @submit.prevent="registrarAsistencia">

            <b-row>
                <b-col sm="12" md="12" lg="12">
                    <b-form-group label="Seleccione una opción" label-class="font-weight-bold">
                        <b-row class="mb-3">
                            <b-col>
                                <b-form-radio v-model="reporte_asistencia.tipo" name="some-radios" value="1">
                                    <b-badge variant="success">A Tiempo 
                                        <font-awesome-icon icon="check" />
                                    </b-badge>
                                </b-form-radio>
                            </b-col>
                            <b-col>
                                <b-form-radio v-model="reporte_asistencia.tipo" name="some-radios" value="2">
                                    <b-badge variant="info">Llegó Tarde 
                                        <font-awesome-icon icon="clock" />
                                    </b-badge>
                                </b-form-radio>
                            </b-col>
                        </b-row>
                        <b-row class="mb-3">
                            <b-col>
                                <b-form-radio v-model="reporte_asistencia.tipo" name="some-radios" value="3">
                                    <b-badge variant="danger">Ausentó
                                        <font-awesome-icon icon="times-circle" />
                                    </b-badge>
                                </b-form-radio>
                            </b-col>
                            <b-col>
                                <b-form-radio v-model="reporte_asistencia.tipo" name="some-radios" value="4">
                                    <b-badge variant="warning">Abandonó
                                        <font-awesome-icon icon="door-open" />
                                    </b-badge>
                                </b-form-radio>
                            </b-col>
                        </b-row>
                        <b-row>
                            <b-col>
                                <b-form-radio v-model="reporte_asistencia.tipo" name="some-radios" value="5">
                                    <b-badge variant="primary">Retornó
                                        <font-awesome-icon icon="undo" />
                                    </b-badge>
                                </b-form-radio>
                            </b-col>
                        </b-row>
                        
                    </b-form-group>
                </b-col>

                <b-col lg="6" md="12" v-if="reporte_asistencia.tipo == 2 || reporte_asistencia.tipo == 4 || reporte_asistencia.tipo == 5">
                    <b-form-group label="Hora" label-class="font-weight-bold">
                        <vue-clock-picker mode="24" :defaultHour="hour" :defaultMinute="minute" :onTimeChange="timeChangeHandler"></vue-clock-picker>
                    </b-form-group>
                </b-col>

                <b-col lg="6" md="12" v-if="reporte_asistencia.tipo != 1 && reporte_asistencia.tipo != null && reporte_asistencia.tipo != 5">
                    <b-form-group label="Motivo" label-class="font-weight-bold">
                        <b-form-textarea
                            v-model="reporte_asistencia.motivo" rows="3" max-rows="6"></b-form-textarea>
                    </b-form-group>
                </b-col>
            </b-row>

            <b-row class="mt-3 text-center" v-if="nuevo_registro">
                <b-col>
                    <b-button @click="mostrarForm" size="lg" class="mr-2" variant="outline-secondary">Cancelar 
                        <font-awesome-icon icon="times-circle" />
                    </b-button>
                    <b-button type="submit" size="lg" variant="outline-primary" :disabled="!reporte_asistencia.tipo || isSaving">{{ isSaving ? 'Guardando..' : 'Guardar' }} 
                        <font-awesome-icon icon="save" />
                    </b-button>
                </b-col>
            </b-row>

        </b-form>

        <div class="mt-4">
            <b-table hover :items="items" :fields="fields" show-empty empty-text="Aún no se han realizado registros" head-variant="dark" :busy="isLoading" small>

                <div slot="table-busy" class="text-center my-2">
                    <b-spinner class="align-middle"></b-spinner>
                    <div class="mt-2">
                        <strong>Cargando datos...</strong>
                    </div>
                </div>
                
                <template slot="[tipo]" slot-scope="data">
                    <b-badge :variant="data.item.tipo.color">{{ data.item.tipo.nombre }} 
                        <font-awesome-icon :icon="data.item.tipo.icon" />
                    </b-badge>
                </template>

                <template slot="[actions]" slot-scope="row">
                    <div class="text-right">
                        <b-button size="sm" class="mr-2" variant="outline-secondary" @click="row.toggleDetails">
                            <font-awesome-icon icon="info-circle"></font-awesome-icon>
                        </b-button>
                        <b-button size="sm" variant="outline-danger" @click="eliminarRegistro(row.item)" :disabled="asistencia_congelada">
                            <font-awesome-icon icon="trash-alt" />
                        </b-button>
                
                    </div>
                </template>

                <template v-slot:row-details="row">
                    <b-card>

                        <b-row class="mb-2" v-if="row.item.motivo">
                            <b-col sm="3" md="4" class="text-sm-right"><b>Motivo: </b></b-col>
                            <b-col>{{ row.item.motivo }}</b-col>
                        </b-row>

                         <b-row class="mb-2">
                            <b-col sm="3"  md="4" class="text-sm-right"><b>Fecha de Registro: </b></b-col>
                            <b-col>{{ row.item.fecha_registro }}</b-col>
                        </b-row>

                         <b-row class="mb-2">
                            <b-col sm="3"  md="4" class="text-sm-right"><b>Registrado Por: </b></b-col>
                            <b-col>{{ row.item.persona_registra ? row.item.persona_registra.usuario.usuario.toUpperCase() : 'Cargando...' }}</b-col>
                        </b-row>

                        <b-button size="sm" @click="row.toggleDetails">Ocultar Detalles</b-button>
                    </b-card>
                </template>
            </b-table>
        </div>

    </b-modal>
</template>

<script>

    import VueClockPicker from 'vue-clock-picker'
    import axios from 'axios'

    export default {
        props: {
            persona: {
                type: Object,
                default: null
            },
            asistencia_congelada: {
                type: Boolean,
                default: false,
                required: false
            }
        },
        components: {
            VueClockPicker
        },
        data(){
            return{
                items: [
                    { age: 40, first_name: 'Dickerson', last_name: 'Macdonald' },
                    { age: 21, first_name: 'Larsen', last_name: 'Shaw' },
                    { age: 89, first_name: 'Geneva', last_name: 'Wilson' },
                    { age: 38, first_name: 'Jami', last_name: 'Carney' }
                ],
                fields: [],
                nuevo_registro: false,
                reporte_asistencia: {
                    tipo: null,
                    hora: null,
                    motivo: null
                },
                hour: new Date().getHours(),
                minute: new Date().getMinutes(),
                isLoading: false,
                isSaving: false
            }
        },
        methods: {
            reset(){

                console.log(this.asistencia_congelada)

                this.hour = new Date().getHours()
                this.minute = new Date().getMinutes()

                this.isLoading = !this.isLoading

                this.reporte_asistencia = {
                    tipo: null,
                    hora: null,
                    motivo: null
                }
                this.nuevo_registro = false

                let data = {
                    id_persona: this.persona.id,
                    id_agenda: this.$route.params.id
                }

                axios
                .post(process.env.VUE_APP_API_URL + 'detalle_asistencia', data)
                .then(response => {
                    this.items = response.data.items
                    this.fields= response.data.fields
                    this.isLoading = !this.isLoading
                })
            },
            mostrarForm(){

                this.nuevo_registro = !this.nuevo_registro

            },
            registrarAsistencia(){

                this.isSaving = !this.isSaving

                if (this.reporte_asistencia.tipo == 2 || this.reporte_asistencia.tipo == 4 || this.reporte_asistencia.tipo == 5) {
                    
                    this.reporte_asistencia.hora = this.hour + ':' + this.minute

                }

                let usuario = JSON.parse(localStorage.getItem('usuario'))

                this.reporte_asistencia.id_usuario = usuario.id_persona
                this.reporte_asistencia.id_persona = this.persona.id
                this.reporte_asistencia.id_agenda = this.$route.params.id

                axios
                .post(process.env.VUE_APP_API_URL + 'registrar_asistencia', this.reporte_asistencia)
                .then(response => {

                    Swal.fire(
                        'Excente!',
                        'Registro realizado exitosamente!',
                        'success'
                    ).then(()=>{
                        this.isSaving = !this.isSaving
                        this.reset()
                        this.$root.$emit('obtenerAsistencia')
                    })
                    
                })

            },
            timeChangeHandler(time){

                this.hour = time.hour

                if (time.minute == 0) {
                    this.minute = '00'
                }else{
                    this.minute = time.minute
                }

                

            },
            eliminarRegistro(item){

                Swal.fire({
                    title: '¿Está seguro?',
                    text: "Una vez eliminado no se podrá recuperar!",
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Si, ELIMINAR',
                    cancelButtonText: 'Cancelar'
                }).then((result) => {

                    if (result.value) {
                        axios
                        .get(process.env.VUE_APP_API_URL + 'eliminar_registro_asistencia/' + item.id)
                        .then(response => {
                            console.log(response.data)

                            this.reset()
                            this.$root.$emit('obtenerAsistencia')
                            
                        })
                    }

                })

            }
        },
        mounted(){

            

        }
    }
</script>