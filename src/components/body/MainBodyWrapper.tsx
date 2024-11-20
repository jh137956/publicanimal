import { makeStyles } from '@fluentui/react-components';

interface MainBodyWrapperProps {
}

const mainBodyWrapperCss = makeStyles({
    wrapper: {
      
    },
});

const MainBodyWrapper: React.FC = () => {
    const styles = mainBodyWrapperCss();
    return (
        <div className={styles.wrapper}>
            <div>body</div>
        </div>
    );
};

export default MainBodyWrapper;
