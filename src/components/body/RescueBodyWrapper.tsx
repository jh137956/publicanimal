import { makeStyles, OptionOnSelectData } from '@fluentui/react-components';
import { instance } from '../store/axios';
import { useEffect, useState } from 'react';
import RescueHeader from '../rescue/RescueHeader';
import RescueContent from '../rescue/RescueContent';

interface RescueBodyWrapperProps {}

const rescueBodyWrapperCss = makeStyles({
    wrapper: {},
    header: {
        width: '100%',
        height: '200px',
    },
});

export interface Sido {
    orgcd: string;
    orgdownnm: string;
}

const RescueBodyWrapper: React.FC = () => {
    const styles = rescueBodyWrapperCss();
    const [sidoDropDown, setSidoDropDown] = useState<Sido[]>([{ orgcd: '', orgdownnm: '전체' }]);

    useEffect(() => {
        getSidoInfo();
    }, []);

    const getSidoInfo = async () => {
        const result = await instance.get('rescue/sidoinfo', {});
        if (result.data) {
            setSidoDropDown([...sidoDropDown, ...result.data]);
        }
    };

    return (
        <div className={styles.wrapper}>
            {/* <div className={styles.header}> */}
            <RescueHeader sidoDropDown={sidoDropDown} />
            {/* </div> */}
        </div>
    );
};

export default RescueBodyWrapper;
