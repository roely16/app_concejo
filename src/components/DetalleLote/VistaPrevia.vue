<template>
    <b-modal id="modal-vista-previa" hide-footer hide-header size="lg" @shown="show">
        <div id="vista-previa">

        </div>
    </b-modal>    
</template>

<style scoped>
    .pdfobject-container { height: 50rem; }
</style>

<script>

    import axios from 'axios'

    export default {
        props: {
            documento: {
                type: String,
                default: null,
                required: false
            },
            pagina: {
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
            show(){

                console.log(this.pagina)

                axios({
                    method: 'GET',
                    url: process.env.VUE_APP_API_URL + 'vista_previa_documento/' + this.documento,
                    responseType: 'arraybuffer'
                })
                .then(response => {

                    let blob = new Blob([response.data], { type: 'application/pdf' })
                    let link = document.createElement('a')
                    link.href = window.URL.createObjectURL(blob)
                
                    PDFObject.embed(link.href, "#vista-previa", {page: this.pagina})

                })

            }
        }

    }
</script>