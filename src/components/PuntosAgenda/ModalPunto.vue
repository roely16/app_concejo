<template>
    <b-modal id="modal-punto" :title="title" hide-footer>
        <b-form @submit.prevent="registrarPunto">

            <b-form-group
                label="Orden:"
            >
                <b-form-input
                    v-model="orden"
                    type="text"
                    disabled
                    required
                ></b-form-input>
            </b-form-group>

            <b-form-group
                label="Descripción"
            >
                <b-form-textarea  
                    rows="10"
                    v-model="descripcion"
                    required
                ></b-form-textarea>
            </b-form-group>

            <b-row class="mt-4 text-center">
                <b-col>
                    <b-button size="lg" class="mr-2" variant="outline-danger" @click="cerrarModal">Cancelar 
                        <font-awesome-icon icon="times-circle" />
                    </b-button>
                    <b-button type="submit" size="lg" variant="outline-primary" :disabled="isSaving || notChanged">{{ !modalEdit ? 'Registrar' : 'Guardar Cambios' }} 
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
        props:{
            title: String,
            orden: Number,
            modalEdit: {
                type: Boolean,
                default: false
            },
            puntoAgenda: {
                type: Object,
                default: null,
                required: false
            },
            editURL: {
                type: String,
                default: 'editar_punto',
                required: false
            },
        },
        data(){
            return{
                isSaving: false,
                descripcion: '',
                backup_descripcion: ''
            }
        },
        methods: {
            async registrarPunto(){

                let usuario = JSON.parse(localStorage.getItem('usuario'))

                let nuevo_punto = {
                    descripcion: this.descripcion,
                    id_acta: this.$route.params.id,
                    orden: this.orden,
                    id_persona: usuario.id_persona
                }

                if (!this.modalEdit) {

                    await axios({
                        method: 'POST',
                        url: process.env.VUE_APP_API_URL + 'registrar_punto_agenda',
                        data: nuevo_punto
                    })
                    .then(response => {

                        console.log(response.data)

                        Swal.fire(
                            'Excelente!',
                            'El punto de agenda ha sido registrado exitosamente!',
                            'success'
                        ).then( () =>{

                            this.$root.$emit('obtenerPuntos')
                            this.$bvModal.hide('modal-punto')

                        })

                    })
                    .catch(error => {
                        console.log(error)
                    })

                }else{

                    let usuario = JSON.parse(localStorage.getItem('usuario'))

                    let data = {
                        id: this.puntoAgenda.id,
                        descripcion: this.descripcion,
                        original: this.backup_descripcion,
                        id_persona: usuario.id_persona
                    }

                    await axios({
                        method: 'POST',
                        url: process.env.VUE_APP_API_URL + this.editURL,
                        data: data
                    })
                    .then(response => {
                        
                        console.log(response.data)
                                
                        Swal.fire(
                            'Excelente!',
                            'El punto de agenda ha sido editado exitosamente!',
                            'success'
                        ).then( () =>{

                            this.$root.$emit('obtenerPuntos')
                            this.$bvModal.hide('modal-punto')

                        })

                    })
                    .catch(error => {
                        console.log(error)
                    })
                    
                }
                
            },
            editarPunto(){
            },
            cerrarModal(){
                this.$bvModal.hide('modal-punto')
            },
        },
        mounted(){

            this.$root.$on('bv::modal::shown', (bvEvent, modalId) => {

                if (this.modalEdit) {

                    this.descripcion = this.puntoAgenda.descripcion
                    this.backup_descripcion = this.puntoAgenda.descripcion

                }else{

                    this.descripcion = ''

                }
            })

        },
        computed: {
            notChanged: function(){
               
                if (this.descripcion == this.backup_descripcion) {
                    
                    return true

                }else{

                    return false

                }

            }
        }
        
    }
</script>