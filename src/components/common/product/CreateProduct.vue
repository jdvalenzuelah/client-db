<template>
    <div>
        <q-btn label="Agregar nuevo producto" @click="show = true"/>
        <q-dialog v-model="show">
            <q-card style="min-width: 800px">
                <q-card-section>
                    <div class="text-h6">Agregar producto</div>
                </q-card-section>

                <q-card-section>
                    <q-form @sumbit="handleSubmit">
                        <q-input
                            label="Nombre"
                            :rules="[val => val !== null && val !== '' || 'Por favor ingrese nombre de producto.']"
                            v-model="nombre"
                        />
                        <q-input
                            label="Descripcion"
                            :rules="[val => val !== null && val !== '' || 'Por favor ingrese descripcion de producto.']"
                            v-model="descripcion"
                            type="textarea"
                        />
                        <q-input
                            label="Precio"
                            :rules="[val => val !== null && val !== '' || 'Por favor ingrese precio de producto.']"
                            v-model="precio"
                            type="number"
                        />
                        <q-select
                            label="Categoria"
                            :options="categorias"
                            v-model="categoria"
                            :display-value="categoria ? categoria.tipocategoria : ''"
                            @input="fetchSubCategory"
                        >
                            <template v-slot:option="scope">
                                <q-item
                                    v-bind="scope.itemProps"
                                    v-on="scope.itemEvents"
                                >
                                    <q-item-section>
                                        <q-item-label v-html="scope.opt.tipocategoria" />
                                    </q-item-section>
                                </q-item>
                            </template>
                        </q-select>

                        <q-select
                            label="Sub Categoria"
                            :options="subcategorias"
                            v-model="subcategoria"
                            :display-value="subcategoria ? subcategoria.tiposubcategoria : ''"
                            :loading="loading"
                        >
                            <template v-slot:option="scope">
                                <q-item
                                    v-bind="scope.itemProps"
                                    v-on="scope.itemEvents"
                                >
                                    <q-item-section>
                                        <q-item-label v-html="scope.opt.tiposubcategoria" />
                                    </q-item-section>
                                </q-item>
                            </template>
                        </q-select>
                        <div class="q-pa-md">
                            <q-card flat bordered>
                                <div ref="attributes" class="q-pa-sm">
                                    <div class="text-subtitle2 q-pa-sm">Atributos</div>
                                    <atribute v-model="atributo"/>
                                </div>
                                <div class="absolute-bottom-right q-pa-sm">
                                    <q-btn round color="secondary" icon="add" @click="newAttribute"/>
                                </div>
                            </q-card>
                        </div>
                        <div class="q-pa-sm flex flex-center">
                            <q-btn label="Guardar" @click="handleSubmit"/>
                        </div>
                    </q-form>
                </q-card-section>
            </q-card>
        </q-dialog>
    </div>
</template>
<script>
import Vue from 'vue'
import Atribute from './Atribute'

export default {
    name: 'CreateProduct',
    components: {
        Atribute
    },
    data() {
        return {
            show: false,
            nombre: "",
            descripcion: "",
            precio: 0,
            categorias: [],
            categoria: null,
            subcategorias: [],
            subcategoria: null,
            loading: false,
            atributo: null,
            atributos: [],
        }
    },
    mounted(){
        this.fetchCategory()
    },
    methods: {
        fetchCategory(){
            const get = this.$http.get

            get(
                '/category'
            ).then(response => {
                this.categorias = response.data
            }).catch(error => {
                console.log('error')
            })
        },

        fetchSubCategory() {
            this.loading = true
            const post = this.$http.post

            post(
                '/category/sub/id',
                {
                    id: this.categoria.idcategoria
                }
            ).then(response => {
                this.subcategorias = response.data
                this.loading = false
            }).catch(error => {
                console.log(error)
            })
        },

        newAttribute() {
            var attClass = Vue.extend(Atribute)
            var instance = new attClass({
                propsData: {type: 'primary'}
            })
            instance.$mount()
            this.atributos.push(this.atributo)
            this.$refs.attributes.appendChild(instance.$el)
        },

        handleSubmit() {
            const post = this.$http

            post(
                '/product/add',
                {
                    nombre: this.nombre,
                    precio: this.precio,
                    descripcion: this.descripcion,
                    idCat: this.subcategoria.idsubcategoria
                }
            ).then(results => {
                console.log(results)
            }).catch(error => {
                console.log(error)
            })
        }
    }
}
</script>
