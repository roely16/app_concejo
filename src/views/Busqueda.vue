<template>
    
    <div>
        <div class="mt-4">
            <b-breadcrumb :items="items"></b-breadcrumb>
        </div>

        <Resultados />
        
    </div>

</template>

<script>

    import Resultados from '../components/Busqueda/Resultados'

    export default {
        components: {
            Resultados
        },  
        data() {
            return {
                items: [
                {
                    text: 'Inicio',
                    href: '#/home'
                },
                {
                    text: 'Busqueda',
                    active: true
                }
                ]
            }
        }
    }
</script>