<template>

    <div>

        <b-row class="mb-3">
            <b-col cols="4">
               <b-input-group>
                    <b-form-input></b-form-input>

                    <b-input-group-append>
						<b-button variant="outline-secondary" disabled>
							<font-awesome-icon icon="search" />
						</b-button>
						
					</b-input-group-append>
                    
                </b-input-group> 
            </b-col>
            <b-col cols="8" class="text-right">
                <b-button class="mr-2" variant="outline-success" v-on:click="orderLista()">Ordenar
                    <font-awesome-icon icon="sort" />
                </b-button>

                <b-button variant="outline-primary" v-on:click="crearPunto()">Crear Punto
                    <font-awesome-icon icon="plus-circle" />
                </b-button>
            </b-col>
        </b-row>

        <b-list-group id="items">
            <b-list-group-item class="mb-2" v-for="punto in puntos_agenda" :key="punto.id" :variant="list_variant">
                <b-row>
                    <b-col cols="1">
                        {{ punto.orden }}. 
                    </b-col>
                    <b-col cols="9">
                        <p class="lead text-justify">{{ punto.descripcion }}</p>
                    </b-col>
                    <b-col cols="2" class="text-right">
                        <b-button size="sm" class="mr-1" variant="outline-primary" v-b-modal.modal-1>
                            <font-awesome-icon icon="edit" />
                        </b-button>

                        <b-button size="sm" variant="outline-danger">
                            <font-awesome-icon icon="trash-alt" />
                        </b-button>
                    </b-col>
                </b-row>
            </b-list-group-item>
        </b-list-group>

        <ModalPunto :title="title_modal" :orden="ultimo_punto"></ModalPunto>
    </div>

</template>

<script>

    import Sortable from 'sortablejs/modular/sortable.complete.esm.js';
    import ModalPunto from '../PuntosAgenda/ModalPunto'
    import axios from 'axios'

    export default {
        components: {
            ModalPunto
        },
        data() {
            return {
                items: [
                    { age: 40, first_name: 'Dickerson', last_name: 'Macdonald' },
                    { age: 21, first_name: 'Larsen', last_name: 'Shaw' },
                    { age: 89, first_name: 'Geneva', last_name: 'Wilson' },
                    { age: 38, first_name: 'Jami', last_name: 'Carney' }
                ],
                title_modal: null,
                puntos_agenda: [],
                ultimo_punto: null,
                list_variant: null,
                ordenando: false
            }
        },
        methods:{
            crearPunto(){

                this.title_modal = "Crear Punto de Agenda"
                this.$bvModal.show('modal-punto')                
            },
            getData(){

                axios({
                    method: 'GET',
                    url: 'https://udicat.muniguate.com/apps/api_consejo/public/api/puntos_agenda/' + this.$route.params.id,
                })
                .then(response => {

                    console.log(response)
                    this.puntos_agenda = response.data
                    this.ultimo_punto = this.puntos_agenda.length + 1
                
                })
                .catch(error => {
                    console.log(error)
                })

            },
            orderLista(){

                var el = document.getElementById('items');
                
                new Sortable(el, {
                    // handle: '.handle',
                    animation: 150,
                    ghostClass: 'blue-background-class'
                });

                this.list_variant = 'secondary'

            }
        },
        mounted(){
            this.getData();

            this.$root.$on('obtenerPuntos', () => {
				this.getData()
            })
            
            console.log(this.$route.params.id)
        }
    }
</script>