import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { UserInfoI } from "types/auth/context.types";
import { ChangeUserInfo } from "providers/auth/authReducer";
import HomeIcon from '@mui/icons-material/Home';
import Cookies from "js-cookie";
import LogoutIcon from '@mui/icons-material/Logout';
import classes from "./style.module.scss"
import { useAuth } from "contexts/Auth.context";
import WidgetsIcon from '@mui/icons-material/Widgets';
interface componentProps {
    animationClass: string,
    shownBefore: boolean
}


const Sidebar = ({ animationClass, shownBefore }: componentProps) => {
    const { state, dispatch } = useAuth();
    const userInfo = state.user as UserInfoI
    const location = useLocation()
    function handleLogout() {
        dispatch(ChangeUserInfo({ isAuth: false, user: {} }));
        Cookies.remove('authorization');
    }
    const [hideActive, setHideActive] = useState(false);
    const classNameFunc = ({ isActive }: { isActive: boolean }) => (isActive ? !hideActive ? classes.active : '' : '');
    return (
        <>
            <div className={`${classes.sideBar} ${shownBefore && classes[animationClass]}`}>
                <div className={classes.sideBar__content}>
                    <ul>
                        <NavLink className={classNameFunc} to="/dashboard"
                            onMouseEnter={() => location.pathname != '/dashboard' ? setHideActive(true) : ''}
                            onMouseLeave={() => setHideActive(false)}>
                            <li>
                                <HomeIcon className={classes.listIcon} />
                                <p className={classes.listName}>Home</p>
                            </li>
                        </NavLink>
                        {
                        userInfo.role === 'customer' ?
                            <NavLink className={classNameFunc} to="/dashboard/newShipment"
                                onMouseEnter={() => location.pathname != '/dashboard/newShipment' ? setHideActive(true) : ''}
                                onMouseLeave={() => setHideActive(false)}>
                                <li>
                                    <WidgetsIcon className={classes.listIcon} />
                                    <p className={classes.listName}>New Shipment</p>
                                </li>
                            </NavLink>
                            :
                            <></>
                        }
                    </ul>
                    <div className={classes.userContainer}>
                        <div className={classes.userInfo}>
                            {userInfo.fullName}
                        </div>
                        <LogoutIcon className={classes.logoutIcon} onClick={handleLogout} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Sidebar;