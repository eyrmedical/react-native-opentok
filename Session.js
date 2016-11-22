import { NativeModules, NativeAppEventEmitter, Platform } from 'react-native';
const SessionManager = NativeModules.OpenTokSessionManager;

const listener = null;

export const connect = SessionManager.connect;
export const onConnected = SessionManager.onConnected;
export const onDisconnected = SessionManager.onDisconnected;
export const onStreamReceived = SessionManager.onStreamReceived;
export const onStreamDropped = SessionManager.onStreamDropped;
export const onError = SessionManager.onError;
export const sendMessage = SessionManager.sendMessage;

export const onMessageRecieved = (callback) => {
  listener = NativeAppEventEmitter.addListener(
      'onMessageRecieved',
      (e) => callback(e)
    );
};

export const stopListener = () => listener.remove();
