import Home from "../components/frontend/Home";
import About from "../components/frontend/About";
import Contact from "../components/frontend/Contact";
import Page403 from "../components/errors/Page403";
import Page404 from "../components/errors/Page404";
import Prizes from "../components/frontend/raffles/Prizes";
import ViewRaffles from "../components/frontend/raffles/ViewRaffles";
import RaffleDetail from "../components/frontend/raffles/RaffleDetail";
import RaffleList from "../components/frontend/RaffleList";
import RaffleDrawList from "../components/frontend/RaffleDrawList";
import RaffleDraw from "../components/frontend/RaffleDraw";





const publicRoutesList = [
    { path: '/', exact: true, name: 'Home' ,component: Home },
    { path: '/about', exact: true, name: 'About', component: About },
    { path: '/contact', exact: true, name: 'Contact', component: Contact },
    { path: '/403', exact: true, name: 'Page403', component: Page403 },
    { path: '/404', exact: true, name: 'Page404', component: Page404 },
    { path: '/raffles', exact: true, name: 'Prizes', component: Prizes },
    { path: '/raffles/:type', exact: true, name: 'ViewRaffles', component: ViewRaffles },
    { path: '/raffles/:prizes/:raffles', exact: true, name: 'RaffleDetail', component: RaffleDetail },
    { path: '/rafflelists', exact: true, name: 'RaffleList', component: RaffleList },
    { path: '/raffledrawlists', exact: true, name: 'RaffleDrawList', component: RaffleDrawList },
    { path: '/raffle-draw/:prize_name', exact: true, name: 'RaffleDraw', component: RaffleDraw },
    
];

export default publicRoutesList;