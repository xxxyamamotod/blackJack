<template>
    <div>
        <v-form action="http://localhost:8765/">
            <v-text-field
                label="email"
                type="password"
                name="password"
                required
            ></v-text-field>
            <v-text-field
                label="password"
                type="password"
                name="password"
                required
            ></v-text-field>
            <v-btn type="submit">SUBMIT</v-btn>
        </v-form>
    </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
    setup() {},
})
</script>
