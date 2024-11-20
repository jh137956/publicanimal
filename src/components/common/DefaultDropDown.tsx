import { Dropdown, makeStyles, OptionOnSelectData } from '@fluentui/react-components';
import React from 'react';

interface DefaultDropDownProps {
    onSelected: (data: OptionOnSelectData) => void;
    header: string;
    defaultSelect: string;
    defaultValue: string;
    children: React.ReactNode;
}

const defaultDropDownCss = makeStyles({
    wrapper: {
        display: 'flex' /* Flexbox를 활성화 */,
        alignItems: 'center' /* 세로 축에서 요소를 가운데 정렬 */,
        // justifyContent: 'space-between', /* 가로축 정렬 옵션 (space-between, center, etc.) */
        gap: '10px' /* 요소 간 간격 */,
    },
});

export const DefaultDropDown: React.FC<DefaultDropDownProps> = (props) => {
    const styles = defaultDropDownCss();

    const onSelectedData = (data: OptionOnSelectData) => {
        return props.onSelected(data);
    };

    return (
        <div className={styles.wrapper}>
            <div style={{ width: '50px' }}>
                <h3>{props.header}</h3>
            </div>
            <Dropdown
                onOptionSelect={(e, data) => onSelectedData(data)}
                // defaultSelectedOptions={[props.defaultSelect]}
                defaultValue={props.defaultValue}
            >
                {props.children}
            </Dropdown>
        </div>
    );
};
