//This shorthand is equivalent to $(document).ready(function(){}) and calls the function inside after the page is fully loaded.
$(function () {
  let game = new Game();
});

/*
 * This class represents the game at the top level and is responsible for
 * the window level event handlers as well as the main game loop.
 */
class Game {
  constructor() {
    this.scaleWindow = document.getElementById("scroll-window");
    this.state = new GameState();
    this.hud = new Hud(this.state);
    this.ship = new Ship(this.state);
    this.popup = new Popup();
    //handle resize events
    window.addEventListener("resize", this.resize);
    //handle keydown events
    window.addEventListener("keydown", this.keyDown);
    window.addEventListener("keyup", this.keyUp);
    //initial size
    this.resize();
    //update the game
    this.hud.update();
    this.state.update();
    this.running = false;
    this.timeout = null;
    this.popup.show(
      "Lunar Lander",
      "Welcome to the Lunar Lander Game! <br/><span style='font-style:italic;padding-top:10px;display:inline-block'>Use arrow keys to rotate and up arrow to apply thrust.</span>",
      "Start Game",
      this.popupClicked
    );
  }

  /* keyboard Event Handlers
   * ArrowUp: Apply thrust
   * ArrowLeft: Rotate left
   * ArrowRight: Rotate right
   */
  keyUp = (event) => {
    if (event.key === "ArrowUp") {
      this.state.thrust = false; // apply thrust
    }
  };

  /* keyboard Event Handlers
   * ArrowUp: Apply thrust
   * ArrowLeft: Rotate left
   * ArrowRight: Rotate right
   */
  keyDown = (event) => {
    if (this.running) {
      if (event.key === "ArrowUp") {
        this.state.thrust = true; // apply thrust
      }
      if (event.key === "ArrowLeft") {
        this.state.rotation -= Constants.rotationSpeed;
      }
      if (event.key === "ArrowRight") {
        this.state.rotation += Constants.rotationSpeed;
      }
    }
  };

  /* Respond to resize events by scaling the game window
	   This allows our virtual game world to be a fixed size, but
	   still fill the window. 
	*/
  resize = () => {
    let width = window.innerWidth;
    let height = window.innerHeight - Constants.headerHeight;
    let newSize = Math.min(width, height);
    let scale = newSize / Constants.unscaledSize;
    this.scaleWindow.style.transform = `scale(${scale})`;
    this.scaleWindow.style.marginLeft = (width - newSize) / 2 + "px";
  };
  /* Event handler for popup window */
  popupClicked = () => {
    this.popup.hide();
    this.startGame();
  };

  /* Starts a new game, resetting the ship position and velocities
   */
  startGame = () => {

    this.state.reset();
    this.hud.update();
    this.ship.update();
    this.running = true;
    this.timeout = setTimeout(this.update, Constants.timeInterval);
  };
  /* Restarts the game, resetting the ship position and velocities
   */
  restartGame = () => {
    this.stopGame();
    this.startGame();
  };
  /* Stops the game loop */
  stopGame = () => {
    this.hud.update();
    this.ship.update();
    this.running = false;
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
    this.timeout = null;
  };

  /* Main game loop
   * Updates the game state, the HUD
   * and the ship position and properties
   */
  update = () => {
    if (this.running) {
      this.state.update();
      this.hud.update();
      this.ship.update();
      if (this.state.isCrashed) {
        this.stopGame();
        this.popup.show(
          "Game Over",
          "You crashed! Try again.",
          "Restart",
          this.restartGame
        );
      } else if (this.state.isLanded) {
        this.stopGame();
        this.popup.show(
          "Congratulations!",
          "You have landed safely!",
          "Restart",
          this.restartGame
        );
      } else {
        this.timeout = setTimeout(this.update, Constants.timeInterval);
      }
    } else {
      this.state.reset();
      this.hud.update();
      this.ship.update();
    }
  };
}
