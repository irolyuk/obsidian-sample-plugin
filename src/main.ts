import { Notice, Plugin } from "obsidian";
import {
	DEFAULT_SETTINGS,
	MyPluginSettings,
	ChillightGraphSettingTab,
} from "./settings";
import { GraphService } from "./graph/GraphService";
import { GarlandRenderer } from "./graph/GarlandRenderer";

export default class ChillightGraphPlugin extends Plugin {
	settings!: MyPluginSettings;

	private graphService!: GraphService;
	private lastBlink = 0;

	async onload() {
		await this.loadSettings();

		this.graphService = new GraphService(this.app);

		this.addRibbonIcon("git-fork", "Chillight Graph", () => {
			this.refreshGraph(true);
			new Notice("Chillight Graph refreshed");
		});

		this.addSettingTab(new ChillightGraphSettingTab(this.app, this));

		this.refreshGraph(false);

		this.registerEvent(
			this.app.workspace.on("layout-change", () => {
				window.setTimeout(() => {
					this.refreshGraph(false);
				}, 300);
			})
		);

		this.registerInterval(
			window.setInterval(() => {
				const now = Date.now();

				if (now - this.lastBlink < this.settings.blinkInterval) {
					return;
				}

				this.lastBlink = now;
				this.refreshGraph(true);
			}, 250)
		);
	}

	onunload() {}

	public refreshGraph(changeColor = false): void {
		const graphView = this.graphService.getGraphView();

		if (!graphView?.renderer?.nodes) return;

		const renderer = new GarlandRenderer(graphView, this.settings);

		renderer.installAutoUpdate();
		renderer.paintNodes(changeColor);
		renderer.paintWires();
	}

	async loadSettings() {
		this.settings = Object.assign(
			{},
			DEFAULT_SETTINGS,
			(await this.loadData()) as Partial<MyPluginSettings>
		);
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}