import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { UserInfoI } from "types/auth/context.types";
import { ChangeUserInfo } from "providers/auth/authReducer";
import HomeIcon from '@mui/icons-material/Home';
import Cookies from "js-cookie";
import LogoutIcon from '@mui/icons-material/Logout';
import classes from "./style.module.scss"
import { useAuth } from "contexts/Auth.context";
interface componentProps {
    animationClass: string,
    shownBefore: boolean
}

const Sidebar = ({ animationClass, shownBefore }: componentProps) => {
    const { state, dispatch } = useAuth();
    const location = useLocation()
    function handleLogout() {
        dispatch(ChangeUserInfo({ isAuth: false, user: {} }));
        Cookies.remove('authorization');
    }
    const userInfo = state.user as UserInfoI
    const [hideActive, setHideActive] = useState(false);
    return (
        <>
            <div className={`${classes.sideBar} ${shownBefore && classes[animationClass]}`}>
                <div className={classes.sideBar__content}>
                    <ul>
                        <NavLink className={!hideActive ? classes.active : ''} end to="/dashboard"
                            onMouseEnter={() => location.pathname != '/dashboard' ? setHideActive(true) : ''}
                            onMouseLeave={() => setHideActive(false)}>
                            <li>
                                <HomeIcon className={classes.listIcon} />
                                <p className={classes.listName}>Home</p>
                            </li>
                        </NavLink>
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