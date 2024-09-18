/*GameState represents the current state of the game*/
class GameState {
  constructor() {
    this.altitudeMSL = Constants.unscaledSize; // in meters
    this.altitudeGROUND = Constants.unscaledSize; // in meters
    this.velocityX = 0; // in meters per second
    this.velocityY = 0;
    this.hpos = 0; // horizontal position
    this.fuel = 100; // in liters
    this.thrust = false;
    this.isLanded = false;
    this.isCrashed = false;
    this.rotation = 0; //vertical is 0
    this.terrain = new Terrain();
  }

  /* Update the game state, called by the main game loop */
  update() {
    let deltaTime = Constants.timeInterval; // convert to seconds
    if (this.isLanded || this.isCrashed) return;

    const gravity = 1.62; // moon gravity in m/s^2
    let angleRads = (this.rotation * Math.PI) / 180;
    let thrustX = this.thrust
      ? Constants.engineThrust * Math.sin(angleRads)
      : 0;
    let thrustY = this.thrust
      ? Constants.engineThrust * Math.cos(angleRads)
      : 0;
    if (this.thrust) {
      this.fuel -= 0.1; // reduce fuel
      if (this.fuel < 0) {
        this.fuel = 0; // prevent negative fuel
        this.thrust = false; // stop thrusting if out of fuel
      }
    }
    this.fuel = parseFloat(this.fuel).toFixed(2);
    // Simplified physics with rotation
    let accelerationX = thrustX;
    let accelerationY = gravity - thrustY;

    this.velocityX += accelerationX * deltaTime;
    this.velocityY += accelerationY * deltaTime;

    this.altitudeMSL -= this.velocityY * deltaTime;
    this.altitudeMSL = this.altitudeMSL.toFixed(2);
    this.hpos += this.velocityX * deltaTime;
    if (this.hpos < 0) {
      this.hpos = 0; // prevent going off the left side
      this.velocityX = 0; // stop horizontal movement
    }
    if (this.hpos > Constants.unscaledSize - Constants.shipWidth*2) {
      this.hpos = Constants.unscaledSize - Constants.shipWidth*2; // prevent going off the right side
      this.velocityX = 0; // stop horizontal movement
    }
    let terrainHeight = parseFloat(
      this.terrain.getGroundHeightAtPosition(this.hpos)
    );
    this.altitudeGROUND =
      this.altitudeMSL - Constants.maxTerrainHeight + terrainHeight;
    this.altitudeGROUND = this.altitudeGROUND.toFixed(2);
    if (this.altitudeGROUND <= 0) {
      this.altitudeGROUND = 0;
      this.altitudeMSL = Constants.maxTerrainHeight - terrainHeight;
      if (
        this.velocityY > Constants.crashVelocity ||
        Math.abs(this.velocityX) > Constants.crashVelocity ||
        this.rotation !== 0 ||
        !this.terrain.isFlat(this.hpos)
      ) {
        this.isCrashed = true;
      } else {
        this.isLanded = true;
      }
    }
  }

  /* Reset the game state */
  reset() {
    this.altitudeMSL = Constants.unscaledSize; // reset altitude
    this.altitudeGROUND = Constants.unscaledSize; // reset ground altitude
    this.velocityX = 0;
    this.velocityY = 0;
    this.rotation = 0;
    this.terrain = new Terrain();
    this.hpos = Math.random() * (Constants.unscaledSize - 100); // random horizontal position
    this.fuel = Constants.initialFuel;
    this.thrust = false;
    this.isLanded = false;
    this.isCrashed = false;
  }
}
