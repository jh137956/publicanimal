import { makeStyles } from '@fluentui/react-components';

interface CommunityBodyWrapperProps {
}

const communityBodyWrapperCss = makeStyles({
    wrapper: {
      
    },
});

const CommunityBodyWrapper: React.FC = () => {
    const styles = communityBodyWrapperCss();
    return (
        <div className={styles.wrapper}>
            <div>communityBody wrapper</div>
        </div>
    );
};

export default CommunityBodyWrapper;