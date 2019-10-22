<template>
    <div>
        <b-row class="mb-4">
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

        </b-row>
        
        <div>
            <b-table :filter="busqueda" small head-variant="dark" hover :items="actas" :fields="fields" :busy="isLoading" show-empty empty-text="No tiene actas pendientes de revisión" id="my-table"
      
      empty-filtered-text="No se han encontrado agendas que coincidan con su criterio de búsqueda">

                <template slot="[agenda]" slot-scope="data">
                    <strong>{{ data.item.agenda.fecha }} </strong> <b-badge :variant="data.item.agenda.tipo_agenda.color">{{ data.item.agenda.tipo_agenda.nombre }}</b-badge> 
                </template>

                <template slot="[estado]" slot-scope="data">
                    <b-badge :variant="data.item.bitacora.estado.color" style="font-size: 0.9rem">
                        {{ data.item.bitacora.estado.nombre }}
                        <font-awesome-icon :icon="data.item.bitacora.estado.icono" />
                    </b-badge>
                </template>

                <template slot="[actions]" slot-scope="data">
                    <div class="text-right">
                        <b-button
                            :to="{ name: 'detalle_acta_revision', params: { id: data.item.id } }"
                            class="mr-2"
                            variant="outline-success"
                        >
                            <font-awesome-icon icon="eye" />
                        </b-button>
                    </div>
                </template>
            </b-table>
        </div>

    </div>
</template>

<script>

    import axios from 'axios'

    export default {
        data(){
            return{
                busqueda: null,
                actas: [],
                fields: [],
                isLoading: false
            }
        },
        methods: {

            obtenerActas(){

                axios({
                    method: 'GET',
                    url: process.env.VUE_APP_API_URL + 'obtener_actas_revision',
                })
                .then(response => {
                   
                    console.log(response.data)
                    this.actas = response.data.items
                    this.fields = response.data.fields
                  
                })
                .catch(error => {
                    console.log(error)
                })

            }

        },
        mounted(){

            this.obtenerActas()

        }
    }
</script>