<template>
    <b-modal id="modal-vista-previa" title="BootstrapVue" hide-footer hide-header size="lg" @shown="show">
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
            id_acta: {
                type: Number,
                default: null,
                required: false
            }
        },
        methods: {
            show(){

                let id_acta = null

                if (this.id_acta != null) {
                    id_acta = this.id_acta
                }else{
                    id_acta = this.$route.params.id
                }
                
                axios({
                    method: 'GET',
                    url: process.env.VUE_APP_API_URL + 'vista_previa_acta/' + id_acta,
                    responseType: 'arraybuffer'
                })
                .then(response => {
                
                    let blob = new Blob([response.data], { type: 'application/pdf' })
                    let link = document.createElement('a')
                    link.href = window.URL.createObjectURL(blob)
                
                    PDFObject.embed(link.href + '#toolbar=0', "#vista-previa")

                })
                .catch(error => {
                    console.log(error)
                })

            }
        }
    }
</script>