import { ConflictException } from '@nestjs/common';

import { ErrorType } from '../../enums';

export class ClientExistsException extends ConflictException {
  constructor() {
    super({
      errorType: ErrorType.ClientExists,
      message: `There's a client with phone or document`,
    });
  }
}
