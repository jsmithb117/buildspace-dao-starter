import sdk from "./1-initialize-sdk.js";

const tokenModule = sdk.getTokenModule("0x0bCBd3640625c3d07Cad73fcbcC674f5b76dc327");

(async () => {
  try {
    console.log("Existing roles: ", await tokenModule.getAllRoleMembers());

    await tokenModule.revokeAllRolesFromAddress('0x9244C9C73ED00052896168dc5D1dEaB10480F775');
    console.log("Roles after removal: ", await tokenModule.getAllRoleMembers());
    console.log("Successfully revoked all roles");
  } catch (err) {
    console.error("Failed to revoke", err);
  }
})();