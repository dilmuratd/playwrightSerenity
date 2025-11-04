import * as fs from 'fs';
import * as path from 'path';

export interface UIConfig {
  baseURL: string;
  timeout: number;
  headless: boolean;
  slowMo: number;
  browser: 'chromium' | 'firefox' | 'webkit';
  viewport: {
    width: number;
    height: number;
  };
  screenshot: 'on' | 'off' | 'only-on-failure';
  video: 'on' | 'off' | 'retain-on-failure';
  trace: 'on' | 'off' | 'retain-on-failure';
}

export interface APIConfig {
  baseURL: string;
  timeout: number;
  headers: Record<string, string>;
  retryAttempts: number;
  retryDelay: number;
}

export interface Config {
  ui: UIConfig;
  api: APIConfig;
}

export class ConfigManager {
  private static instance: ConfigManager;
  private config: Config;
  private environment: string;

  private constructor() {
    this.environment = process.env.ENV || 'default';
    this.config = this.loadConfig();
  }

  public static getInstance(): ConfigManager {
    if (!ConfigManager.instance) {
      ConfigManager.instance = new ConfigManager();
    }
    return ConfigManager.instance;
  }

  private loadConfig(): Config {
    const configPath = path.resolve(
      __dirname,
      `../../configs/${this.environment}.json`
    );

    if (!fs.existsSync(configPath)) {
      throw new Error(`Config file not found: ${configPath}`);
    }

    const configData = fs.readFileSync(configPath, 'utf-8');
    return JSON.parse(configData) as Config;
  }

  public getUIConfig(): UIConfig {
    return this.config.ui;
  }

  public getAPIConfig(): APIConfig {
    return this.config.api;
  }

  public getEnvironment(): string {
    return this.environment;
  }

  public get<T>(path: string): T {
    const keys = path.split('.');
    let value: any = this.config;

    for (const key of keys) {
      if (value && typeof value === 'object' && key in value) {
        value = value[key];
      } else {
        throw new Error(`Config path not found: ${path}`);
      }
    }

    return value as T;
  }
}