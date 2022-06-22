<template>
    <v-toolbar>
        <v-toolbar-title>
            <nuxt-link to="/"> ECサイト </nuxt-link>
        </v-toolbar-title>

        <v-spacer></v-spacer>

        <nuxt-link to="/login" class="mr-3">ログイン</nuxt-link>
        <nuxt-link to="/register">新規登録</nuxt-link>
    </v-toolbar>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
    setup() {},
})
</script>
