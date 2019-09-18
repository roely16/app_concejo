<template>
    <div>
        <b-navbar toggleable="lg" type="dark" variant="dark" fixed="top">
            <b-navbar-brand href="#">
                <img src="img/brand.png" class="d-inline-block align-top" alt="Kitten">
                Control de Actas
            </b-navbar-brand>

            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

            <b-collapse id="nav-collapse" is-nav>
                <!-- Right aligned nav items -->
                <b-navbar-nav class="ml-auto">
                    
                    <b-nav-item-dropdown right>

                        <template v-slot:button-content>
                            <font-awesome-icon size="lg" icon="bell" />
                        </template>

                        <b-dropdown-item href="#">
                        </b-dropdown-item>
                        <b-dropdown-item href="#">ES</b-dropdown-item>
                        <b-dropdown-item href="#">RU</b-dropdown-item>
                        <b-dropdown-item href="#">FA</b-dropdown-item>
                    </b-nav-item-dropdown>

                    <b-nav-item-dropdown right>
                    <!-- Using 'button-content' slot -->
                        <!-- <template slot="button-content">
                            <b-img src="https://picsum.photos/125/125/?image=58" alt="Left image" width="30" rounded="circle"></b-img>
                        </template> -->
                        <template v-slot:button-content>
                            <strong v-if="usuario != {}">{{ usuario.persona.nombre }} {{ usuario.persona.apellido }}</strong>
                        </template>
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
        
        data(){
            return{
                usuario: JSON.parse(localStorage.getItem('usuario'))
            }
        },
        methods: {
            ...mapActions([
                'logout'
			]),
        }

    }
</script>