import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { HmacSHA256, enc } from 'crypto-js';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class HmacguardGuard implements CanActivate {
  constructor(private config: ConfigService) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const body = request.body ?? undefined;

    const isSecure =
      request.get('x-forwarded-proto') === 'https' || request.secure;
    const protocol = isSecure ? 'https' : 'http';
    const completeURL = `${protocol}://${request.get('host')}${request.originalUrl}`;

    const key = request.headers['x-api-key'] ?? request.query['key'];

    const timestamp =
      request.headers['x-timestamp'] ?? request.query['timestamp'];

    const signature =
      request.headers['x-signature'] ?? request.query['signature'];

    if (!key || !timestamp || !signature) {
      throw new ForbiddenException('API Key is required');
    }

    const secretKey = this.getSecretKey(key);

    const result = this.validateSignature(
      secretKey,
      signature,
      // parseInt(timestamp),
      timestamp,
      request.method,
      completeURL,
      body,
    );

    if (!result) {
      throw new ForbiddenException('Invalid Signature');
    }
    console.log(result);
    return true;
  }

  /**
   * Retrieves the secret key associated with the provided public key.
   * @param key The public key for which to retrieve the secret key.
   * @returns The secret key associated with the provided public key.
   * @throws {ForbiddenException} If the provided key is invalid.
   */
  private getSecretKey(key: string) {
    const secretKey = {
      'public-key': this.config.get<string>('HMAC_PUBLIC_KEY'),
      'secret-key': this.config.get<string>('HMAC_SECRET_KEY'),
    };

    if (key === secretKey['public-key']) {
      return secretKey['secret-key'];
    } else {
      throw new ForbiddenException('Invalid API Key');
    }
  }

  /**
   * Validates the signature based on the provided secret, signature, timestamp, method, url, and optional body.
   * @param secret - The secret key used for signing the request.
   * @param signature - The signature to be validated.
   * @param timestamp - The timestamp of the request.
   * @param method - The HTTP method of the request.
   * @param url - The URL of the request.
   * @param body - The optional request body.
   * @returns A boolean indicating whether the signature is valid or not.
   */
  private validateSignature(
    secret: string,
    signature: string,
    timestamp: number,
    method: string,
    url: string,
    body?: object,
  ): boolean {
    if (Object.keys(body).length === 0) {
      body = undefined;
    }
    const toBeSigned = `${timestamp}|${method}|${url}${body ? `|${JSON.stringify(body)}` : ''}`;

    const localSignature = HmacSHA256(toBeSigned, secret).toString(enc.Hex);

    return localSignature === signature;
  }
}
