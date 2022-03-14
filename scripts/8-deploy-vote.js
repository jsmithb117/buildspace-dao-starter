import sdk from "./1-initialize-sdk.js";

const appModule = sdk.getAppModule("0x0F68C3F4836bB13fbaB4409DD919D5A30670D637");

(async () => {
  try {
    const voteModule = await appModule.deployVoteModule({
      name: "Jay's GameDAO Proposals",
      votingTokenAddress: "0x0bCBd3640625c3d07Cad73fcbcC674f5b76dc327",
      proposalStartWaitTimeInSeconds: 0,
      proposalVotingTimeInSeconds: 24 * 60 * 60,
      votingQuorumFraction: 0,
      minimumNumberOfTokensNeededToPropose: "0",
    });

    console.log("Successfully deployed vote module, address: ", voteModule.address);
  } catch (err) {
    console.error('Failed to deploy vote module: ', err);
  }
})();