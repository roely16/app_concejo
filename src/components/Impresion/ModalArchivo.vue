<template>
    <b-modal id="modal-archivo" title="Generar Archivo Para Impresión" hide-footer :size="sizeModal" @shown="show">
        
        <div v-if="!isLoading">


            {{ cantidad_h_contraloria }} {{ asignar_p_documento }} {{ menos_ultimo_lote }} {{ activar_boton_agregar }} 
            <!-- {{ restantes }} {{ total_p_documento }} -->

            <b-row v-for="(item, index) in historial_impresion" :key="index">
                <b-col cols="3">
                    <b-form-group label="Lote" label-class="font-weight-bold">
                        <b-form-select v-model="historial_impresion[index].id_lote" :options="options" @change="seleccionarLote(index)" :disabled="historial_impresion[index].deshabilitar">
                            <template v-slot:first>
                                <option :value="null" disabled>-- Seleccione una opción --</option>
                            </template>
                        </b-form-select>
                    </b-form-group>
                </b-col>
                <b-col cols="4">
                    <b-form-group label="Hojas Contraloria" label-class="font-weight-bold">
                        
                        <b-row>
                            <b-col cols="5">
                                <b-form-group :description="historial_impresion[index].id_lote ? historial_impresion[index].minimo : ''"> 
                                    <b-form-input type="number" v-model="historial_impresion[index].inicio" :disabled="!historial_impresion[index].id_lote || historial_impresion[index].deshabilitar" autocomplete="off" :state="historial_impresion[index].menor_corresponde" required></b-form-input>
                                </b-form-group>

                            </b-col>
                            -
                            <b-col cols="5">
                            
                                <b-form-group :description="historial_impresion[index].id_lote ? historial_impresion[index].maximo : ''">
                                    <b-form-input type="number" autocomplete="off" v-model="historial_impresion[index].fin" :disabled="!historial_impresion[index].id_lote || historial_impresion[index].deshabilitar" :state="historial_impresion[index].total_alcanzado" required></b-form-input>
                                </b-form-group>

                            </b-col>
                        </b-row>

                    </b-form-group>
                </b-col>

                <b-col cols="3">
                    <b-form-group label="Páginas Documento" label-class="font-weight-bold">
                        
                        <b-row>
                            <b-col cols="5">
                                <b-form-input type="number" v-model="historial_impresion[index].pag_inicio" :disabled="!historial_impresion[index].id_lote || historial_impresion[index].deshabilitar" autocomplete="off" required></b-form-input>

                            </b-col>
                            -
                            <b-col cols="5">
                                <b-form-input type="number" v-model="historial_impresion[index].pag_fin" :disabled="!historial_impresion[index].id_lote || historial_impresion[index].deshabilitar" autocomplete="off" required></b-form-input>

                            </b-col>
                        </b-row>

                    </b-form-group>
                </b-col>
                
                <b-col cols="2"  class="text-center">
                    <b-form-group label="Acciones" label-class="font-weight-bold">
                    <b-button class="mr-2" variant="outline-danger" v-if="index > 0" @click="removerHistorial(index)">
                        <font-awesome-icon icon="times" />
                    </b-button>
                    <b-button  variant="outline-primary" :disabled="index + 1 != historial_impresion.length || total_alcanzado || !historial_impresion[index].activar_boton" @click="agregarHistorial(item, index)">
                        <font-awesome-icon icon="plus" />
                    </b-button>
                    </b-form-group>
                </b-col>
            </b-row>

            <div class="mb-3" id="vista-previa" v-if="showFile">

            </div>

            <b-row>
                <b-col cols="2">
                    <b-button class="text-center" size="sm" variant="outline-secondary" @click="mostrarArchivo">{{ showFile ? 'Ocultar Archivo': 'Mostrar Archivo' }}
                        <font-awesome-icon :icon="!showFile ? 'eye' : 'eye-slash'" />
                    </b-button>
                    
                </b-col>
                <b-col cols="2" v-if="paginas_pdf">
                    <small><strong>Cantidad de Páginas: {{ paginas_pdf }}</strong> </small>
                </b-col>
            </b-row>

            <b-row class="mt-4 text-center">
                <b-col>
                    <b-button @click="cerrarModal" size="lg" class="mr-2" variant="outline-danger">Cancelar 
                        <font-awesome-icon icon="times-circle" />
                    </b-button>
                    <b-button size="lg" variant="outline-primary" :disabled="isSaving || restantes > 0" @click="generarArchivo">Generar 
                        <font-awesome-icon icon="save" />
                    </b-button>
                </b-col>
            </b-row>
        </div>
    </b-modal>        
</template>

<style scoped>
    .pdfobject-container { height: 40rem; }
</style>

<script>

    import axios from 'axios'

    export default {
        data(){
            return{
                isSaving: false,
                showFile: false,
                sizeModal: 'xl',
                selected: null,
                options: [],
                isLoading: false,
                historial_impresion: [
                    {
                        id_lote: null,
                        inicio: null,
                        fin: null,
                        pag_inicio: null,
                        pag_fin: null
                    },
                ],
                paginas_pdf: null
            }
        },
        methods: {
            cerrarModal(){
                this.$bvModal.hide('modal-archivo')
            },
            show(){

                // Obtener los lotes de páginas

                this.isLoading = true

                this.historial_impresion = [
                    {
                        id_lote: null,
                        inicio: null,
                        fin: null,
                        pag_inicio: null,
                        pag_fin: null
                    }
                ]

                this.showFile = false
                this.paginas_pdf = null
                
                axios
                .get(process.env.VUE_APP_API_URL +  'obtener_lotes_disponibles')
                .then(response => {
                    this.options = response.data
                })

                axios({
                    method: 'GET',
                    url: process.env.VUE_APP_API_URL + 'vista_previa_acta/' + this.$route.params.id,
                    responseType: 'arraybuffer'
                })
                .then(response => {
                    
                    let blob = new Blob([response.data], { type: 'application/pdf' })
                    
                    var input = document.getElementById("vista-previa");
                    var reader = new FileReader();

                    let self = this

                    reader.readAsBinaryString(blob);
                    reader.onloadend = function(){
                        var count = reader.result.match(/\/Type[\s]*\/Page[^s]/g).length;
                        self.paginas_pdf = 50
                        self.isLoading = false
                    }

                })
                .catch(error => {
                    console.log(error)
                })

            },
            mostrarArchivo(){
                this.showFile = !this.showFile

                if (this.showFile) {
                    
                    this.sizeModal = "xl"

                    axios({
                        method: 'GET',
                        url: process.env.VUE_APP_API_URL + 'vista_previa_acta/' + this.$route.params.id,
                        responseType: 'arraybuffer'
                    })
                    .then(response => {
                        
                        let blob = new Blob([response.data], { type: 'application/pdf' })
                        let link = document.createElement('a')
                        link.href = window.URL.createObjectURL(blob)
                    
                        PDFObject.embed(link.href + '#toolbar=0', "#vista-previa")
                        
                        var input = document.getElementById("vista-previa");
                        var reader = new FileReader();

                        let self = this

                        reader.readAsBinaryString(blob);
                        reader.onloadend = function(){
                            var count = reader.result.match(/\/Type[\s]*\/Page[^s]/g).length;
                            self.paginas_pdf = count
                        }

                    })
                    .catch(error => {
                        console.log(error)
                    })

                }else{

                    this.sizeModal = 'xl'

                }
            },
            generarArchivo(){

                Swal.fire({
                    title: '¿Está seguro?',
                    text: "Se almacenará el archivo y estará disponible para su impresión!",
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Si, GENERAR',
                    cancelButtonText: 'Cancelar'
                }).then((result) => {
                    if (result.value) {
                        
                        // Realizar la validación de la asignación de páginas
                        let samePages = true

                        this.historial_impresion.forEach(historial => {
                            
                            let hojas_contraloria = parseInt(historial.fin) - parseInt(historial.inicio) + 1
                            let hojas_documento = parseInt(historial.pag_fin) - parseInt(historial.pag_inicio) + 1

                            if (hojas_contraloria != hojas_documento) {
                                samePages = false
                            }

                        });

                        if (!samePages) {
                            console.log('no se puede registrar')

                            Swal.fire({
                                type: 'error',
                                title: 'Error...',
                                text: 'La cantidad de hojas de la contraloria debe ser igual a la cantidad de páginas del documento!',
                            })
                        }

                        let data = {
                            historial: this.historial_impresion,
                            id_acta: this.$route.params.id
                        }

                        axios
                        .post(process.env.VUE_APP_API_URL +  'registrar_archivo_impresion', data)
                        .then(response => {
                            console.log(response.data)
                        })

                    }
                })

            },
            agregarHistorial(item, index){

                this.historial_impresion.push({
                    id_lote: null,
                    inicio: null,
                    fin: null,
                })

                let option = this.options.filter(element => element.id == item.id_lote)

                option[0].disabled = true

                this.historial_impresion[index].deshabilitar = true

            },
            removerHistorial(index){

                this.historial_impresion.splice(index, 1)

            },
            seleccionarLote(index){

                let option = this.options.filter(element => element.id == this.historial_impresion[index].id_lote)

                if (option[0].ultimo_registro) {
                    
                    this.historial_impresion[index].inicio = parseInt(option[0].ultimo_registro.pagina) + 1
                    this.historial_impresion[index].minimo = 'Mínimo ' + (parseInt(option[0].ultimo_registro.pagina) + 1)
                    this.historial_impresion[index].maximo = 'Máximo ' + parseInt(option[0].finaliza)

                }else{

                    this.historial_impresion[index].inicio = parseInt(option[0].inicia)
                    this.historial_impresion[index].minimo = 'Mínimo ' + parseInt(option[0].inicia)
                    this.historial_impresion[index].maximo = 'Máximo ' + parseInt(option[0].finaliza)

                }

            }
        },
        computed: {

            cantidad_h_contraloria: function(){

                let total_paginas = null

                this.historial_impresion.forEach(element => {
                    
                    if (element.id_lote && element.fin) {
                        
                        let total = parseInt(element.fin) - parseInt(element.inicio) + 1
                        total_paginas = total_paginas + total

                        // Si la cantidad ingresada es mayor a lo que tiene el lote restante

                        let option = this.options.filter(item => item.id == element.id_lote)
                        let restantes_lote = null

                        if (option[0].ultimo_registro) {
                            
                            restantes_lote = parseInt(option[0].finaliza) - parseInt(option[0].ultimo_registro.pagina)

                        }else{

                            restantes_lote = parseInt(option[0].finaliza)

                        }

                        // Marcar como error
                        if (restantes_lote < (parseInt(element.fin) - parseInt(element.inicio) + 1) || element.fin < element.inicio) {
                            
                            element.total_alcanzado = false

                        }else{
                            
                            element.total_alcanzado = true

                        }

                        // Si se sobrepasa la cantidad de hojas con las del documento

                    }

                });

            },
            total_h_contraloria: function(){

                let total = null

                this.historial_impresion.forEach(element => {
                    
                    total = total + (element.fin - element.inicio + 1)

                });

                return total

            },
            total_p_documento: function(){

                let total = null

                this.historial_impresion.forEach(element => {
                    
                    if (element.pag_inicio && element.pag_fin) {
                        
                        total = total + (element.pag_fin - element.pag_inicio + 1)

                    }

                });

                return total

            },
            total_alcanzado: function(){

                if (this.total_h_contraloria == this.paginas_pdf) {
                    
                    return true

                }else {

                    return false
                }

            },
            asignar_p_documento: function(){

                let i = 0

                this.historial_impresion.forEach(element => {
                    
                    if (element.id_lote && element.inicio && element.fin) {
                        
                        let total = element.fin - element.inicio + 1
                        
                        if (i == 0) {
                            
                            element.pag_inicio = 1
                            element.pag_fin = total

                        }else{

                            element.pag_inicio = this.total_p_documento + 1
                            element.pag_fin = this.total_p_documento + total

                        }

                        if (!element.total_alcanzado) {
                            
                            element.pag_inicio = null
                            element.pag_fin = null
                        }
                        
                        
                    }

                    i++

                });

            },
            menos_ultimo_lote: function(){

                this.historial_impresion.forEach(item => {

                    if (item.id_lote) {
                        
                        console.log('menor')

                        let option = this.options.filter(element => element.id == item.id_lote)

                        // Si tiene ultimo registro

                        let ultimo_corresponde = null

                        if (option[0].ultimo_registro) {
                            
                            ultimo_corresponde = parseInt(option[0].ultimo_registro.pagina) + 1

                        }else{

                             ultimo_corresponde = 1

                        }

                        if (item.inicio < ultimo_corresponde) {
                                
                            item.menor_corresponde = false

                        }else{

                            item.menor_corresponde = true
                            
                        }


                    }else{

                        item.menor_corresponde =  null

                    }

                })

            },
            activar_boton_agregar: function(){

                this.historial_impresion.forEach(element => {
                    
                    if (element.id_lote && element.fin) {
                        
                        let option = this.options.filter(item => item.id == element.id_lote)

                        if (option[0].ultimo_registro) {
                            
                            let restantes_lote = parseInt(option[0].finaliza) - parseInt(option[0].ultimo_registro.pagina)

                            let suma_hojas = parseInt(element.fin - element.inicio + 1)

                            let restantes_lote_menos_hojas = restantes_lote - suma_hojas

                            // Si en el lote ya no hay restantes
                            if (restantes_lote_menos_hojas <= 0) {
                                
                                // Aún se tienen hojas pendientes en el documento
                                
                                if (this.restantes > 0 && element.pag_inicio != null && element.pag_fin != null) {
                                
                                    // Habilitar el botón para agregar de otro lote
                                    element.activar_boton = true

                                }
                            }

                            if (this.restantes > 0) {
                                
                                // Aún quedan páginas del documento sin asignar
                                if (restantes_lote > suma_hojas) {
                                
                                    element.activar_boton = false

                                }

                            }else{


                                element.activar_boton = false

                            }

                            // Si las hojas agregadas no terminan las restantes del lote no se activa el botón
                            if (restantes_lote > suma_hojas) {
                                
                                element.activar_boton = false

                            }


                        }

                        
                    }

                });

            },
            restantes: function(){

                return this.paginas_pdf - this.total_p_documento

            }

        },
        watch: {



        }
    }
</script>