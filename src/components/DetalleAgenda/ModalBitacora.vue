<template>
    <b-modal id="modal-bitacora" size="lg" title="Historial" @show="show" hide-footer>
        <div>
            <b-table hover :items="items" :fields="fields" head-variant="dark">
                <template slot="[estado]" slot-scope="data">
                    <!-- {{ data.item.estado }} -->
                    <b-badge :variant="data.item.estado.color">{{ data.item.estado.nombre }} 
                        <font-awesome-icon :icon="data.item.estado.icono" />
                    </b-badge>
                </template>
                <template slot="[persona]" slot-scope="data">
                    <!-- {{ data.item.persona.nombre }} {{ data.item.persona.apellido }}  -->
                    {{ data.item.persona.usuario.usuario.toUpperCase() }}
                </template>
            </b-table>
        </div>
    </b-modal>
</template>

<script>

    import axios from 'axios'

    export default {
        data(){
            return{
                items: [],
                fields: []
            }
        },
        methods: {
            show(){

                axios
                .get(process.env.VUE_APP_API_URL + 'bitacora_agenda/' + this.$route.params.id)
                .then(response =>  {
                    console.log(response.data)
                    this.items = response.data.items
                    this.fields = response.data.fields
                })

            }
        }
    }
</script>