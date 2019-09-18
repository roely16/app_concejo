<template>
    <div>
        <div class="mt-4">
            <b-breadcrumb :items="items" v-if="!isLoading"></b-breadcrumb>
        </div>
        <Listado></Listado>
    </div>
</template>

<script>

    import Listado from '../components/PuntosAgenda/Listado'
    import axios from 'axios'

    export default {
        components: {
            Listado
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
                        text: 'Detalle de ' + this.no_acta,
                        href: '#/home/agenda/detalle/' + this.$route.params.id
                    },
                    {
                        text: 'Puntos de Agenda',
                        active: true
                    }
                ],
                isLoading: false
            }
        },
        mounted(){
            this.getData()
        },
        methods: {
            getData(){

                this.isLoading = !this.isLoading

                axios({

                    method: 'GET',
                    url: process.env.VUE_APP_API_URL + 'detalle_acta/' + this.$route.params.id,

                })
                .then(response => {

                    this.items[2].text = "Detalle de Acta " + response.data.numero_acta + ' - ' + response.data.year

                    this.isLoading = !this.isLoading

                })
                .catch(error => {
                    console.log(error)
                })

            }
        }
    }
</script>