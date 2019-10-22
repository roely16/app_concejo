<template>

    <div>
        <div class="mt-4">
            <b-breadcrumb :items="items"></b-breadcrumb>
        </div>
        
        <Lista />

    </div>

</template>

<script>

    import Lista from '@/components/Hojas/Lista.vue'

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
                        text: 'Hojas de la Contraloría',
                        active: true
                    }
                ]
            }
        }

    }
</script>