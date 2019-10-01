import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Login from './views/Login.vue'

// Agenda
import Agenda from './views/Agenda.vue'
import DetalleAgenda from './views/DetalleAgenda.vue'
import PuntosAgenda from './views/PuntosAgenda.vue'
import Asistencia from './views/Asistencia.vue'
// import ListaAgendas from './components/Agenda/ListaAgendas.vue'

// Actas
import Actas from './views/Actas.vue'
import DetalleActa from './views/DetalleActa.vue'
import PuntosActa from './views/PuntosActa.vue'
import DetallePuntoActa from './views/DetallePuntoActa.vue'

//Calendario
import Calendario from './views/Calendario.vue'

// Configuracion
import Configuracion from './views/Configuracion.vue'

// Personas
import Personas from './views/Personas.vue'
import DetallePersona from './views/DetallePersona.vue'

// Bitacora
import Bitacora from './views/Bitacora.vue'

// Busqueda
import Busqueda from './views/Busqueda.vue'

// Dashboard 
import Dashboard from './views/Dashboard.vue'

import store from './store';

Vue.use(Router)

const router =  new Router({

  routes: [
    {
		path: '/',
		name: 'login',
		component: Login
    },
    {
		path: '/home',
		name: 'home',
		component: Home,
		children: [
			{
				path: '/home/agenda',
				component: Agenda,
				name: 'agenda',
			},
			{
				path: '/home/actas',
				component: Actas,
				name: 'actas',
			},
			{
				path: '/home/actas/detalle/:id',
				component: DetalleActa,
				name: 'detalle_acta'
			},
			{
				path: '/home/actas/detalle/:id/puntos_acta',
				component: PuntosActa,
				name: 'puntos_acta'
			},
			{
				path: '/home/actas/detalle/:id/puntos_acta/detalle_punto/:id_punto',
				component: DetallePuntoActa,
				name: 'detalle_punto_acta'
			},
			{
				path: '/home/calendario',
				component: Calendario,
				name: 'calendario',
			},
			{
				path: '/home/busqueda',
				component: Busqueda,
				name: 'busqueda',
			},
			{
				path: '/home/dashboard',
				component: Dashboard,
				name: 'dashboard',
			},
			{
				path: '/home/configuracion',
				component: Configuracion,
				name: 'config',
			},
			{
				path: '/home/configuracion/personas',
				component: Personas,
				name: 'personas',
			},
			{
				path: '/home/configuracion/personas/detalle/:id',
				component: DetallePersona,
				name: 'detalle_persona'
			},
			{
				path: '/home/agenda/detalle/:id',
				component: DetalleAgenda,
				name: 'detalle_agenda'
			},
			{
				path: '/home/agenda/detalle/:id/puntos_agenda',
				component: PuntosAgenda,
				name: 'puntos_agenda',
			},
			{
				path: '/home/agenda/detalle/:id/bitacora',
				component: Bitacora,
				name: 'bitacora',
			},
			{
				path: '/home/agenda/detalle/:id/asistencia',
				component: Asistencia,
				name: 'asistencia',
			}
		]
	},
    {
      path: '*',
      redirect: '/'
    }
  ]
})

router.beforeEach((to, from, next) => {
	
	store.dispatch('fetchAccessToken');

	if (to.name != 'login') {
		
		if (store.state.accessToken == null) {
			return next('/login');
		}

	}
	if (to.name == 'login') {
		if (store.state.accessToken != null) {
			
			return next('/home');
		}
	}
	next();
});

export default router