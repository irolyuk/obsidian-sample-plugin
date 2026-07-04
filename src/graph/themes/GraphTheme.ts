export interface ThemeDrawContext {
	g: any;
	color: number;
	size: number;
	glow: number;
	pulse: number;
	tick: number;
	index: number;
}

export interface GraphTheme {
	id: string;
	palette: [number, ...number[]];
	draw(ctx: ThemeDrawContext): void;
}