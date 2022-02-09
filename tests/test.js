import { coreLogic } from "../Javascript/coreLogic.js";

describe("coreLogic class", function () {
  /* TEST - updateScoreOne */
  describe("Update Score playerOne", function () {
    it("updateScoreOne()", function () {
      const core = new coreLogic();
      core.scoreOne = 3;
      assert.equal(core.scoreOne, 3);
      //Update score with +1.
      core.updateScoreOne();
      assert.equal(core.scoreOne, 4);
    });
  });
  /* TEST - updateScoreTwo */
  describe("Update Score playerTwo", function () {
    it("updateScoreTwo()", function () {
      const core = new coreLogic();
      core.scoreTwo = 4;
      //Update score with +1.
      core.updateScoreTwo();
      assert.equal(core.scoreTwo, 5);
      //Update score with +1 again.
      core.updateScoreTwo();
      assert.equal(core.scoreTwo, 6);
    });
  });
  /* TEST - getNextPlayer */
  describe("Change Player turn", function () {
    it("getNextPlayer()", function () {
      const core = new coreLogic();
      core.playerTurn = true; //Start with player "x" (true)
      core.playerOne = "x";
      core.playerTwo = "circle";
      core.currentPlayer = null;
      //Change to nextplayer "circle" / playerTwo
      core.getNextPlayer();
      assert.strictEqual(core.playerTurn, false, "playerTwo");
      assert.equal(core.currentPlayer, "circle", "playerTwo");
      //Change player again to "x"  / playerOne
      core.getNextPlayer();
      assert.strictEqual(core.playerTurn, true, "playerOne");
      assert.equal(core.currentPlayer, "x", "playerOne");
    });
  });
});
