import Login from "../components/frontend/auth/Login";
import Register from "../components/frontend/auth/Register";

const authRoutesList = [
    { path: '/login', exact: true, name: 'Login' ,component: Login },
    { path: '/register', exact: true, name: 'Register' ,component: Register},
];

export default authRoutesList;
