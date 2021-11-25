import Dashboard from "../components/admin/Dashboard";
import Profile from "../components/admin/Profile";
import AddRaffle from "../components/admin/raffle/AddRaffle";
import RaffleDraw from "../components/admin/raffle/RaffleDraw";
import AddPrize from "../components/admin/prize/AddPrize";
import ViewPrize from "../components/admin/prize/ViewPrize";
import EditPrize from "../components/admin/prize/EditPrize";
import ViewRaffle from "../components/admin/raffle/ViewRaffle";
import EditRaffle from "../components/admin/raffle/EditRaffle";
import ViewParticipants from "../components/admin/raffle/ViewParticipants";
import Participants from "../components/admin/Participants";

const routes = [
    { path: '/admin', exact: true, name: 'Admin' },
    { path: '/admin/dashboard', exact: true, name: 'Dashboard', component: Dashboard },
    { path: '/admin/profile', exact: true, name: 'Profile', component: Profile },
    { path: '/admin/add-prize', exact: true, name: 'AddPrize', component: AddPrize },
    { path: '/admin/view-prize', exact: true, name: 'ViewPrize', component: ViewPrize },
    { path: '/admin/edit-prize/:id', exact: true, name: 'EditPrize', component: EditPrize },
    { path: '/admin/add-raffle', exact: true, name: 'AddRaffle', component: AddRaffle },
    { path: '/admin/view-raffle', exact: true, name: 'ViewRaffle', component: ViewRaffle },
    { path: '/admin/edit-raffle/:id', exact: true, name: 'EditRaffle', component: EditRaffle },
    { path: '/admin/raffle-draw/:prize_name', exact: true, name: 'RaffleDraw', component: RaffleDraw },
    { path: '/admin/view-raffle/:prize_name', exact: true, name: 'ViewParticipants', component: ViewParticipants },
    { path: '/admin/participants', exact: true, name: 'ViewParticipants', component: Participants },
   
];

export default routes;