import { App } from 'vue'

import sicon from './sicon/index.vue'
import button from './button/index.vue'

export const install = (app: App<Element>) => {
    app.component('sicon', sicon)
    app.component('cbutton', button)
}

export default {
    install
}
