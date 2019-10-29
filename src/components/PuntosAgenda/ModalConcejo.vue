<template>
    <b-modal id="modal-concejo" title="Enviar Agenda al Concejo" @show="show" hide-footer size="lg">

        <b-row class="mb-3">
            <b-col cols="5">
                <b-input-group>
                    <b-form-input v-model="busqueda"></b-form-input>

                    <b-input-group-append>
						<b-button variant="outline-secondary" disabled>
							<font-awesome-icon icon="search" />
						</b-button>
						
					</b-input-group-append>
                    
                </b-input-group> 
            </b-col>
        </b-row>

        <div>
            <b-table small striped hover :items="items" :fields="fields" head-variant="dark" :busy="isLoading">

                <div slot="table-busy" class="text-center my-2">
                    <b-spinner class="align-middle"></b-spinner>
                    <div class="mt-2">
                    <strong>Cargando datos...</strong>
                    </div>
                </div>

                <template slot="[nombre]" slot-scope="data">
                    {{ data.item.nombre }} {{ data.item.apellido }}
                </template>

                <template slot="[puesto]" slot-scope="data">
                    {{ data.item.puesto.nombre }}
                </template>

                <template slot="[enviar_agenda]" slot-scope="data">
                    <b-button size="sm" :variant="data.item.enviar ? 'outline-success' :  'outline-danger'" @click="marcarEnviar(data.item)">
                        <font-awesome-icon :icon="data.item.enviar ? 'check' : 'times-circle'" />
                    </b-button>
                </template>
            </b-table>
        </div>

        <b-row class="text-center">
            <b-col>
                 <b-button @click="cerrarModal" size="lg" class="mr-2" variant="outline-danger">Cancelar 
                    <font-awesome-icon icon="times-circle" />
                </b-button>
                <b-button size="lg" variant="outline-primary" :disabled="!checkEnviar || isSending" @click="enviarAgenda">{{ isSending ? 'Enviando...' : 'Enviar Agenda' }} 
                    <font-awesome-icon icon="save" />  
                </b-button>
            </b-col>
        </b-row>
    </b-modal>
</template>

<script>

    import axios from 'axios'

    export default {
        data(){
            return{
                items: [
                    { age: 40, first_name: 'Dickerson', last_name: 'Macdonald' },
                    { age: 21, first_name: 'Larsen', last_name: 'Shaw' },
                    { age: 89, first_name: 'Geneva', last_name: 'Wilson' },
                    { age: 38, first_name: 'Jami', last_name: 'Carney' }
                ],
                fields: [],
                busqueda: '',
                isSending: false,
                isLoading: false
            }
        },
        methods: {
            show(){
                
                this.isLoading = !this.isLoading

                axios
                .get( process.env.VUE_APP_API_URL + 'obtener_concejo')
                .then(response => {
                    this.items = response.data.items
                    this.fields = response.data.fields
                    this.isLoading = !this.isLoading
                })
            },
            marcarEnviar(item){
                item.enviar = !item.enviar
            },
            cerrarModal(){
                this.$bvModal.hide('modal-concejo')	
            },
            enviarAgenda(){

                Swal.fire({
                    title: '¿Está seguro?',
                    text: "La agenda será enviada a todas las personas seleccionadas!",
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Si, ENVIAR!',
                    cancelButtonText: 'Cancelar'
                }).then((result) => {

                    let usuario = JSON.parse(localStorage.getItem('usuario'))

                    let data = {
                        personas: this.items.filter(item => item.enviar),
                        id_agenda: this.$route.params.id,
                        id_usuario: usuario.id_persona
                    }

                    if (result.value) {
                        
                        console.log(data)
                        
                        this.isSending = !this.isSending

                        axios
                        .post( 'https://udicat.muniguate.com/apps/api_concejo/public/api/enviar_agenda_concejo', data)
                        .then(response => {

                            console.log(response.data)
                            this.isSending = !this.isSending

                            Swal.fire(
                                'Excelente!',
                                'La agenda ha sido enviada a las personas correspondientes!',
                                'success'
                            ).then(()=>{

                            })

                        })

                    }

                })

            }
        },
        computed: {
            checkEnviar(){

                let personas_enviar = this.items.filter(item => item.enviar)

                if (personas_enviar.length <= 0 ) {
                    return false
                }else{
                    return true
                }

            }
        }    
    }
</script>