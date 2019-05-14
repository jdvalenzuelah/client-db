<template>
    <div class="atributte q-pa-md">
        <q-input
            label="Nombre atributo"
            v-model="nombre"
            @input="formModel"
        />
        <q-select
            label="Opciones"
            v-model="modelAddUnique"
            use-input
            use-chips
            multiple
            hide-dropdown-icon
            input-debounce="0"
            new-value-mode="add-unique"
            @input="formModel"
        />
        <q-checkbox
            left-label
            v-model="unique"
            label="Unico"
            @input="formModel"
        />
    </div>
</template>

<script>
export default {
    name: 'Atribute',
    data(){
        return {
            nombre: "",
            modelAddUnique: null,
            unique: false,
            jsonModel: {
                name: "",
                options: [],
                unique: false
            }
        }
    },
    methods: {
        formModel() {
            this.jsonModel.name = this.nombre
            this.jsonModel.options = this.modelAddUnique
            this.jsonModel.unique = this.unique
            this.$emit('input', this.jsonModel)
        }
    }
}
</script>
