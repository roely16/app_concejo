<template>
    <div>
        <div class="mt-4">
            <b-breadcrumb :items="items" v-if="!isLoading"></b-breadcrumb>
        </div>

        <Listado />

    </div>
</template>

<script>

    import Listado from '@/components/AsistenteSesion/PuntosAgenda/Listado'

    export default {
        
        components: {
            Listado
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
                        href: '#/home/agendas_sesion'
                    },
                    {
                        // text: 'Detalle de ' + this.no_acta,
                        text: 'Detalle de Agenda',
                        href: '#/home/agendas_sesion/detalle/' + this.$route.params.id
                    },
                    {
                        text: 'Puntos de Agenda',
                        active: true
                    }
                ],
                isLoading: false,
                detalle_agenda: {}
            }
        },

    }
</script>