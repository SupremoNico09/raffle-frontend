import React from 'react';

import publicRoutesList from '../../routes/Publicroutelist';
import { Switch, Route} from 'react-router-dom';
import Navbar from '../../layouts/frontend/Navbar'




const FrontendLayout = () => {
    return (
        <div>
            <section id="nav-bar">
                <Navbar/>
            </section>
            <div>


                <Switch>
                    {publicRoutesList.map((routedata, idx) => {
                        return (
                            routedata.component && (
                                <Route
                                    key={idx}
                                    path={routedata.path}
                                    exact={routedata.exact}
                                    name={routedata.name}
                                    render={(props) => (
                                        <routedata.component {...props} />
                                    )}
                                />
                            )
                        )
                    })}

                </Switch>



            </div>

        </div>

    );
}

export default FrontendLayout;
