import { Card, CardFooter, CardPreview, makeStyles, Tooltip } from '@fluentui/react-components';
import { useEffect } from 'react';
import { Animal } from '../store/interface';
import { Paging } from './RescueHeader';
import RescuePaging from './RescuePaging';
interface RescueContentProps {
    resultAnimals: Animal[];
    // pageAnimals?: PaingAnimal;
    resultPaging?: Paging;
    currentPage: number;
    onClickPage: (value: number) => void;
}

const rescueContentCss = makeStyles({
    wrapper: {
        display: 'flex', // Flexbox를 활성화
        flexWrap: 'wrap', // 줄바꿈 설정
        gap: '16px', // 카드 간의 간격
        justifyContent: 'center', // 카드 정렬
    },
    card: {
        // margin: 'auto',
        width: '320px',
        // maxWidth: '100%',
        borderRadius: '10px',
    },
});

const RescueContent: React.FC<RescueContentProps> = (props) => {
    const styles = rescueContentCss();
   

    useEffect(() => {
        if (props.resultAnimals.length > 0) {
            onRenderCard();
        }
    }, [props.resultAnimals]);

    const onRenderCard = () => {
        return props.resultAnimals.map((value, index) => {
            let sexnm;

            switch (value.sexCd) {
                case 'M':
                    sexnm = '남';
                    break;
                case 'F':
                    sexnm = '여';
                    break;
                case 'Q':
                    sexnm = '미상';
                    break;
                default:
                    sexnm = '미상';
            }

            return (
                <Card className={styles.card} key={index}>
                    <CardPreview>
                        <img src={value.filename} alt="Preview of a Word document: About Us - Overview" style={{ height: '200px' }} />
                    </CardPreview>
                    <div>
                        <h3>{value.kindCd}</h3>
                        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '10px', height: '25px' }}>
                            <h4 style={{ width: '60px' }}>공고번호</h4>
                            <h4>{value.noticeNo}</h4>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '10px', height: '25px' }}>
                            <h4 style={{ width: '60px' }}>성별</h4>
                            <h4>{sexnm}</h4>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '10px', height: '25px' }}>
                            <h4 style={{ width: '60px' }}>발견장소</h4>
                            <Tooltip content={value.happenPlace} relationship="label">
                                <h4 style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{value.happenPlace}</h4>
                            </Tooltip>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '10px', height: '25px' }}>
                            <h4 style={{ width: '60px' }}>특징</h4>
                            <Tooltip content={value.specialMark} relationship="label">
                                <h4 style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{value.specialMark}</h4>
                            </Tooltip>
                        </div>
                    </div>
                    <CardFooter></CardFooter>
                </Card>
            );
        });
    };
 
    return (
        <div>
            <div className={styles.wrapper}>{onRenderCard()}</div>
            <RescuePaging currentPage={props.currentPage}
            onClickPage={props.onClickPage}
            resultPaging={props.resultPaging}
            />
            {/* <div>{onRenderPaging()}</div> */}
        </div>
    );
};

export default RescueContent;
