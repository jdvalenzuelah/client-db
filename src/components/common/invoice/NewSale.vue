<template>
    <div class="q-pa-md">
        <q-stepper
            v-model="step"
            vertical
            color="primary"
            animated
        >
            <q-step
                :name="1"
                title="Buscar cliente:"
                :done="step > 1"
            >
            <div class="flex wrap gutter">
                <table>
                    <tr>
                        <td style="max-width: 300px">
                            <div class="q-pa-sm">
                                <q-input label="Ingresar NIT" v-model="nit"/>
                                <div class="q-pa-sm">
                                    <q-btn label="Buscar" @click="findUser"/>
                                </div>
                            </div>
                        </td>
                        <td>
                            <div class="q-pa-md" style="min-width: 300px;" v-if="cliente.nombre">
                                <q-card>
                                    <q-card-section>
                                        <div class="text-h6">Datos cliente:</div>
                                        <div class="text-subtitle2">Verificar sean correctos</div>
                                    </q-card-section>
                                    <q-card-section>
                                        NIT: {{cliente.nit}}
                                    </q-card-section>
                                    <q-card-section>
                                        Nombre: {{cliente.nombre}}
                                    </q-card-section>
                                    <q-card-section>
                                        Telefono: {{cliente.telefono}}
                                    </q-card-section>
                                    <q-card-section>
                                        Direccion: {{cliente.direccion}}
                                    </q-card-section>
                                </q-card>
                            </div>
                        </td>
                    </tr>
                </table>
            </div>
            <q-stepper-navigation v-if="cliente.nombre">
                <q-btn @click="step += 1" color="primary" label="Continue" />
            </q-stepper-navigation>
            </q-step>
            <q-step
                title="Agregar productos"
                :name="2"
                :done="step>2"
            >
                <div class="q-pa-md">
                    <q-table
                        title="Productos"
                        :columns="columns"
                        :data="data.slice().reverse()"
                        :loading="loading"
                    >
                        <template v-slot:top="props">
                            <table>
                                <tr>
                                    <td class="q-pa-sm" style="min-width: 300px;">
                                        <q-input label="Ingresar ID de producto" v-model="prodId"/>
                                    </td>
                                    <td class="q-pa-sm">
                                        <q-btn label="Agregar"  @click="findProduct"/>
                                    </td>
                                    <td class="absolute-right" align="right">
                                        <q-stepper-navigation class="q-pa-sm">
                                            <q-btn @click="total" label="Proceder a total" v-if="data.length>0"/>
                                        </q-stepper-navigation>
                                    </td>
                                </tr>
                            </table>
                        </template>
                        <template v-slot:body="props">
                            <q-tr>
                                <q-td key="id">{{props.row.id_producto}}</q-td>
                                <q-td key="nombre">{{props.row.nombre_producto}}</q-td>
                                <q-td key="descripcion">{{props.row.descripcion_producto}}</q-td>
                                <q-td key="precio">Q{{props.row.precio_producto}}</q-td>
                                <q-td key="subcat">{{props.row.subcategoria}}</q-td>
                                <q-td key="cat">{{props.row.categoria}}</q-td>
                                <q-td v-for="opt in atribs" v-bind:key="opt.name">
                                    <q-select v-model="selected" v-bind:label="opt.nombre" :options="opt.opciones.split(',')"/>
                                </q-td>
                            </q-tr>
                        </template>
                    </q-table>
                </div>
            </q-step>

            <q-step
                title="Total"
                :name="3"
                :donde="step>3"
            >
            <div class="q-pa-md">
                <q-card>
                    <q-card-section>
                        <div class="text-h6">Total:</div>
                        <div class="text-h5">Q{{totalVenta}}</div>
                    </q-card-section>
                    <q-card-section>
                        <q-btn label="Confirmar y guardar" @click="saveInvoice"/>
                    </q-card-section>
                </q-card>
            </div>
            </q-step>
            
        </q-stepper>
    </div>
</template>
<script>
export default {
    name: 'NewSale',
    data() {
        return {
            step: 1,
            nit: '',
            cliente: {
                nit: 0,
                nombre: null,
                telefono: 0,
                direccion: null
            },
            columns: [
                {name:'id', label:'Id', align:'left', sortable:true, required:true},
                {name:'nombre', label:'Nombre', align:'left', sortable:true, required:true},
                {name:'descripcion', label:'Descripcion', align:'left', sortable:true, required:true},
                {name:'precio', label:'Precio', align:'left', sortable:true, required:true},
                {name:'subcat', label:'Sub-categoria', align:'left', sortable:true, required:true},
                {name:'cat', label:'Categoria', align:'left', sortable:true, required:true},
            ],
            data: [],
            prodId: '',
            loading: false,
            atribs: [],
            totalVenta: 0,
            selected: ''
        }
    },

    methods: {
        findUser() {
            const post = this.$http.post

            post(
                '/admin/cust/id',
                {
                    nit: this.nit
                }
            ).then(results => {
                this.cliente = results.data[0]
            }).catch(error => {
                console.log(error)
            })
        },

        findProduct() {
            const post = this.$http.post
            post(
                '/product/id',
                {
                    idproducto: this.prodId,
                }
            ).then(results => {
                this.data.push(results.data[0])
                this.findAtrs(results.data[0].id_producto)
            }).catch(error => {
                console.log(error)
            })
        },

        findAtrs(id){
            const post = this.$http.post

            post(
                '/product/atrib/all',
                {
                    id: id
                }
            ).then(results => {
                this.atribs = results.data
            }).catch/(error => {
                console.log(error)
            })
        },
        total(){
            this.step += 1
            var total = 0
            for (var i = 0; i < this.data.length; i++){
                total += this.data[i].precio_producto
            }
            this.totalVenta = total
        },
        saveInvoice() {
            const post = this.$http.post

            var today = new Date()
            var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate()
            var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds()
            var dateTime = date+' '+time

            post(
                '/invoice/add',
                {
                    fecha: dateTime,
                    dateTime: this.cliente.nit,
                    idvendedor: 1
                }
            ).then(results => {
                var numFactu = results.data[0].numfactura
                for(var i = 0; i < this.data.length; i++){
                    post(
                        '/invoice/add/details',
                        {
                            precioProd: this.data[i].precio_producto,
                            numFact: numFactu,
                            idProd: this.data[i].id_producto
                        }
                    ).catch(error => {
                        console.log(error)
                    })
                }
            }).catch(error => {
                console.log(error)
            })
            this.step = 1
            this.nit = ''
            this.cliente = {
                nit: 0,
                nombre: null,
                telefono: 0,
                direccion: null
            }
            this.data = []
            this.prodId = ''
            this.loading = false
            this.atribs = []
            this.totalVenta = 0
            this.selected = ''
        }
        
    }
}
</script>
