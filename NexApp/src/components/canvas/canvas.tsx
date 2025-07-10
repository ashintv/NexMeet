import {useRef, useState } from "react"
import { Rect, Stage, Layer, Circle, Line, Transformer, Text } from "react-konva"
import {
	type TextType,
	type ShapeType,
} from "./types"
import { v4 as uuidv4 } from "uuid"
import Konva from "konva"
import { useTools } from "./store"
import { Menu } from "./buttonmenu"

export function Canvas({shapes , setShape , socket ,joinid}:CanvasProps) {
	const isPainting = useRef<boolean | null>(null)
	const currentShape = useRef<string | null>(null)
	const stageRef = useRef<Konva.Stage | null>(null)
	const transformerRef = useRef<Konva.Transformer | null>(null)
	const { tool } = useTools()

	//elemenst
	const [editingId, setEditingId] = useState<string | null>(null)
	const [editingValue, setEditingValue] = useState<string>("")
	const [inputPos, setInputPos] = useState<{ x: number; y: number; fontSize: number }>({
		x: 0,
		y: 0,
		fontSize: 20,
	})

	function handlePointerDown() {
		isPainting.current = true
		const stage = stageRef.current?.getStage()
		if (!stage) {
			console.log("no stage")
			return
		}

		const position = stage.getPointersPositions()
		const { x, y } = position[0]
		const id = uuidv4()

		if (tool === "RECT") {
			setShape((c) => [
				...c,
				{
					id,
					shape: "RECT",
					x,
					y,
					height: 20,
					width: 20,
					stroke: "#FFFF",
				},
                                
			])
		} else if (tool === "CIRCLE") {
			setShape((c) => [
				...c,
				{
					id,
					shape: "CIRCLE",
					x,
					y,
					radius: 20,
					stroke: "#FFFF",
				},
			])
		} else if (tool === "LINE") {
			setShape((c) => [
				...c,
				{
					id,
					shape: "LINE",
					points: [x, y],
					stroke: "#FFFF",
				},
			])
		} else if (tool === "TEXT") {
			setShape((c) => [
				...c,
				{
					id,
					shape: "TEXT",
					x,
					y,
					text: "TEXT",
					stroke: "#FFFF",
					fontSize: 30,
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

		const position = stage.getPointersPositions()
		const { x, y } = position[0]

		if (tool === "RECT") {
			setShape((shapes) =>
				shapes.map((s) => {
					if (s.id === currentShape.current && s.shape === "RECT") {
						return {
							...s,
							width: x - s.x,
							height: y - s.y,
						}
					}
					return s
				})
			)
		} else if (tool === "CIRCLE") {
			setShape((shapes) =>
				shapes.map((s) => {
					if (s.id === currentShape.current && s.shape === "CIRCLE") {
						return {
							...s,
							radius: Math.sqrt((y - s.y) ** 2 + (x - s.x) ** 2),
						}
					}
					return s
				})
			)
		} else if (tool === "LINE") {
			setShape((shapes) =>
				shapes.map((s) => {
					if (s.id === currentShape.current && s.shape === "LINE") {
						return {
							...s,
							points: [...s.points, x, y],
						}
					}
					return s
				})
			)
		}
	}

	function handleMouseUp() {
		isPainting.current = false
                socket?.send(JSON.stringify({
                        type:"shape",
                        data:{
                                room:joinid
                        },
                        shape:shapes[shapes.length-1]
                }))
	}
	function onClick(e: Konva.KonvaEventObject<MouseEvent>) {
		if (tool !== "SELECT") return
		if (!transformerRef.current) return
		const target = e.currentTarget
		transformerRef.current.nodes([target])
		console.log(target.attrs)
	}
	function textonClick(e: Konva.KonvaEventObject<MouseEvent>, text: TextType) {
		if (!transformerRef.current) return
		const target = e.currentTarget
		transformerRef.current.nodes([target])
		setEditingId(text.id)
		setEditingValue(text.text)
		setInputPos({
			x: text.x,
			y: text.y,
			fontSize: text.fontSize,
		})
	}
	function saveTextEdit() {
		setShape((prev) => prev.map((t) => (t.id === editingId ? { ...t, text: editingValue } : t)))
		setEditingId(null)
		setEditingValue("")
	}
	function handleDragEnd(e: Konva.KonvaEventObject<DragEvent>, id: string) {
		const node = e.target
		const newX = node.x()
		const newY = node.y()

		setShape((prevShapes) =>
			prevShapes.map((shape) => (shape.id === id ? { ...shape, x: newX, y: newY } : shape))
		)
	}
	function handleTransformEnd(e: Konva.KonvaEventObject<Event>, id: string) {
		const node = e.target
		const scaleX = node.scaleX()
		const scaleY = node.scaleY()

		// Reset scale on the node, apply it to width/height instead
		node.scaleX(1)
		node.scaleY(1)

		const newWidth = Math.max(5, node.width() * scaleX)
		const newHeight = Math.max(5, node.height() * scaleY)
		const newX = node.x()
		const newY = node.y()

		setShape((prevShapes) =>
			prevShapes.map((shape) =>
				shape.id === id
					? { ...shape, x: newX, y: newY, width: newWidth, height: newHeight }
					: shape
			)
		)
	}
	return (
		<div className="outline w-fit ">
			<Stage
				listening
				ref={stageRef}
				width={window.innerWidth / 2}
				height={window.innerHeight}
				onPointerUp={handleMouseUp}
				onPointerMove={handlePointerMove}
				onPointerDown={handlePointerDown}>
				<Layer>
					<Rect
						x={0}
						y={0}
						height={window.innerHeight}
						width={window.innerWidth / 2}
						id="bg"
						onClick={() => {
							transformerRef.current?.nodes([])
						}}
					/>

					{shapes.map((x) => {
						if (x.shape == "RECT") {
							return (
								<Rect
									draggable={tool === "SELECT"}
									scaleX={x.scaleX ?? 1}
									scaleY={x.scaleY ?? 1}
									key={x.id}
									x={x.x}
									y={x.y}
									height={x.height}
									width={x.width}
									stroke={x.stroke}
									onClick={(e) => {
										onClick(e,)
									}}
									onDragEnd={(e) => handleDragEnd(e, x.id)}
									onTransformEnd={(e) => handleTransformEnd(e, x.id)}
								/>
							)
						} else if (x.shape == "CIRCLE") {
							return (
								<Circle
									draggable={tool === "SELECT"}
									key={x.id}
									x={x.x}
									y={x.y}
									radius={x.radius}
									stroke={x.stroke}
									onClick={(e) => {
										onClick(e)
									}}
									onDragEnd={(e) => handleDragEnd(e, x.id)}
									onTransformEnd={(e) => handleTransformEnd(e, x.id)}
								/>
							)
						} else if (x.shape == "LINE") {
							return (
								<Line
									key={x.id}
									stroke={x.stroke}
									points={x.points}
									strokeWidth={2}
									fill={"#FFF"}
									draggable={tool === "SELECT"}
									onClick={(e) => {
										onClick(e)
									}}
								/>
							)
						} else if (x.shape == "TEXT") {
							return (
								<div>
									<Text
										onClick={(e) => {
											textonClick(e, x)
										}}
										key={x.id}
										text={x.text}
										x={x.x}
										y={x.y}
										fontSize={x.fontSize}
										fill={x.fillColor}
										stroke={x.stroke}
									/>
								</div>
							)
						}
					})}

					<Transformer ref={transformerRef} />
				</Layer>
			</Stage>
			{editingId && (
				<textarea
					autoFocus
					value={editingValue}
					onChange={(e) => setEditingValue(e.target.value)}
					onBlur={saveTextEdit}
					onKeyDown={(e) => {
						if (e.key === "Enter") saveTextEdit()
					}}
					style={{
						position: "absolute",
						top: inputPos.y,
						left: inputPos.x,
						fontSize: inputPos.fontSize,
						border: "1px solid #333",
						background: "white",
						color: "#000",
						padding: 0,
						margin: 0,
						overflow: "hidden",
						resize: "none",
					}}
				/>
			)}
			<div className="fixed bottom-4 left-1/6">
				<Menu />
			</div>
		</div>
	)
}


interface CanvasProps{
        shapes:ShapeType[]
        setShape:React.Dispatch<React.SetStateAction<ShapeType[]>>
        socket:WebSocket,
        joinid:string
}