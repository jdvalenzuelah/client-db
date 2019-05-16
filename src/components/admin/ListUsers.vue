<template>
    <div class="q-pa-md">
        <q-table
            tittle="Usuarios registrados"
            :columns="columns"
            :data="data"
            :loading="loading"
        >
            <template v-slot:top="props">
                <div class="q-table__title">Clientes</div>
            </template>
            <template v-slot:body="props">
                <q-tr>
                    <q-td key="nit">{{props.row.nit}}</q-td>
                    <q-td key="nombre">{{props.row.nombre}}</q-td>
                    <q-td key="telefono">{{props.row.telefono}}</q-td>  
                    <q-td key="direccion">{{props.row.direccion}}</q-td>  
                </q-tr>
            </template>
        </q-table>
    </div>
</template>

<script>
import router from '@/router'
/* eslint-disable */
export default {
    name:'ListUsers',
    data(){
        return {
            columns: [
                {name:'nit', label:'NIT', align:'left', sortable:true, required:true},
                {name:'nombre', label:'Nombre', align:'left', sortable:true, required:true},
                {name:'telefono', label:'Telefono', align:'left', sortable:true, required:true},
                {name:'direccion', label:'Direccion', align:'left', sortable:true, required:true},
            ],
            data: [],
            loading: false
        }
    },
    mounted(){
        this.fetchUsers()
    },
    methods: {
        fetchUsers() {
            this.loading = true
            const get = this.$http.get

            get(
                '/admin/cust'
            ).then( response => {
                this.data = response.data
            }).catch(error => {
                console.log(error)
            })

            this.loading = false
        }
    }
}
</script>
