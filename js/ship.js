/* This file contains the Ship class, which is responsible for rendering the ship on the screen and updating its position based on the game state. */
class Ship {
  constructor(state) {
    this.state = state;
    this.ship = $("#ship"); // Assuming there's an element with id "ship" in the HTML
	this.shipBody= $("#ship-body"); // Assuming there's an element with id "ship-body" in the HTML
    this.flame = $("#ship-flame"); // Assuming there's an element with id "flame" in the HTML
  }

  /* update: Update the ship's position and other properties based on the game state.
		Called by the main game loop
	*/
  update = () => {
    // Update ship's position and other properties based on the game state
    this.ship.css("bottom", Math.round(this.state.altitudeMSL - 20) + "px"); // Update the ship's CSS position
    this.ship.css("left", this.state.hpos + "px"); // Update the ship's horizontal position
    this.flame.css("display", this.state.thrust ? "block" : "none"); // Show or hide the flame based on thrusting state
    this.ship.css("transform", "rotate(" + this.state.rotation + "deg)"); // Rotate the ship based on the rotation state
    if (this.state.isCrashed) {
      //this.shipBody.css("background-image", "url(../img/explode.gif?a="+Math.random()+")"); // Make the ship semi-transparent if crashed
	  this.shipBody.addClass("crash");
    } else {
		this.shipBody.removeClass("crash");
      //this.shipBody.css("background-image", "url(../img/lander.png)"); // Change the ship image if landed
    }
  };
}
