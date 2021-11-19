import { EventEmitter } from 'events';
import { loadState, saveState, decimalFormatter } from '../lib/persistance';
import * as firebase from '../lib/firebase'
import UIStateStore from './UIStateStore';

class AuthenticationStore extends EventEmitter {
  constructor() {
    super();
    
    this.isSignedIn = false
    this.user = null
    firebase.auth.onAuthStateChanged(this.setUser)
    firebase.auth.onIdTokenChanged(this.onTokenChange)
  }

  onTokenChange = () => {
    this.user = firebase.auth.currentUser
    if (this.user && UIStateStore.isLoginScreenVisible) UIStateStore.hideLoginScreen()
    this.emit('change')
  }

  setUser = user => {
    this.user = user
    if (user && UIStateStore.isLoginScreenVisible) UIStateStore.hideLoginScreen()
    this.emit('change')
  }

  async registerWithEmailAndPassword(name, email, password) {
    await firebase.registerWithEmailAndPassword(name, email, password)
  }

  async signInWithEmailAndPassword(email, password) {
    await firebase.signInWithEmailAndPassword(email, password)
  }

  async signInWithGoogle() {
    await firebase.signInWithGoogle()
  }

  async sendPasswordResetEmail(email) {
    await firebase.sendPasswordResetEmail(email)
  }

  async logout() {
    await firebase.logout()
  }
}

export default new AuthenticationStore();
