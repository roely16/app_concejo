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

            <b-col cols="8" class="text-right">
                <b-button variant="outline-primary" @click="nuevaActa">Nueva Acta
                    <font-awesome-icon icon="plus-circle" />
                </b-button>
            </b-col>
        </b-row>
        
        <div>
            <b-table striped :items="actas" :fields="fields" :filter="busqueda" small head-variant="dark" empty-filtered-text="No se han encontrado actas que coincida con su criterio de búsqueda" hover>

                <template slot="[agenda]" slot-scope="data">
                    <strong>{{ data.item.agenda.fecha }} </strong> <b-badge :variant="data.item.agenda.tipo_agenda.color">{{ data.item.agenda.tipo_agenda.nombre }}</b-badge> 
                </template>

                <template slot="[actions]" slot-scope="data">
                    <div class="text-right">
                    <b-button
                        :to="{ name: 'detalle_acta', params: { id: data.item.id } }"
                        class="mr-2"
                        variant="outline-success"
                    >
                        <font-awesome-icon icon="eye" />
                    </b-button>
                    <b-button variant="outline-danger" v-on:click="eliminarActa(data.item.id)">
                        <font-awesome-icon icon="trash-alt" />
                    </b-button>
                    </div>
                </template>
            </b-table>
        </div>

        <ModalNueva />

    </div>        
</template>

<script>

    import axios from 'axios'
    import ModalNueva from './ModalNueva'

    export default {
        components: {
            ModalNueva
        },
        data(){
            return{
                busqueda: null,
                actas: [],
                fields: []
            }
        },
        methods: {
            nuevaActa(){
                this.$bvModal.show('modal-nueva')	
            },
            obtenerActas(){

                axios({
                    method: 'GET',
                    url: process.env.VUE_APP_API_URL + 'obtener_actas',
                })
                .then(response => {
                   
                    console.log(response.data)
                    this.actas = response.data.items
                    this.fields = response.data.fields
                  
                })
                .catch(error => {
                    console.log(error)
                })

            },
            eliminarActa(id){

            }
        },
        mounted(){

            this.obtenerActas()

            this.$root.$on("obtenerActas", () => {
				this.obtenerActas();
            });
            
        }
    }
</script>