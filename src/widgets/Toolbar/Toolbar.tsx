const Toolbar = ({setBrushColor}) => {
    return (
        <div>
            <label htmlFor="brush">color</label>
            <input type="color" onChange={(e) => setBrushColor(e.target.value)}/>
        </div>
    );
};

export default Toolbar;
