<template>

   <div>
        <div class="mt-4">
            <b-breadcrumb :items="items"></b-breadcrumb>
        </div>
        <Lista />
    </div>

</template>

<script>

    import Lista from '@/components/DetalleLote/Lista.vue'

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
                        href: '#/home/hojas_contraloria'
                    },
                    {
                        text: 'Detalle de Lote No. ',
                        active: true
                    }
                ]
            }
        }
    }
</script>