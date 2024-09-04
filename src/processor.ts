import { EvmBatchProcessor } from '@subsquid/evm-processor';
import { assertNotNull } from '@subsquid/util-internal';

export const processor = new EvmBatchProcessor()
  .setRpcEndpoint(assertNotNull(
    process.env.RPC_BASE_SEPOLIA_HTTP, 
    'Required env variable RPC_BASE_SEPOLIA_HTTP is missing'
  ));
