<template>
    <b-modal id="modal-info" title="Asistencia" hide-footer>
        
        <template v-slot:modal-header>
           <h5>{{ persona.persona[0].nombre }} {{ persona.persona[0].apellido }} <b-badge variant="primary">{{ persona.nombre }}</b-badge></h5>
        </template>

        <b-row>
            <b-col cols="12">
                <b-form-group label="Estado">
                    
                    <b-badge v-if="persona.hora == null && persona.motivo_falta == null && persona.asistencia" variant="success" style="font-size: 1rem">A Tiempo</b-badge>
                    
                    <b-badge variant="warning" v-if="persona.hora != null && persona.motivo_falta != null" style="font-size: 1rem">Llegada Tarde</b-badge>
                    
                    <b-badge variant="danger" v-if="persona.hora == null && persona.motivo_falta != null" style="font-size: 1rem">Ausencia</b-badge>
                    
                    <b-badge variant="secondary" v-if="!persona.asistencia" style="font-size: 1rem">No se registro la asistencia.</b-badge>
                </b-form-group>
            </b-col>
            <b-col cols="12" v-if="persona.hora != null">
                <b-form-group label="Hora">
                    <h5>{{ persona.hora }}</h5>
                </b-form-group>
            </b-col>
            <b-col cols="12" v-if="persona.motivo_falta != null">
                <b-form-group label="Motivo">
                    <h5>{{ persona.motivo_falta }}</h5>
                </b-form-group>
            </b-col>
        </b-row>

    </b-modal>
</template>

<script>
    export default {
        props: {
            persona: {
                type: Object,
                default: null
            }
        }
    }
</script>