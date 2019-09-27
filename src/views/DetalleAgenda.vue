<template>
    <div>
        <div class="mt-4">
            <b-breadcrumb :items="items"></b-breadcrumb>
        </div>
        
        <Detalle :agenda="agenda" :isLoading="isLoading"></Detalle>
        <div v-if="!isLoading">
            <Menu :id_agenda="id_agenda" :isLoading="isLoading" :no_agenda="no_agenda" ></Menu>
        </div>
       
    </div>
</template>

<script>

    import Detalle from '../components/DetalleAgenda/Detalle'
    import Menu from '../components/DetalleAgenda/Menu'
    import axios from 'axios'

    export default {
        components: {
            Detalle,
            Menu
        },
        data() {
            return {
                items: [
                {
                    text: 'Inicio',
                    href: '#/home'
                },
                {
                    text: 'Agendas',
                    href: '#/home/agenda'

                },
                {
                    text: 'Detalle de Agenda ',
                    active: true

                }],
                id_agenda: null,
                agenda: {},
                isLoading: false,
                no_agenda: null
            }
        },
        methods: {
            getData(){

                let id_agenda = this.$route.params.id

                this.isLoading = !this.isLoading

                axios({
                    method: 'GET',
                    url: process.env.VUE_APP_API_URL + 'detalle_acta/' + id_agenda,
                })
                .then(response => {

                    this.isLoading = !this.isLoading
                    this.agenda = response.data
                    this.no_agenda = this.agenda.no_agenda

                    console.log(response)

                })
                .catch(error => {
                    console.log(error)
                })

            }
        },
        mounted(){
            
            this.getData()
            this.id_agenda = parseInt(this.$route.params.id)
            
        }
    }
</script>