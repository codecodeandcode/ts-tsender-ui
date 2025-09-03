import basicSetup from "../wallet-setup/basic.setup";
import { testWithSynpress } from "@synthetixio/synpress";
import { MetaMask, metaMaskFixtures } from "@synthetixio/synpress/playwright";
//将使用basicSetup里定义的metamask钱包用Synpress自带的包进行测试并赋值功能给test
const test = testWithSynpress(metaMaskFixtures(basicSetup))

const { expect } = test

test('has title', async ({ page }) => {
  await page.goto('/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/T-SENDER/);
});

test("should show the airdropform when connected,otherwise,not", async ({ page, context, metamaskPage, extensionId }) => {
  await page.goto('/');
  await expect(page.getByText('Please connect your wallet')).toBeVisible()
  //testWithSynpress里带的 需要传入这些参数才能创建一个模拟的metamask进行交互
  const metamask = new MetaMask(context, metamaskPage, basicSetup.walletPassword, extensionId)
  const customNetwork = {
    name: "anvil",
    rpcUrl: "http://localhost:8545",
    chainId: 31337,
    symbol: "ETH"
  }
  await metamask.addNetwork(customNetwork)
  await page.getByTestId('rk-connect-button').click()
  await page.getByTestId('rk-wallet-option-metaMask').waitFor({
    state: 'visible',
    timeout: 30000
  })
  await page.getByTestId('rk-wallet-option-metaMask').click()
  await metamask.connectToDapp()
  await expect(page.getByText('token Address')).toBeVisible();
})




