<template>
    <b-row class="mt-4" v-if="!isLoading">
        <b-col sm="12" lg="3" md="6">
            <b-card
                img-src=""
                img-alt="Image"
                img-top
                tag="article"
                class="mb-2 text-center"
                title="Puntos"
            >

                <div>
                    <b-link :to="{ name: 'puntos_agenda_sesion', params: {id: this.$route.params.id} }">
                        <b-img  width="100" src="https://image.flaticon.com/icons/svg/235/235252.svg" fluid></b-img>
                    </b-link>
                    
                </div>
            </b-card>
        </b-col>

        <b-col sm="12" lg="3" md="6">
            <b-card
                img-src=""
                img-alt="Image"
                img-top
                tag="article"
                class="mb-2 text-center"
                title="Asistencia"
            >

                <div>
                    <b-link :to="{ name: 'asistencia_sesion', params: {id: this.$route.params.id} }">
                        <b-img  width="100" src="https://image.flaticon.com/icons/svg/1083/1083518.svg" fluid></b-img>
                    </b-link>
                    
                </div>
            </b-card>
        </b-col>

    </b-row>
</template>

<script>
    export default {
        props:{
            id_agenda: Number,
            no_agenda: String,
            isLoading: Boolean
        },
        mounted(){
            
        }
    }
</script>