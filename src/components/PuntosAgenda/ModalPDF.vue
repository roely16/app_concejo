<template>
    <b-modal id="modal-pdf" title="Vista Previa" size="xl" hide-footer hide-header>
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
        data(){
            return{

            }
        },
        methods: {
            getPDF(){

                axios({
                    method: 'GET',
                    url: process.env.VUE_APP_API_URL + 'pdf_agenda/' + this.$route.params.id,
                    responseType: 'arraybuffer'
                })
                .then(response => {
                   
                    let blob = new Blob([response.data], { type: 'application/pdf' })
                    let link = document.createElement('a')
                    link.href = window.URL.createObjectURL(blob)
                    // link.download = 'Report.pdf'
                    // link.click()

                    PDFObject.embed(link.href + '#toolbar=0', "#example1")

                    console.log(response.data)

                })
                .catch(error => {
                    console.log(error)
                })

            }
        },
        mounted(){

            this.$root.$on('bv::modal::shown', (bvEvent, modalId) => {

                this.getPDF()

            })

        }
    }
</script>