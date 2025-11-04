import { Browser, BrowserContext, Page, chromium, firefox, webkit } from '@playwright/test';
import { ConfigManager } from './ConfigManager';
import { Logger } from './Logger';

export class BrowserManager {
  private static instance: BrowserManager;
  private browser: Browser | null = null;
  private context: BrowserContext | null = null;
  private page: Page | null = null;
  private config = ConfigManager.getInstance().getUIConfig();
  private logger = Logger.getInstance();

  private constructor() {}

  public static getInstance(): BrowserManager {
    if (!BrowserManager.instance) {
      BrowserManager.instance = new BrowserManager();
    }
    return BrowserManager.instance;
  }

  public async initBrowser(): Promise<void> {
    try {
      this.logger.info(`Launching ${this.config.browser} browser...`);

      const launchOptions = {
        headless: this.config.headless,
        slowMo: this.config.slowMo,
      };

      switch (this.config.browser) {
        case 'chromium':
          this.browser = await chromium.launch(launchOptions);
          break;
        case 'firefox':
          this.browser = await firefox.launch(launchOptions);
          break;
        case 'webkit':
          this.browser = await webkit.launch(launchOptions);
          break;
        default:
          this.browser = await chromium.launch(launchOptions);
      }

      this.context = await this.browser.newContext({
        viewport: this.config.viewport,
        recordVideo: this.config.video !== 'off' ? { dir: 'test-results/videos' } : undefined,
      });

      if (this.config.trace !== 'off') {
        await this.context.tracing.start({ screenshots: true, snapshots: true });
      }

      this.page = await this.context.newPage();
      this.logger.info('Browser initialized successfully');
    } catch (error) {
      this.logger.error('Failed to initialize browser', error);
      throw error;
    }
  }

  public async closeBrowser(): Promise<void> {
    try {
      if (this.config.trace !== 'off' && this.context) {
        await this.context.tracing.stop({ path: 'test-results/trace.zip' });
      }

      if (this.page) {
        await this.page.close();
        this.page = null;
      }

      if (this.context) {
        await this.context.close();
        this.context = null;
      }

      if (this.browser) {
        await this.browser.close();
        this.browser = null;
      }

      this.logger.info('Browser closed successfully');
    } catch (error) {
      this.logger.error('Failed to close browser', error);
      throw error;
    }
  }

  public getPage(): Page {
    if (!this.page) {
      throw new Error('Page is not initialized. Call initBrowser() first.');
    }
    return this.page;
  }

  public getContext(): BrowserContext {
    if (!this.context) {
      throw new Error('Context is not initialized. Call initBrowser() first.');
    }
    return this.context;
  }

  public getBrowser(): Browser {
    if (!this.browser) {
      throw new Error('Browser is not initialized. Call initBrowser() first.');
    }
    return this.browser;
  }

  public async takeScreenshot(name: string): Promise<void> {
    if (this.page) {
      await this.page.screenshot({ path: `test-results/screenshots/${name}.png`, fullPage: true });
      this.logger.info(`Screenshot saved: ${name}.png`);
    }
  }
}
