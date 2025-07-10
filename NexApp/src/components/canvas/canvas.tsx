import { useRef, useState } from "react"
import { Rect, Stage, Layer, Circle, Line, Transformer } from "react-konva"
import type { CircleType, LineTypes, RectType } from "./types"
import { v4 as uuidv4 } from "uuid"
import Konva from "konva"
import { useTools } from "./store"
import { Menu } from "./buttonmenu"

export function Canvas() {
	const isPainting = useRef<boolean | null>(null)
	const currentShape = useRef<string | null>(null)

	const stageRef = useRef<Konva.Stage | null>(null)
	const transformerRef = useRef<Konva.Transformer | null>(null)

	const { tool } = useTools()
	const isDragable = tool === "SELECT"

	//elemenst
	const [rects, setRects] = useState<RectType[]>([])
	const [circles, setCircles] = useState<CircleType[]>([])
	const [lines, setLines] = useState<LineTypes[]>([])

	function handlePointerDown() {
		isPainting.current = true
		const stage = stageRef.current?.getStage()
		if (!stage) {
			console.log("no stage")
			return
		}
		const positon = stage?.getPointersPositions()
		const { x, y } = positon[0]
		const id = uuidv4()
		if (tool == "RECT") {
			setRects((c) => [
				...c,
				{
					id,
					x,
					y,
					height: 20,
					width: 20,
					stroke: "#FFFF",
				},
			])
		} else if (tool == "CIRCLE") {
			setCircles((c) => [
				...c,
				{
					id,
					x,
					y,
					radius: 20,
					stroke: "#FFFF",
				},
			])
		} else if (tool == "LINE") {
			setLines((line) => [
				...line,
				{
					id,
					points: [x, y],
					stroke: "#FFFF",
				},
			])
		}
		currentShape.current = id
	}
	function handlePointerMove() {
		if (!isPainting.current) return
		const stage = stageRef.current?.getStage()
		if (!stage) {
			console.log("no stage")
			return
		}
		const positon = stage?.getPointersPositions()
		const { x, y } = positon[0]
		if (tool == "RECT") {
			setRects(
				rects.map((rect) => {
					if (rect.id === currentShape.current) {
						return {
							...rect,
							width: x - rect.x,
							height: y - rect.y,
						}
					}
					return rect
				})
			)
		} else if (tool == "CIRCLE") {
			setCircles(
				circles.map((circle) => {
					if (circle.id === currentShape.current) {
						return {
							...circle,
							radius: ((y - circle.y) ** 2 + (x - circle.x) ** 2) ** 0.5,
						}
					}
					return circle
				})
			)
		} else if (tool == "LINE") {
			setLines(
				lines.map((line) => {
					if (line.id === currentShape.current) {
						return {
							...line,
							points: [...line.points, x, y],
						}
					}
					return line
				})
			)
		}
	}
	function handleMouseUp() {
		isPainting.current = false
	}
	function onClick(e: Konva.KonvaEventObject<PointerEvent>) {
		if (tool !== "SELECT") return
		if (!transformerRef.current) return
		const target = e.currentTarget
		transformerRef.current.nodes([target])
	}
	return (
		<div className="p-1 border-3">
			<Stage
				listening
				ref={stageRef}
				width={window.innerWidth}
				height={window.innerHeight}
				onPointerUp={handleMouseUp}
				onPointerMove={handlePointerMove}
				onPointerDown={handlePointerDown}>
				<Layer>
					<Rect
						x={0}
						y={0}
						height={window.innerHeight}
						width={window.innerWidth}
						id="bg"
						onClick={() => {
							transformerRef.current?.nodes([])
						}}
					/>

					{rects.map((rect) => (
						<Rect
							draggable={isDragable}
							key={rect.id}
							x={rect.x}
							y={rect.y}
							height={rect.height}
							width={rect.width}
							stroke={rect.stroke}
							onClick={onClick}
						/>
					))}

					{circles.map((circle) => (
						<Circle
							draggable={isDragable}
							key={circle.id}
							x={circle.x}
							y={circle.y}
							radius={circle.radius}
							stroke={circle.stroke}
							onClick={onClick}
						/>
					))}

					{lines.map((line) => (
						<Line
							
							key={line.id}
							stroke={line.stroke}
							points={line.points}
							strokeWidth={2}
							fill={"#FFF"}
                                                        draggable={isDragable}
							onClick={onClick}
						/>
					))}
					<Transformer ref={transformerRef} />
				</Layer>
			</Stage>
			<div className="fixed top-0 left-1/2">
				<Menu />
			</div>
		</div>
	)
}
