<template>
    <div class="p-3">
        <h4>
            {{ title }} 
            <mark :class="[isUrgent && (active.length + completed.length >= 3) ? 'text-danger' : '']">
                ({{ active.length + completed.length}})
            </mark>
        </h4>
        <ul class="m-auto">
            <list-item
                :item="item"
                v-on:itemchanged="$emit('reloadlist')"
                v-for="item in active"
                :key="item.id"
                class="m-auto my-1 text-justify text-wrap"
            />
        </ul>
        <ul class="m-auto">
            <list-item
                :item="item"
                v-on:itemchanged="$emit('reloadlist')"
                v-for="item in completed"
                :key="item.id"
                class="m-auto my-1 text-justify text-wrap"
            />
        </ul>
    </div>
</template>

<script>

import listItem from "./listItem";

export default {
    components: {
        listItem
    },
    props: ["title", "active", "completed", "isUrgent"],
};
</script>

<style scoped>
    mark {
        background-color: white;
    }
</style>