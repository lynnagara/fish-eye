const FRAME_COUNT = 40

const TOTAL_WIDTH = 800

const FRAME_HEIGHT = 40

const DEFAULT_WIDTH = 3

type FrameData = {id: string}

const DATA: FrameData[] = function() {
    const frames: FrameData[] = []
    for (let i = 0; i < FRAME_COUNT; i++) {
        frames.push({"id": i.toString()})
    }
    return frames
}()

function Frame(data: FrameData, scaleFactor: number): JSX.Element {
    return React.createElement(
        "div",
        {
            key: data.id,
            className: "animate",
            style: {
                backgroundColor: "#DDD",
                width: DEFAULT_WIDTH,
                height: "100%",
                transform: `scale(${scaleFactor})`
            }
        },
        null
    )
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function Fisheye(): JSX.Element {
    const [cursorPosition, setCursorPosition] = React.useState<number | null>(null)
    const ref = React.createRef<HTMLDivElement>()

    function handleMouseMove(event: React.MouseEvent): void {
        if (ref.current) {
            const cursorX: number = event.clientX - ref.current.getBoundingClientRect().x
            setCursorPosition(cursorX)
        }
    }

    function handleMouseOut(): void {
        setCursorPosition(null)
    }

    function getScaleFactor(frameIndex: number) : number {
        if (cursorPosition) {
            const dist = Math.abs(cursorPosition * FRAME_COUNT / TOTAL_WIDTH - frameIndex)
            if (dist <= 4) {
                return (4 - dist) * 0.6 + 1
            }
        }
        return 1
    }



    return React.createElement(
        "div",
        {style: {display: "flex", justifyContent: "center", height: "100%", alignItems: "center"}},
        React.createElement(
            "div",
            {
                ref: ref,
                onMouseMove: handleMouseMove,
                onMouseOut: handleMouseOut,
                style: {display: "flex", width: TOTAL_WIDTH, height: FRAME_HEIGHT, justifyContent: "space-around"}
            },
            DATA.map((d, i) => Frame(d, getScaleFactor(i))),
        )
    )
}

