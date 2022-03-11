import sdk from "./1-initialize-sdk.js";

const bundleDrop = sdk.getBundleDropModule("0x94aaCC714A2d86f622d64238C68d840eE9fD0bC6");

(async () => {
  try {
    const claimConditionFactory = bundleDrop.getClaimConditionFactory();

    claimConditionFactory.newClaimPhase({
      startTime: new Date(),
      maxQuantity: 50_000,
      maxQuantityPerTransaction: 1,
    });

    await bundleDrop.setClaimCondition(0, claimConditionFactory);
    console.log("Successfully set claim condition to bundle drop address: ", bundleDrop.address);
  } catch (err) {
    console.error("failed to set claim condition: ", err);
  }
})();
