<template>
    <div>
        <div class="mt-4">
            <b-breadcrumb :items="items"></b-breadcrumb>
        </div>
        
        <ListaAgendas />

    </div>
</template>

<script>
    
    import ListaAgendas from '@/components/Revisor_Agendas/Agenda/ListaAgendas.vue'

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