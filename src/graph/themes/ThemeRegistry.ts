import { GraphTheme, ThemeDrawContext } from "./GraphTheme";

function glow(g: any, color: number, glow: number, pulse: number): void {
	g.beginFill(color, 0.15 * pulse);
	g.drawCircle(0, 0, glow);
	g.endFill();

	g.beginFill(color, 0.25 * pulse);
	g.drawCircle(0, 0, glow * 0.65);
	g.endFill();
}

function star(g: any, outer: number, inner: number, color: number): void {
	const points: number[] = [];

	for (let i = 0; i < 10; i++) {
		const r = i % 2 === 0 ? outer : inner;
		const a = (Math.PI * i) / 5 - Math.PI / 2;

		points.push(Math.cos(a) * r);
		points.push(Math.sin(a) * r);
	}

	g.beginFill(color, 1);
	g.drawPolygon(points);
	g.endFill();
}

export const THEMES: Record<string, GraphTheme> = {
	christmas: {
		id: "christmas",
		palette: [0xff3030, 0x30ff50, 0xfff060],
		draw({ g, color, size, glow: glowSize, pulse }) {
			glow(g, color, glowSize, pulse);

			g.beginFill(0x333333, 1);
			g.drawRect(-size * 0.22, -size * 0.72, size * 0.44, size * 0.28);
			g.endFill();

			g.beginFill(color, 0.95 * pulse);
			g.drawCircle(0, 0, size);
			g.endFill();

			g.beginFill(0xffffff, 0.7);
			g.drawCircle(-size * 0.25, -size * 0.25, size * 0.15);
			g.endFill();
		},
	},

	gold: {
		id: "gold",
		palette: [0xffd36a, 0xffb52e, 0xffffaa, 0xffe27a],
		draw({ g, color, size, glow: glowSize, pulse }) {
			glow(g, 0xffcc55, glowSize * 1.1, pulse);

			g.beginFill(color, 1);
			g.drawCircle(0, 0, size * 0.75);
			g.endFill();

			g.lineStyle(size * 0.08, 0xffffff, 0.65);
			g.moveTo(-size * 0.45, 0);
			g.lineTo(size * 0.45, 0);
			g.moveTo(0, -size * 0.45);
			g.lineTo(0, size * 0.45);
		},
	},

	neon: {
		id: "neon",
		palette: [0xff00ff, 0x00ffff, 0x8a2bff, 0xff0080, 0x00ff88],
		draw({ g, color, size, glow: glowSize, pulse }) {
			glow(g, color, glowSize * 1.25, pulse);

			g.lineStyle(size * 0.14, color, 0.95);
			g.drawCircle(0, 0, size * 0.72);

			g.beginFill(color, 0.35);
			g.drawCircle(0, 0, size * 0.45);
			g.endFill();

			g.beginFill(0xffffff, 0.75);
			g.drawCircle(-size * 0.25, -size * 0.25, size * 0.12);
			g.endFill();
		},
	},

	sakura: {
		id: "sakura",
		palette: [0xffb7d5, 0xff8fc7, 0xffd6e8, 0xff6faf],
		draw({ g, color, size, glow: glowSize, pulse }) {
			glow(g, color, glowSize * 0.9, pulse);

			const petalWidth = size * 0.55;
			const petalHeight = size * 0.55;
			const distance = size * 0.38;

			for (let i = 0; i < 5; i++) {
				const angle = (Math.PI * 2 * i) / 5 - Math.PI / 2;

				g.beginFill(color, 0.95);
				g.drawEllipse(
					Math.cos(angle) * distance,
					Math.sin(angle) * distance,
					petalWidth,
					petalHeight
				);
				g.endFill();
			}

			g.beginFill(0xfff08a, 1);
			g.drawCircle(0, 0, size * 0.2);
			g.endFill();
		},
	},

	stars: {
		id: "stars",
		palette: [0xffff88, 0xffffff, 0xffcc44, 0x99ccff],
		draw({ g, color, size, glow: glowSize, pulse }) {
			glow(g, color, glowSize, pulse);
			star(g, size, size * 0.42, color);
		},
	},

	pinkClouds: {
		id: "pinkClouds",
		palette: [0xffb7e8, 0xff8fd8, 0xffd6f2, 0xffa6df, 0xffffff],
		draw({ g, color, size, glow: glowSize, pulse }) {
			glow(g, 0xff9fe3, glowSize, pulse);

			g.beginFill(color, 0.95);
			g.drawCircle(-size * 0.45, size * 0.08, size * 0.42);
			g.drawCircle(-size * 0.12, -size * 0.12, size * 0.55);
			g.drawCircle(size * 0.3, size * 0.02, size * 0.48);
			g.drawCircle(size * 0.62, size * 0.18, size * 0.35);
			g.drawEllipse(size * 0.05, size * 0.28, size * 0.9, size * 0.35);
			g.endFill();

			g.beginFill(0xffffff, 0.45);
			g.drawCircle(-size * 0.2, -size * 0.28, size * 0.15);
			g.endFill();
		},
	},
};

export function getTheme(id: string): GraphTheme {
	return THEMES[id] ?? THEMES.christmas!;
}