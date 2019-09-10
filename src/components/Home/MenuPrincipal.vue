<template>
    <b-container>
		<b-row class="mt-4">
			<b-col sm="12" lg="3">
				<div>
					<b-card
						img-src=""
						img-alt="Image"
						img-top
						tag="article"
						class="mb-2 text-center"
						header-class="text-center"
						header="Agenda" 
					>

						<div>
							<b-link :to="{ name: 'agenda' }">
								<b-img  width="250" src="https://image.flaticon.com/icons/svg/201/201576.svg" fluid></b-img>
							</b-link>
							
						</div>
					</b-card>
				</div>
			</b-col>
			<b-col sm="12" lg="3">
				<div>
					<b-card
						img-src=""
						img-alt="Image"
						img-top
						tag="article"
						class="mb-2 text-center"
						header-class="text-center"
						header="Calendario" 
					>

						<div>
							<b-link>
								<b-img width="250" src="https://image.flaticon.com/icons/svg/123/123392.svg" fluid></b-img>
							</b-link>
							
						</div>
					</b-card>
				</div>
			</b-col>
			<b-col sm="12" lg="3">
				<div>
					<b-card
						img-src=""
						img-alt="Image"
						img-top
						tag="article"
						class="mb-2 text-center"
						header-class="text-center"
						header="Configuración" 
					>

						<div>
							<b-link :to="{ name: 'config' }">
								<b-img width="250" src="https://image.flaticon.com/icons/svg/214/214342.svg" fluid></b-img>
							</b-link>
							
						</div>
					</b-card>
				</div>
			</b-col>
		</b-row>
    </b-container>
</template>

<script>
    export default {
                
    }
</script>