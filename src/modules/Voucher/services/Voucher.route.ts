import VoucherHandler from '@/modules/Voucher/services/Voucher.controller';
import withVerifyAppKey from '@/packages/server/middlewares/withVerifyAppKey';

/**
 * @route `/api/vouchers`
 * @dir `app/api/vouchers/route.ts`
 */

export const GET = VoucherHandler.index;
export const POST = withVerifyAppKey(VoucherHandler.insert);
