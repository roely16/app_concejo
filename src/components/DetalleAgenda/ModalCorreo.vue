<template>
    <b-modal id="modal-correo"  title="Enviar por Correo">
        
        <!-- <b-table striped hover :items="destinos"></b-table> -->
        <b-row>
            <b-col cols="12">
                <b-list-group>
                    <b-list-group-item v-for="destino in destinos" :key="destino.id">

                        <b-row>
                            <b-col>
                                <h5>{{ destino.nombre }} {{ destino.apellido }}</h5>
                                <p>{{ destino.email }}</p>
                                <b-badge :variant="destino.rol.color">{{ destino.rol.nombre }}</b-badge>
                            </b-col>
                            <b-col class="text-right">
                                <b-button :variant="destino.enviar_correo ? 'success' : 'secondary'" @click="marcarEnviar(destino)"><font-awesome-icon :icon="destino.enviar_correo ? 'check' : 'times-circle'" /></b-button>
                            </b-col>
                        </b-row>

                    </b-list-group-item>
                </b-list-group>
            </b-col>

            <!-- <b-col>
                <b-row>
                    <b-col>
                        <b-card>
                            <h5>Adjunto</h5>
                        </b-card>
                    </b-col>
                </b-row>

               
            </b-col> -->

        </b-row>

         

        <template slot="modal-footer">
            <b-row class="text-center">
                <b-col>
                    <b-button  size="lg" class="mr-2" variant="outline-danger" @click="cancelarEnvio">Cancelar 
                        <font-awesome-icon icon="times-circle" />
                    </b-button>
                    <b-button @click="enviarCorreo" :disabled="!cantidadPersonas || isSending" type="submit" size="lg" variant="outline-primary" >
                        {{ isSending ? 'Enviando...' : 'Enviar' }} 
                        <font-awesome-icon icon="paper-plane" />
                    </b-button>
                </b-col>
            </b-row>
        </template>
    
    </b-modal>
</template>

<script>

    import axios from 'axios'

    export default {
        data(){
            return{
                isSending: false
            }
        },
        props: {
            destinos: {
                type: Array,
                default: null
            }
        },
        methods: {

            obtenerPersonas(){

            },
            marcarEnviar(destino){
                console.log(destino)
                destino.enviar_correo = !destino.enviar_correo
            },
            enviarCorreo(){

                Swal.fire({
                    title: '¿Está seguro de enviar agenda para aprobación?',
                    text: "Este proceso no se puede deshacer o cancelar!",
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Si, enviar!',
                    cancelButtonText: 'Cancelar'
                }).then((result) => {
                    if (result.value) {
                       
                        this.isSending = !this.isSending

                        let usuario = JSON.parse(localStorage.getItem('usuario'))
                        
                        let data = {
                            destinos: this.destinos.filter(value => value.enviar_correo),
                            id_acta: this.$route.params.id,
                            id_usuario: usuario.id_persona
                        }

                        axios({
                            method: 'POST',
                            url: 'https://udicat.muniguate.com/apps/api_concejo/public/api/enviar_agenda_aprobacion',
                            data: data
                        })
                        .then(response => {

                            Swal.fire(
                                'Excelente!',
                                'La agenda ha sido enviada por correo para aprobación!',
                                'success'
                            ).then( () => {
                                
                                this.isSending = !this.isSending
                                this.$bvModal.hide('modal-correo')
                                this.$root.$emit('obtenerDetalleAgenda')

                            })

                        })

                    }
                })
                

            },
            cancelarEnvio(){
                this.$bvModal.hide('modal-correo')
            }

        },
        computed: {
            cantidadPersonas: function(){

                if (this.destinos.filter(value => value.enviar_correo).length > 0) {
                    
                    return true

                }else{

                    return false

                }

            }
        }
    }
</script>