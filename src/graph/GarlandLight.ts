import { MyPluginSettings } from "../settings";
import { getTheme } from "./themes/ThemeRegistry";

const RAINBOW = [
	0xff4040,
	0xffa040,
	0xffff40,
	0x40ff40,
	0x40ffff,
	0x4080ff,
	0xff40ff,
];

export class GarlandLight {
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
		const theme = getTheme(this.settings.theme);
		const color = this.getColor(theme.palette, g, index, tick);

		const pulse =
			this.settings.mode === "pulse"
				? 0.75 + Math.sin(tick * 0.08 + g.__phase) * 0.25
				: 1;

		g.clear();

		theme.draw({
			g,
			color,
			size: this.settings.bulbSize,
			glow: this.settings.bulbGlowSize,
			pulse,
			tick,
			index,
		});
	}

	private getColor(
		palette: number[],
		g: any,
		index: number,
		tick: number
	): number {
        
		if (this.settings.mode === "static") {
			return palette[0]!;
		}

		if (this.settings.mode === "wave") {
			return palette[Math.floor(index + tick / 8) % palette.length]!;
		}

		if (this.settings.mode === "pulse") {
			return palette[index % palette.length]!;
		}

		if (this.settings.mode === "rainbow") {
			return RAINBOW[g.__colorIndex % RAINBOW.length]!;
		}

		return palette[g.__colorIndex % palette.length]!;
	}
}