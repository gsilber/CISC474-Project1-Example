/* This class represents the heads up display
 * and is responsible for updating the HUD based on the game state.
 */
class Hud {
  constructor(gameState) {
    this.gameState = gameState;
    this.altitudeMSL = $("#altitudeMSL");
    this.altitudeGROUND = $("#altitudeGROUND");
    this.fuel = $("#fuel");
    this.velocity = $("#Velocity");
  }

  /* Update the HUD based on the game state */
  update() {
    this.altitudeMSL.html(this.gameState.altitudeMSL);
    this.altitudeGROUND.html(this.gameState.altitudeGROUND);
    this.fuel.html(this.gameState.fuel);
    this.velocity.html(this.gameState.velocityY.toFixed(2));
    if (this.gameState.fuel <= 0) {
      this.fuel.html("Out of Fuel");
      this.fuel.css("color", "red");
    } else {
      this.fuel.css("color", "white");
    }
  }
}
