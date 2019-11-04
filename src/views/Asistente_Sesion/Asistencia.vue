<template>
    <div>
        <div class="mt-4">
            <b-breadcrumb :items="items"></b-breadcrumb>
        </div>

        <ListaAsistencia />

    </div>    
</template>

<script>

    import ListaAsistencia from '@/components/Asistencia/ListaAsistencia'

    export default {
        components: {
            ListaAsistencia
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
                        text: 'Asistencia',
                        active: true
                    }
                ],
                isLoading: false
            }
        },
    }
</script>