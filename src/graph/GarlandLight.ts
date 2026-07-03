import { MyPluginSettings } from "../settings";

export class GarlandLight {
	private static rainbow = [
		0xff4040,
		0xffa040,
		0xffff40,
		0x40ff40,
		0x40ffff,
		0x4080ff,
		0xff40ff,
	];

	private static christmas = [
		0xff3030,
		0x30ff50,
		0xfff060,
	];

	private static gold = [
		0xffd36a,
		0xffb52e,
		0xffffaa,
		0xffe27a,
	];

	private static neon = [
		0xff00ff,
		0x00ffff,
		0x8a2bff,
		0xff0080,
		0x00ff88,
	];

	private static sakura = [
		0xffb7d5,
		0xff8fc7,
		0xffd6e8,
		0xff6faf,
	];

	private static stars = [
		0xffff88,
		0xffffff,
		0xffcc44,
		0x99ccff,
	];

	constructor(
		private PIXI: any,
		private circle: any,
		private settings: MyPluginSettings,
		x: number,
		y: number,
		changeColor: boolean,
		index: number,
		tick: number
	) {
		let g: any = this.circle.getChildByName("garland-light");

		if (!g) {
			g = new this.PIXI.Graphics();
			g.name = "garland-light";
			g.zIndex = 999;
			g.__colorIndex = Math.floor(Math.random() * 10);
			g.__phase = Math.random() * Math.PI * 2;

			this.circle.sortableChildren = true;
			this.circle.addChild(g);
		}

		if (changeColor) {
			g.__colorIndex++;
		}

		g.x = x;
		g.y = y;

		this.repaint(g, index, tick);
	}

	private repaint(g: any, index: number, tick: number): void {
		const color = this.getColor(g, index, tick);
		const size = this.settings.bulbSize;
		const glow = this.settings.bulbGlowSize;

		const pulse =
			this.settings.mode === "pulse"
				? 0.75 + Math.sin(tick * 0.08 + g.__phase) * 0.25
				: 1;

		g.clear();

		if (this.settings.theme === "christmas") {
			this.drawChristmasBulb(g, color, size, glow, pulse);
			return;
		}

		if (this.settings.theme === "gold") {
			this.drawGoldenLight(g, color, size, glow, pulse);
			return;
		}

		if (this.settings.theme === "neon") {
			this.drawNeonSphere(g, color, size, glow, pulse);
			return;
		}

		if (this.settings.theme === "sakura") {
			this.drawSakura(g, color, size, glow, pulse);
			return;
		}

		if (this.settings.theme === "stars") {
			this.drawStar(g, color, size, glow, pulse);
			return;
		}

		this.drawChristmasBulb(g, color, size, glow, pulse);
	}

	private drawChristmasBulb(
		g: any,
		color: number,
		size: number,
		glow: number,
		pulse: number
	): void {
		g.beginFill(color, 0.18 * pulse);
		g.drawCircle(0, 0, glow);
		g.endFill();

		g.beginFill(color, 0.35 * pulse);
		g.drawCircle(0, 0, glow * 0.65);
		g.endFill();

		g.beginFill(0x333333, 1);
		g.drawRect(-size * 0.22, -size * 0.72, size * 0.44, size * 0.28);
		g.endFill();

		g.beginFill(color, 0.95 * pulse);
		g.drawCircle(0, 0, size);
		g.endFill();

		g.beginFill(0xffffff, 0.7);
		g.drawCircle(-size * 0.25, -size * 0.25, size * 0.15);
		g.endFill();
	}

	private drawGoldenLight(
		g: any,
		color: number,
		size: number,
		glow: number,
		pulse: number
	): void {
		g.beginFill(0xffcc55, 0.2 * pulse);
		g.drawCircle(0, 0, glow * 1.2);
		g.endFill();

		g.beginFill(color, 0.4 * pulse);
		g.drawCircle(0, 0, glow * 0.7);
		g.endFill();

		g.beginFill(color, 1);
		g.drawCircle(0, 0, size * 0.75);
		g.endFill();

		g.lineStyle(size * 0.08, 0xffffff, 0.65);
		g.moveTo(-size * 0.45, 0);
		g.lineTo(size * 0.45, 0);
		g.moveTo(0, -size * 0.45);
		g.lineTo(0, size * 0.45);
	}

	private drawNeonSphere(
		g: any,
		color: number,
		size: number,
		glow: number,
		pulse: number
	): void {
		g.beginFill(color, 0.14 * pulse);
		g.drawCircle(0, 0, glow * 1.25);
		g.endFill();

		g.beginFill(color, 0.28 * pulse);
		g.drawCircle(0, 0, glow * 0.85);
		g.endFill();

		g.lineStyle(size * 0.14, color, 0.95);
		g.drawCircle(0, 0, size * 0.72);

		g.beginFill(color, 0.35);
		g.drawCircle(0, 0, size * 0.45);
		g.endFill();

		g.beginFill(0xffffff, 0.75);
		g.drawCircle(-size * 0.25, -size * 0.25, size * 0.12);
		g.endFill();
	}

	private drawSakura(
	g: any,
	color: number,
	size: number,
	glow: number,
	pulse: number
): void {
	g.beginFill(color, 0.16 * pulse);
	g.drawCircle(0, 0, glow * 0.9);
	g.endFill();

	const petalWidth = size * 0.55;
	const petalHeight = size * 0.55;
	const distance = size * 0.38;

	for (let i = 0; i < 5; i++) {
		const angle = (Math.PI * 2 * i) / 5 - Math.PI / 2;
		const px = Math.cos(angle) * distance;
		const py = Math.sin(angle) * distance;

		g.beginFill(color, 0.95);
		g.drawEllipse(px, py, petalWidth, petalHeight);
		g.endFill();
	}

	g.beginFill(0xfff08a, 1);
	g.drawCircle(0, 0, size * 0.2);
	g.endFill();

	g.beginFill(0xffffff, 0.45);
	g.drawCircle(-size * 0.12, -size * 0.12, size * 0.08);
	g.endFill();
}

	private drawStar(
		g: any,
		color: number,
		size: number,
		glow: number,
		pulse: number
	): void {
		g.beginFill(color, 0.16 * pulse);
		g.drawCircle(0, 0, glow);
		g.endFill();

		const points: number[] = [];
		const spikes = 5;
		const outer = size;
		const inner = size * 0.42;

		for (let i = 0; i < spikes * 2; i++) {
			const radius = i % 2 === 0 ? outer : inner;
			const angle = (Math.PI * i) / spikes - Math.PI / 2;

			points.push(Math.cos(angle) * radius);
			points.push(Math.sin(angle) * radius);
		}

		g.beginFill(color, 1);
		g.drawPolygon(points);
		g.endFill();

		g.beginFill(0xffffff, 0.45);
		g.drawCircle(-size * 0.22, -size * 0.22, size * 0.12);
		g.endFill();
	}

	private getColor(g: any, index: number, tick: number): number {
		const palette = this.getPalette();

		if (this.settings.mode === "static") {
			return palette[0];
		}

		if (this.settings.mode === "wave") {
			const waveIndex = Math.floor(index + tick / 8) % palette.length;
			return palette[waveIndex];
		}

		if (this.settings.mode === "pulse") {
			return palette[index % palette.length];
		}

		if (this.settings.mode === "rainbow") {
			return GarlandLight.rainbow[g.__colorIndex % GarlandLight.rainbow.length];
		}

		return palette[g.__colorIndex % palette.length];
	}

	private getPalette(): number[] {
		if (this.settings.theme === "christmas") return GarlandLight.christmas;
		if (this.settings.theme === "gold") return GarlandLight.gold;
		if (this.settings.theme === "neon") return GarlandLight.neon;
		if (this.settings.theme === "sakura") return GarlandLight.sakura;
		if (this.settings.theme === "stars") return GarlandLight.stars;

		return GarlandLight.rainbow;
	}
}