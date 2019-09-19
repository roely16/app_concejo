<template>

    <div class="mt-4">
        <b-tabs content-class="mt-3">
            <b-tab title="Usuario" active>
                <TabUsuario></TabUsuario>
            </b-tab>
            <b-tab title="Permisos">
                <TabPermisos></TabPermisos>
            </b-tab>
            <b-tab title="Bitácora">
                <TabBitacora></TabBitacora>
            </b-tab>
        </b-tabs>
    </div>

</template>

<script>

    import TabUsuario from '../DetallePersona/TabUsuario'
    import TabPermisos from '../DetallePersona/TabPermisos'
    import TabBitacora from '../DetallePersona/TabBitacora'

    export default {
        components: {
            TabUsuario,
            TabPermisos,
            TabBitacora
        },
        mounted(){

        }
    }
</script>