<template>

    <div>
        <div class="mt-4">
            <b-breadcrumb :items="items"></b-breadcrumb>
        </div>

        <div class="mt-4">
            <Tabs/>
        </div>
    </div>
    
</template>

<script>

    import Tabs from '../components/Bitacora/Tabs'

    export default {
        components: {
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
                        text: 'Actas',
                        href: '#/home/agenda'
                    },
                    {
                        text: 'Detalle de Acta 2 - 2019',
                        href: '#/home/agenda/detalle/67'
                    },
                    {
                        text: 'Bitácora',
                        active: true
                    }
                ]
            }
        }
    }
</script>