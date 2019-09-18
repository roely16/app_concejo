<template>
  <div class="home">
    <NavBar></NavBar>
    
    <b-container v-if="home" style="padding-top: 50px;">

		<b-row class="mt-4" v-if="!loadingMenu">
			<b-col sm="12" md="6" lg="3" v-for="menu in menus" :key="menu.id">
				<div>
					<b-card
						img-src=""
						img-alt="Image"
						img-top
						tag="article"
						class="mb-2 text-center"
						:title="menu.nombre"
					>

						<div>
							<b-link :to="{ name: menu.url }">
								<b-img  width="250" :src="'img/icons/' + menu.icono" fluid></b-img>
							</b-link>
							
						</div>

						<!-- <div class="mt-2 text-right">
							<a href="#" class="card-link">Card link</a>
						</div> -->
						<!-- <template v-slot:footer>
							<font-awesome-icon icon="search" />
						</template> -->

					</b-card>
				</div>
			</b-col>
		</b-row>

		<b-row class="mt-4" v-if="loadingMenu">
			<b-col>
				<div class="text-center my-2">
					<b-spinner class="align-middle"></b-spinner>
					<div class="mt-2">
						<strong>Cargando datos...</strong>
					</div>
				</div>
			</b-col>
		</b-row>

		<b-alert :show="menus.length <= 0" variant="danger">
			<h1 class="text-center">Debe solicitar acceso a los diferentes módulos 
				<font-awesome-icon icon="exclamation-triangle" />
			</h1>
		</b-alert>

    </b-container>

	<b-container v-if="!home" style="padding-top: 50px;">
		<router-view ></router-view>
	</b-container>
	  
  </div>
</template>

<script>

	import NavBar from '../components/Home/NavBar'
	import axios from 'axios'

	export default {
		name: 'home',
		components: {
			NavBar
		},
		data(){
			return{
				menus: {},
				loadingMenu: false
			}
		},
		methods:{

			async obtenerMenu(){

				this.loadingMenu = !this.loadingMenu

				let usuario = JSON.parse(localStorage.getItem('usuario'))
				let id_persona = usuario.id_persona

				await axios({
                    method: 'GET',
                    url:  process.env.VUE_APP_API_URL +  'menu_principal/' + id_persona,
                })
                .then(response => {

					this.loadingMenu = !this.loadingMenu
					this.menus = response.data
                    console.log(response)

                })
                .catch(error => {

					this.loadingMenu = !this.loadingMenu
					console.log(error)
					
                })

			}

		},
		computed:{
			home(){

				if (this.$route.name == 'home') {
					
					return true
				}

			}
		},
		mounted(){

			this.obtenerMenu()

		}
	}
</script>
