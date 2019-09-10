<template>
    <div>
        <div class="mt-4">
            <b-breadcrumb :items="items"></b-breadcrumb>
        </div>
        <Listado></Listado>
    </div>
</template>

<script>

    import Listado from '../components/PuntosAgenda/Listado'

    export default {
        components: {
            Listado
        },
        props: {
            no_agenda: String,
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
                    href: '#/home/agenda'

                },
                {
                    text: 'Detalle de Agenda ' + this.no_agenda,
                    href: '#/home/agenda/detalle/' + this.$route.params.id

                },
                {
                    text: 'Puntos de Agenda',
                    active: true

                }
                ]
            }
        },
        mounted(){

            console.log(this.no_agenda)

        }
    }
</script>