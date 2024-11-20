import { Paging } from "./RescueHeader";

interface RescuePagingProps {
    currentPage: number;
    onClickPage: (value: number) => void;
    resultPaging?: Paging;
}

const RescuePaging: React.FC<RescuePagingProps> = (props) => {
    const handlePageChange = (value: number) => {
       props.onClickPage(value);
    }


    const onRenderPaging = () => {
        const totalPages = Math.ceil(parseInt(props.resultPaging?.totalCount!) / parseInt(props.resultPaging?.numOfRows!));
        const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
    
        return (
            <div style={{ display: 'flex', justifyContent: 'center', gap: '8px' }}>
                <button onClick={() => handlePageChange(props.currentPage - 1)} disabled={props.currentPage === 1}>
                    Prev
                </button>
                {pages.map((page) => (
                    <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        style={{
                            fontWeight: props.currentPage === page ? 'bold' : 'normal',
                            padding: '4px 8px',
                        }}
                    >
                        {page}
                    </button>
                ))}
                <button onClick={() => handlePageChange(props.currentPage + 1)} disabled={props.currentPage === totalPages}>
                    Next
                </button>
            </div>
        );
    };
    return <>{onRenderPaging()}</>;
};

export default RescuePaging;
