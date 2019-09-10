import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Login from './views/Login.vue'

// Agenda
import Agenda from './views/Agenda.vue'
import DetalleAgenda from './views/DetalleAgenda.vue'
import PuntosAgenda from './views/PuntosAgenda.vue'
// import ListaAgendas from './components/Agenda/ListaAgendas.vue'

// Configuracion
import Configuracion from './views/Configuracion.vue'

Vue.use(Router)

export default new Router({

  routes: [
    {
		path: '/',
		name: 'home',
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
				props: true
			}
		]
	},
    {
      path: '*',
      redirect: '/'
    }
  ]
})
