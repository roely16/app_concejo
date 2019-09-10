<template>
    <div>
        <b-navbar toggleable="lg" type="dark" variant="dark" sticky>
            <b-navbar-brand href="#">App Consejo</b-navbar-brand>

            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

            <b-collapse id="nav-collapse" is-nav>
                <!-- Right aligned nav items -->
                <b-navbar-nav class="ml-auto">
                    <b-nav-item-dropdown right>
                    <!-- Using 'button-content' slot -->
                    <template slot="button-content"><em>Usuario</em></template>
                    <b-dropdown-item href="#">Perfil</b-dropdown-item>
                    <b-dropdown-item @click="logout">Salir</b-dropdown-item>
                    </b-nav-item-dropdown>
                </b-navbar-nav>
            </b-collapse>
        </b-navbar>
    </div>
</template>

<script>

    import { mapActions } from 'vuex';

    export default {
        
        methods: {
            ...mapActions([
                'logout'
			]),
        }

    }
</script>