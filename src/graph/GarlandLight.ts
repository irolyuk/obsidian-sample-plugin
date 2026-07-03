import { MyPluginSettings } from "../settings";

export class GarlandLight {
	private static rainbow = [0xff4040, 0xffa040, 0xffff40, 0x40ff40, 0x40ffff, 0x4080ff, 0xff40ff];
	private static christmas = [0xff3030, 0x30ff50, 0xfff060];
	private static gold = [0xffd36a, 0xffb52e, 0xffffaa, 0xffe27a];
	private static neon = [0xff00ff, 0x00ffff, 0x8a2bff, 0xff0080, 0x00ff88];
	private static sakura = [0xffb7d5, 0xff8fc7, 0xffd6e8, 0xff6faf];
	private static stars = [0xffff88, 0xffffff, 0xffcc44, 0x99ccff];
	private static snow = [0xffffff, 0xdff6ff, 0xaeefff, 0xf5fdff];
	private static vines = [0x55cc55, 0x77dd66, 0x2e8b57, 0xa8ff8a];
	private static mushrooms = [0xff4444, 0xff8844, 0xffddaa, 0xffffff];
	private static planets = [0x66aaff, 0xffaa55, 0xdd88ff, 0x88ffcc, 0xffdd66];
	private static crystals = [0x88ffff, 0x66ccff, 0xcc88ff, 0xffffff];
	private static moon = [0xffffcc, 0xdde6ff, 0xffffff, 0xbcc7ff];
	private static water = [0x55ccff, 0x33aaff, 0x99eeff, 0xffffff];
	private static butterflies = [0xff77cc, 0x77ccff, 0xffff77, 0xcc77ff];
	private static energy = [0x66ffff, 0x44ff99, 0xffff44, 0xffffff];
	private static pinkClouds = [0xffb7e8, 0xff8fd8, 0xffd6f2, 0xffa6df, 0xffffff];

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
			g.__colorIndex = Math.floor(Math.random() * 20);
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

		switch (this.settings.theme) {
			case "christmas": return this.drawChristmasBulb(g, color, size, glow, pulse);
			case "gold": return this.drawGoldenLight(g, color, size, glow, pulse);
			case "neon": return this.drawNeonSphere(g, color, size, glow, pulse);
			case "sakura": return this.drawSakura(g, color, size, glow, pulse);
			case "stars": return this.drawStar(g, color, size, glow, pulse);
			case "snow": return this.drawSnow(g, color, size, glow, pulse);
			case "vines": return this.drawVines(g, color, size, glow, pulse);
			case "mushrooms": return this.drawMushroom(g, color, size, glow, pulse);
			case "planets": return this.drawPlanet(g, color, size, glow, pulse);
			case "crystals": return this.drawCrystal(g, color, size, glow, pulse);
			case "moon": return this.drawMoon(g, color, size, glow, pulse);
			case "water": return this.drawWater(g, color, size, glow, pulse);
			case "butterflies": return this.drawButterfly(g, color, size, glow, pulse);
			case "energy": return this.drawEnergy(g, color, size, glow, pulse);
			case "pinkClouds": return this.drawPinkCloud(g, color, size, glow, pulse);
		}
	}

	private glow(g: any, color: number, glow: number, pulse: number): void {
		g.beginFill(color, 0.15 * pulse);
		g.drawCircle(0, 0, glow);
		g.endFill();
		g.beginFill(color, 0.25 * pulse);
		g.drawCircle(0, 0, glow * 0.65);
		g.endFill();
	}

	private drawChristmasBulb(g: any, color: number, size: number, glow: number, pulse: number): void {
		this.glow(g, color, glow, pulse);
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

	private drawGoldenLight(g: any, color: number, size: number, glow: number, pulse: number): void {
		this.glow(g, 0xffcc55, glow * 1.1, pulse);
		g.beginFill(color, 1);
		g.drawCircle(0, 0, size * 0.75);
		g.endFill();
		g.lineStyle(size * 0.08, 0xffffff, 0.65);
		g.moveTo(-size * 0.45, 0); g.lineTo(size * 0.45, 0);
		g.moveTo(0, -size * 0.45); g.lineTo(0, size * 0.45);
	}

	private drawNeonSphere(g: any, color: number, size: number, glow: number, pulse: number): void {
		this.glow(g, color, glow * 1.25, pulse);
		g.lineStyle(size * 0.14, color, 0.95);
		g.drawCircle(0, 0, size * 0.72);
		g.beginFill(color, 0.35);
		g.drawCircle(0, 0, size * 0.45);
		g.endFill();
		g.beginFill(0xffffff, 0.75);
		g.drawCircle(-size * 0.25, -size * 0.25, size * 0.12);
		g.endFill();
	}

	private drawSakura(g: any, color: number, size: number, glow: number, pulse: number): void {
		this.glow(g, color, glow * 0.9, pulse);
		const petalWidth = size * 0.55;
		const petalHeight = size * 0.55;
		const distance = size * 0.38;

		for (let i = 0; i < 5; i++) {
			const angle = (Math.PI * 2 * i) / 5 - Math.PI / 2;
			g.beginFill(color, 0.95);
			g.drawEllipse(Math.cos(angle) * distance, Math.sin(angle) * distance, petalWidth, petalHeight);
			g.endFill();
		}

		g.beginFill(0xfff08a, 1);
		g.drawCircle(0, 0, size * 0.2);
		g.endFill();
	}

	private drawStar(g: any, color: number, size: number, glow: number, pulse: number): void {
		this.glow(g, color, glow, pulse);
		this.star(g, 0, 0, size, size * 0.42, color);
	}

	private drawSnow(g: any, color: number, size: number, glow: number, pulse: number): void {
		this.glow(g, color, glow, pulse);
		g.lineStyle(size * 0.1, color, 1);
		for (let i = 0; i < 6; i++) {
			const a = (Math.PI * 2 * i) / 6;
			g.moveTo(0, 0);
			g.lineTo(Math.cos(a) * size, Math.sin(a) * size);
			g.moveTo(Math.cos(a) * size * 0.55, Math.sin(a) * size * 0.55);
			g.lineTo(Math.cos(a + 0.35) * size * 0.75, Math.sin(a + 0.35) * size * 0.75);
			g.moveTo(Math.cos(a) * size * 0.55, Math.sin(a) * size * 0.55);
			g.lineTo(Math.cos(a - 0.35) * size * 0.75, Math.sin(a - 0.35) * size * 0.75);
		}
		g.beginFill(0xffffff, 1);
		g.drawCircle(0, 0, size * 0.13);
		g.endFill();
	}

	private drawVines(g: any, color: number, size: number, glow: number, pulse: number): void {
		this.glow(g, color, glow * 0.75, pulse);
		g.lineStyle(size * 0.12, 0x2e8b57, 1);
		g.moveTo(-size * 0.8, size * 0.4);
		g.quadraticCurveTo(0, -size * 0.7, size * 0.8, size * 0.4);

		for (let i = -1; i <= 1; i++) {
			g.beginFill(color, 1);
			g.drawEllipse(i * size * 0.35, -Math.abs(i) * size * 0.2, size * 0.25, size * 0.45);
			g.endFill();
		}
	}

	private drawMushroom(g: any, color: number, size: number, glow: number, pulse: number): void {
		this.glow(g, color, glow, pulse);
		g.beginFill(0xffeed0, 1);
		g.drawRect(-size * 0.25, -size * 0.05, size * 0.5, size * 0.6);
		g.endFill();
		g.beginFill(color, 1);
		g.drawEllipse(0, -size * 0.25, size * 0.75, size * 0.42);
		g.endFill();
		g.beginFill(0xffffff, 0.9);
		g.drawCircle(-size * 0.25, -size * 0.3, size * 0.1);
		g.drawCircle(size * 0.2, -size * 0.2, size * 0.08);
		g.endFill();
	}

	private drawPlanet(g: any, color: number, size: number, glow: number, pulse: number): void {
		this.glow(g, color, glow, pulse);
		g.lineStyle(size * 0.12, 0xffffff, 0.75);
		g.drawEllipse(0, 0, size * 1.05, size * 0.35);
		g.beginFill(color, 1);
		g.drawCircle(0, 0, size * 0.65);
		g.endFill();
		g.beginFill(0xffffff, 0.45);
		g.drawCircle(-size * 0.22, -size * 0.2, size * 0.12);
		g.endFill();
	}

	private drawCrystal(g: any, color: number, size: number, glow: number, pulse: number): void {
		this.glow(g, color, glow, pulse);
		g.beginFill(color, 0.95);
		g.drawPolygon([0, -size, size * 0.65, -size * 0.2, size * 0.65, size, -size * 0.35, size, -size * 0.65, -size * 0.2]);
		g.endFill();
		g.lineStyle(size * 0.06, 0xffffff, 0.55);
		g.moveTo(0, -size); g.lineTo(0, size);
		g.moveTo(-size * 0.65, -size * 0.2); g.lineTo(size * 0.65, -size * 0.2);
	}

	private drawMoon(g: any, color: number, size: number, glow: number, pulse: number): void {
		this.glow(g, color, glow, pulse);
		g.beginFill(color, 1);
		g.drawCircle(0, 0, size);
		g.endFill();
		g.beginFill(0x111820, 1);
		g.drawCircle(size * 0.35, -size * 0.1, size * 0.9);
		g.endFill();
	}

	private drawWater(g: any, color: number, size: number, glow: number, pulse: number): void {
		this.glow(g, color, glow, pulse);
		g.beginFill(color, 0.95);
		g.drawCircle(0, size * 0.22, size * 0.65);
		g.drawPolygon([0, -size, size * 0.55, size * 0.1, -size * 0.55, size * 0.1]);
		g.endFill();
		g.beginFill(0xffffff, 0.6);
		g.drawCircle(-size * 0.18, -size * 0.05, size * 0.12);
		g.endFill();
	}

	private drawButterfly(g: any, color: number, size: number, glow: number, pulse: number): void {
		this.glow(g, color, glow, pulse);
		g.beginFill(color, 0.95);
		g.drawEllipse(-size * 0.35, -size * 0.12, size * 0.38, size * 0.55);
		g.drawEllipse(size * 0.35, -size * 0.12, size * 0.38, size * 0.55);
		g.drawEllipse(-size * 0.25, size * 0.38, size * 0.28, size * 0.35);
		g.drawEllipse(size * 0.25, size * 0.38, size * 0.28, size * 0.35);
		g.endFill();
		g.lineStyle(size * 0.08, 0x222222, 1);
		g.moveTo(0, -size * 0.55); g.lineTo(0, size * 0.55);
	}

	private drawEnergy(g: any, color: number, size: number, glow: number, pulse: number): void {
		this.glow(g, color, glow * 1.2, pulse);
		g.lineStyle(size * 0.12, color, 1);
		g.drawCircle(0, 0, size * 0.55);
		g.lineStyle(size * 0.08, 0xffffff, 0.8);
		g.moveTo(-size * 0.8, 0);
		g.lineTo(-size * 0.25, -size * 0.2);
		g.lineTo(size * 0.15, size * 0.1);
		g.lineTo(size * 0.75, -size * 0.2);
	}

	private drawPinkCloud(g: any, color: number, size: number, glow: number, pulse: number): void {
		this.glow(g, 0xff9fe3, glow, pulse);

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
	}

	private star(g: any, x: number, y: number, outer: number, inner: number, color: number): void {
		const points: number[] = [];
		for (let i = 0; i < 10; i++) {
			const r = i % 2 === 0 ? outer : inner;
			const a = (Math.PI * i) / 5 - Math.PI / 2;
			points.push(x + Math.cos(a) * r);
			points.push(y + Math.sin(a) * r);
		}
		g.beginFill(color, 1);
		g.drawPolygon(points);
		g.endFill();
	}

	private getColor(g: any, index: number, tick: number): number {
		const palette = this.getPalette();

		if (this.settings.mode === "static") return palette[0];
		if (this.settings.mode === "wave") return palette[Math.floor(index + tick / 8) % palette.length];
		if (this.settings.mode === "pulse") return palette[index % palette.length];
		if (this.settings.mode === "rainbow") return GarlandLight.rainbow[g.__colorIndex % GarlandLight.rainbow.length];

		return palette[g.__colorIndex % palette.length];
	}

	private getPalette(): number[] {
		if (this.settings.theme === "christmas") return GarlandLight.christmas;
		if (this.settings.theme === "gold") return GarlandLight.gold;
		if (this.settings.theme === "neon") return GarlandLight.neon;
		if (this.settings.theme === "sakura") return GarlandLight.sakura;
		if (this.settings.theme === "stars") return GarlandLight.stars;
		if (this.settings.theme === "snow") return GarlandLight.snow;
		if (this.settings.theme === "vines") return GarlandLight.vines;
		if (this.settings.theme === "mushrooms") return GarlandLight.mushrooms;
		if (this.settings.theme === "planets") return GarlandLight.planets;
		if (this.settings.theme === "crystals") return GarlandLight.crystals;
		if (this.settings.theme === "moon") return GarlandLight.moon;
		if (this.settings.theme === "water") return GarlandLight.water;
		if (this.settings.theme === "butterflies") return GarlandLight.butterflies;
		if (this.settings.theme === "energy") return GarlandLight.energy;
		if (this.settings.theme === "pinkClouds") return GarlandLight.pinkClouds;

		return GarlandLight.rainbow;
	}
}