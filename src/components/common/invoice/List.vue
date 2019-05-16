<template>
    <div class="q-pa-md">
        <q-table
            tittle="Ventas"
            :columns="columns"
            :data="data"
            :loading="loading"
        >
            <template v-slot:top="props">
                <div class="q-table__title">Ventas</div>
            </template>
            <template v-slot:body="props">
                <q-tr>
                    <q-td key="numFact">{{props.row.numfactura}}</q-td>
                    <q-td key="date">{{props.row.fecha}}</q-td>
                    <q-td key="nit">{{props.row.nit}}</q-td>  
                    <q-td key="idVen">{{props.row.idvendedor}}</q-td>
                </q-tr>
            </template>
        </q-table>
    </div>
</template>
<script>
export default {
    name: 'ListSales',
    data() {
        return {
            columns: [
                {name:'numFact', label:'No. Factura', align:'left', sortable:true, required:true},
                {name:'date', label:'Fecha', align:'left', sortable:true, required:true},
                {name:'nit', label:'NIT', align:'left', sortable:true, required:true},
                {name:'idVen', label:'ID Vendedor', align:'left', sortable:true, required:true},
            ],
            data: [],
            loading: false
        }
    },
    mounted(){
        this.fetchSales()
    },
    methods: {
        fetchSales(){
            this.loading = true
            const get = this.$http.get

            get(
                '/invoice'
            ).then(results => {
                this.data = results.data
            }).catch(error => {
                console.log(error)
            })
            this.loading = false
        }
    }
}
</script>
