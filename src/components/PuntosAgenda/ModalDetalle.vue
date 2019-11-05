<template>
    <b-modal size="lg" id="modal-detalle" :title="'Bitácora de Punto de Agenda'" hide-footer>
        
        <div>
            <b-table responsive="sm" head-variant="dark" hover :items="data.items" :fields="data.fields">

                <template slot="[accion]" scope="data">
                   <b-badge :variant="data.item.accion.color">{{ data.item.accion.nombre }}</b-badge>
                </template>

                <template slot="[persona]" scope="data">
                   {{ data.item.persona.usuario.usuario.toUpperCase() }}
                </template>

                <template slot="[show_details]" class="text-center" slot-scope="row" v-if="row.item.id_accion != 1">
                    <b-button size="sm" @click="row.toggleDetails" variant="secondary" >
						<font-awesome-icon icon="info-circle"  />
					</b-button>
                </template>

                <template v-slot:row-details="row">
                    <b-card v-if="row.item.id_accion == 2">
                        <b-row class="mb-2">
                            <b-col sm="3" md="4" lg="3" class="text-sm-right"><b>Original:</b></b-col>
                            <b-col>{{ row.item.original }}</b-col>
                        </b-row>

                        <b-row class="mb-2">
                            <b-col sm="3" md="4" lg="3" class="text-sm-right"><b>Modificado:</b></b-col>
                            <b-col>{{ row.item.modificado }}</b-col>
                        </b-row>

                        <b-button size="sm" class="mt-2" @click="row.toggleDetails">Ocultar Detalles</b-button>
                    </b-card>

                     <b-card v-if="row.item.id_accion == 3">
                        <b-row class="mb-2">
                            <b-col sm="3" md="4" lg="3" class="text-sm-right"><b>Motivo:</b></b-col>
                            <b-col>{{ row.item.motivo_eliminacion }}</b-col>
                        </b-row>

                        <b-button size="sm" class="mt-2" @click="row.toggleDetails">Ocultar Detalles</b-button>
                    </b-card>
                </template>

            </b-table>
        </div>

    </b-modal>
</template>

<script>
    export default {
        name: 'ModalDetalle',
        props: {
            data: Object,
            labels: Array,
            punto: {
                type: String,
                default: ''
            }
        }      
    }
    
</script>