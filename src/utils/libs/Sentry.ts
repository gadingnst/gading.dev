import * as SentryCore from '@sentry/nextjs';
import type { NextjsOptions } from '@sentry/nextjs/types/utils/nextjsOptions';
import { IS_DEV, SENTRY_DSN } from '@/utils/config';

class Sentry {
  // @ts-ignore
  public core: typeof SentryCore;

  constructor(options?: NextjsOptions) {
    this.setup(options);
  }

  /**
   * initialize Sentry
   * @param options - Sentry NextjsOptions
   * @returns {this} - Sentry instance
   */
  public setup(options?: NextjsOptions): this {
    SentryCore.init({
      dsn: SENTRY_DSN,
      environment: IS_DEV ? 'development' : 'production',
      debug: IS_DEV,
      tracesSampleRate: 1.0,
      ...options
    });
    this.core = SentryCore;
    return this;
  }

  /**
   * use this method to capture an exception with custom data
   * @param error - Error object
   * @param data - Custom data to be sent to Sentry
   * @returns {void}
   */
  public captureException<T extends Record<string, unknown>>(error: Error, data?: T): void {
    this.core.withScope(scope => {
      if (data) scope.setExtra('data', JSON.stringify(data, null, 2));
      this.core.captureException(error);
    });
  }
}

export default new Sentry();
