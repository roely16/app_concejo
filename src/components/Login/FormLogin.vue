<template>
    
    <b-col md="12" xs="12" lg="8" sm="12">
		<div class="mt-4">
			<b-card class="shadow" no-body style="border: 1px solid rgba(0, 0, 0, 0.125); border-radius: 1rem;">
				<b-row >
					<b-col md="6" >
						<b-card-img src="img/logo_muni.png"></b-card-img>
					</b-col>
					<b-col md="6" >
						<b-card-body title="Inicio de Sesión" style="background-color: rgb(43, 50, 140); height: 100%; color: white; border-radius: 0 1rem 1rem 0;">
							<b-form  @submit.prevent="login" style="width: 100%; " >
								<b-form-group
									id="input-group-1"
									label="Usuario:"
									label-for="input-1"
								>
									<b-form-input
										id="input-1"
										type="text"
										autocomplete="off"
										required
										v-model="user.userName"
									></b-form-input>
								</b-form-group>

								<b-form-group id="input-group-2" label="Contraseña:" label-for="input-2">
									<b-input-group>
										<template v-slot:append>
											<b-button variant="light" @click="showPassword">
												<font-awesome-icon :icon="!showPass ? 'eye' : 'eye-slash'" />
											</b-button>
										</template>
										<b-form-input
											id="input-2"
											:type="!showPass ? 'password' : 'text'"
											required
											v-model="user.userPass"
										></b-form-input>
									</b-input-group>
								</b-form-group>

								<b-row >
									<b-col>
										<b-button :disabled="loggingIn" size="lg" type="submit" variant="success" style="background-color: #00ae6e">Ingresar 
											<font-awesome-icon icon="sign-in-alt" />
										</b-button>
									</b-col>
									<b-col align-self="center">
										<b-spinner v-if="loggingIn" variant="light" label="Spinning"></b-spinner>
									</b-col>
								</b-row>
								<br>
								<b-row>
									<b-col>
										<b-alert variant="danger" v-if="loginError" show dismissible>{{ loginError }}</b-alert>
									</b-col>
								</b-row>

							</b-form>
							
						</b-card-body>
						
					</b-col>
				</b-row>
			</b-card>
		</div>
	</b-col>

</template>

<script>

    import { mapActions } from 'vuex'
    import { mapState } from 'vuex'
    
    export default {
        data: () => ({
			user: {
				userName: '',
				userPass: ''
			},
			logging: false,
			showPass: false,
		}),
        methods: {
			...mapActions([
				'doLogin'
			]),
			login(){

				let data = {
					"userName" : this.user.userName,
					"userPass": this.user.userPass
				}

				this.doLogin(data)

			},
			showPassword(){

				console.log('show')

				this.showPass = !this.showPass

				if (this.showPass) {
					


				}

			}
		},
		computed: {
			...mapState([
				'loggingIn',
				'loginError',
				'loginError'
			])
		}
    }
</script>

<style scoped>
	
	.card_login{
		background-color: #004290
	}

</style>