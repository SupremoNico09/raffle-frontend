import Home from "../components/frontend/Home";
import About from "../components/frontend/About";
import Contact from "../components/frontend/Contact";
import Page403 from "../components/errors/Page403";
import Page404 from "../components/errors/Page404";
import Login from "../components/frontend/auth/Login";
import Register from "../components/frontend/auth/Register";
import Prizes from "../components/frontend/raffles/Prizes";
import ViewRaffles from "../components/frontend/raffles/ViewRaffles";
import RaffleDetail from "../components/frontend/raffles/RaffleDetail";
import RaffleList from "../components/frontend/RaffleList";





const publicRoutesList = [
    { path: '/', exact: true, name: 'Home' ,component: Home },
    { path: '/login', exact: true, name: 'Login' ,component: Login },
    { path: '/register', exact: true, name: 'Register' ,component: Register},
    { path: '/about', exact: true, name: 'About', component: About },
    { path: '/contact', exact: true, name: 'Contact', component: Contact },
    { path: '/403', exact: true, name: 'Page403', component: Page403 },
    { path: '/404', exact: true, name: 'Page404', component: Page404 },
    { path: '/raffles', exact: true, name: 'Prizes', component: Prizes },
    { path: '/raffles/:type', exact: true, name: 'ViewRaffles', component: ViewRaffles },
    { path: '/raffles/:prizes/:raffles', exact: true, name: 'RaffleDetail', component: RaffleDetail },
    { path: '/rafflelists', exact: true, name: 'RaffleList', component: RaffleList },


];

export default publicRoutesList;