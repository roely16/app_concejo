<template>
    <div>
        <b-table small striped head-variant="dark" :items="items" :fields="fields" show-empty empty-text="Aún no se han registrado audios">

            <template slot="[fecha]" slot-scope="row">
                {{ row.item.fecha_creacion }}
            </template>

            <template slot="[subido_por]" slot-scope="row">
                {{ row.item.persona.usuario.usuario.toUpperCase() }}
            </template>

            <template slot="[actions]" slot-scope="row">
                <div class="text-right">

                    <b-button class="mr-2" variant="outline-secondary" @click="row.toggleDetails">
                        <font-awesome-icon icon="headphones-alt" />
                    </b-button>

                </div>
            </template>

            <template v-slot:row-details="row">
                <b-card>
                    <b-row class="text-center">
                        <b-col>
                            <audio controls controlsList="nodownload">
                                <source :src="row.item.link_audio" type="audio/mpeg">
                                Su navegador no soporta la reproducción de audio.
                            </audio>
                        </b-col>
                    </b-row>

                    <b-button size="sm" @click="row.toggleDetails">Ocultar Detalles</b-button>
                </b-card>
            </template>

        </b-table>
    </div>        
</template>

<script>

    import axios from 'axios'

    export default {
        props: {
            id_agenda: {
                type: Number,
                default: null
            }
        },
        data() {
            return {
                items: [],
                fields: [],
                rows: null
            }
        },
        methods: {
            obtenerAudios(){

                if (this.id_agenda) {

                    axios({
                        method: 'GET',
                        url: process.env.VUE_APP_API_URL + 'obtener_audios/' + this.id_agenda
                    })
                    .then(response => {
                        
                        this.items = response.data.items
                        this.rows = this.items.length

                        this.items.forEach(element => {
                            element.link_audio = process.env.VUE_APP_MEDIA_URL + element.link
                        });

                        this.fields = response.data.fields
                        this.isLoading = !this.isLoading
                    
                    })
                    .catch(error => {
                        console.log(error)
                    })

                }

            }
        },
        mounted(){
            this.obtenerAudios()
        }
    }
</script>