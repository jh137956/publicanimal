
interface MainTopContainerProps {
    renderHamburgerWithToolTip: () => JSX.Element;
}

const MainTopContainer: React.FC<MainTopContainerProps> = (props) => {
    return (
        <div style={{}}>
            {props.renderHamburgerWithToolTip()}
        </div>
    );
};

export default MainTopContainer;
