import { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { makeStyles, Tooltip } from '@fluentui/react-components';
import { Home24Regular } from '@fluentui/react-icons';
import { Hamburger } from '@fluentui/react-nav-preview';
import { UserContext } from '../contexts/context';
import MainNavContainer from './MainNavContainer';
import MainTopContainer from './MainTopContainer';

const mainContainerCss = makeStyles({
    wrapper: {
        display: 'flex',
        flexDirection: 'column', // 세로 방향으로 정렬
        paddingTop: '5px',
        paddingLeft: '14px',
        paddingRight: '14px',
    },
    nonTop: {
        display: 'none',
    },
    topBody: {
        height: '100px',
    },
});

interface MainContainerProps {
    children: React.ReactNode;
}

const MainContainer: React.FC<MainContainerProps> = (props) => {
    const styles = mainContainerCss();
    const [isNavOnOff, setIsNavOnOff] = useState<boolean>(false);
    const goHome = useNavigate();
    const pathName = useLocation();
    const [isNoneTop, setIsNoneTop] = useState<boolean>(false);
    const { userInfo } = useContext(UserContext);

    useEffect(() => {
        if (pathName.pathname == '/login') {
            setIsNoneTop(true);
        } else {
            setIsNoneTop(false);
        }
    }, [pathName]);
  
    const renderHamburgerWithToolTip = () => {
        return (
            <div style={{ display: 'flex', alignContent: 'center' }}>
                <Tooltip content="menu" relationship="label">
                    <Hamburger onClick={() => setIsNavOnOff(!isNavOnOff)} />
                </Tooltip>
                <div style={{ padding: '5px' }}>
                    <Tooltip content="home" relationship="label" positioning={'below'}>
                        <Home24Regular
                            onClick={() => {
                                goHome('/');
                                if (isNavOnOff) {
                                    setIsNavOnOff(!isNavOnOff);
                                }
                            }}
                        />
                    </Tooltip>
                </div>
            </div>
        );
    };

    return (
        <div className={styles.wrapper}>
            <div className={isNoneTop ? styles.nonTop : styles.topBody}>
                <MainTopContainer renderHamburgerWithToolTip={renderHamburgerWithToolTip} />
                <MainNavContainer
                    renderHamburgerWithToolTip={renderHamburgerWithToolTip}
                    isNavOnOff={isNavOnOff}
                    setIsNavOnOff={setIsNavOnOff}
                />
            </div>
            {props.children}
        </div>
    );
};

export default MainContainer;
