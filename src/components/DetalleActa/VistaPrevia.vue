<template>
    <b-modal id="modal-vista-previa" title="BootstrapVue" hide-footer hide-header size="lg" @show="show">
        <div id="vista-previa">

        </div>
    </b-modal>
</template>

<style scoped>
    .pdfobject-container { height: 45rem; }
</style>

<script>

    import axios from 'axios'

    export default {
        methods: {
            show(){

                axios({
                    method: 'GET',
                    url: process.env.VUE_APP_API_URL + 'vista_previa_acta/' + this.$route.params.id,
                    // responseType: 'arraybuffer'
                })
                .then(response => {
                   
                    // let blob = new Blob([response.data], { type: 'application/pdf' })
                    // let link = document.createElement('a')
                    // link.href = window.URL.createObjectURL(blob)
                
                    // PDFObject.embed(link.href + '#toolbar=0', "#vista-previa")

                    console.log(response.data)

                })
                .catch(error => {
                    console.log(error)
                })

            }
        }
    }
</script>