<template>
    <div class="btn">
        <slot />
    </div>
</template>

<script lang="ts" setup></script>
<style lang="less" scoped>
.btn {
    --color-p: #1e80ff;
    --color-p-hover: #1e80ffbf;
    height: 30px;
    line-height: 30px;
    text-align: center;
    color: var(--color-p);
    border: 1px solid var(--color-p);
    padding: 0px 15px;
    cursor: pointer;
    &:hover {
        color: var(--color-p-hover);
        border: 1px solid var(--color-p-hover);
    }
}
</style>
