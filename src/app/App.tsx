import './styles/App.css'
import Canvas from "./Canvas/Canvas.tsx";
import {useState} from "react";
import Toolbar from "../widgets/Toolbar/Toolbar.tsx";

function App() {
    const [brushColor, setBrushColor] = useState<string>('black');

    return (
        <div className="app">
            <Toolbar
                setBrushColor={setBrushColor}
            />
            <Canvas
                brushColor={brushColor}
            />
        </div>
    )
}

export default App
