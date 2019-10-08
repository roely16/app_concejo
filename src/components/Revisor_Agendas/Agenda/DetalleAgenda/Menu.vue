<template>
    <b-row class="mt-4" v-if="!isLoading">
        <b-col sm="12" lg="3">
            <b-card
                img-src=""
                img-alt="Image"
                img-top
                tag="article"
                class="mb-2 text-center"
                title="Puntos"
            >

                <div>
                    <b-link :to="{ name: 'puntos_agenda_analisis', params: {id: this.$route.params.id} }">
                        <b-img  width="100" src="https://image.flaticon.com/icons/svg/235/235252.svg" fluid></b-img>
                    </b-link>
                    
                </div>
            </b-card>
        </b-col>

        <!-- <b-col sm="12" lg="3">
            <b-card
                img-src=""
                img-alt="Image"
                img-top
                tag="article"
                class="mb-2 text-center"
                title="Asistencia"
            >

                <div>
                    <b-link :to="{ name: 'asistencia', params: {id: this.$route.params.id} }">
                        <b-img  width="100" src="https://image.flaticon.com/icons/svg/1083/1083518.svg" fluid></b-img>
                    </b-link>
                    
                </div>
            </b-card>
        </b-col>

        <b-col sm="12" lg="3">
            <b-card
                img-src=""
                img-alt="Image"
                img-top
                tag="article"
                class="mb-2 text-center"
                title="Documentos"
            >

                <div>
                    <b-link :to="{ name: 'documentos', params: {id: this.$route.params.id} }">
                        <b-img  width="100" src="https://image.flaticon.com/icons/svg/1355/1355236.svg" fluid></b-img>
                    </b-link>
                    
                </div>
            </b-card>
        </b-col>

        <b-col sm="12" lg="3">
            <b-card
                img-src=""
                img-alt="Image"
                img-top
                tag="article"
                class="mb-2 text-center"
                title="Audios"
            >

                <div>
                    <b-link :to="{ name: 'audios', params: {id: this.$route.params.id} }">
                        <b-img  width="100" src="https://image.flaticon.com/icons/svg/148/148755.svg" fluid></b-img>
                    </b-link>
                    
                </div>
            </b-card>
        </b-col> -->

        <!-- <b-col sm="12" lg="3">
            <b-card
                img-src=""
                img-alt="Image"
                img-top
                tag="article"
                class="mb-2 text-center"
                title="Bitacora"
            >

                <div>
                    <b-link :to="{ name: 'bitacora' }">
                        <b-img  width="100" src="https://image.flaticon.com/icons/svg/138/138295.svg" fluid></b-img>
                    </b-link>
                    
                </div>
            </b-card>
        </b-col> -->

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