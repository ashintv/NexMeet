export type ToolsType = "RECT" | "CIRCLE" | "SELECT" | "LINE" | "TEXT";

export interface BaseShape {
  id: string;
  shape: ToolsType; // 👈 used as the discriminant
  stroke: string;
  fillColor?: string;
  scaleX?: number; // optional
  scaleY?: number;
}

// Shape variants
export interface RectType extends BaseShape {
  shape: "RECT";  // 👈 discriminant
  x: number;
  y: number;
  height: number;
  width: number;
}

export interface CircleType extends BaseShape {
  shape: "CIRCLE"; // 👈
  x: number;
  y: number;
  radius: number;
}

export interface LineType extends BaseShape {
  shape: "LINE";   // 👈
  points: number[];
}

export interface TextType extends BaseShape {
  shape: "TEXT";   // 👈
  x: number;
  y: number;
  text: string;
  fontSize: number;
}

// ✅ One single discriminated union
export type ShapeType = RectType | CircleType | LineType | TextType;