<template>
    <div ref="iconRef" style="display: inline-flex" :style="{ fontSize: `${size}px`, color: color as any }"></div>
</template>

<script lang="ts" setup>
import { FileUtil } from 'tools-vue3'
import { onMounted, ref, watch } from 'vue'
import SText from '~/store/SText'

const props = defineProps({
    name: { default: 'Ant' },
    type: {
        default: 'up'
    },
    size: { default: '20' },
    color: { default: undefined as any }
})

watch(
    () => [props.type, props.color, props.size],
    () => {
        init()
    }
)

onMounted(() => {
    init()
})

const iconRef = ref<HTMLDivElement>({} as any)
const viewBoxStr = '#{viewBox}'
const viewBoxDefault = '0 0 1024 1024'
const str = {
    svg: [
        `<svg style="width: 1em;height: 1em;vertical-align: middle;overflow: hidden;" viewBox="${viewBoxStr}" version="1.1" xmlns="http://www.w3.org/2000/svg">`,
        '</svg>'
    ],
    get0: (replacestr: string) => {
        return str.svg[0].replace(viewBoxStr, replacestr)
    },
    getPath: (param: { d: string; fill?: string }) => {
        return `<path d="${param.d}" fill="${param.fill ?? 'currentColor'}" />`
    }
}

if (!window.sicon) {
    window.sicon = {
        resource: {},
        load: {},
        getResorce: async (_url: string) => {
            let filestr: any
            const req = window.sicon.load[_url]
            if (req) {
                filestr = await req
            } else {
                window.sicon.load[_url] = new Promise(async (res) => {
                    const _json = await FileUtil.getFile(_url)
                    res(_json)
                })
                filestr = await window.sicon.load[_url]
            }
            return filestr
        }
    }
}

const init = async () => {
    const color = ['color:black;', 'color:red;']
    if (StrUtil.isNull(props.type)) return
    const _url = `${SText.icon.url}/${props.name}/${props.type}.json`
    let filestr: any
    const _icon_resource = window.sicon.resource[_url]
    if (_icon_resource) {
        filestr = _icon_resource
    } else {
        filestr = await window.sicon.getResorce(_url)
        if (typeof filestr === 'object') {
            filestr = JSON.stringify(filestr)
        }
        window.sicon.resource[_url] = filestr
    }
    if (!filestr) {
        console.info(
            `%c icon <%c${props.name}-${props.type}%c> 不存在`,
            `${color[0]} font-size:12px`,
            color[1],
            color[0]
        )
        return
    }
    let res = ''
    if (!filestr.startsWith('{')) {
        res = `${str.get0(viewBoxDefault)}<path d="${filestr}" fill="currentColor" />${str.svg[1]}`
    } else {
        let objt: { d: string[]; fill: { [key: string]: number[] }; viewBox?: string } = JSON.parse(filestr)
        res = str.get0(objt.viewBox ?? viewBoxDefault)
        const getFill = (fill: { [key: string]: number[] }, index: number) => {
            const fillkeys = Object.keys(fill)
            const colors = props.color

            for (let i = 0; i < fillkeys.length; i++) {
                const key = fillkeys[i]
                const nums = fill[key]
                if (nums.includes(index)) {
                    if (colors) {
                        if (Array.isArray(colors)) return colors[i] ?? colors[colors.length - 1]
                        return colors
                    } else {
                        return key
                    }
                }
            }

            return 'currentColor'
        }

        objt.d.forEach((item, index) => {
            res += str.getPath({
                d: item,
                fill: getFill(objt.fill, index)
            })
        })
        res += str.svg[1]
    }

    iconRef.value.innerHTML = res
}
</script>
