export class Environment {
  static readonly ADMIN_USERNAME = Environment.getRequired("ADMIN_USERNAME");
  static readonly ADMIN_PASSWORD = Environment.getRequired("ADMIN_PASSWORD");
  static readonly EMPLOYEE_USERNAME = Environment.getRequired("EMPLOYEE_USERNAME");
  static readonly EMPLOYEE_PASSWORD = Environment.getRequired("EMPLOYEE_PASSWORD");

  private static getRequired(key: string): string {
    const value = process.env[key as string];

    if (!value) {
      throw new Error("Enviroment variable" + key + "doesn't exist");
    }

    return value;
  }
}
