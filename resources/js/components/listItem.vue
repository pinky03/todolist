<template>
    <li @click="visible=!visible">
        <span :class="[item.completed ? 'completed' : '', 'item']">
            {{ item.name }}
        </span>
        <span class="item-menu mx-1 text-primary" v-show="visible">
            <a href="#" @click="updateCheck()" v-show="item.completed">[reset]</a>
            <a href="#" @click="updateCheck()" v-show="!item.completed">[done]</a>
            <a href="#" @click="removeItem()">[remove]</a>
            <a href="#" @click="changeType()">[move to {{ (item.type === 'todo') ? 'urgent' : 'todo' }}]</a>
        </span>
    </li>
</template>

<script>
export default {
    props: ["item"],
    data() {
        return { visible: false };
    },
    methods: {
        updateCheck() {
            this.item.completed = !this.item.completed;
            axios
                .put(`api/item/${this.item.id}`, {
                    item: this.item
                })
                .then(res => {
                    if (res.status == 200) {
                        this.$emit("itemchanged");
                    }
                })
                .catch(error => {
                    console.log("error from axios put", errors);
                });
        },
        removeItem() {
            axios
                .delete(`api/item/${this.item.id}`)
                .then(res => {
                    if (res.status == 200) {
                        this.$emit("itemchanged");
                    }
                })
                .catch(error => {
                    console.log("error from axios delte ", error);
                });
        },
        changeType() {
            this.item.type = (this.item.type === 'todo') ? 'urgent' : 'todo';
            
            axios
                .put(`api/item/${this.item.id}`, {
                    item: this.item
                })
                .then(res => {
                    if (res.status == 200) {
                        this.$emit("itemchanged");
                    }
                })
                .catch(error => {
                    console.log("error from axios put", errors);
                });
        }
    }
};
</script>

<style>
.completed {
    text-decoration: line-through;
    color: gray;
}
.item {
    word-break: break-all;
}
</style>