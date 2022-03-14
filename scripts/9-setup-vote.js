import ethers from "ethers";
import sdk from "./1-initialize-sdk.js";

const voteModule = sdk.getVoteModule("0x9244C9C73ED00052896168dc5D1dEaB10480F775");

const tokenModule = sdk.getTokenModule("0x0bCBd3640625c3d07Cad73fcbcC674f5b76dc327");

(async () => {
  try {
    await tokenModule.grantRole("minter", voteModule.address);

    console.log("Successfully gave vote module permissions to act on token module.");
  } catch (err) {
    console.error("Failed to grant vote module permissions on token module: ", err);
  }
  try {
    const ownedTokenBalance = await tokenModule.balanceOf(process.env.WALLET_ADDRESS);
    const ownedAmount = ethers.BigNumber.from(ownedTokenBalance.value);
    const percent90 = ownedAmount.div(100).mul(90);

    await tokenModule.transfer(
      voteModule.address,
      percent90
    );

    console.log("Successfully transferred 90% of tokens to vote module.");
  } catch (err) {
    console.error("Failed to transfer tokens to vote module: ", err);
  }
})();