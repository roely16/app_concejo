<template>
    <b-modal id="modal-nuevo-audio" @shown="show" :title="editMode ? 'Editar Audio' : 'Nuevo Audio'" hide-footer>

        <b-form @submit.prevent="!editMode ? registrarAudio() : editarAudio()" v-if="!isLoading">
            <b-row>
                <b-col cols="12">

                    <b-form-group v-if="!editMode || changeAudio" description="Únicamente puede seleccionar un archivo." label="Audio" label-class="font-weight-bold">
                        <!-- <b-form-input ></b-form-input> -->
                        <b-form-file placeholder="Elija el audio a subir..." drop-placeholder="Arrastre el archivo acá..." browse-text="Buscar" v-model="audio.archivo" no-drop required></b-form-file>
                    </b-form-group>

                    <b-form-group v-if="editMode && !changeAudio" label="Audio" label-class="font-weight-bold">
                        <b-row align-v="center">
                            <b-col cols="10">
                                {{ audio.nombre_archivo }}
                       
                            </b-col>
                            <b-col cols="2" class="text-right">
                                <b-button @click="cambiarAudio" size="sm"><font-awesome-icon icon="times-circle" /></b-button>
                            </b-col>
                        </b-row>
                    </b-form-group>

                </b-col>
                <b-col cols="12">
                    <b-form-group label="Nombre" label-class="font-weight-bold">
                        <b-form-input v-model="audio.nombre" autocomplete="off" required></b-form-input>
                    </b-form-group>
                </b-col>
                <b-col cols="12">
                    <b-form-group label="Descripción" label-class="font-weight-bold">
                        <b-form-textarea v-model="audio.descripcion" rows="3"></b-form-textarea>
                    </b-form-group>
                </b-col>
            </b-row>

            <b-row class="mt-4 text-center">
                <b-col>
                    <b-button @click="$bvModal.hide('modal-nuevo-audio')" size="lg" class="mr-2" variant="outline-danger">Cancelar 
                        <font-awesome-icon icon="times-circle" />
                    </b-button>
                    <b-button type="submit" size="lg" :variant="!editMode ? 'outline-success' : 'outline-primary'" :disabled="isSaving">{{ !editMode ? 'Guardar' : 'Editar' }} 
                        <font-awesome-icon :icon="!editMode ? 'save' : 'edit'" />
                    </b-button>
                </b-col>
            </b-row>

        </b-form>

         <div class="text-center mb-2" v-if="isLoading">
            <b-spinner class="align-middle"></b-spinner>
            <div class="mt-2">
                <strong>Cargando datos...</strong>
            </div>
        </div>

    </b-modal>
</template>

<script>

    import axios from 'axios'

    export default {
        props: {
            editMode: {
                type: Boolean,
                default: false
            },
            idAudio: {
                type: Number,
                default: null,
                required: false
            }
        },
        data(){
            return{
                audio: {},
                changeAudio: false,
                isSaving: false,
                isLoading: false,
                changeDocument: false
            }
        },
        methods: {
            show(){

                this.changeAudio = false

                if (this.editMode) {
                    
                    this.isLoading = !this.isLoading

                    axios({
                        method: 'GET',
                        url: process.env.VUE_APP_API_URL + 'detalle_audio/' + this.idAudio
                    })
                    .then(response => {
                        
                        this.audio = response.data
                        this.isLoading = !this.isLoading
                    
                    })
                    .catch(error => {
                        console.log(error)
                    })

                }else{

                    this.audio.archivo = null
                    this.audio.nombre = ''
                    this.audio.descripcion = ''

                }
            },
            registrarAudio(){

                let usuario = JSON.parse(localStorage.getItem('usuario'))

                this.audio.id_agenda = this.$route.params.id
                this.audio.subido_por = usuario.id_persona

                let formData = new FormData()
                formData.append('file', this.audio.archivo);
                formData.append('datos_audio', JSON.stringify(this.audio))

                axios({
                    method: 'POST',
                    url: process.env.VUE_APP_API_URL + 'registrar_audio',
                    data: formData,
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })
                .then(response => {
                    
                    this.$root.$emit('obtenerAudios')

                    Swal.fire(
                        'Excelente!',
                        'El audio ha sido subido exitosamente!',
                        'success'
                    ).then(() => {
                        this.$bvModal.hide('modal-nuevo-audio')
                    })
                  
                })
                .catch(error => {
                    console.log(error)
                })

            },
            editarAudio(){

                this.audio.changeAudio = this.changeAudio

                let formData = new FormData()
                formData.append('file', this.audio.archivo);
                formData.append('datos_audio', JSON.stringify(this.audio))

                axios({
                    method: 'POST',
                    url: process.env.VUE_APP_API_URL + 'editar_audio',
                    data: formData,
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })
                .then(response => {
                    
                    this.$root.$emit('obtenerAudios')

                    Swal.fire(
                        'Excelente!',
                        'El audio ha sido editado exitosamente!',
                        'success'
                    ).then(() => {
                        this.$bvModal.hide('modal-nuevo-audio')
                    })
                  
                })
                .catch(error => {
                    console.log(error)
                })

            },
            cambiarAudio(){

                this.changeAudio = true

            }
        }
    }
</script>