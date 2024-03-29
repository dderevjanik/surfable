import { ETarget } from '../enums/ETarget';
import { MessageType, MESSAGE } from '../Messages';
import { Toast } from './Toast';

const body = document.getElementsByTagName('body')[0];

/*
 * Will listen on events/messages incoming from other parts of extension
 */
export const messageReceiver = () => {
	console.log('listening to messages');
	console.log(chrome);
	console.log(chrome.runtime);
	chrome.runtime.onMessage.addListener((message: MessageType) => {
		console.log('message');
		if (message.target === ETarget.CONTENT) {
			console.log('targeted');
			switch (message.type) {
				case MESSAGE.SHOW_TOAST: {
					const toast = Toast(message.title, message.text, message.level);
					body.insertAdjacentHTML('beforeend', toast);
					break;
				}
				default: {
					throw new Error(`Unexpected message's type: ${message.type}`);
				}
			}
		} else {
			// Do nothing, message isn't adressed for 'Background'
		}
	});
};
