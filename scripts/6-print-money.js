import { ethers } from "ethers";
import sdk from "./1-initialize-sdk.js";

const tokenModule = sdk.getTokenModule("0x0bCBd3640625c3d07Cad73fcbcC674f5b76dc327");

(async () => {
  try {
    const amount = 1_000_000;
    const amountWith18Decimals = ethers.utils.parseUnits(amount.toString(), 18);
    await tokenModule.mint(amountWith18Decimals);
    const totalSupply = await tokenModule.totalSupply();

    console.log(`There are now: ${ethers.utils.formatUnits(totalSupply, 18)} $JGDT tokens in circulation.`);
  } catch (err) {
    console.error("failed to print tokens: ", err);
  }
})();