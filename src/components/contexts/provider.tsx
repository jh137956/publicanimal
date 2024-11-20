import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { instance } from "../store/axios";
import { User } from "../store/interface";
import { UserContext } from "./context";

const UserProvider: React.FC<{ children?: React.ReactNode | undefined }> = (props) => {
    const [userInfo, setUser] = useState<User | undefined>();
    const [cookies] = useCookies(['access_token', 'refresh_token']);

    useEffect(() => {
        if(cookies.access_token || cookies.refresh_token) {
            // 로그인 시
            cookieLogin();
        } else if (!cookies.access_token && !cookies.refresh_token) {
            // 로그아웃 시
            logout();
        }
    }, [cookies]);

    const cookieLogin = async () => {
        const result = await instance.post('auth/cookielogin', {});
        
        if (result.data) {
            const user: User = {
                email: result.data.email,
                name: result.data.name,
            };
            setUserInfo!(user);
        }
    };

    const logout = async () => {
        const result = await instance.post('auth/logout', {});
        if (result.data.success) {
            setUserInfo(undefined);
        }
    }

    const setUserInfo = (newUser: User | undefined) => {
        setUser(newUser);
    }



    return ( 
        <UserContext.Provider value={{ userInfo, setUserInfo }}>
            {props.children}
        </UserContext.Provider>
    );
};

export default UserProvider;