import classes from "./style.module.scss"
import MenuIcon from '@mui/icons-material/Menu';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import { useAuth } from "contexts/Auth.context";
import { UserInfoI } from "types/auth/context.types";

interface componentProps {
    onMenuIconClick: () => void,
    open: boolean
}

function Navbar({ onMenuIconClick, open }: componentProps) {
    const { state, dispatch } = useAuth();
    const userInfo = state.user as UserInfoI
    return (
        <div className={classes.xNavbar}>
            <div className={classes.xNavbar__content}>
                <div className={classes.leftSide}>
                    {
                        !open ? (<MenuIcon className={classes.menuIcon} fontSize='large' onClick={onMenuIconClick} />)
                            : (<MenuOpenIcon className={`${classes.menuIcon} ${classes.closeIcon}`} fontSize='large' onClick={onMenuIconClick} />)
                    }
                    <h2 className={classes.name}>Parcels System | {userInfo.role}s Dashboard</h2>
                </div>
            </div>
        </div>
    );
}


export default Navbar