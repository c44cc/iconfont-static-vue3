import { reactive } from 'vue'

/**
 * 基础字典
 */
const SText = reactive({
    icon: {
        url: '/static_res/sicon',
        type: ['Ant'],
        list: [] as { name: string; list: { type: string; param: any }[] }[]
    }
})
export default SText
