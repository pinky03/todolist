<template>
    <div class="mt-3">
        <div class="container w-100">
            <input
                type="test"
                placeholder="At least 3 characters"
                class="border"
                v-model="item.name"
            />
            <button
                :class="[(item.name.length >=3 ) ? 'active' : 'notactive']"
                @click="addItem()"
            >
                Add
            </button>
        </div>
    </div>
</template>

<script>
export default {
    data: () => {
        return {
            item: {
                name: ""
            }
        };
    },
    methods: {
        addItem() {
            if (this.item.name == "") {
                return;
            }
            axios
                .post("api/item", {
                    item: this.item
                })
                .then(res => {
                    if (res.status == 201) {
                        this.item.name = "";
                        this.$emit("reloadlist");
                    }
                })
                .catch(error => {
                    console.log(error);
                });
        }
    }
};
</script>

<style scoped>
.active {
    color: white;
    background-color: blue;
}
.inactive {
    color: gray;
}
</style>