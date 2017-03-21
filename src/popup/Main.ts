import { sendToBackground } from '../Sender';
import { MESSAGE } from '../Messages';
import { render } from './Index';
import { keyListener } from './KeyListener';
import { messageReceiver } from './MessageReceiver';

render();
keyListener();
messageReceiver();

// Synchronize current window's tabs with popup's state
sendToBackground({ type: MESSAGE.SYNC_CHROME_REQUEST });
