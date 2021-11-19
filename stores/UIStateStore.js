import { EventEmitter } from 'events';
import { loadState, saveState, decimalFormatter } from '../lib/persistance';

class UIStateStore extends EventEmitter {
  constructor() {
    super();
    
    this.isLoginScreenVisible = false
  }

  showLoginScreen() {
    console.log('showLoginScreen')
    this.isLoginScreenVisible = true
    this.emit('change', 'SHOW_LOGIN_SCREEN')
  }

  hideLoginScreen() {
    console.log('hideLoginScreen')
    this.isLoginScreenVisible = false
    this.emit('change', 'HIDE_LOGIN_SCREEN')
  }
}

export default new UIStateStore();
