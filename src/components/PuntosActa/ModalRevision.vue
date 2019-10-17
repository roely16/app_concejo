<template>
    <b-modal id="modal-revision" title="Envia a Revisión" hide-footer @show="show">
        <div v-if="!isLoading">
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
            </b-row>
            
            <b-row class="text-center mt-4">
                <b-col cols="12">
                    <b-button  size="lg" class="mr-2" variant="outline-danger" @click="cancelarEnvio">Cancelar 
                        <font-awesome-icon icon="times-circle" />
                    </b-button>
                    <b-button @click="enviarCorreo" :disabled="!cantidadPersonas || isSending" type="submit" size="lg" variant="outline-primary" >
                        {{ isSending ? 'Enviando...' : 'Enviar' }} 
                        <font-awesome-icon icon="paper-plane" />
                    </b-button>
                </b-col>
            </b-row>
        </div>
    </b-modal>
</template>

<script>

    import axios from 'axios'

    export default {
        data(){
            return{
                destinos: [],
                isSending: false,
                isLoading: false
            }
        },
        methods: {
            show(){
                this.isLoading = !this.isLoading

                axios
                .get(process.env.VUE_APP_API_URL + 'personas_revisar_acta')
                .then(response => {
                    console.log(response.data)
                    this.destinos = response.data
                    this.isLoading = !this.isLoading
                })
            },
            enviarCorreo(){

                Swal.fire({
                    title: '¿Está seguro que desea enviar el acta ha revisión?',
                    text: "Este proceso no se puede deshacer o cancelar!",
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Si, ENVIAR',
                    cancelButtonText: 'Cancelar'
                }).then((result) => {
                    if (result.value) {
                       
                        this.isSending = !this.isSending

                        let data =  {
                            id_acta: this.$route.params.id,
                            destinos: this.destinos.filter(item => item.enviar_correo)
                        }

                        axios
                        .post('https://udicat.muniguate.com/apps/api_concejo/public/api/enviar_acta_revision', data)
                        .then(response => {
                            console.log(response.data)
                            this.isSending = !this.isSending
                        })

                    }
                })

            },
            cancelarEnvio(){
                this.$bvModal.hide('modal-revision')
            },
            marcarEnviar(destino){
                destino.enviar_correo = !destino.enviar_correo
            }
        },
        computed: {
            cantidadPersonas(){

                if (this.destinos.filter(value => value.enviar_correo).length > 0) {
                    
                    return true

                }else{

                    return false

                }

            }
        }

    }
</script>