<template>
    <div>
        
        <CardDetalle />

        <b-row >
            <b-col cols="12" lg="4" md="6" sm="12" class="mb-3">
                <b-input-group>
                    <b-form-input v-model="busqueda"></b-form-input>

                    <b-input-group-append>
						<b-button variant="outline-secondary" disabled>
							<font-awesome-icon icon="search" />
						</b-button>
						
					</b-input-group-append>
                    
                </b-input-group> 
            </b-col>
            <b-col class="text-right mb-3" >

                <b-button class="mr-2" variant="outline-danger" :disabled="asistencia_congelada == 'S' ? true : false" @click="congelarAsistencia">{{ asistencia_congelada ? 'Congelada' : 'Congelar' }}
                    <font-awesome-icon icon="lock" />
                </b-button>

                <!-- <b-button variant="outline-primary" :disabled="asistencia_congelada == 'S' ? true : false" @click="marcarTodos">{{ todosMarcados ? 'Desmarcar Todos' : 'Marcar Todos' }}
                    <font-awesome-icon icon="tasks" />
                </b-button> -->
            </b-col>
        </b-row>
        
        <b-row>
            <b-col lg="4" sm="12" md="6" v-for="persona in personas" :key="persona.id">

                <b-card :to="{ name: 'home' }" :bg-variant="persona.asistencia ? persona.asistencia.tipo.color : 'secondary'" text-variant="white" class="mb-4" footer-tag="footer">

                    <b-row style="height: 100%">
                        <b-col cols="4">
                            <div class="clearfix">
                                <b-img left thumbnail fluid src="img/logo_muni.png" alt="Image 1" width="100"></b-img>
                            </div>
                        </b-col>
                        <b-col class="text-left" cols="8">
                            <b-row>
                                <b-col cols="12">
                                    <p style="padding-bottom: 0; margin-bottom: 0"><strong>{{ persona.nombre + ' ' + persona.apellido }}</strong></p>
                                    <p class="font-weight-light" style="margin: 0; padding: 0">{{ persona.puesto.nombre }}</p>
                                </b-col>
                                
                            </b-row>
                    
                        </b-col>
                    </b-row>

                    <template v-slot:footer>

                        <b-row>
                            <b-col>
                                <div class="text-right"  style="cursor: pointer;">
                                    <font-awesome-icon @click="modalAsistencia(persona)" v-b-tooltip.bottom title="Historial de Asistencia" icon="info-circle" />
                                </div>
                            </b-col>
                            <!-- <b-col>
                                <div class="text-left" v-if="persona.asistencia && !asistencia_congelada" style="cursor: pointer;">
                                    <font-awesome-icon v-b-tooltip.bottom title="Eliminar" @click="marcarAsistencia(persona)" icon="undo" />
                                </div>
                            </b-col>

                            <b-col>
                                <div class="text-right" style="cursor: pointer;" v-if="!persona.asistencia && !asistencia_congelada">
                                    <font-awesome-icon v-b-tooltip.bottom title="A tiempo"  class="mr-2" @click="marcarAsistencia(persona)" icon="check" />
                                    <font-awesome-icon v-b-tooltip.bottom title="Ausencia" class="mr-2" @click="ausencia(persona)" icon="times-circle" />
                                    <font-awesome-icon v-b-tooltip.bottom title="Llegada tarde" @click="tarde(persona)" icon="clock" />
                                </div>

                                <div @click="info(persona)" class="text-right" style="cursor: pointer;" v-if="persona.asistencia || asistencia_congelada">
                                    <font-awesome-icon v-b-tooltip.bottom title="Información" icon="info-circle" />
                                </div>
                            </b-col> -->
                        </b-row>
                        
                    </template>

                </b-card>
               
            </b-col>
        </b-row>

        <ModalAsistencia :persona="persona" :tipo="tipo" />

        <ModalInfo :persona="persona"/>

        <ModalDetalleAsistencia :persona="persona" :asistencia_congelada="asistencia_congelada == 'S' ? true : false" />

    </div>
</template>

<style scoped>

    .card-body{
        padding: 0.75rem
    }
    .card-footer{
        padding-top: 0;
        padding-bottom: 1px;
        /* background-color: #6c757d !important; */
        border-top: 0 
    }

</style>


<script>

    import axios from 'axios'
    import ModalAsistencia from '../Asistencia/ModalAsistencia'
    import ModalInfo from '../Asistencia/ModalInfo'
    import CardDetalle from '@/components/DetalleAgenda/CardDetalle'
    import ModalDetalleAsistencia from '@/components/Asistencia/ModalDetalle'

    export default {
        components: {
            ModalAsistencia,
            ModalInfo,
            CardDetalle,
            ModalDetalleAsistencia
        },
        props: {
            asistentes: {
                type: Array,
                default: null
            }
        },
        data(){
            return{
                personas: [],
                busqueda: null,
                isLoading: false,
                fecha_agenda: '',
                tipo_sesion: '',
                asistencia_congelada: null,
                persona: {},
                tipo: null,
                detalle_agenda: {}
            }
        },
        methods: {
            obtenerDatos(){

                this.isLoading = !this.isLoading

                axios({
                    method: 'GET',
                    url: process.env.VUE_APP_API_URL + 'lista_asistencia/' +  this.$route.params.id,
                })
                .then(response => {

                    this.personas = response.data.personas
                    this.fecha_agenda = response.data.detalle_agenda.fecha
                    this.tipo_sesion = response.data.detalle_agenda.tipo_agenda.nombre
                    this.asistencia_congelada = response.data.detalle_agenda.asistencia_congelada
                    this.detalle_agenda = response.data.detalle_agenda
                    this.isLoading = !this.isLoading

                    console.log(this.asistencia_congelada)

                })
                .catch(error => {
                    console.log(error)
                })

            },
            marcarAsistencia(persona){
            
                let url = null

                if (!persona.asistencia) {
                    url = 'registrar_asistencia'
                }else{
                    url = 'eliminar_asistencia'
                }

                let data = {
                    id_persona: persona.persona[0].id,
                    id_agenda: this.$route.params.id
                }

                axios({
                    method: 'POST',
                    url: process.env.VUE_APP_API_URL + url,
                    data: data
                })
                .then(response => {
                    console.log(response.data)
                    this.obtenerDatos()
                })
                .catch(error => {
                    console.log(error)
                })

            },
            ausencia(persona){

                this.persona = persona
                this.tipo = 2
                this.$bvModal.show('modal-asistencia')

            },
            tarde(persona){

                this.persona = persona
                this.tipo = 1
                this.$bvModal.show('modal-asistencia')

            },
            info(persona){

                this.persona = persona
                this.$bvModal.show('modal-info')

            },
            congelarLista(){

            },
            marcarTodos(){

                if (!this.todosMarcados) {

                    this.personas.forEach(element => {
                        
                        if (!element.asistencia) {
                                                        
                            let data = {
                                id_persona: element.persona[0].id,
                                id_agenda: this.$route.params.id
                            } 

                            axios({
                                method: 'POST',
                                url: process.env.VUE_APP_API_URL + 'registrar_asistencia',
                                data: data
                            })
                            .then(response => {                                
                            })
                            .catch(error => {
                                console.log(error)
                            })
                        }

                    });

                }else{

                     this.personas.forEach(element => {
                        
                        if (element.asistencia) {
                                                        
                            let data = {
                                id_persona: element.persona[0].id,
                                id_agenda: this.$route.params.id
                            } 

                            axios({
                                method: 'POST',
                                url: process.env.VUE_APP_API_URL + 'eliminar_asistencia',
                                data: data
                            })
                            .then(response => {                                
                            })
                            .catch(error => {
                                console.log(error)
                            })
                        }

                    });

                }

                this.obtenerDatos()
            },
            async congelarAsistencia(){

                const {value: accept}  = await Swal.fire({
                    title: '¿Está seguro que desea congelar la asistencia?',
                    text: "Una vez hecho esto no podrá modificarla!",
                    type: 'warning',
                    inputPlaceholder: 'Estoy de acuerdo en congelar la asistencia.',
                    input: 'checkbox',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'CONGELAR',
                    cancelButtonText: 'Cancelar',
                    inputValidator: (result) => {
                        return !result && 'Debe estar de acuerdo en congelar la asistencia.'
                    }
                })

                if (accept) {
                    
                    let data = {
                        id_agenda: this.$route.params.id
                    }

                    axios({
                        method: 'POST',
                        url: process.env.VUE_APP_API_URL + 'congelar_asistencia',
                        data: data
                    })
                    .then(response => {

                        Swal.fire(
                            'Excelente!',
                            'La asistencia ha sido congelada exitosamente!',
                            'success'
                        )

                        this.obtenerDatos()

                    })
                    .catch(error => {
                        console.log(error)
                    })

                }

            },
            modalAsistencia(persona){

                this.persona = persona
                this.$bvModal.show('modal-historial-asistencia')

            }
        },
        mounted(){

            this.obtenerDatos()

            this.$root.$on('obtenerAsistencia', () => {
                
				this.obtenerDatos()
            })

        },
        computed:{
            asistenciaTomada: function(){

                return true

            },
            todosMarcados: function(){

                if (this.personas.length > this.personas.filter(value => value.asistencia).length) {
                    
                    return false

                }else{

                    return true
                }

            }
        }
    }
</script>