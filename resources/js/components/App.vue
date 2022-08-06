<template>
    <h1 class="text-danger text-center">Todolist</h1>
    <hr>

    <div class="container d-flex m-auto mt-3 border">
        <div class="flex-column w-50">
            <list-view
                title="Todos"
                :active="todosActive"
                :completed="todosCompleted"
                :isUrgent="false"
                v-on:reloadlist="getItems()"
            />
            <add-item-form class="mb-3" v-on:reloadlist="getItems()"/>
        </div>
        <list-view
            title="Urgent Todos"
            :active="urgentsActive"
            :completed="urgentsCompleted"
            :isUrgent="true"
            v-on:reloadlist="getItems()"
            class="border-start w-50"
        />
    </div>
</template>

<script>
import addItemForm from "./addItemForm";
import listView from "./listView";

export default {
    components: {
        addItemForm,
        listView
    },

    data: () => {
        return {
            todosActive: [],
            todosCompleted: [],
            urgentsActive: [],
            urgentsCompleted: [],
        };
    },
    
    methods: {
        getItems() {
            axios
                .get("api/item")
                .then(res => {
                    let items = res.data
                    this.todosActive = res.data.filter((todo) => (todo.type === 'todo') && (todo.completed === 0));
                    this.todosCompleted = res.data.filter((todo) => (todo.type === 'todo') && (todo.completed === 1));
                    this.urgentsActive = res.data.filter((todo) => (todo.type === 'urgent') && (todo.completed === 0));
                    this.urgentsCompleted = res.data.filter((todo) => (todo.type === 'urgent') && (todo.completed === 1));
                })
                .catch(error => {
                    console.log(error);
                });
        }
    },
    created() {
        this.getItems();
    }
};
</script>

<style scoped>

</style>