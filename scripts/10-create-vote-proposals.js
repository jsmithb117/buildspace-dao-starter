import { ethers } from "ethers";
import sdk from "./1-initialize-sdk.js";

const voteModule = sdk.getVoteModule("0x9244C9C73ED00052896168dc5D1dEaB10480F775");

const tokenModule = sdk.getTokenModule("0x0bCBd3640625c3d07Cad73fcbcC674f5b76dc327");

(async () => {
  try {
    const amount = 420_000;
    await voteModule.propose(
      `Should the DAO mint an additional ${amount} tokens into the treasury?`,
      [
        {
          nativeTokenValue: 0,
          transactionData: tokenModule.contract.interface.encodeFunctionData(
            "mint",
            [
              voteModule.address,
              ethers.utils.parseUnits(amount.toString(), 18),
            ]
          ),
          toAddress: tokenModule.address,
        },
      ]
    );
    console.log("Successfully created proposal to mint tokens");
  } catch (err) {
    console.error("Failed to create first proposal: ", err);
  }

  try {
    const amount = 6_900;
    await voteModule.propose(
      `Should the DAO transfer ${amount} tokens to ${process.env.WALLET_ADDRESS}?`,
      [
        {
          nativeTokenValue: 0,
          transactionData: tokenModule.contract.interface.encodeFunctionData(
            "transfer",
            [
              process.env.WALLET_ADDRESS,
              ethers.utils.parseUnits(amount.toString(), 18),
            ]
          ),
          toAddress: tokenModule.address,
        },
      ]
    );
    console.log('Successfully created proposal to reward ourselves from the treasure');
  } catch (err) {
    console.error('Failed to create second proposal: ', err);
  }
})();