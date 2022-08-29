import { App } from 'vue'
import { Button, message } from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'

const components = [Button, message]

export default (app: App<Element>): void => {
  components.forEach((component: any) => {
    app.use(component)
  })
}
