import { Page } from "@playwright/test";
import { SideMenuOption, SidePanel } from "../components/SidePanel";

export class Navigate {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async toDashboard() {
    await this.page.goto("/web/index.php/dashboard/index");
  }

  async toUsers() {
    await this.toDashboard();

    const sidePanel = new SidePanel(this.page);
    await sidePanel.clicOnOption(SideMenuOption.ADMIN);
  }
}
