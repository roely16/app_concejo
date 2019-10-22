<template>
     <b-row class="mt-4">
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
                    <b-link :to="{ name: 'puntos_acta_revision', params: {id: this.$route.params.id} }">
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
                title="Vista Previa"
            >

                <div>
                    <b-link :to="{ name: 'asistencia', params: {id: this.$route.params.id} }">
                        <b-img  width="100" src="https://image.flaticon.com/icons/svg/1011/1011339.svg" fluid></b-img>
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
                title="Impresión"
            >

                <div>
                    <b-link :to="{ name: 'asistencia', params: {id: this.$route.params.id} }">
                        <b-img  width="100" src="https://image.flaticon.com/icons/svg/1497/1497542.svg" fluid></b-img>
                    </b-link>
                    
                </div>
            </b-card>
        </b-col> -->

    </b-row>
</template>

<script>
    export default {
        
        

    }
</script>