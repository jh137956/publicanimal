import React, { useContext, useState } from 'react';
import { Button, DrawerProps, makeStyles, Persona } from '@fluentui/react-components';
import {
    AppItem,
    NavCategory,
    NavCategoryItem,
    NavDrawer,
    NavDrawerBody,
    NavDrawerHeader,
    NavItem,
    NavSectionHeader,
    NavSubItem,
    NavSubItemGroup
} from '@fluentui/react-nav-preview';
import { UserContext } from '../contexts/context';

interface MainNavContainerProps {
    renderHamburgerWithToolTip: () => JSX.Element;
    isNavOnOff: boolean;
    setIsNavOnOff: (value: boolean) => void;
}

const mainNavContainerCss = makeStyles({
    topButtons: {
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row',
        width: '100%',
        paddingRight: '14px',
    },
});


const MainNavContainer: React.FC<MainNavContainerProps> = (props) => {
    type DrawerType = Required<DrawerProps>['type'];
    const styles = mainNavContainerCss();
    const [type, setType] = useState<DrawerType>('overlay');
    const [isMultiple, setIsMultiple] = useState<boolean>(true);
    const { userInfo, setUserInfo } = useContext(UserContext);

    const userPersona = () => {
        return <Persona name={userInfo?.email} primaryText={userInfo?.name} avatar={{}} textAlignment="center" />;
    };

    const onSelectedNav = () => {
        props.setIsNavOnOff(false);
    };

    const onclickLogin = () => {
        const width = 500; 
        const height = 400; 
       
        // 팝업을 부모 브라우저의 정 중앙에 나열
        const left = window.screenX + (window.outerWidth - width) / 2;
        const top = window.screenY + (window.outerHeight - height) / 2;
        const windowFeatures = `width=${width},height=${height},left=${left},top=${top},location=no,resize=no`;
        window.open('/#/login', '_blank', windowFeatures);
    };

    return (
        <div>
            <NavDrawer
                open={props.isNavOnOff}
                type={type}
                multiple={isMultiple}
                onNavItemSelect={() => onSelectedNav()}
                defaultSelectedValue=''        
            >
                <NavDrawerHeader className={styles.topButtons}>
                    <div>{props.renderHamburgerWithToolTip()}</div>
                    <div>
                        <Button id={'loginbutton'} onClick={() => onclickLogin()}>{userInfo ? 'logout' : 'login'}</Button>
                    </div>
                </NavDrawerHeader>

                <NavDrawerBody>
                    <AppItem icon={userPersona()} as="a" href={''}></AppItem>
                    <NavItem href={'/#/rescue'} icon={''} value="rescue">
                        Rescue
                    </NavItem>
                    <NavItem href={'/#/community'} icon={''} value="community">
                        community
                    </NavItem>
                    <NavSectionHeader>Employee Management</NavSectionHeader>
                    <NavCategory value="6">
                        <NavCategoryItem icon={''}>Job Postings</NavCategoryItem>
                        <NavSubItemGroup>
                            <NavSubItem href={''} value="7">
                                Openings
                            </NavSubItem>
                            <NavSubItem href={''} value="8">
                                Submissions
                            </NavSubItem>
                        </NavSubItemGroup>
                    </NavCategory>
                </NavDrawerBody>
            </NavDrawer>
        </div>
    );
};

export default MainNavContainer;
