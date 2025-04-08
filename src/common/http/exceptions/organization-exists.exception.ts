import { ConflictException } from '@nestjs/common';

import { ErrorType } from '../../enums';

export class OrganizationExistsException extends ConflictException {
  constructor() {
    super({
      errorType: ErrorType.OrganizationExists,
      message: `There's a organization was exists`,
    });
  }
}
