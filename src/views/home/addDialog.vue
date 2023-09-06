<template>
    <Teleport to="body">
        <div v-if="conf.show" class="fit flex flex-center absolute" style="z-index: 1000; background-color: #0000003b">
            <div style="width: 700px; background-color: #fff; border: 1px solid #eee; padding: 10px">
                <div class="row justify-between" style="margin: 0px 0px 10px 0px">
                    <div style="font-size: 16px">添加图标</div>
                    <div @click="conf.close" style="cursor: pointer">
                        <sicon type="close" name="Ant" />
                    </div>
                </div>
                <div style="max-height: 500px; overflow-y: auto; color: #4cadcb">
                    <template v-for="el in SText.icon.list">
                        <div class="column">
                            <div style="border-bottom: 1px solid #97ceff; font-weight: bold; font-size: 18px">
                                {{ el.name }}
                            </div>
                            <div class="row">
                                <template v-for="item in el.list">
                                    <div
                                        class="iconlist"
                                        @click="conf.choose(el.name, item)"
                                        :style="{
                                            background:
                                                item.type === conf.item.item.type && el.name === conf.item.name
                                                    ? '#c8ebff'
                                                    : undefined
                                        }"
                                    >
                                        <sicon :name="el.name" :type="item.type" size="30" />
                                    </div>
                                </template>
                            </div>
                        </div>
                    </template>
                </div>
                <div class="row justify-end" style="gap: 10px; margin-top: 10px">
                    <cbutton @click="conf.close">关闭</cbutton>
                    <cbutton @click="conf.closeItem">确定</cbutton>
                </div>
            </div>
        </div>
    </Teleport>
</template>

<script lang="ts" setup>
import { FileUtil } from 'tools-vue3'
import { reactive, watch } from 'vue'
import SText from '~/store/SText'

const props = defineProps({
    show: { default: false }
})

watch(
    () => props.show,
    () => {
        conf.show = props.show
        if (conf.show) {
            conf.open()
        }
    }
)
const emit = defineEmits(['close', 'update:show'])

const conf = reactive({
    title: '选择图标',
    item: {
        name: '',
        item: {} as any
    },
    show: false,
    open: async () => {
        if (SText.icon.list.length == 0) {
            Timer.once(async () => {
                for (let i = 0; i < SText.icon.type.length; i++) {
                    const _type = SText.icon.type[i]
                    const _url = `${SText.icon.url}/${_type}/_keys.json`
                    let _list: any = await FileUtil.getFile(_url)
                    if (typeof _list === 'string') {
                        _list = JSON.parse(_list)
                    }
                    const res_list = [] as { type: string; param: any }[]
                    for (let j = 0; j < _list.length; j++) {
                        const _typeItem = _list[j]
                        const _url_type = `${SText.icon.url}/${_type}/${_typeItem}.json`
                        let filestr: any = await window.sicon.getResorce(_url_type)
                        const objfill = () => {
                            const _fill_l = Object.keys(filestr.fill).length
                            filestr = {
                                fill: _fill_l
                            }
                        }
                        if (typeof filestr !== 'object') {
                            if (filestr.startsWith('{')) {
                                filestr = JSON.parse(filestr)
                                objfill()
                            } else {
                                filestr = {
                                    fill: 1
                                }
                            }
                        } else {
                            objfill()
                        }
                        res_list.push({
                            type: _typeItem,
                            param: filestr
                        })
                    }
                    SText.icon.list.push({
                        name: _type,
                        list: res_list
                    })
                }
                console.log(SText.icon.list)
            }, 0)
        }
    },
    choose: (name: string, item: any) => {
        conf.item.name = name
        conf.item.item = item
    },
    close: () => {
        conf.show = false
    },
    closeItem: () => {
        emit('close', conf.item)
        conf.close()
    }
})

watch(
    () => conf.show,
    () => {
        emit('update:show', conf.show)
    }
)
</script>
<style lang="less" scoped>
.iconlist {
    display: inline-flex;
    padding: 0px 5px;
    margin: 5px 0px;
    cursor: pointer;

    &:hover {
        background: #f2f6fc;
    }
}
</style>
