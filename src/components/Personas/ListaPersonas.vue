<template>
    <div>

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
            <b-col class="text-right">
                <b-button variant="outline-primary" @click="nuevaPersona">Agregar
                    <font-awesome-icon icon="plus-circle" />
                </b-button>
            </b-col>
        </b-row>

        <b-table striped hover :items="items" :busy="isLoading" :fields="fields">

            <div slot="table-busy" class="text-center my-2">
                <b-spinner class="align-middle"></b-spinner>
                <div class="mt-2">
                    <strong>Cargando datos...</strong>
                </div>
            </div>

            <template slot="[nombre]" slot-scope="data">
                {{ data.item.nombre }} {{ data.item.apellido }}
            </template>

            <template slot="[rol]" slot-scope="data" v-if="data.item.rol != null">
                
                <b-badge :variant="data.item.rol.color">{{ data.item.rol.nombre }}</b-badge>
            </template>

            <template slot="[actions]" slot-scope="data">
                <div class="text-right">
                     <b-button :to="{ name: 'detalle_persona', params: { id: data.item.id } }" class="mr-2" variant="outline-success">
                        <font-awesome-icon icon="eye" />
                    </b-button>
                    <b-button variant="outline-danger">
                        <font-awesome-icon icon="trash-alt" />
                    </b-button>
                </div>
            </template>

        </b-table>

        <ModalPersona :roles="roles" />

    </div>
</template>

<script>

    import ModalPersona from './ModalPersona'
    import axios from 'axios'

    export default {
        components: {
            ModalPersona
        },
        data() {
            return {
                items: [],
                fields: [],
                busqueda: null,
                roles: [],
                isLoading: false
            }
        },
        methods: {
            obtenerPersonas(){

                this.isLoading = !this.isLoading

                axios({
                    method: 'GET',
                    url: process.env.VUE_APP_API_URL + 'obtener_personas',
                })
                .then(response => {
                    console.log(response.data)
                    this.isLoading = !this.isLoading
                    this.items = response.data.items
                    this.fields = response.data.fields
                })
                .catch(error => {
                    console.log(error)
                })

            },
            nuevaPersona(){

                axios({

                    method: 'GET',
                    url: process.env.VUE_APP_API_URL + 'obtener_roles',

                })
                .then(response => {

                    this.roles = response.data

                    let seleccione = {
                        "value": null,
                        "text": "-- Seleccione una opción --"
                    }

                    this.roles.unshift(seleccione)

                    this.$bvModal.show('modal-persona')

                })
                .catch(error => {

                    console.log(error)

                })

            }
        },
        mounted(){
            this.obtenerPersonas()

            this.$root.$on('obtenerAsistencia', () => {
				this.obtenerPersonas()
			})
        }
    }
</script>