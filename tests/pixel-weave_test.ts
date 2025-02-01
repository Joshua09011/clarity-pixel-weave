import {
  Clarinet,
  Tx,
  Chain,
  Account,
  types
} from 'https://deno.land/x/clarinet@v1.0.0/index.ts';
import { assertEquals } from 'https://deno.land/std@0.90.0/testing/asserts.ts';

Clarinet.test({
  name: "Ensure that users can mint new artwork",
  async fn(chain: Chain, accounts: Map<string, Account>) {
    const wallet_1 = accounts.get("wallet_1")!;
    
    let block = chain.mineBlock([
      Tx.contractCall(
        "pixel-weave",
        "mint-artwork",
        [
          types.uint(16),
          types.uint(16),
          types.list([types.uint(0)])
        ],
        wallet_1.address
      )
    ]);
    
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 2);
    
    block.receipts[0].result
      .expectOk()
      .expectUint(1);
  },
});

Clarinet.test({
  name: "Ensure that only artwork owner can update pixels",
  async fn(chain: Chain, accounts: Map<string, Account>) {
    // Test implementation here
  },
});
