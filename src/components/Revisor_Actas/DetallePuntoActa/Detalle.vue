<template>

    <div>

        <div v-if="!isLoading">

            <b-card class="mb-3">
                <b-row>
                    <b-col>
                        <b-form-group
                            label="Agenda de Fecha"
                        >
                            <h5>{{ detalle_punto.agenda ? detalle_punto.agenda.fecha : 'Cargando...' }}</h5>
                        </b-form-group>
                    </b-col>
                    <b-col>
                        <b-form-group
                            label="Tipo de Sesión"
                        >
                            <h5>{{ detalle_punto.agenda ? detalle_punto.agenda.tipo_agenda.nombre : 'Cargando...' }}</h5>
                        </b-form-group>
                    </b-col>
                </b-row>
            </b-card>

            <b-card>
                <b-row>
                    <b-col cols="12">
                        <b-form-group label="Punto de Agenda" label-class="font-weight-bold">
                            <!-- <b-form-textarea v-model="detalle_punto.descripcion" disabled></b-form-textarea> -->
                            <p class="text-justify">{{ detalle_punto.descripcion }}</p>
                        </b-form-group>
                    </b-col>

                </b-row>

                <b-row v-if="detalle_punto_acta != null">

                    <b-col cols="12">
                        <b-form-group label="Punto de Acta" label-class="font-weight-bold">
                            <!-- <b-form-textarea rows="4" v-model="detalle_punto_acta.descripcion" :disabled="!isEditing"></b-form-textarea> -->
                            <b-card :bg-variant="!isEditing ? 'light' : 'default'" text-variant="dark">
                                <div class="editor">
                                <editor-menu-bar :editor="editor" v-slot="{ commands, isActive }">
                                    <div class="menubar">

                                        <button class="menubar__button" :class="{ 'is-active': isActive.bold() }" @click="commands.bold">
                                            <font-awesome-icon icon="bold" />
                                        </button>

                                        <button class="menubar__button" :class="{ 'is-active': isActive.italic() }" @click="commands.italic">
                                            <font-awesome-icon icon="italic" />
                                        </button>

                                        <button class="menubar__button" :class="{ 'is-active': isActive.strike() }" @click="commands.strike">
                                            <font-awesome-icon icon="strikethrough" />
                                        </button>

                                        <button class="menubar__button" :class="{ 'is-active': isActive.underline() }" @click="commands.underline">
                                            <font-awesome-icon icon="underline" />
                                        </button>

                                        <button class="menubar__button" :class="{ 'is-active': isActive.code() }" @click="commands.code">
                                            <font-awesome-icon icon="code" />
                                        </button>
                                    </div>
                                </editor-menu-bar>
                                <editor-content class="editor__content" v-if="editor" :editor="editor" />
                            </div>
                            </b-card>
                            
                        </b-form-group>
                    </b-col>

                    <b-col cols="4">

                        <b-button-group class="mr-2" v-if="isEditing">
                            <b-button variant="outline-success" @click="editarPuntoActa">
                                Guardar
                                <font-awesome-icon icon="save" />
                                <b-spinner v-if="isSaving" small class="ml-2"></b-spinner>
                            </b-button>
                            <b-button variant="outline-secondary" @click="cancelarEditar">
                                Cancelar
                                <font-awesome-icon icon="times-circle" />
                            </b-button>
                        </b-button-group>

                        <b-button class="mr-2" v-if="!isEditing" @click="editarPuntoActa" variant="outline-primary">Editar 
                            <font-awesome-icon icon="edit" />
                        </b-button>
                        <!-- <b-button variant="outline-info" v-b-modal.modal-bitacora>Bitácora 
                            <font-awesome-icon icon="list-alt" />
                        </b-button> -->
                    </b-col>
                    <b-col cols="8" class="text-right">
                        <b-button variant="outline-success" @click="aprobarPunto">Revisado 
                            <font-awesome-icon icon="check" />
                        </b-button>
                    </b-col>
                </b-row>

                <b-row align-h="center" v-if="!agregar_punto_acta && detalle_punto_acta == null">
                    <b-col cols="3">
                        <b-button variant="outline-success" @click="agregarPunto">Agregar Punto de Acta 
                            <font-awesome-icon icon="plus-circle" />
                        </b-button>
                    </b-col>
                </b-row>

                <!-- Registro -->
                <div v-if="agregar_punto_acta && detalle_punto_acta == null">
                    <b-row>
                            <b-col cols="12">
                                
                            </b-col>

                            <b-col cols="12">
                                <b-form-group label="Punto de Acta" label-class="font-weight-bold">
                                   
                                    <b-card bg-variant="default" text-variant="dark">
                                        <div class="editor shadow-none">
                                            <editor-menu-bar :editor="editor" v-slot="{ commands, isActive }">
                                                <div class="menubar">
                                                    <button class="menubar__button" :class="{ 'is-active': isActive.bold() }" @click="commands.bold">
                                                        <font-awesome-icon icon="bold" />
                                                    </button>

                                                    <button class="menubar__button" :class="{ 'is-active': isActive.italic() }" @click="commands.italic">
                                                        <font-awesome-icon icon="italic" />
                                                    </button>

                                                    <button class="menubar__button" :class="{ 'is-active': isActive.strike() }" @click="commands.strike">
                                                        <font-awesome-icon icon="strikethrough" />
                                                    </button>

                                                    <button class="menubar__button" :class="{ 'is-active': isActive.underline() }" @click="commands.underline">
                                                        <font-awesome-icon icon="underline" />
                                                    </button>

                                                    <button class="menubar__button" :class="{ 'is-active': isActive.code() }" @click="commands.code">
                                                        <font-awesome-icon icon="code" />
                                                    </button>
                                                </div>
                                            </editor-menu-bar>
                                            <editor-content class="editor__content shadow-none no-border" :editor="editor" />
                                        </div>
                                    </b-card>
                                </b-form-group>
                            </b-col>

                            <b-col cols="4">
                                <b-button @click="registrarPunto" :disabled="isAdd" class="mr-2" variant="outline-success">Guardar 
                                    <font-awesome-icon icon="save" />
                                </b-button>
                                <b-button variant="outline-secondary" @click="cancelarRegistro">Cancelar
                                    <font-awesome-icon icon="times-circle" />
                                </b-button>
                            </b-col>
                        
                    </b-row>
                </div>

            </b-card>

            <div class="mt-3">
                <b-card no-body>
                    <b-tabs card>
                    <b-tab title="Documentos" active>
                        <Documentos :id_agenda="detalle_punto.agenda ? detalle_punto.agenda.id : null"/>
                    </b-tab>
                    <b-tab title="Audios">
                        <Audios :id_agenda="detalle_punto.agenda ? detalle_punto.agenda.id : null"/>
                    </b-tab>
                    </b-tabs>
                </b-card>
            </div>

            <ModalBitacora :id_punto_acta="detalle_punto_acta ? detalle_punto_acta.id : null" />

        </div>

        <div v-if="isLoading">
            <b-row>
                <b-col>
                    <div class="text-center my-2">
                        <b-spinner class="align-middle"></b-spinner>
                        <div class="mt-2">
                            <strong>Cargando datos...</strong>
                        </div>
                    </div>
                </b-col>
            </b-row>
        </div>

    </div>
</template>

<style scoped>
    .menububble.is-active {
        opacity: 1;
        visibility: visible;
    }
    .menububble {
        position: absolute;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        z-index: 20;
        background: #000;
        border-radius: 5px;
        padding: .3rem;
        margin-bottom: .5rem;
        -webkit-transform: translateX(-50%);
        transform: translateX(-50%);
        visibility: hidden;
        opacity: 0;
        -webkit-transition: opacity .2s,visibility .2s;
        transition: opacity .2s,visibility .2s;
    }
    .menububble__button {
        display: -webkit-inline-box;
        display: -ms-inline-flexbox;
        display: inline-flex;
        background: transparent;
        border: 0;
        color: #fff;
        padding: .2rem .5rem;
        margin-right: .2rem;
        border-radius: 3px;
        cursor: pointer;
    }
    .menubar {
        margin-bottom: 1rem;
        -webkit-transition: visibility .2s .4s,opacity .2s .4s;
        transition: visibility .2s .4s,opacity .2s .4s;
    }
    .menubar__button {
        font-weight: 700;
        display: -webkit-inline-box;
        display: -ms-inline-flexbox;
        display: inline-flex;
        background: transparent;
        border: 0;
        color: #000;
        padding: .2rem .5rem;
        margin-right: .2rem;
        border-radius: 3px;
        cursor: pointer;
    }
    .form-control {
        border: 0;
    }
    .no-border {
        border: 0;
        box-shadow: none; /* You may want to include this as bootstrap applies these styles too */
    }
</style>

<script>

    import axios from 'axios'
    import ModalBitacora from '@/components/DetallePuntoActa/ModalBitacora'
    import Documentos from '@/components/DetallePuntoActa/Documentos'
    import Audios from '@/components/DetallePuntoActa/Audios'
    import { Editor, EditorContent, EditorMenuBar  } from 'tiptap'

    import {
        Blockquote,
        BulletList,
        CodeBlock,
        HardBreak,
        Heading,
        ListItem,
        OrderedList,
        TodoItem,
        TodoList,
        Bold,
        Code,
        Italic,
        Link,
        Strike,
        Underline,
        History,
    } from 'tiptap-extensions'

    export default {
        components: {
            ModalBitacora,
            Documentos,
            Audios,
            EditorContent,
            EditorMenuBar,
        },
        data(){
            return{
                detalle_punto: {},
                detalle_punto_acta: {},
                agregar_punto_acta: false,
                descripcion: '',
                isEditing: false,
                isSaving: false,
                isLoading: false,
                backup_punto_acta: '',
                id_agenda: null,
                keepInBounds: true,
                editor: null
            }
        },
        methods: {
            obtenerDetalle(){

                this.isLoading = !this.isLoading

                let data = {
                    id_acta: this.$route.params.id,
                    id_punto_agenda: this.$route.params.id_punto
                }

                axios({
                    method: 'POST',
                    url: process.env.VUE_APP_API_URL + 'detalle_punto_acta_agenda',
                    data: data
                })
                .then(response => {

                    console.log(response.data)

                    this.detalle_punto = response.data.punto_agenda
                    this.detalle_punto_acta = response.data.punto_acta
                    
                    if (response.data.punto_acta) {

                        this.editor.setContent(response.data.punto_acta.descripcion)
                        this.editor.setOptions({
                            editable: false,
                        })
                    }
                    
                    this.isLoading = !this.isLoading

                })
                .catch(error => {
                    console.log(error)
                })
            },
            agregarPunto(){
                this.agregar_punto_acta = true
                this.editor.setOptions({
                    editable: this.agregar_punto_acta,
                })
                this.editor.focus()
            },
            registrarPunto(){

                let data = {
                    descripcion: this.editor.getHTML(),
                    id_acta: this.$route.params.id,
                    id_punto_agenda: this.$route.params.id_punto
                }

                axios({
                    method: 'POST',
                    url: process.env.VUE_APP_API_URL + 'registro_punto_acta',
                    data: data
                })
                .then(response => {

                    Swal.fire(
                        'Excelente!',
                        'El punto de acta ha creado exitosamente!',
                        'success'
                    )

                    this.obtenerDetalle()
                })
                .catch(error => {
                    console.log(error)
                })

            },
            cancelarRegistro(){
                this.agregar_punto_acta = false
            },
            editarPuntoActa(){

                this.isEditing = !this.isEditing
                this.editor.setOptions({
                    editable: this.isEditing 
                })

                if (!this.isEditing) {

                    let usuario = JSON.parse(localStorage.getItem('usuario'))

                    let data = {
                        descripcion: this.editor.getHTML(),
                        id: this.detalle_punto_acta.id,
                        id_acta: this.detalle_punto_acta.id_acta,
                        id_punto_agenda: this.detalle_punto_acta.id_punto,
                        original: this.backup_punto_acta,
                        id_usuario: usuario.id_persona
                    }

                    console.log(data)

                    axios({
                        method: 'POST',
                        url: process.env.VUE_APP_API_URL + 'editar_punto_acta',
                        data: data
                    })
                    .then(response => {

                        Swal.fire(
                            'Excelente!',
                            'El punto de acta ha sido editado exitosamente!',
                            'success'
                        )

                    })
                    .catch(error => {
                        console.log(error)
                    })

                }else{
                    this.backup_punto_acta = this.detalle_punto_acta.descripcion
                }

            },
            cancelarEditar(){

                this.isEditing = false
                this.detalle_punto_acta.descripcion = this.backup_punto_acta

                this.editor.setOptions({
                    editable: this.isEditing 
                })

            },
            // eliminarPunto(){

            //     Swal.fire({
            //         title: '¿Está seguro?',
            //         text: "Una vez eliminado no se podrá recuperar!",
            //         type: 'warning',
            //         showCancelButton: true,
            //         confirmButtonColor: '#3085d6',
            //         cancelButtonColor: '#d33',
            //         confirmButtonText: 'Si, ELIMINAR',
            //         cancelButtonText: 'Cancelar',
            //         input: 'textarea',
            //         inputPlaceholder: 'Ingrese la razón por la cual desea eliminar el punto de acta.'
            //     }).then((result) => {
                    
            //         if (result.value != '' && !result.dismiss) {
                        
            //             let data = {
            //                 id_punto_acta: this.detalle_punto_acta.id,
            //                 descripcion: this.detalle_punto_acta.descripcion,
            //                 motivo_eliminacion: result.value
            //             }

            //             axios({
            //                 method: 'POST',
            //                 url: process.env.VUE_APP_API_URL + 'eliminar_punto_acta',
            //                 data: data
            //             })
            //             .then(response => {
            //                 console.log(response.data)
            //             })
            //             .catch(error => {
            //                 console.log(error)
            //             })

            //         }else if(result.value == ''){

            //             Swal.fire({
            //                 type: 'error',
            //                 title: 'Error',
            //                 text: 'Debe ingresar la razón de la eliminación!',
            //             })

            //         }

            //     })

            // }
            aprobarPunto(){

                Swal.fire({
                    title: '¿Está seguro?',
                    text: "Está acción no se puede deshacer!",
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Si, marcar como REVISADO',
                    cancelButtonText: 'Cancelar'
                }).then((result) => {
                    if (result.value) {
                        
                        let usuario = JSON.parse(localStorage.getItem('usuario'))

                        let data = {
                            id_usuario: usuario.id_persona,
                            id_punto: this.detalle_punto_acta.id
                        }

                        axios
                        .post(process.env.VUE_APP_API_URL + 'marcar_punto_revisado', data)
                        .then(response => {

                            console.log(response.data)

                            Swal.fire(
                                'Excelente!',
                                'El punto de acta ha sido marcado como revisado!',
                                'success'
                            )

                        })

                    }
                })

            }

        },
        mounted(){
            
            this.editor = new Editor({
                extensions: [
                    new Blockquote(),
                    new BulletList(),
                    new CodeBlock(),
                    new HardBreak(),
                    new Heading({ levels: [1, 2, 3] }),
                    new ListItem(),
                    new OrderedList(),
                    new TodoItem(),
                    new TodoList(),
                    new Link(),
                    new Bold(),
                    new Code(),
                    new Italic(),
                    new Strike(),
                    new Underline(),
                    new History(),
                ],
                editable: false
            })
            
            this.obtenerDetalle()

        },
        computed: {
            isChange: function(){

                if (this.backup_punto_acta == this.detalle_punto_acta.descripcion) {
                    
                    return false

                }else{

                    return true
                }

            },
            isAdd: function(){

                let json = this.editor.getJSON()
                let result = json.content.filter(item => item.content)

                if (result.length <= 0) {
                    
                    return true

                }else{

                    return false

                }

            }
        }
    }
</script>