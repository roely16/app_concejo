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
                <b-button variant="outline-primary" v-b-modal.modal-lote>Nuevo Lote
                    <font-awesome-icon icon="plus-circle" />
                </b-button>
            </b-col>
        </b-row>

        <div>
            <b-table hover :items="items" :fields="fields" :per-page="perPage" :current-page="currentPage" head-variant="dark" show-empty empty-text="Aún no se han registrado lotes" small>
                
                <template slot="[registrado_por]" slot-scope="data">
                    <span :title="data.item.persona.nombre + ' ' + data.item.persona.apellido">{{ data.item.persona.usuario.usuario.toUpperCase() }}</span>
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
                        <b-button variant="outline-danger" v-on:click="eliminarLote(data.item.id)">
                            <font-awesome-icon icon="trash-alt" />
                        </b-button>
                    </div>
                </template>
                
            </b-table>

            <b-pagination v-model="currentPage" :total-rows="rows" :per-page="perPage" aria-controls="my-table" align="center" v-if="rows > 10"></b-pagination>
        </div>

        <ModalLote />

    </div>
</template>

<script>

    import axios from 'axios'
    import ModalLote from '@/components/Hojas/ModalLote'

    export default {
        components: {
            ModalLote
        },
        data(){
            return{
                busqueda: null,
                items: [],
                fields: [],
                currentPage: 1,
                rows: null,
                perPage: 5
            }
        },
        methods:{
            obtenerLotes(){

                axios
                .get( process.env.VUE_APP_API_URL + 'obtener_lotes')
                .then(response => {

                    console.log(response.data)

                    this.items = response.data.items
                    this.rows = this.items.length
                    this.fields = response.data.fields
                })

            },
            nuevoLote(){

            },
            eliminarLote(id){

            }
        },
        mounted(){

            this.obtenerLotes()

            this.$root.$on("obtenerLotes", () => {
				this.obtenerLotes();
            });

        }
    }
</script>