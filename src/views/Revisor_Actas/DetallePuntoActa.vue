<template>
    <div>
        <div class="mt-4">
            <b-breadcrumb :items="items" v-if="!isLoading"></b-breadcrumb>
        </div>

        <Detalle />

    </div>
</template>

<script>

    import axios from 'axios'
    import Detalle from '@/components/Revisor_Actas/DetallePuntoActa/Detalle'

    export default {
        components: {
            Detalle
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
                        // text: 'Detalle de ' + this.no_acta,
                        text: 'Detalle de Acta No. ',
                        href: '#/home/actas_revision/detalle/' + this.$route.params.id
                    },
                    {
                        text: 'Puntos de Acta',
                        href: '#/home/actas_revision/detalle/' + this.$route.params.id + '/puntos_acta'
                    },
                    {
                        text: 'Detalle de Punto No. ',
                        active: true
                    }
                ],
                isLoading: false
            }
        },
        methods: {
            detalleActa(){

                console.log(this.$route.params)

                this.isLoading = !this.isLoading

                axios({
                    method: 'GET',
                    url: process.env.VUE_APP_API_URL + 'detalle_acta/' + this.$route.params.id + '/' + this.$route.params.id_punto,
                })
                .then(response => {

                    console.log(response.data)

                    this.isLoading = !this.isLoading
                    this.items[2].text = "Detalle de Acta No. " + response.data.acta.no_acta + '-' + response.data.acta.year

                    this.items[4].text = "Detalle de Punto No. " + response.data.punto_agenda.orden
                })
                .catch(error => {
                    console.log(error)
                })
            }
        },
        mounted(){

            this.detalleActa()

        }
    }
</script>