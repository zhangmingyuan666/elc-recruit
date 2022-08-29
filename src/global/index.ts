import registerComponent from './register-component'
import { App } from 'vue'

export function globalRegister(app: App<Element>): void {
  registerComponent(app)
}
