import { sendToBackground } from '../../common/src/Sender';
import { MESSAGE } from 'surfable-common/src/Messages';
import { render } from './Index';
import { keyListener } from './KeyListener';
import { messageReceiver } from './MessageReceiver';

render();
keyListener();
messageReceiver();

sendToBackground({type: MESSAGE.GET_CURRENT_TABS});

