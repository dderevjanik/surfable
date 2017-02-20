import { messageReceiver } from './MessageReceiver';
import { eventListener } from './EventListener';
import { synchronizeTabs } from './Synchronize';

eventListener();
messageReceiver();
synchronizeTabs();
