import { messageReceiver } from './MessageReceiver';
import { eventListener } from './EventListener';
import { synchronizeChromeState } from './Synchronize';

eventListener();
messageReceiver();
synchronizeChromeState();
