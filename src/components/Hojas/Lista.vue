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
                <b-button variant="outline-primary" @click="nuevoLote">Nuevo Lote
                    <font-awesome-icon icon="plus-circle" />
                </b-button>
            </b-col>
        </b-row>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                busqueda: null
            }
        },
        methods:{
            nuevoLote(){

            }
        }
    }
</script>