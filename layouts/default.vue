<template>
    <v-app>
        <div>
            <Header />
            <Nuxt />
            <Footer />
        </div>
    </v-app>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'

export default defineComponent({
    components: {
        Header,
        Footer,
    },
    setup() {},
})
</script>
