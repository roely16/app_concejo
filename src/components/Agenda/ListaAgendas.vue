<template>
  <div>
    <!-- Sección de busqueda y botón para Agregar -->
    <b-row class="mb-3">
      <b-col sm="12" lg="4" md="6">
        <b-input-group>
          <b-form-input v-model="busqueda"></b-form-input>

          <b-input-group-append>
            <b-button variant="outline-secondary" disabled>
              <font-awesome-icon icon="search" />
            </b-button>
          </b-input-group-append>
        </b-input-group>
      </b-col>

      <b-col cols="8" class="text-right" v-if="showAdd">
        <b-button variant="outline-primary" @click="nuevaActa">
          Nueva Agenda
          <font-awesome-icon icon="plus-circle" />
        </b-button>
      </b-col>
    </b-row>

    <b-table :filter="busqueda" small head-variant="dark" :items="items" :fields="fields" :busy="isLoading" show-empty empty-text="Aún no se han registrado agendas" id="my-table" :per-page="perPage" :current-page="currentPage" @filtered="onFiltered" empty-filtered-text="No se han encontrado agendas que coincidan con su criterio de búsqueda">
		<div slot="table-busy" class="text-center my-2">
			<b-spinner class="align-middle"></b-spinner>
			<div class="mt-2">
				<strong>Cargando datos...</strong>
			</div>
		</div>

      	<template slot="[no_acta]" slot-scope="data">
		  {{ data.item.numero_acta }} - {{ data.item.year }}
		</template>

		<template slot="[id_tipo]" slot-scope="data">
			<!-- <b-badge v-if="data.item.id_tipo == 1" variant="primary" style="font-size: 0.9rem">Ordinaria</b-badge>

			<b-badge v-if="data.item.id_tipo == 2" variant="danger" style="font-size: 0.9rem">Extraordinaria</b-badge> -->
			<span v-if="data.item.id_tipo == 1">Ordinaria</span>
			<span v-if="data.item.id_tipo == 2">Extraordinaria</span>
		</template>

		<template slot="[estado]" slot-scope="data">
			<b-badge :variant="data.item.bitacora.estado.color" :class="data.item.bitacora.estado.color" style="font-size: 0.9rem">
				{{ data.item.bitacora.estado.nombre }}
				<font-awesome-icon :icon="data.item.bitacora.estado.icono" />
			</b-badge>
		</template>

		<template slot="[actions]" slot-scope="row">
			<div class="text-right">
				<b-button class="mr-2" variant="outline-secondary" @click="row.toggleDetails">
					<font-awesome-icon icon="info-circle"></font-awesome-icon>
				</b-button>
				<b-button :to="{ name: detailURL, params: { id: row.item.id } }" class="mr-2" variant="outline-success">
					<font-awesome-icon icon="eye" />
				</b-button>
				<b-button v-if="showDelete" variant="outline-danger" v-on:click="eliminarAgenda(row.item.id)">
					<font-awesome-icon icon="trash-alt" />
				</b-button>
			</div>
		</template>

		<template v-slot:row-details="row">
			<b-card>
				<b-row class="mb-2">
					<b-col sm="3" class="text-sm-right"><b>Descripción: </b></b-col>
					<b-col>{{ row.item.descripcion }}</b-col>
				</b-row>

				<b-button size="sm" @click="row.toggleDetails">Ocultar Detalles</b-button>
			</b-card>
		</template>
    </b-table>

		<b-row v-if="rows > 0">
			<b-col>
				<h5>Total de registros: {{ rows }}</h5>
			</b-col>
			<b-col>
				<b-pagination v-model="currentPage" :total-rows="rows" :per-page="perPage" aria-controls="my-table" v-if="items.length > perPage" align="center"></b-pagination>
			</b-col>
			<b-col></b-col>
		</b-row>

    	<NuevaAgenda></NuevaAgenda>
  	</div>
</template>

<style scoped>

	.en_analisis{
		background-color: #ffae0d 
	}

</style>

<script>
    import axios from "axios";
    import NuevaAgenda from "../Agenda/NuevaAgenda";

	export default {
		props: {
			showDelete: {
				type: Boolean,
				required: false,
				default: true
			},
			showDetails: {
				type: Boolean,
				required: false,
				default: true
			},
			showAdd: {
				type: Boolean,
				required: false,
				default: true
			},
			detailURL: {
				type: String,
				required: false,
				default: 'detalle_agenda'
			},
			dataURL: {
				type: String,
				required: false,
				default: 'obtener_agendas'
			} 
		},
		components: {
			NuevaAgenda
		},
		data() {
			return {
				items: [],
				fields: [],
				isLoading: false,
				currentPage: 1,
				perPage: 10,
				busqueda: "",
				rows: null
			};
		},
		methods: {
			getData() {
				this.isLoading = !this.isLoading;

				axios({
					method: "GET",
					url: process.env.VUE_APP_API_URL + this.dataURL
				})
				.then(response => {
					this.isLoading = !this.isLoading;
					this.items = response.data.items;
					this.fields = response.data.fields;
					this.rows = this.items.length;
				})
				.catch(error => {
					console.log(error);
				});
			},
			nuevaActa() {
				this.$bvModal.show("modal-nueva-acta");
			},
			eliminarAgenda(id) {

				Swal.fire({
					title: "¿Está seguro?",
					text: "Una vez eliminada no se podrá recuperar!",
					type: "warning",
					showCancelButton: true,
					confirmButtonColor: "#3085d6",
					cancelButtonColor: "#d33",
					confirmButtonText: "Si, eliminar!",
					cancelButtonText: "Cancelar",
					input: "textarea",
					inputPlaceholder: 'Escriba ELIMINAR',
				})
				.then(result => {

					if (result.value != '' && !result.dismiss && result.value.toUpperCase() == 'ELIMINAR') {

						let data = {
							id_agenda: id
						}

						axios({
							method: "POST",
							url: process.env.VUE_APP_API_URL + "eliminar_agenda",
							data: data
						})
						.then(response => {

							this.getData();

							Swal.fire(
								'Excelente!',
								'La agenda ha sido eliminada exitosamente!',
								'success'
							)

						})
						.catch(error => {
							console.log(error);
						});

					}else if(!result.dismiss){
						Swal.fire({
							type: 'error',
							title: 'Error',
							text: 'Debe ingresar la palabra ELIMINAR',
						})
					}

				});
			},
			onFiltered(filteredItems) {
				this.rows = filteredItems.length;
				this.currentPage = 1;
			}
		},
		mounted() {
			this.getData();

			// Emit para refrescar los datos
			this.$root.$on("obtenerAgendas", () => {
				this.getData();
			});
		}
	};
</script>