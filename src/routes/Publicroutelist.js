import Home from "../components/frontend/Home";
import About from "../components/frontend/About";
import Contact from "../components/frontend/Contact";
import PrizeCollection from "../components/frontend/raffles/PrizeCollection";
import Login from "../components/frontend/auth/Login";


const publicRoutesList = [
    { path: '/', exact: true, name: 'Home' ,component: Home },
    { path: '/login', exact: true, name: 'Login' ,component: Login },
    { path: '/about', exact: true, name: 'About', component: About },
    { path: '/contact', exact: true, name: 'Contact', component: Contact },
    { path: '/raffles', exact: true, name: 'PrizeCollection', component: PrizeCollection },

];

export default publicRoutesList;