import { App, PluginSettingTab, Setting } from "obsidian";
import type MyPlugin from "./main";

export type GarlandTheme =
	| "christmas"
	| "gold"
	| "neon"
	| "sakura"
	| "stars"
	| "snow"
	| "vines"
	| "mushrooms"
	| "planets"
	| "moon"
	| "water"
	| "butterflies"
	| "energy"
	| "pinkClouds";

export type GarlandMode =
	| "random"
	| "rainbow"
	| "wave"
	| "pulse"
	| "static";

export interface MyPluginSettings {
	theme: GarlandTheme;
	mode: GarlandMode;
	nodeTextColor: string;
	wireColor: string;
	wireThickness: number;
	wireGlow: number;
	wireSag: number;
	bulbSize: number;
	bulbGlowSize: number;
	blinkInterval: number;
	wireBehindNodes: boolean;
	showWires: boolean;
}

export const DEFAULT_SETTINGS: MyPluginSettings = {
	theme: "christmas",
	mode: "random",
	nodeTextColor: "#ffffff",
	wireColor: "#66ff66",
	wireThickness: 2,
	wireGlow: 1,
	wireSag: 28,
	bulbSize: 80,
	bulbGlowSize: 120,
	blinkInterval: 1000,
	wireBehindNodes: true,
	showWires: true,
};

export class SampleSettingTab extends PluginSettingTab {
	plugin: MyPlugin;

	constructor(app: App, plugin: MyPlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const { containerEl } = this;
		containerEl.empty();

		new Setting(containerEl)
			.setName("Theme")
			.setDesc("Вигляд вузлів графа")
			.addDropdown((dropdown) =>
				dropdown
					.addOption("christmas", "🎄 Christmas garland")
					.addOption("gold", "✨ Golden lights")
					.addOption("neon", "💜 Neon spheres")
					.addOption("sakura", "🌸 Sakura flowers")
					.addOption("stars", "⭐ Stars")
					.addOption("snow", "❄️ Snow")
					.addOption("vines", "🌿 Vines")
					.addOption("mushrooms", "🍄 Mushrooms")
					.addOption("planets", "🪐 Planets")
					.addOption("moon", "🌙 Moon")
					.addOption("water", "💧 Water")
					.addOption("butterflies", "🦋 Butterflies")
					.addOption("energy", "⚡ Energy")
					.addOption("pinkClouds", "☁️ Pink clouds")
					.setValue(this.plugin.settings.theme)
					.onChange(async (value) => {
						this.plugin.settings.theme = value as GarlandTheme;
						await this.plugin.saveSettings();
						this.plugin.refreshGraph(true);
					})
			);

		new Setting(containerEl)
			.setName("Animation mode")
			.setDesc("Режим зміни кольорів")
			.addDropdown((dropdown) =>
				dropdown
					.addOption("random", "Random")
					.addOption("rainbow", "Rainbow")
					.addOption("wave", "Wave")
					.addOption("pulse", "Pulse")
					.addOption("static", "Static")
					.setValue(this.plugin.settings.mode)
					.onChange(async (value) => {
						this.plugin.settings.mode = value as GarlandMode;
						await this.plugin.saveSettings();
						this.plugin.refreshGraph(true);
					})
			);

		new Setting(containerEl)
			.setName("Show custom wires")
			.setDesc("Показувати світні дроти")
			.addToggle((toggle) =>
				toggle
					.setValue(this.plugin.settings.showWires)
					.onChange(async (value) => {
						this.plugin.settings.showWires = value;
						await this.plugin.saveSettings();
						this.plugin.refreshGraph(false);
					})
			);

		new Setting(containerEl)
			.setName("Node text color")
			.setDesc("Колір назв вузлів")
			.addColorPicker((picker) =>
				picker
					.setValue(this.plugin.settings.nodeTextColor)
					.onChange(async (value) => {
						this.plugin.settings.nodeTextColor = value;
						await this.plugin.saveSettings();
						this.plugin.refreshGraph(false);
					})
			);

		new Setting(containerEl)
			.setName("Wire color")
			.setDesc("Колір дроту")
			.addColorPicker((picker) =>
				picker
					.setValue(this.plugin.settings.wireColor)
					.onChange(async (value) => {
						this.plugin.settings.wireColor = value;
						await this.plugin.saveSettings();
						this.plugin.refreshGraph(false);
					})
			);

		new Setting(containerEl)
			.setName("Wire thickness")
			.setDesc("Товщина дроту")
			.addSlider((slider) =>
				slider
					.setLimits(0.5, 10, 0.5)
					.setValue(this.plugin.settings.wireThickness)
					.setDynamicTooltip()
					.onChange(async (value) => {
						this.plugin.settings.wireThickness = value;
						await this.plugin.saveSettings();
						this.plugin.refreshGraph(false);
					})
			);

		new Setting(containerEl)
			.setName("Wire glow")
			.setDesc("Сила світіння дроту")
			.addSlider((slider) =>
				slider
					.setLimits(0, 3, 0.1)
					.setValue(this.plugin.settings.wireGlow)
					.setDynamicTooltip()
					.onChange(async (value) => {
						this.plugin.settings.wireGlow = value;
						await this.plugin.saveSettings();
						this.plugin.refreshGraph(false);
					})
			);

		new Setting(containerEl)
			.setName("Wire sag")
			.setDesc("Провисання дроту")
			.addSlider((slider) =>
				slider
					.setLimits(0, 120, 5)
					.setValue(this.plugin.settings.wireSag)
					.setDynamicTooltip()
					.onChange(async (value) => {
						this.plugin.settings.wireSag = value;
						await this.plugin.saveSettings();
						this.plugin.refreshGraph(false);
					})
			);

		new Setting(containerEl)
			.setName("Node size")
			.setDesc("Розмір декоративних вузлів")
			.addSlider((slider) =>
				slider
					.setLimits(20, 180, 5)
					.setValue(this.plugin.settings.bulbSize)
					.setDynamicTooltip()
					.onChange(async (value) => {
						this.plugin.settings.bulbSize = value;
						await this.plugin.saveSettings();
						this.plugin.refreshGraph(false);
					})
			);

		new Setting(containerEl)
			.setName("Glow size")
			.setDesc("Розмір світіння вузлів")
			.addSlider((slider) =>
				slider
					.setLimits(40, 260, 5)
					.setValue(this.plugin.settings.bulbGlowSize)
					.setDynamicTooltip()
					.onChange(async (value) => {
						this.plugin.settings.bulbGlowSize = value;
						await this.plugin.saveSettings();
						this.plugin.refreshGraph(false);
					})
			);

		new Setting(containerEl)
			.setName("Blink interval")
			.setDesc("Швидкість зміни кольорів")
			.addSlider((slider) =>
				slider
					.setLimits(300, 3000, 100)
					.setValue(this.plugin.settings.blinkInterval)
					.setDynamicTooltip()
					.onChange(async (value) => {
						this.plugin.settings.blinkInterval = value;
						await this.plugin.saveSettings();
					})
			);

		new Setting(containerEl)
			.setName("Wire behind nodes")
			.setDesc("Дроти позаду декоративних вузлів")
			.addToggle((toggle) =>
				toggle
					.setValue(this.plugin.settings.wireBehindNodes)
					.onChange(async (value) => {
						this.plugin.settings.wireBehindNodes = value;
						await this.plugin.saveSettings();
						this.plugin.refreshGraph(false);
					})
			);
	}
}