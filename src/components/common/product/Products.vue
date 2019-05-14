<template>
    <q-table
        title="Productos"
        :columns="columns"
        :data="data"
        :loading="loading"
    >
        <template v-slot:top="props">
            <table>
                <tr>
                    <td class="window-width"> <div class="q-table__title">Clientes</div> </td>
                    <td> <create-product class="q-pa-sm"/> </td>
                </tr>
            </table>
        </template>
        <template v-slot:body="props">
            <q-tr>
                <q-td key="id">{{props.row.idproducto}}</q-td>
                <q-td key="nombre">{{props.row.nombre}}</q-td>
                <q-td key="descripcion">{{props.row.descripcion}}</q-td>
                <q-td key="precio">Q{{props.row.precio}}</q-td>
            </q-tr>
        </template>
    </q-table>
</template>

<script>
import CreateProduct from './CreateProduct'
export default {
    name:'Products',
    components: {
        CreateProduct
    },
    data() {
        return {
            columns: [
                {name:'id', label:'Id', align:'left', sortable:true, required:true},
                {name:'nombre', label:'Nombre', align:'left', sortable:true, required:true},
                {name:'descripcion', label:'Descripcion', align:'left', sortable:true, required:true},
                {name:'precio', label:'Precio', align:'left', sortable:true, required:true},
            ],
            data: [],
            loading: false
        }
    },
    mounted () {
        this.fetchProducts()
    },
    methods: {
        fetchProducts(){
            console.log(this.$admin)
            this.loading = true
            const get = this.$http.get

            get(
                '/product'
            ).then(response => {
                this.data = response.data
                this.loading = false
            }).catch(error => {
                console.log(error)
            })
        
        }
    }
}
</script>

