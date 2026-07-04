import { GarlandLight } from "./GarlandLight";
import { ChillightGraphSettings } from "../settings";

export class GarlandRenderer {
	constructor(
		private graphView: any,
		private settings: ChillightGraphSettings
	) {}

	public installAutoUpdate(): void {
		const renderer = this.graphView.renderer;
		if (!renderer || !renderer.nodes) return;

		if (renderer.__chillightInstalled) {
			this.paintNodes(false);
			this.paintWires();
			return;
		}

		renderer.__chillightInstalled = true;

		const originalRenderCallback = renderer.renderCallback?.bind(renderer);

		renderer.renderCallback = (...args: any[]) => {
			if (originalRenderCallback) originalRenderCallback(...args);
			this.paintWires();
		};

		this.paintNodes(false);
		this.paintWires();
	}

	public paintNodes(changeColor = false): void {
		const renderer = this.graphView.renderer;
		const nodes = renderer.nodes;
		const PIXI = (window as any).PIXI;

		if (!PIXI || !nodes) return;

		const tick = Date.now() / 100;

		nodes.forEach((node: any, index: number) => {
			if (!node.circle) return;

			if (node.text) {
				const textColor = parseColor(this.settings.nodeTextColor);

				node.text.tint = textColor;

				if (node.text.style) {
					node.text.style.fill = textColor;
				}
			}

			new GarlandLight(
				PIXI,
				node.circle,
				this.settings,
				100,
				100,
				changeColor,
				index,
				tick
			);
		});
	}

	public paintWires(): void {
		const renderer = this.graphView.renderer;
		const PIXI = (window as any).PIXI;

		if (!PIXI || !renderer.links || !renderer.hanger) return;

        // Якщо дроти вимкнені
if (!this.settings.showWires) {

	const old = renderer.hanger.getChildByName("garland-wires");
	if (old) old.destroy();

	for (const link of renderer.links) {

		if (link.line) {
			link.line.visible = true;
			link.line.alpha = 1;
		}

		if (link.arrow) {
			link.arrow.visible = true;
			link.arrow.alpha = 1;
		}
	}

	return;
}

        const old = renderer.hanger.getChildByName("garland-wires");
		if (old) old.destroy();

		const wires = new PIXI.Graphics();
		wires.name = "garland-wires";
		wires.zIndex = this.settings.wireBehindNodes ? -10 : 1;

		const wireColor = parseColor(this.settings.wireColor);
		const thickness = this.settings.wireThickness;
		const glow = this.settings.wireGlow;
		const sag = this.settings.wireSag;

		for (const link of renderer.links) {
			if (link.line) {
				link.line.visible = false;
				link.line.alpha = 0;
			}

			if (link.arrow) {
				link.arrow.visible = false;
				link.arrow.alpha = 0;
			}

			const source = link.source ?? link.sourceNode ?? link.a;
			const target = link.target ?? link.targetNode ?? link.b;

			if (!source?.circle || !target?.circle) continue;

			const x1 = source.circle.x;
			const y1 = source.circle.y;
			const x2 = target.circle.x;
			const y2 = target.circle.y;

			const cx = (x1 + x2) / 2;
			const cy = (y1 + y2) / 2 + sag;

			this.curvedLine(wires, x1, y1, cx, cy, x2, y2, thickness * 7, wireColor, glow * 0.06);
			this.curvedLine(wires, x1, y1, cx, cy, x2, y2, thickness * 5, wireColor, glow * 0.12);
			this.curvedLine(wires, x1, y1, cx, cy, x2, y2, thickness * 3, wireColor, glow * 0.2);
			this.curvedLine(wires, x1, y1, cx, cy, x2, y2, thickness, wireColor, 0.95);
		}

		renderer.hanger.sortableChildren = true;
		renderer.hanger.addChild(wires);
	}

	private curvedLine(
		g: any,
		x1: number,
		y1: number,
		cx: number,
		cy: number,
		x2: number,
		y2: number,
		width: number,
		color: number,
		alpha: number
	): void {
		g.lineStyle(width, color, alpha);
		g.moveTo(x1, y1);
		g.quadraticCurveTo(cx, cy, x2, y2);
	}
}

function parseColor(hex: string): number {
	return parseInt(hex.replace("#", ""), 16);
}