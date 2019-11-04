<template>
    <div>
        <div class="mt-4">
            <b-breadcrumb :items="items"></b-breadcrumb>
        </div>
        
        <ListaAgendas :showAdd="false" :showDelete="false" detailURL="detalle_agenda_sesion" dataURL="obtener_agendas_sesion" />

    </div>    
</template>

<script>

    import ListaAgendas from '@/components/Agenda/ListaAgendas.vue'

    export default {
        components: {
            ListaAgendas
        },
        data() {
            return {
                items: [
                {
                    text: 'Inicio',
                    href: '#/home'
                },
                {
                    text: 'Agendas',
                    active: true
                }
                ]
            }
        }
    }
</script>