
export type RectType = {
        id:string
        x:number,
        y:number,
        fillColor?:string,
        height:number,
        width:number,
        stroke:string
}

export type CircleType= {
        id:string,
        stroke:string,
        radius:number,
        fillColor?:"string",
        x:number,
        y:number
}
export type LineTypes = {
        id:string,
        points: number [],
        fillColor?:string,
        stroke:string
}

export type ToolsType = "RECT" | "CIRCLE" | "SELECT" | "LINE"