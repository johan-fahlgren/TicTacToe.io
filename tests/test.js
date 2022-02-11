import { coreLogic } from "../Javascript/coreLogic.js";
import "../JavaScript/Util.js";

describe("Test coreLogic class", function () {
  const core = new coreLogic("x", "circle");

  /* TEST - getNextPlayer */
  describe("Change Player turn", function () {
    //const core = new coreLogic();
    core.playerTurn = true; //Start with player "x" (true)
    core.playerOne = "x";
    core.playerTwo = "circle";
    core.currentPlayer = null;

    it("getNextPlayer() - currentPlayer - test", function () {
      //Change to nextplayer "circle" / playerTwo
      core.getNextPlayer();
      assert.equal(core.currentPlayer, "circle", "playerTwo");
      //Change player again to "x"  / playerOne
      core.getNextPlayer();
      assert.equal(core.currentPlayer, "x", "playerOne");
    });

    it("getNextPLayer() - playerTurn - test", function () {
      //Change to nextplayer "circle" / playerTwo
      core.getNextPlayer();
      assert.strictEqual(core.playerTurn, false, "playerTwo");
      //Change player again to "x"  / playerOne
      core.getNextPlayer();
      assert.strictEqual(core.playerTurn, true, "playerOne");
    });
  });

  /*TEST - updateScore() */
  describe("Update Score playerOne and playerTwo", function () {
    /* PlayerOne */
    let savedContent = localStorage.copyContent();

    it("updateScore() playerOne - test", function () {
      core.scoreOne = 5;
      core.currentPlayer = core.playerOne;

      core.updateScore(core.currentPlayer);
      assert.equal(localStorage.getObject("playerOneScore"), 6);
      assert.equal(core.scoreOne, 6);
    });
    /* PlayerTwo */
    it("updatescore() playerTwo -test", function () {
      core.scoreTwo = 2;
      core.currentPlayer = core.playerTwo;

      core.updateScore(core.currentPlayer);
      assert.equal(localStorage.getObject("playerTwoScore"), 3);
      assert.equal(core.scoreTwo, 3);
    });

    localStorage.restoreContent(savedContent);
  });

  /* TEST - checkWin() */
  describe("Check if player won or not", function () {
    const core2 = new coreLogic("x", "circle");
    core2.currentPlayer = core.playerOne;

    it("Winning combination - test", function () {
      const winningCombination = [
        "x",
        "x",
        "x",
        null,
        "circle",
        null,
        "circle",
        null,
        null,
      ];
      assert.isTrue(core2.checkWin(winningCombination));
    });

    it("Not winning combination - test", function () {
      const notwinning = [
        "x",
        null,
        "x",
        null,
        "circle",
        null,
        "circle",
        null,
        "x",
      ];
      assert.isFalse(core2.checkWin(notwinning));
    });
  });

  /* TEST - isDraw() */
  describe("Check if match is a draw", function () {
    const matchDraw = [
      "x",
      "x",
      "circle",
      "circle",
      "circle",
      "x",
      "x",
      "circle",
      "x",
    ];
    const matchNotDraw = [null, null, null, null, null, null, null, null, null];

    it("Match is a draw", function () {
      assert.isTrue(core.isDraw(matchDraw));
    });

    it("Match is not a draw", function () {
      assert.isFalse(core.isDraw(matchNotDraw));
    });
  });
});
