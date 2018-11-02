// ------------------------------------------------------------------------
// :: Chat Change Listener
// ------------------------------------------------------------------------
// Description:
// This feature leverages a browser API named the "MutationObserver"
// to performantly listen to when the browser makes an update to the
// DOM itself. Specifically we're going to listen only a specific div:
// the chat window.
// ------------------------------------------------------------------------
// Documentation:
// https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver
// ------------------------------------------------------------------------

// Whenever chat updates, scroll the chat box down to display the new message
// since that can occasionaly get bugged and clip messages or only show half-messages
const scrollChatDown = () => {
	let chatContainer = document.querySelector('.message-container');

	chatContainer.scrollTop = chatContainer.scrollHeight;

	console.log('chat has been scrolled down automatically')
}

// Creates a callback function to execute whenever a DOM Mutation is observed
const chatChangeCallback = function(chatChangeList, chatObserver) {

	// Fire off the ScrollChatDown function
	scrollChatDown();

	/*  ---------------------------------------------
		The following section is for console logging
		the specific events which can happen inside of
    	chat. I'm removing it for now.
    	  ---------------------------------------- */
	/* for (let mutation of chatChangeList) {
		// If an item was added/removed
		if (mutation.type == 'childList') {
			console.log('A child node has been added or removed.');
		}

		// If an item was changed in some way
		else if (mutation.type == 'attributes') {
			console.log('The ' + mutation.attributeName + ' attribute was modified.');
		}
	}
	*/
};

/** So browser extensions run code as soon as it's available, which is great, but
	this can be a problem since Mixer loads elements dynamically after the server
	response is recieved from the browser. Long story short, this means that the
	chat box isn't always available right away. This function checks to see if
	chat exists, then re-checks every 0.5s until it does. */
function addObserverIfChatExists() {
	// Attempt to find the chat box
	let chatContainer = document.querySelector('.message-container');

	// If chat isn't found, re-check in a bit
	if(!chatContainer) {
		window.setTimeout(addObserverIfChatExists, 500);
		return;
	}

	// Inform the MutationObserver we're interested in ALL of its information (for now)
	let chatConfig = { attributes: true, childList: true, subtree: true };

	// Create a new MutationObserver, then link it to our chatChangeCallback function
	let chatObserver = new MutationObserver(chatChangeCallback);

	// Begin observing the chatbox for changes based on our config
	chatObserver.observe(chatContainer, chatConfig);
}
addObserverIfChatExists();

// Side Note:
// Since chat is ever-present we won't pause the observer
// but just in case, this is how you would stop it:
// observer.disconnect();
