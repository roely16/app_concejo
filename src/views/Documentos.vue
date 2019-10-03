<template>
    <div>
        <div class="mt-4">
            <b-breadcrumb :items="items"></b-breadcrumb>
        </div>

        <Lista/>

        <!-- <Modal/> -->

    </div>
</template>

<script>

    import Lista from '../components/Documentos/Lista'
    import Modal from '../components/Documentos/Modal'

    export default {
        components: {
            Lista,
            Modal
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
                        text: 'Documentos',
                        active: true
                    }
                ],
            }
        }
    }
</script>