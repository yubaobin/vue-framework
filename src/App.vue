<template>
    <div id="app">
        <router-view />
    </div>
</template>
<script>
import { provideGlobalConfig } from 'ux-ui'
import { defineComponent } from '@vue/composition-api'
export default defineComponent({
    setup () {
        provideGlobalConfig({
            iconPrefix: 'xxxx'
        })
    }
})
</script>
