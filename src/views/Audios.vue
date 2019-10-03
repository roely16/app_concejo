<template>
    <div>
        <div class="mt-4">
            <b-breadcrumb :items="items"></b-breadcrumb>
        </div>

        <Lista />

    </div>    
</template>

<script>

    import Lista from '../components/Audios/Lista'

    export default {
        components: {
            Lista
        },
        data(){
            return{
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
                        text: 'Detalle de Agenda ',
                        href: '#/home/agenda/detalle/' + this.$route.params.id
                    },
                    {
                        text: 'Audios',
                        active: true
                    }
                ],
            }
        }
    }
</script>