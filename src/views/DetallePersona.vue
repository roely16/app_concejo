<template>
    <div>
        <div class="mt-4">
            <b-breadcrumb :items="items"></b-breadcrumb>
        </div>

        <Detalle />

        <Tabs />

    </div>
</template>

<script>

    import Detalle from '../components/DetallePersona/Detalle'
    import Tabs from '../components/DetallePersona/Tabs'

    export default {
        components: {
            Detalle,
            Tabs
        },
        data() {
            return {
                items: [
                {
                    text: 'Inicio',
                    href: '#/home'
                },
                {
                    text: 'Configuración',
                    href: '#/home/configuracion'
                },
                {
                    text: 'Personas',
                    href: '#/home/configuracion/personas'
                },
                {
                    text: 'Detalle',
                    active: true
                }]
            }
        }
    }
</script>