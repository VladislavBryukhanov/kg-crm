import { BaseRepo } from './base.repo';
import { DynamicOption } from '@/models/dynamic-option';

const POSITION_COLLECTION = 'position';

class PositionRepo extends BaseRepo<DynamicOption> {
  constructor() {
    super(POSITION_COLLECTION)
  }
}

export default new PositionRepo();