import { Route, Routes } from "react-router-dom";
import AppRoutingRoles from "./Routing-Roles/AppRoles";
import AppRoutes from "./App-Routes/appRoutes";
import AbstractRoutingRoles from "./Routing-Roles/AbstractRoles";
import AbstractRoutes from "./Auth-Routes/abstractRoutes";
import PublicRoutes from "./Public-Routes/publicRoutes";

const Routing = () => {
    return ( 
            <Routes>
                <Route element={<AppRoutingRoles />}>
                    <Route path='/*' index element={<AppRoutes />} />
                </Route>

                <Route element={<AbstractRoutingRoles />}>
                    <Route path='/auth/*' index element={<AbstractRoutes />} />
                </Route>

                <Route path='/pub/*' index element={<PublicRoutes />} />
            </Routes>
    );
}

export default Routing;