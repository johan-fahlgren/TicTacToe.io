import { coreLogic } from "../Javascript/coreLogic.js";

describe("coreLogic class", function () {
  /* TEST - updateScoreOne */
  describe("Update Score playerOne", function () {
    it("updateScoreOne()", function () {
      const core = new coreLogic();
      core.scoreOne = 0;
      core.updateScoreOne();
      assert.equal(core.scoreOne, 1);
    });
  });
  /* TEST - updateScoreTwo */
  describe("Update Score playerTwo", function () {
    it("updateScoreTwo()", function () {
      const core = new coreLogic();
      core.scoreTwo = 4;
      core.updateScoreTwo();
      assert.equal(core.scoreTwo, 5);
      core.updateScoreTwo();
      assert.equal(core.scoreTwo, 6);
    });
  });
  /* TEST - getNextPlayer */
  describe("Change Player turn", function () {
    it("getNextPlayer()", function () {
      const core = new coreLogic();
      core.playerTurn = true;
      core.playerOne = "x";
      core.playerTwo = "circle";
      core.currentPlayer = null;
      //Start with player "x" (true)
      core.getNextPlayer();
      //Change to nextplayer "circle"
      assert.equal(core.currentPlayer, "circle");
      core.getNextPlayer();
      //Change again nextplayer "x"
      assert.equal(core.currentPlayer, "x");
    });
  });
});
