import { Locator, Page } from "@playwright/test";

export class SidePanel {
  readonly page: Page;
  readonly searchInput: Locator;

  constructor(page: Page) {
    this.page = page;
    this.searchInput = page.getByRole("textbox", { name: "Search" });
  }

  getMenuOptionLocator(option: SideMenuOption) {
    return this.page.getByRole("link", { name: option });
  }

  async clicOnOption(option: SideMenuOption) {
    await this.getMenuOptionLocator(option).click();
  }

  async searchText(text: string) {
    await this.searchInput.fill(text);
  }

  getRandomMenuOption(): SideMenuOption {
    const options = Object.values(SideMenuOption);
    const randomIndex = Math.floor(Math.random() * options.length);
    return options[randomIndex] as SideMenuOption;
  }
}

export enum SideMenuOption {
  ADMIN = "Admin",
  PIM = "PIM",
  LEAVE = "Leave",
  TIME = "Time",
  RECRUITMENT = "Recruitment",
  MY_INFO = "My Info",
  PERFORMANCE = "Performance",
  DASHBOARD = "Dashboard",
  DIRECTORY = "Directory",
  MAINTENANCE = "Maintenance",
  CLAIM = "Claim",
  BUZZ = "Buzz",
}
