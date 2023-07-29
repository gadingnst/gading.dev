import Model from '@/packages/server/base/Model';

export interface VoucherFields<T = string|number> {
  readonly _id?: T;
  name: string;
  expires: string;
}

class VoucherM extends Model<VoucherFields> {
  protected collectionName = 'vouchers';
}

const VoucherModel = new VoucherM();

export default VoucherModel;
