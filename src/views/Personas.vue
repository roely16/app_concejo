<template>
    <div>
        <div class="mt-4">
            <b-breadcrumb :items="items"></b-breadcrumb>
        </div>
        
        <ListaPersonas />

    </div>
    
</template> 

<script>

    import ListaPersonas from '../components/Personas/ListaPersonas'

    export default {
        components: {
            ListaPersonas
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
                    active: true
                }
                ]
            }
        }
    }
</script>