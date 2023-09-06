<template>
    <div style="padding: 30px">
        <div class="f-20 mtb-10">图标列表</div>

        <div class="row g-10">
            <div>颜色配置：</div>
            <template v-for="(item, index) in conf.colorModel">
                <input
                    type="color"
                    :class="['colorinput' + (index + 1)]"
                    v-model="conf.colorModel[index].value"
                    @change="changeIconFill"
                />
            </template>
        </div>

        <div class="row g-10 mtb-10">
            <template v-for="item in conf.iconList">
                <sicon :name="item.name" :type="item.type" :size="conf.size" :color="conf.color" />
            </template>
        </div>

        <div class="row g-10 mtb-10">
            <cbutton @click="conf.dialog.show = true">添加图标</cbutton>
            <addDialog v-model:show="conf.dialog.show" @close="conf.chooseIcon" />
        </div>
    </div>
</template>

<script lang="ts" setup>
import { reactive, watch } from 'vue'
import addDialog from './addDialog.vue'

const conf = reactive({
    size: 40,
    color: ['#000000'],
    dialog: {
        show: false
    },
    iconList: [
        {
            name: 'Ant',
            type: 'up'
        },
        {
            name: 'Ant',
            type: 'delete'
        }
    ],

    colorModel: [
        {
            value: '#000000'
        },
        {
            value: '#000000'
        },
        {
            value: '#000000'
        },
        {
            value: '#000000'
        }
    ],
    chooseIcon: (_item: any) => {
        const item = JSONUtil.cp(_item)
        console.log(item)
        conf.iconList.push({
            name: item.name,
            type: item.item.type
        })
        changeIconFill()
    }
})

const changeIconFill = () => {
    conf.color = conf.colorModel.map((item) => item.value)
}
watch(
    () => conf.colorModel,
    () => changeIconFill()
)
</script>
<style lang="less" scoped>
.f-20 {
    font-size: 20px;
}
.mtb-10 {
    margin: 10px 0px;
}
.g-10 {
    gap: 10px;
}
</style>
