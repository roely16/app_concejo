<template>
    <div>
        <div class="mt-4">
            <b-breadcrumb :items="items"></b-breadcrumb>
        </div>
        
        <div v-if="!isLoading">
            <Detalle ></Detalle>
            <Menu :id_agenda="id_agenda" :isLoading="isLoading" :no_agenda="no_agenda" ></Menu>
        </div>
       
    </div>
</template>

<script>

    import Detalle from '@/components/Revisor_Agendas/Agenda/DetalleAgenda/Detalle'
    import Menu from '@/components/Revisor_Agendas/Agenda/DetalleAgenda/Menu'
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
                    href: '#/home/agendas_analisis'

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

                    this.agenda = response.data
                    this.no_agenda = this.agenda.no_agenda
                    this.isLoading = !this.isLoading
                    console.log(this.agenda)

                })
                .catch(error => {
                    console.log(error)
                })

            }
        },
        mounted(){
            
            // this.getData()
            
        }
    }
</script>