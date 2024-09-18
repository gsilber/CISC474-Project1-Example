/* A generic modal dialog with a single button*/
class Popup {
	constructor() {
		$("#popup").hide();
	}

	/*show: Show the dialog box
	 * title: The title of the dialog box
	 * content: The content of the dialog box
	 * buttonText: The text on the button
	 * callback: The function to call when the button is clicked
	 */
	show(title, content, buttonText,callback) {
		$("#popup-title").html(title);
		$("#popup-content").html(content);
		$("#popup-button").html(buttonText);
		if (callback)
			$("#popup-button").on("click", ()=>callback());
		$("#popup").show();
	}

	/*hide: Hide the dialog box*/
	hide() {
		$("#popup").hide();
	}
}