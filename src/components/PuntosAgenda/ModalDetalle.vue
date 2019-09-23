<template>
    <b-modal size="lg" id="modal-detalle" title="BootstrapVue">
        <p class="my-4">Hello from modal!</p>
    </b-modal>
</template>

<script>
    export default {
        name: 'ModalDetalle',
        props: {
            data: Array
        }      
    }
    
</script>