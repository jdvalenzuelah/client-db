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
                        :data="data"
                        :loading="loading"
                    >
                        <template v-slot:top="props">
                            <table>
                                <tr>
                                    <td class="q-pa-sm" style="min-width: 300px;">
                                        <q-input label="Ingresar ID de producto"/>
                                    </td>
                                    <td class="q-pa-sm">
                                        <q-btn label="Agregar"/>
                                    </td>
                                    <td class="absolute-right" align="right">
                                        <q-stepper-navigation class="q-pa-sm">
                                            <q-btn @click="step += 1" label="Proceder a total" v-if="data.length>1"/>
                                        </q-stepper-navigation>
                                    </td>
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
                    </q-card-section>
                    <q-card-section>
                        <q-btn label="Confirmar y guardar"/>
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
            ],
            data: [],
            loading: false
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

            console.log(this.cliente)
        }
    }
}
</script>
