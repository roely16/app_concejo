<template>
    <b-modal id="modal-impresion" size="lg" :title="!impresion ? 'Cargando..': 'Impresión de Acta No. ' + impresion.acta.no_acta + ' - ' + impresion.acta.year" @shown="show" hide-footer>

        <div v-if="!isLoading">
            <b-row align-v="center">
                <b-col>
                    <b-input-group>
                        <b-form-input v-model="busqueda"></b-form-input>

                        <b-input-group-append>
                            <b-button variant="outline-secondary" disabled>
                                <font-awesome-icon icon="search" />
                            </b-button>
                            
                        </b-input-group-append>

                    </b-input-group>
                </b-col>
                <b-col class="text-center">
                    <b-button size="lg" variant="outline-secondary" @click="imprimir">Enviar a Imprimir 
                        <font-awesome-icon icon="print" />
                    </b-button>
                </b-col>

                <b-col class="text-right">
                    <b-button class="mr-2" size="lg" variant="outline-success" @click="allOK">
                        <font-awesome-icon icon="check" />
                    </b-button>

                    <b-button size="lg" variant="outline-danger" @click="allError">
                        <font-awesome-icon icon="times-circle" />
                    </b-button>
                </b-col>

            </b-row>

            <b-row class="mt-4">
                <b-col>
                    <div>
                        <b-table striped hover :items="items" :fields="fields" :perPage="perPage" :currentPage="currentPage" :filter="busqueda" :filterIncludedFields="filterOn" show-empty empty-filtered-text="No se han encontrado registros que coincidan con su criterio de búsqueda" @filtered="onFiltered" small>

                            <template slot="[estado]" slot-scope="data">
                                <b-badge variant="secondary" v-if="data.item.printStatus == 'pending'">PENDIENTE</b-badge>

                                <b-badge variant="success" v-if="data.item.printStatus == 'OK'">OK</b-badge>

                                <b-badge variant="danger" v-if="data.item.printStatus == 'Error'">ERROR</b-badge>

                            </template>

                            <template slot="[actions]" slot-scope="row">
                                <b-button size="sm" variant="outline-secondary" @click="row.toggleDetails">
                                    <font-awesome-icon icon="info-circle" />
                                </b-button>
                            </template>

                            <template v-slot:row-details="row">
                                <b-card>
                                    <b-row>
                                        <b-col class="text-center">
                                            <b-button class="mr-2" variant="outline-success" @click="estadoHoja(row.item, 'OK', 1)">OK 
                                                <font-awesome-icon icon="thumbs-up" />
                                            </b-button>
                                            <b-button  class="mr-2" variant="outline-danger" @click="estadoHoja(row.item, 'Error', 2)">ERROR 
                                                <font-awesome-icon icon="thumbs-down" />
                                            </b-button>
                                            <b-button variant="outline-secondary" @click="estadoHoja(row.item, 'pending', 3)">
                                                <font-awesome-icon icon="times-circle"/> PENDIENTE
                                            </b-button>
                                        </b-col>
                                    </b-row>

                                    <b-row class="mb-2 mt-4" align-h="center" v-if="row.item.printStatus == 'Error'">
                                        <b-col cols="8">
                                            <b-form-group description="Si lo desea puede agregar el motivo del error.">
                                                <b-form-textarea v-model="row.item.comentario_error"></b-form-textarea>
                                            </b-form-group>
                                        </b-col>
                                    </b-row>

                                    <b-button size="sm" @click="row.toggleDetails">Ocultar</b-button>
                                </b-card>
                            </template>

                        </b-table>

                        <b-pagination v-if="rows > perPage" v-model="currentPage" :total-rows="rows" :per-page="perPage" aria-controls="my-table" align="center"
                        ></b-pagination>

                    </div>
                </b-col>
            </b-row>

            <b-row class="mt-4 text-center">
                <b-col>
                    <b-button  size="lg" class="mr-2" variant="outline-danger" @click="cancelar">Cancelar 
                        <font-awesome-icon icon="times-circle" />
                    </b-button>
                    <b-button size="lg" variant="outline-primary" @click="guardar" :disabled="pendientes">Guardar 
                        <font-awesome-icon icon="save" />
                    </b-button>
                </b-col>
            </b-row>
        </div>
    </b-modal>  
</template>

<script>

    import axios from 'axios'

    export default {
        props: {
            id_impresion: {
                type: String,
                default: null,
                required: true
            }
        },
        data() {
            return {
                items: [],
                fields: [],
                perPage: 10,
                currentPage: 1,
                rows: null,
                busqueda: null,
                filterOn: [
                    'pagina',
                    'pagina_documento'
                ],
                isLoading: false,
                impresion: null
            }
        },
        methods: {
            show(){

                this.isLoading = !this.isLoading

                axios
                .get(process.env.VUE_APP_API_URL +  'paginas_impresion/' + this.id_impresion)
                .then(response => {
                    console.log(response.data)
                    this.items = response.data.items
                    this.fields = response.data.fields
                    this.impresion = response.data.impresion
                    this.rows = this.items.length
                    this.isLoading = !this.isLoading
                })

            },
            imprimir(){

                axios({
                    method: 'GET',
                    url: process.env.VUE_APP_API_URL + 'archivo_imprimir/' + this.id_impresion,
                    responseType: 'arraybuffer'
                })
                .then(response => {
                    
                    console.log(response.data)

                    let blob = new Blob([response.data], { type: 'application/pdf' })
                    let link = document.createElement('a')
                    link.href = window.URL.createObjectURL(blob)
                
                    console.log(link.href)                        

                    printJS(link.href)

                })
                .catch(error => {
                    console.log(error)
                })

            },
            allOK(){

                this.items.forEach(element => {
                    
                    element.printOK = true
                    element.printStatus = 'OK'
                    element.estado = 1

                });

            },
            allError(){

                this.items.forEach(element => {
                    
                    element.printOK = false
                    element.printStatus = 'Error'
                    element.estado = 2

                });

            },
            estadoHoja(item, estado, id_estado){
                item.printStatus = estado
                item.estado = id_estado
            },
            guardar(){

                let data = {
                    hojas: this.items,
                    id_impresion: this.id_impresion
                }

                axios
                .post(process.env.VUE_APP_API_URL +  'registrar_impresion', data)
                .then(response => {

                    Swal.fire(
                        'Excelente!',
                        'Se ha registrado el historial de impresión!',
                        'success'
                    ).then(()=>{
                        this.$root.$emit('obtenerImpresiones')
                        this.$bvModal.hide('modal-impresion')
                    })

                })

            },
            cancelar(){
                this.$bvModal.hide('modal-impresion')
            },
            onFiltered(filteredItems) {
				this.rows = filteredItems.length;
				this.currentPage = 1;
			}
        },
        computed: {
            pendientes: function(){

                let pendientes = this.items.filter(element => element.printStatus == 'pending');

                // if (pendientes.length > 0) {
                //     return true
                // }else{
                //     return false
                // }

                return false

            }
        }
    }
</script>