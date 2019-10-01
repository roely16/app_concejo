<template>

    <div>
        <div class="mt-4">
            <b-breadcrumb :items="items"></b-breadcrumb>
        </div>
        
        <ListaActas />

    </div>

</template>

<script>

    import ListaActas from '../components/Actas/ListaActas'

    export default {
        components: {
            ListaActas
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
                    active: true
                }
                ]
            }
        }
    }
</script>