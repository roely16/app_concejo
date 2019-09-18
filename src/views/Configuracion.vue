<template>
    
    <div>
        <div class="mt-4">
            <b-breadcrumb :items="items"></b-breadcrumb>
        </div>
        
        <Menu />

    </div>

</template>

<script>

    import Menu from '../components/Configuracion/Menu'

    export default {
        components: {
            Menu
        },
        data(){
            return{
                items: [
                    {
                        text: 'Inicio',
                        href: '#/home'
                    },
                    {
                        text: 'Configuración',
                        active: true
                    }
                ]
            }
        }
    }
</script>