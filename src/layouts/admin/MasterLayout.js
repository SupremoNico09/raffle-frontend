import React from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import '../../assets/admin/css/styles.css';
import '../../assets/admin/js/scripts';
import routes from '../../routes/routes';
import { Switch, Route, Redirect } from 'react-router-dom';
import '../../assets2/css/style.css';

const MasterLayout = () => {
    return (
        <div>
            <Sidebar />
            <section className="home-section">
                <Navbar />
                <div className="home-content">

                    <main>
                        <Switch>
                            {routes.map((route, idx) => {
                                return (
                                    route.component && (
                                        <Route
                                            key={idx}
                                            path={route.path}
                                            exact={route.exact}
                                            name={route.name}
                                            render={(props) => (
                                                <route.component {...props} />
                                            )}
                                        />
                                    )
                                )
                            })}
                            <Redirect from="/admin" to="/admin/dashboard" />
                        </Switch>
                    </main>
                </div>
            </section>
        </div>
    );
}

export default MasterLayout;
