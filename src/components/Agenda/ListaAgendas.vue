<template>

    <div>

        <!-- Sección de busqueda y botón para Agregar -->
        <b-row class="mb-3">
            <b-col cols="4">
                <b-input-group>
                    <b-form-input v-model="busqueda"></b-form-input>

                    <b-input-group-append>
						<b-button variant="outline-secondary" disabled>
							<font-awesome-icon icon="search" />
						</b-button>
						
					</b-input-group-append>
                    
                </b-input-group>
            </b-col>

            <b-col cols="8" class="text-right">
                <b-button variant="outline-primary" @click="nuevaActa">Nueva Agenda
                    <font-awesome-icon icon="plus-circle" />
                </b-button>
            </b-col>
        </b-row>

        <b-table :filter="busqueda" small head-variant="dark" hover :items="items" :fields="fields" :busy="isLoading" show-empty	empty-text="Aún no se han registrado agendas" id="my-table" :per-page="perPage" :current-page="currentPage" @filtered="onFiltered">

            <div slot="table-busy" class="text-center my-2">
                <b-spinner class="align-middle"></b-spinner>
                <div class="mt-2">
                    <strong>Cargando datos...</strong>
                </div>
            </div>

            <template slot="[no_acta]" slot-scope="data">
                {{ data.item.numero_acta }} - {{ data.item.year }}
            </template>

            <template slot="[id_tipo]" slot-scope="data">
                <b-badge v-if="data.item.id_tipo == 1" variant="primary">Ordinaria</b-badge>

                <b-badge v-if="data.item.id_tipo == 2" variant="danger">Extraordinaria</b-badge>
            </template>

            <template slot="[actions]" slot-scope="data">
                <div class="text-right">
                    <b-button :to="{ name: 'detalle_agenda', params: { id: data.item.id } }" class="mr-2" variant="outline-success">
                        <font-awesome-icon icon="eye" />
                    </b-button>
                    <b-button variant="outline-danger" v-on:click="eliminarAgenda(data.item.id)">
                        <font-awesome-icon icon="trash-alt" />
                    </b-button>
                </div>
            </template>
            
        </b-table>

        <b-row v-if="rows > 0">
            <b-col>
                <h5>Total de registros: {{ rows }}</h5>
            </b-col>
            <b-col>
                <b-pagination
                    v-model="currentPage"
                    :total-rows="rows"
                    :per-page="perPage"
                    aria-controls="my-table"
                    v-if="items.length > perPage"
                    align="center"
                ></b-pagination>
            </b-col>
            <b-col></b-col>
        </b-row>
        
        

        <NuevaAgenda></NuevaAgenda>

    </div>
</template>

<script>

    import axios from 'axios'
    import NuevaAgenda from '../Agenda/NuevaAgenda'

    export default {
        components: {
            NuevaAgenda
        },
        data() {
            return {
                items: [],
                fields: [],
                isLoading: false,
                currentPage: 1,
                perPage: 10,
                busqueda: '',
                rows: null
            }
        },
        methods: {
            getData(){

                this.isLoading = !this.isLoading

                axios({
                    method: 'GET',
                    url:  process.env.VUE_APP_API_URL +  'obtener_actas',
                })
                .then(response => {

                    console.log(response)

                    this.isLoading = !this.isLoading
                    this.items = response.data.items
                    this.fields = response.data.fields
                    this.rows = this.items.length
                })
                .catch(error => {
                    console.log(error)
                })
                
            },
            nuevaActa(){

                this.$bvModal.show('modal-nueva-acta')

            },
            eliminarAgenda(id){
                console.log(id)
            },
            onFiltered(filteredItems) {
                this.rows = filteredItems.length
                this.currentPage = 1
			}
        },
        mounted(){
            this.getData()

            // Emit para refrescar los datos
            this.$root.$on('obtenerAgendas', () => {
				this.getData()
			})
        }     
    }
</script>