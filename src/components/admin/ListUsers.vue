<template>
    <div class="q-pa-md">
        <q-table
            tittle="Usuarios registrados"
            :columns="columns"
        >
        </q-table>
    </div>
</template>

<script>
export default {
    name:'ListUsers',
    data(){
        return {
            columns: [
                {name:'id', label:'Id', align:'left', sortable:true, required:true},
                {name:'user', label:'Username', align:'left', sortable:true, required:true},
            ]
        }
    }
}
</script>
