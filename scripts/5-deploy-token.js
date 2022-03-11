import sdk from "./1-initialize-sdk.js";

const app = sdk.getAppModule("0x0F68C3F4836bB13fbaB4409DD919D5A30670D637");

(async () => {
  try {
    const tokenModule = await app.deployTokenModule({
      name: "Jay's GameDAO Governance Token",
      symbol: "JGDT",
    });
    console.log('Successfully deployed token module at address: ', tokenModule.address);
  } catch (err) {
    console.erro('Railed to deploy token moduel: ', err);
  }
})();