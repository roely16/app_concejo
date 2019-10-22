<template>
    <div>
        <div class="mt-4">
            <b-breadcrumb :items="items"></b-breadcrumb>
        </div>
       
       <div>
            <Detalle ></Detalle>
            <Menu/>
        </div>

    </div>        
</template>

<script>

    import Detalle from '@/components/Revisor_Actas/DetalleActa/Detalle'
    import Menu from '@/components/Revisor_Actas/DetalleActa/Menu'

    export default {
        
        components: {
            Detalle,
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
                        text: 'Actas',
                        href: '#/home/actas_revision'

                    },
                    {
                        text: 'Detalle de Acta ',
                        active: true

                    }
                ],
            }
        }

    }
</script>