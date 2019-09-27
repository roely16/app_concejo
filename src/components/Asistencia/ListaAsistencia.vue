<template>
    <div>
        <b-row class="mb-3">
            <b-col cols="4">
                <b-input-group>
                    <b-form-input v-model="busqueda"></b-form-input>

                    <b-input-group-append>
						<b-button variant="outline-secondary" disabled>
							<font-awesome-icon icon="search" />
						</b-button>
						
					</b-input-group-append>
                    
                </b-input-group> 
            </b-col>
            <b-col class="text-right">

                <b-button class="mr-2" variant="outline-danger" :disabled="asistencia_congelada" @click="congelarAsistencia">{{ asistencia_congelada ? 'Congelada' : 'Congelar' }}
                    <font-awesome-icon icon="lock" />
                </b-button>

                <b-button variant="outline-primary" :disabled="asistencia_congelada" @click="marcarTodos">Marcar Todos
                    <font-awesome-icon icon="tasks" />
                </b-button>
            </b-col>
        </b-row>

        <b-row class="mb-3">
            <b-col>
                <b-card>
                    <b-row>
                        <b-col>
                            <b-form-group
                                label="Fecha"
                            >
                                <h5>{{ fecha_agenda }}</h5>
                            </b-form-group>
                        </b-col>
                        <b-col>
                            <b-form-group
                                label="Tipo de Sesión"
                            >
                                <h5>{{ tipo_sesion }}</h5>
                            </b-form-group>
                        </b-col>
                    </b-row>
                </b-card>
            </b-col>
        </b-row>

        <b-row>
            <b-col lg="4" sm="12" v-for="persona in personas" :key="persona.id">

                <b-card :to="{ name: 'home' }" :bg-variant="persona.color" text-variant="white" class="mb-4" footer-tag="footer">

                    <b-row style="height: 100%">
                        <b-col cols="4">
                            <div class="clearfix">
                                <b-img left thumbnail fluid src="img/logo_muni.png" alt="Image 1" width="100"></b-img>
                            </div>
                        </b-col>
                        <b-col class="text-left" cols="8">
                            <b-row>
                                <b-col cols="12">
                                    <p style="padding-bottom: 0; margin-bottom: 0"><strong>{{ persona.persona[0].nombre + ' ' + persona.persona[0].apellido }}</strong></p>
                                    <p class="font-weight-light" style="margin: 0; padding: 0">{{ persona.nombre }}</p>
                                </b-col>
                                
                            </b-row>
                    
                        </b-col>
                    </b-row>

                    <template v-slot:footer>

                        <b-row>
                            <b-col>
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

                                <!-- Info de la asistencia -->
                                <div @click="info(persona)" class="text-right" style="cursor: pointer;" v-if="persona.asistencia || asistencia_congelada">
                                    <font-awesome-icon v-b-tooltip.bottom title="Información" icon="info-circle" />
                                </div>
                            </b-col>
                        </b-row>
                        
                    </template>

                </b-card>
               
            </b-col>
        </b-row>

        <ModalAsistencia :persona="persona" :tipo="tipo" />

        <ModalInfo :persona="persona"/>

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

    export default {
        components: {
            ModalAsistencia,
            ModalInfo
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
                tipo: null
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

                    console.log(response.data)

                    this.personas = response.data.personas
                    this.fecha_agenda = response.data.detalle_agenda.fecha
                    this.tipo_sesion = response.data.detalle_agenda.tipo_agenda.nombre
                    this.asistencia_congelada = response.data.detalle_agenda.asistencia_congelada
                    this.isLoading = !this.isLoading

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

            },
            congelarAsistencia(){

                Swal.fire({
                    title: '¿Está seguro que desea congelar la asistencia?',
                    text: "Una vez hecho esto no podrá modificarla!",
                    type: 'warning',
                    inputPlaceholder: 'Escriba CONGELAR',
                    input: 'textarea',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Si, CONGELAR!',
                    cancelButtonText: 'Cancelar'
                }).then((result) => {

                    if (result.value == 'CONGELAR') {

                        let data = {
                            id_agenda: this.$route.params.id
                        }

                        axios({
                            method: 'POST',
                            url: process.env.VUE_APP_API_URL + 'congelar_asistencia',
                            data: data
                        })
                        .then(response => {

                            console.log(response.data)

                        })
                        .catch(error => {
                            console.log(error)
                        })

                    }else if(result.value != '' && !result.dismiss){
                        
                        Swal.fire({
                            type: 'error',
                            title: 'Error',
                            text: 'Debe escribir la palabra CONGELAR en mayúsculas',
                        })

                    }

                })

            }
        },
        mounted(){

            this.obtenerDatos()

            this.$root.$on('obtenerAsistencia', () => {
                
                console.log('obtener asistencia')

				this.obtenerDatos()
			})

        },
        computed:{
            asistenciaTomada: function(){

                return true

            }
        }
    }
</script>