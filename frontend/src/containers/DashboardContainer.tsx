import { Dashboard, NewShipmentPage, WaitingShipmentsPage } from 'pages';
import { AllowedForRoute } from 'protection';
import { Route, Routes } from 'react-router-dom';

const AuthContainer = () => {
    return (
        <Routes>
            <Route path='/' element={<Dashboard />}> </Route>
            <Route path='/newShipment' element={<AllowedForRoute role='customer'><NewShipmentPage/></AllowedForRoute>}> </Route>
            <Route path='/waitingShipments' element={<AllowedForRoute role='biker'><WaitingShipmentsPage/></AllowedForRoute>}> </Route>
            <Route path='/*' element={<Dashboard />}></Route>
        </Routes>
    );
};

export default AuthContainer