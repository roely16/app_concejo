<template>
    <div>
        <div class="mt-4">
            <b-breadcrumb :items="items" v-if="!isLoading"></b-breadcrumb>
        </div>
        <Listado />
    </div>
</template>

<script>

    import Listado from '../components/PuntosActa/Listado'
    import axios from 'axios'

    export default {
        components: {
            Listado
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
                        href: '#/home/actas'
                    },
                    {
                        // text: 'Detalle de ' + this.no_acta,
                        text: 'Detalle de Acta No. ',
                        href: '#/home/actas/detalle/' + this.$route.params.id
                    },
                    {
                        text: 'Puntos de Acta',
                        active: true
                    }
                ],
                isLoading: false,
                acta: {}
            }
        },
        methods: {
            detalleActa(){

                this.isLoading = !this.isLoading

                axios({
                    method: 'GET',
                    url: process.env.VUE_APP_API_URL + 'detalle_acta/' + this.$route.params.id,
                })
                .then(response => {
                   this.isLoading = !this.isLoading
                   this.items[2].text = "Detalle de Acta No. " + response.data.acta.no_acta + '-' + response.data.acta.year
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