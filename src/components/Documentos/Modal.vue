<template>
    <b-modal @shown="show" id="modal-nuevo-documento" :title="modeEdit ? 'Editar Documento' : 'Nuevo Documento'" hide-footer>

        <b-form @submit.prevent="!modeEdit ? registrarDocumento() : editarDocumento()" v-if="!isLoading">
            <b-row>
                <b-col cols="12">
                    <b-form-group v-if="!modeEdit || changeDocument" description="Únicamente puede seleccionar un archivo." label="Documento" label-class="font-weight-bold">
                        <!-- <b-form-input ></b-form-input> -->
                        <b-form-file placeholder="Elija el documento a subir..." drop-placeholder="Arrastre el archivo acá..." browse-text="Buscar" v-model="documento.archivo" no-drop required></b-form-file>
                    </b-form-group>

                    <b-form-group v-if="modeEdit && !changeDocument" label="Documento" label-class="font-weight-bold">
                        <b-row align-v="center">
                            <b-col cols="10">
                                {{ documento.nombre }}
                       
                            </b-col>
                            <b-col cols="2" class="text-right">
                                 <b-button @click="cambiarDocumento" size="sm"><font-awesome-icon icon="times-circle" /></b-button>
                            </b-col>
                        </b-row>
                    </b-form-group>

                </b-col>

                <b-col cols="12">
                    <b-form-group label="Tipo" label-class="font-weight-bold">
                        <b-form-select v-model="documento.id_tipo" :options="options" value-field="id" text-field="nombre" required>
                            <template v-slot:first>
                                <option :value="null" disabled>-- Seleccione una opción --</option>
                            </template>
                        </b-form-select>
                    </b-form-group>
                </b-col>

                <b-col cols="12">
                    <b-form-group label="Autor" label-class="font-weight-bold" description="Se refiere al profesional que lo elaboró.">
                        <b-form-input v-model="documento.autor" autocomplete="off" required></b-form-input>
                    </b-form-group>
                </b-col>

                <b-col cols="12">
                    <b-form-group label="Descripción" label-class="font-weight-bold">
                        <b-form-textarea v-model="documento.descripcion" rows="3"></b-form-textarea>
                    </b-form-group>
                </b-col>

            </b-row>

            <b-row class="mt-4 text-center">
                <b-col>
                    <b-button @click="$bvModal.hide('modal-nuevo-documento')" size="lg" class="mr-2" variant="outline-danger">Cancelar 
                        <font-awesome-icon icon="times-circle" />
                    </b-button>
                    <b-button type="submit" size="lg" :variant="!modeEdit ? 'outline-success' : 'outline-primary'" :disabled="isSaving">{{ !modeEdit ? 'Guardar' : 'Editar' }} 
                        <font-awesome-icon :icon="!modeEdit ? 'save' : 'edit'" />
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
            modeEdit: {
                type: Boolean,
                default: false
            },
            idDocumento: {
                type: Number,
                default: null,
                required: false
            }
        },
        data(){
            return{
                selected: null,
                options: [],
                isSaving: false,
                documento: {
                    archivo: null,
                    id_tipo: null,
                    autor: null,
                    descripcion: null
                },
                changeDocument: false,
                isLoading: false
            }
        },
        methods: {
            show(){

                this.changeDocument = false
                this.isLoading = !this.isLoading

                if (this.modeEdit == true) {

                    axios({
                        method: 'GET',
                        url: process.env.VUE_APP_API_URL + 'detalle_documento/' + this.idDocumento
                    })
                    .then(response => {

                        console.log(response.data)
                        this.documento = response.data.detalle
                        this.options = response.data.tipos_documentos       
                        this.isLoading = !this.isLoading

                    })
                    .catch(error => {
                        console.log(error)
                    })

                }else{

                    // Realizar la petición de los tipos de documento

                    axios({
                        method: 'GET',
                        url: process.env.VUE_APP_API_URL + 'datos_modal_documento'
                    })
                    .then(response => {

                        this.options = response.data
                        this.isLoading = !this.isLoading
                    
                    })
                    .catch(error => {
                        console.log(error)
                    })

                    this.documento.archivo = ''
                    this.documento.id_tipo = null
                    this.documento.autor = ''
                    this.documento.descripcion = ''
                }

            },
            registrarDocumento(){

                this.isSaving = !this.isSaving

                let usuario = JSON.parse(localStorage.getItem('usuario'))

                let formData = new FormData()
                formData.append('file', this.documento.archivo)
                formData.append('id_tipo', this.documento.id_tipo)
                formData.append('autor', this.documento.autor)
                formData.append('descripcion', this.documento.descripcion)
                formData.append('id_agenda', this.$route.params.id)
                formData.append('id_usuario', usuario.id_persona)

                axios({
                    method: 'POST',
                    url: process.env.VUE_APP_API_URL + 'registrar_documento',
                    data: formData,
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })
                .then(response => {
                    
                    this.isSaving = !this.isSaving
                    
                    console.log(response.data)

                    this.$root.$emit('obtenerDocumentos')

                    Swal.fire(
                        'Excelente!',
                        'El archivo ha sido subido exitosamente!',
                        'success'
                    ).then(() => {
                        this.$bvModal.hide('modal-nuevo-documento')
                    })
                  
                })
                .catch(error => {
                    console.log(error)
                })
            },
            cambiarDocumento(){
                this.changeDocument = true
            },
            editarDocumento(){

                this.documento.changeDocument = this.changeDocument
                
                let formData = new FormData()
                formData.append('archivo', this.documento.archivo)
                formData.append('documento', JSON.stringify(this.documento))

                axios({
                    method: 'POST',
                    url: process.env.VUE_APP_API_URL + 'editar_documento',
                    data: formData,
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })
                .then(response => {
                    
                    this.$root.$emit('obtenerDocumentos')

                    Swal.fire(
                        'Excelente!',
                        'El archivo ha sido editado exitosamente!',
                        'success'
                    ).then(() => {
                        this.$bvModal.hide('modal-nuevo-documento')
                    })
                  
                })
                .catch(error => {
                    console.log(error)
                })

            }
        }
    }
</script>