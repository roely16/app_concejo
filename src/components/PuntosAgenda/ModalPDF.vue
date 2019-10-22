<template>
    <b-modal id="modal-pdf" title="Vista Previa"  @shown="getPDF" size="xl" hide-footer hide-header>
        <div id="example1"></div>
    </b-modal>      
</template>

<style scoped>
    .pdfobject-container { height: 45rem; }
</style>
<style  scoped>
    #outerContainer #mainContainer div.toolbar {
        display: none !important; /* hide PDF viewer toolbar */
    }
    #outerContainer #mainContainer #viewerContainer {
        top: 0 !important; /* move doc up into empty bar space */
    }
</style>

<script>

    import axios from 'axios'

    export default {
        props: {
            id_agenda: {
                type: Number,
                default: null,
                required: false
            }
        },
        data(){
            return{

            }
        },
        methods: {
            getPDF(){

                let id_agenda = null

                if (this.id_agenda != null) {
                    id_agenda = this.id_agenda
                }else{
                    id_agenda = this.$route.params.id
                }

                axios({
                    method: 'GET',
                    url: process.env.VUE_APP_API_URL + 'pdf_agenda/' + id_agenda,
                    responseType: 'arraybuffer'
                })
                .then(response => {
                   
                    let blob = new Blob([response.data], { type: 'application/pdf' })
                    let link = document.createElement('a')
                    link.href = window.URL.createObjectURL(blob)

                    PDFObject.embed(link.href + '#toolbar=0', "#example1")

                })
                .catch(error => {
                    console.log(error)
                })

            }
        },
        mounted(){

            // this.$root.$on('bv::modal::shown', (bvEvent, modalId) => {

            //     this.getPDF()

            // })

        }
    }
</script>