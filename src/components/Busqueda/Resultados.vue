<template>
    <div>
        <div>
            <b-row class="text-center">
                <b-col>
                    <b-img thumbnail fluid src="img/logo_muni.png" width="250" alt="Image 1" rounded="circle"></b-img>
                </b-col>
            </b-row>

            <b-form @submit.prevent="buscar">
                <b-row class="mt-4 text-center" align-h="center">
                    <b-col cols="6">
                        <b-form-input placeholder="Ingrese el texto a buscar..." size="lg" v-model="busqueda" autocomplete="off" required>
                            <span>Test</span>
                        </b-form-input>
                    </b-col>
                </b-row>

                <b-row class="mt-4 text-center" align-h="center">
                    <b-button class="mr-2" variant="outline-danger" size="lg" :disabled="fieldEmpty && resultados.length <= 0" @click="cancelar">Cancelar 
                        <font-awesome-icon icon="times-circle" />
                    </b-button>
                    <b-button type="submit" variant="outline-primary" size="lg" :disabled="fieldEmpty || isSearching">Buscar 
                        <font-awesome-icon icon="search" />
                    </b-button>
                </b-row>
            </b-form>
        </div>

        <!-- Resultados de la busqueda -->
        <div  v-if="resultados.length > 0 && searchComplete">

            <b-card class="mt-4" v-for="resultado in listaResultados" :key="resultado.id" >

                <div v-if="resultado.resultado_agenda">
                    <b-row class="mb-2" >
                        <b-col sm="2" class="text-sm-right"><b>Agenda:</b></b-col>
                        <b-col>
                            {{ resultado.agenda ? resultado.agenda.fecha : 'No disponible' }}
                        </b-col>
                        
                    </b-row>
                    <b-row class="mg-2">
                        <b-col sm="2" class="text-sm-right"><b>Punto de Agenda:</b></b-col>
                        <b-col>
                            <!-- {{ resultado.descripcion }} -->
                            <strong>{{ resultado.orden }}. </strong><text-highlight :queries="busqueda">{{ resultado.descripcion }}</text-highlight>
                        </b-col>
                    </b-row>

                    <hr>

                    <b-row class="mb-2" >
                        <b-col sm="2" class="text-sm-right"><b>Acta:</b></b-col>
                        <b-col>
                            {{ resultado.acta ? resultado.acta.no_acta + ' - ' + resultado.acta.year : 'Pendiente' }}
                        </b-col>
                        
                    </b-row>

                    <b-row class="mg-2">
                        <b-col sm="2" class="text-sm-right"><b>Punto de Acta:</b></b-col>
                        <b-col>
                            <span v-if="resultado.punto_acta" v-html="resultado.punto_acta.descripcion"></span>

                            <span v-if="!resultado.punto_acta">Pendiente</span>
                        </b-col>
                    </b-row>

                    <b-row class="text-center">
                        <b-col cols="12">
                            <b-button variant="light" v-b-tooltip.hover title="Visualizar Archivo" @click="mostrarDocumento(resultado)">
                                <font-awesome-icon icon="file-pdf" />
                            </b-button>
                            <div class="text-right">
                                <small class="text-muted ">Fuente: Agendas</small>
                            </div>
                        </b-col>
                    </b-row>
                </div>

                <div v-if="resultado.resultado_acta">
                    <b-row class="mb-2">
                        <b-col sm="2" class="text-sm-right"><b>Acta:</b></b-col>
                        <b-col>
                            {{ resultado.acta ? resultado.acta.no_acta + ' - ' + resultado.acta.year : 'No disponible' }}
                        </b-col>
                    </b-row>

                    <b-row class="mg-2">
                        <b-col sm="2" class="text-sm-right"><b>Punto de Acta:</b></b-col>
                        <b-col>
                            <!-- {{ resultado.descripcion }} -->
                            <!-- <strong>{{ resultado.orden }}. </strong><text-highlight :queries="busqueda">{{ resultado.descripcion }}</text-highlight> -->
                            
                            <div v-html="resultado.descripcion"></div>

                            <!-- <text-highlight :queries="busqueda">
                                {{ resultado.descripcion }}
                            </text-highlight> -->

                        </b-col>
                    </b-row>

                    <hr>

                    <b-row class="mb-2" >
                        <b-col sm="2" class="text-sm-right"><b>Agenda:</b></b-col>
                        <b-col>
                            {{ resultado.acta.agenda ? resultado.acta.agenda.fecha : 'No disponible' }}
                        </b-col>
                        
                    </b-row>

                    <b-row class="mg-2">
                        <b-col sm="2" class="text-sm-right"><b>Punto de Agenda:</b></b-col>
                        <b-col>
                            <!-- <span v-if="resultado.punto_acta" v-html="resultado.punto_acta.descripcion"></span>

                            <span v-if="!resultado.punto_acta">Pendiente</span> -->
                            <strong>{{ resultado.punto_agenda.orden }}. </strong>{{ resultado.punto_agenda.descripcion }}
                        </b-col>
                    </b-row>

                    <b-row class="text-center">
                        <b-col cols="12">
                            <b-button variant="light" v-b-tooltip.hover title="Visualizar Archivo" @click="mostrarDocumento(resultado)">
                                <font-awesome-icon icon="file-pdf" />
                            </b-button>
                            <div class="text-right">
                                <small class="text-muted ">Fuente: Actas</small>
                            </div>
                        </b-col>
                    </b-row>

                </div>

            </b-card>

            <b-row class="mt-4">
                <b-col >
                    <b-pagination v-model="currentPage" :total-rows="rows" :per-page="perPage" aria-controls="my-table" align="center"></b-pagination>

                </b-col>
            </b-row>

        </div>

        <!-- Sin resultados -->
        <div class="mt-4" v-if="resultados.length <= 0 && searchComplete">
            <b-row class="text-center">
                <b-col>
                    <h3>No se ha encontrado nada que coincida con su búsqueda</h3>
                </b-col>
            </b-row>
        </div>

        <!-- Buscando -->
        <div class="mt-4" v-if="isSearching">
            <div class="text-center my-2">
                <b-spinner class="align-middle"></b-spinner>
                <div class="mt-2">
                    <strong>Buscando, espere un momento por favor...</strong>
                </div>
            </div>
        </div>

        <VistaPrevia :id_acta="id_acta" />

        <ModalPDF :id_agenda="id_agenda" />

    </div>
</template>

<style scoped>
    mark {
        background-color: yellow;
    }
</style>

<script>

    import axios from 'axios'
    import TextHighlight from 'vue-text-highlight';
    import VistaPrevia from '../DetalleActa/VistaPrevia'
    import ModalPDF from '../PuntosAgenda/ModalPDF'

    export default {
        components: {
            TextHighlight,
            VistaPrevia,
            ModalPDF
        },
        data(){
            return{
                busqueda: null,
                isSearching: false,
                resultados: [],
                searchComplete: false,
                perPage: 4,
                currentPage: 1,
                rows: null,
                id_acta: null,
                id_agenda: null
            }
        },
        methods: {
            buscar(){

                this.isSearching = !this.isSearching
                this.searchComplete = false

                let data = {
                    busqueda: this.busqueda
                }

                axios.post(process.env.VUE_APP_API_URL + 'buscar', data)
                .then(response => {
                    console.log(response.data)
                    this.resultados = response.data
                    this.rows = this.resultados.length
                    this.isSearching = !this.isSearching
                    this.searchComplete = true
                })
                
            },
            cancelar(){
                this.busqueda = null
                this.isSearching = false
                this.searchComplete = false
                this.resultados = []
            },
            mostrarDocumento(item){

                console.log(item)

                if (item.acta) {
                    
                    console.log('mostrar documento tipo acta')
                    console.log(item.acta.id)
                    this.id_acta = item.acta.id

                    this.$bvModal.show('modal-vista-previa')

                }else{

                    console.log('mostrar documento tipo agenda')
                    this.id_agenda = item.agenda.id
                    this.$bvModal.show('modal-pdf')

                }

            }
        },
        computed: {
            fieldEmpty: function(){
                if (!this.busqueda) {
                    return true    
                }else{
                    return false
                }
            },
            listaResultados(){

                return this.resultados.slice(
                    (this.currentPage - 1) * this.perPage,
                    this.currentPage * this.perPage
                )

            }
        }
    }
</script>