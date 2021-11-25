import React from 'react'
import { Switch, Route } from 'react-router-dom';
import authRoutesList from '../../../routes/Authroutelist';

function AuthLayout() {
    return (
        <div>
            <Switch>
                {authRoutesList.map((routedata, idx) => {
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
    )
}

export default AuthLayout
