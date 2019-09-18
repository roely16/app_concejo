import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Login from './views/Login.vue'

// Agenda
import Agenda from './views/Agenda.vue'
import DetalleAgenda from './views/DetalleAgenda.vue'
import PuntosAgenda from './views/PuntosAgenda.vue'
// import ListaAgendas from './components/Agenda/ListaAgendas.vue'

//Calendario
import Calendario from './views/Calendario.vue'

// Configuracion
import Configuracion from './views/Configuracion.vue'

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
				path: '/home/calendario',
				component: Calendario,
				name: 'calendario',
			},
			{
				path: '/home/configuracion',
				component: Configuracion,
				name: 'config',
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