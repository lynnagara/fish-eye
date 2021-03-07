"use strict";
const FRAME_COUNT = 40;
const TOTAL_WIDTH = 800;
const FRAME_HEIGHT = 40;
const DEFAULT_WIDTH = 3;
const DATA = function () {
    const frames = [];
    for (let i = 0; i < FRAME_COUNT; i++) {
        frames.push({ "id": i.toString() });
    }
    return frames;
}();
function Frame(data, scaleFactor) {
    return React.createElement("div", {
        key: data.id,
        className: "animate",
        style: {
            backgroundColor: "#DDD",
            width: DEFAULT_WIDTH,
            height: "100%",
            transform: `scale(${scaleFactor})`
        }
    }, null);
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function Fisheye() {
    const [cursorPosition, setCursorPosition] = React.useState(null);
    const ref = React.createRef();
    function handleMouseMove(event) {
        if (ref.current) {
            const cursorX = event.clientX - ref.current.getBoundingClientRect().x;
            setCursorPosition(cursorX);
        }
    }
    function handleMouseOut() {
        setCursorPosition(null);
    }
    function getScaleFactor(frameIndex) {
        if (cursorPosition) {
            const dist = Math.abs(cursorPosition * FRAME_COUNT / TOTAL_WIDTH - frameIndex);
            if (dist <= 4) {
                return (4 - dist) * 0.6 + 1;
            }
        }
        return 1;
    }
    return React.createElement("div", { style: { display: "flex", justifyContent: "center", height: "100%", alignItems: "center" } }, React.createElement("div", {
        ref: ref,
        onMouseMove: handleMouseMove,
        onMouseOut: handleMouseOut,
        style: { display: "flex", width: TOTAL_WIDTH, height: FRAME_HEIGHT, justifyContent: "space-around" }
    }, DATA.map((d, i) => Frame(d, getScaleFactor(i)))));
}
