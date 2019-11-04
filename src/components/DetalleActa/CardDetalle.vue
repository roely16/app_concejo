<template>
    <div>
        <b-card class="mb-3">
            <b-row>
                <b-col cols="2">
                    <b-form-group label="Acta">
                        <h5>{{ acta.no_acta }} - {{ acta.year }}</h5>
                    </b-form-group>
                </b-col>
                <b-col cols="3">
                    <b-form-group
                        label="Agenda de Fecha"
                    >
                        <h5>{{ acta.agenda ? acta.agenda.fecha : 'Cargando...' }}</h5>
                    </b-form-group>
                </b-col>
                <b-col cols="3">
                    <b-form-group
                        label="Tipo de Sesión"
                    >
                        <h5>{{ acta.agenda ? acta.agenda.tipo_agenda.nombre : 'Cargando...' }}</h5>
                    </b-form-group>
                </b-col>
                <b-col cols="4">
                    <b-form-group label="Estado">
                        <h5>
                            <b-badge :variant="acta.ultimo_estado ? acta.ultimo_estado.estado.color : 'secondary'">{{ acta.ultimo_estado ? acta.ultimo_estado.estado.nombre : 'Cargando...' }} 
                                <font-awesome-icon :icon="acta.ultimo_estado ? acta.ultimo_estado.estado.icono : 'eye'" />
                            </b-badge>
                        </h5>
                    </b-form-group>
                </b-col>
            </b-row>
        </b-card>
    </div>
</template>

<script>

    import axios from 'axios'

    export default {
        data(){
            return{
                acta: {}
            }
        },
        methods: {
            obtenerDatos(){
                axios
                .get(process.env.VUE_APP_API_URL + 'detalle_acta_agenda/' + this.$route.params.id)
                .then(response => {
                    this.acta = response.data
                })
            }
        },
        mounted(){
            this.obtenerDatos()

            this.$root.$on("recargarDetalleActa", () => {
				this.obtenerDatos();
            });
        }
    }
</script>