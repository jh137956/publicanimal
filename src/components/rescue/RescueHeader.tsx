import { makeStyles, Option, OptionOnSelectData } from '@fluentui/react-components';
import { Search24Regular } from '@fluentui/react-icons';
import { useEffect, useState } from 'react';
import { Sido } from '../body/RescueBodyWrapper';
import { DefaultDropDown } from '../common/DefaultDropDown';
import { instance } from '../store/axios';
import { Animal, PaingAnimal } from '../store/interface';
import RescueContent from './RescueContent';

interface RescueHeaderProps {
    sidoDropDown: Sido[] | undefined;
}

export interface Sigubgu {
    uprcd: string;
    orgcd: string;
    orgdownnm: string;
}

export interface Shelter {
    carenm: string;
    careregno: string;
}

export interface BigKind {
    bigkindcode: string;
    bigkindnm: string;
}

export interface SmallKind {
    kindcd: string;
    kindnm: string;
}

export interface Sexkind {
    sexcd: string;
    sexnm: string;
}

export interface Paging {
    numOfRows: string;
    pageNo: string;
    totalCount: string;
}

const bigKindData: BigKind[] = [
    {
        bigkindcode: '',
        bigkindnm: '전체',
    },
    {
        bigkindcode: '417000',
        bigkindnm: '개',
    },
    {
        bigkindcode: '422400',
        bigkindnm: '고양이',
    },
    {
        bigkindcode: '429900',
        bigkindnm: '기타',
    },
];

const sexData: Sexkind[] = [
    {
        sexcd: '',
        sexnm: '전체',
    },
    {
        sexcd: 'M',
        sexnm: '수컷',
    },
    {
        sexcd: 'F',
        sexnm: '암컷',
    },
    {
        sexcd: 'Q',
        sexnm: '미상',
    },
];

const rescueHeaderCss = makeStyles({
    wrapper: {},
    header: {
        width: '100%',
        height: '200px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        gap: '20px',
    },
});

const RescueHeader: React.FC<RescueHeaderProps> = (props) => {
    const styles = rescueHeaderCss();
    const [sigunguDropDown, setSigunguDropDown] = useState<Sigubgu[]>([{ uprcd: '', orgcd: '', orgdownnm: '전체' }]);
    const [shelterDropDown, setShelterDropDown] = useState<Shelter[]>([{ careregno: '', carenm: '전체' }]);
    const [smallKind, setSmallKind] = useState<SmallKind[]>([{ kindcd: '', kindnm: '전체' }]);
    const [selectedSido, setSelectedSido] = useState<string>('');
    const [selectedSigungu, setSelectedSigungu] = useState<string>('');
    const [selectedShelter, setSelectedShelter] = useState<string>('');
    const [selectedBigKind, setSelectedBigKind] = useState<string>('');
    const [selectedSmallKind, setSelectedSmallKind] = useState<string>('');
    const [selectedSexKind, setSelectedSexKind] = useState<string>('');

    const [strDate, setStrDate] = useState<string>('');
    const [endDate, setEndDate] = useState<string>('');

    const [pageAnimals, setPageAnimals] = useState<PaingAnimal>({page: 1, data: []});
    const [resultAnimals, setResultAnimals] = useState<Animal[]>([]);
    const [resultPaging, setResultPaging] = useState<Paging>();
    const [currentPage, setCurrentPage] = useState<number>(1);

    useEffect(() => {
        const timeStamp = Date.now();
        const now = new Date(timeStamp);
        const year = now.getFullYear();
        const month = now.getMonth();
        const endMonth = now.getMonth() + 1;
        const date = now.getDate();
        setStrDate(`${year}-${month}-${date}`);
        setEndDate(`${year}-${endMonth}-${date}`);
    }, []);

    // ================================  on render options
    const bigKindOptions = () => {
        return bigKindData?.map((value, index) => {
            return (
                <Option key={index} value={value.bigkindcode}>
                    {value.bigkindnm}
                </Option>
            );
        });
    };

    const smallKindOptions = () => {
        return smallKind?.map((value, index) => {
            return (
                <Option key={index} value={value.kindcd}>
                    {value.kindnm}
                </Option>
            );
        });
    };

    const sexKindOptions = () => {
        return sexData?.map((value, index) => {
            return (
                <Option key={index} value={value.sexcd}>
                    {value.sexnm}
                </Option>
            );
        });
    };

    const sidoOptions = () => {
        return props.sidoDropDown?.map((value, index) => {
            return (
                <Option key={index} value={value.orgcd!}>
                    {value.orgdownnm}
                </Option>
            );
        });
    };

    const sigunguOptions = () => {
        return sigunguDropDown?.map((value, index) => {
            return (
                <Option key={value.orgcd!} value={value.orgcd!}>
                    {value.orgdownnm}
                </Option>
            );
        });
    };

    const shelterOptions = () => {
        return shelterDropDown?.map((value, index) => {
            return (
                <Option key={index} value={value.careregno!}>
                    {value.carenm}
                </Option>
            );
        });
    };

    // ================================  on select
    const onSelectedSido = async (data: OptionOnSelectData) => {
        setSelectedSido(data.optionValue!);

        if (data.optionValue === '') {
            setSigunguDropDown(sigunguDropDown.filter((element) => element.orgcd === ''));
            setSelectedSigungu(sigunguDropDown.find((element) => element.orgcd === '')!.orgcd);
        } else {
            const result = await instance.post('rescue/sigunguinfo', { uprcd: data.optionValue });

            if (result.data) {
                setSigunguDropDown([...sigunguDropDown.filter((element) => element.orgcd === ''), ...result.data]);
            }
        }
    };

    const onSelectedSigungu = async (data: OptionOnSelectData) => {
        setSelectedSigungu(data.optionValue!);

        if (data.optionValue === '') {
            setShelterDropDown([{ careregno: '', carenm: '전체' }]);
        } else {
            const result = await instance.post('rescue/shelterInfo', { uprcd: selectedSido, orgcd: data.optionValue });
            if (result.data) {
                setShelterDropDown([...shelterDropDown.filter((element) => element.careregno === ''), ...result.data.items]);
            }
        }
    };

    const onSelectedShelter = async (data: OptionOnSelectData) => {
        setSelectedShelter(data.optionValue!);
    };

    const onSelectedBigKind = async (data: OptionOnSelectData) => {
        setSelectedBigKind(data.optionValue!);
        if (data.optionValue !== '') {
            const result = await instance.post('rescue/smallkindinfo', { kind: data.optionValue });
            if (result.data) {
                setSmallKind([...smallKind.filter((element) => element.kindcd === ''), ...result.data.items]);
            }
        }
    };

    const onSelectedSmallKind = async (data: OptionOnSelectData) => {
        setSelectedSmallKind(data.optionValue!);
    };

    const onSelectedSex = async (data: OptionOnSelectData) => {
        setSelectedSexKind(data.optionValue!);
    };

    const onClickSearch = async (page: number) => {
        console.log(resultAnimals)
        const searchBody: any = {
            bgnde: strDate ? strDate.replaceAll('-', '') : strDate,
            endde: endDate ? endDate.replaceAll('-', '') : endDate,
            upkind: selectedBigKind,
            kind: selectedSmallKind,
            upr_cd: selectedSido,
            org_cd: selectedSigungu,
            care_reg_no: selectedShelter,
            state: '',
            neuter_yn: '',
            numOfRows: '12',
            pageNo: page,
        };

        const result = await instance.post('rescue/animalinfo', { searchBody });
        if (result.data) {
            // setPageAnimals({page: result.data.pageNo, data: result.data.items});
            setResultAnimals(result.data.items);
            setResultPaging({ numOfRows: result.data.numOfRows, pageNo: result.data.pageNo, totalCount: result.data.totalCount });
            console.log(result.data.totalCount)
            setCurrentPage(parseInt(result.data.pageNo));
        }
    };

    const onClickPage = (value: number) => {
        setCurrentPage(value)
        onClickSearch(value)
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.header}>
                <div>
                    <div style={{ display: 'flex', flexDirection: 'row', gap: '10px', alignItems: 'center' }}>
                        <div style={{ width: '50px' }}>
                            <h3>{'날짜'}</h3>
                        </div>
                        <input
                            type={'date'}
                            style={{ height: '30px' }}
                            datatype={'yyyy-mm-dd'}
                            max={'9999-12-31'}
                            value={strDate}
                            onChange={(e) => {
                                setStrDate(e.target.value);
                            }}
                        />
                        <h3>~</h3>
                        <input
                            type={'date'}
                            style={{ height: '30px' }}
                            datatype={'yyyy-mm-dd'}
                            max={'9999-12-31'}
                            value={endDate}
                            onChange={(e) => {
                                setEndDate(e.target.value);
                            }}
                        />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'row', gap: '10px', alignItems: 'center' }}>
                        <DefaultDropDown
                            onSelected={onSelectedSido}
                            header={'시도'}
                            defaultSelect={props.sidoDropDown![0].orgcd}
                            defaultValue={props.sidoDropDown![0].orgdownnm}
                        >
                            {sidoOptions()}
                        </DefaultDropDown>
                        <DefaultDropDown
                            onSelected={onSelectedSigungu}
                            header={'시군구'}
                            defaultSelect={sigunguDropDown[0].orgcd}
                            defaultValue={sigunguDropDown[0].orgdownnm}
                        >
                            {sigunguOptions()}
                        </DefaultDropDown>

                        <DefaultDropDown
                            onSelected={onSelectedShelter}
                            header={'보호소'}
                            defaultSelect={shelterDropDown[0].careregno}
                            defaultValue={shelterDropDown[0].carenm}
                        >
                            {shelterOptions()}
                        </DefaultDropDown>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'row', gap: '10px' }}>
                        <DefaultDropDown
                            onSelected={onSelectedBigKind}
                            header={'축종'}
                            defaultSelect={bigKindData[0].bigkindcode}
                            defaultValue={bigKindData[0].bigkindnm}
                        >
                            {bigKindOptions()}
                        </DefaultDropDown>
                        <DefaultDropDown
                            onSelected={onSelectedSmallKind}
                            header={'품종'}
                            defaultSelect={smallKind[0].kindcd}
                            defaultValue={smallKind[0].kindnm}
                        >
                            {smallKindOptions()}
                        </DefaultDropDown>
                        <DefaultDropDown
                            onSelected={onSelectedSex}
                            header={'성별'}
                            defaultSelect={sexData[0].sexcd}
                            defaultValue={sexData[0].sexnm}
                        >
                            {sexKindOptions()}
                        </DefaultDropDown>
                    </div>
                </div>
                <div>
                    <Search24Regular
                        onClick={() => {
                            onClickSearch(1);
                        }}
                        style={{}}
                    />
                </div>
            </div>
            <div>
                <div>
                    <RescueContent
                        resultAnimals={resultAnimals}
                        // pageAnimals={pageAnimals}
                        resultPaging={resultPaging}
                        currentPage={currentPage}
                        onClickPage={onClickPage}
                    />
                </div>
            </div>
        </div>
    );
};

export default RescueHeader;
