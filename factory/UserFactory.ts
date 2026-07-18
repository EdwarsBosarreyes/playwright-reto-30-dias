import { UserModel } from "../models/UserModel";

export class UserFactory {
  private static defaultPassword = "Password123!";

  private static base(overrides?: Partial<UserModel>): UserModel {
    const defaults: UserModel = {
      username: "goku" + crypto.randomUUID().slice(0, 30),
      employee: "Default employee",
      password: this.defaultPassword,
      confirmePassword: this.defaultPassword,
      role: "ESS",
      status: "Enabled",
    };

    return { ...defaults, ...(overrides || {}) };
  }

  static createEmployeeESS(overrides?: Partial<UserModel>) {
    return this.base({ role: "ESS", ...(overrides || {}) });
  }

  static createAdmin(overrides?: Partial<UserModel>) {
    return this.base({ role: "Admin", ...(overrides || {}) });
  }
}
