<template>
<div class="q-pa-md row items-start q-gutter-md">

    <q-card>
        <q-card-section>
            <div class="text-h6">Genera lista de usuarios aleatorios</div>
        </q-card-section>
        <q-card-section>
            <q-btn label="Comenzar" @click="userGenerator"/>
        </q-card-section>
    </q-card>

    <q-card>
        <q-card-section>
            <div class="text-h6">Genera lista de productos aleatorios</div>
        </q-card-section>
        <q-card-section>
            <q-btn label="Comenzar" @click="productGenerator"/>
        </q-card-section>
    </q-card>
    <q-card>
        <q-card-section>
            <div class="text-h6">Generar Compras aleatorias</div>
        </q-card-section>
        <q-card-section>
            <q-item-label> Seleccione fecha de simulacion</q-item-label>
            <q-date v-model="simulationDate"/>
        </q-card-section>
        <q-card-section>
            <q-input label="Numero de ventas a simular" v-model="limit"/>
        </q-card-section>
        <q-card-section>
            <q-btn label="Generar compras" @click="invoiceGenerator"/>
        </q-card-section>
    </q-card>
</div>
</template>
<script>
const nameList = [
    'Thelma',  
    'Yuriko'  ,
    'Mathew'  ,
    'Lavona'  ,
    'Jamal'  ,
    'Rochell' , 
    'Willia' , 
    'Glen'  ,
    'Jenelle' , 
    'Nelson' , 
    'Katelyn', 
    'Mackenzie' , 
    'Carman' , 
    'Lindsy' , 
    'Sheree' , 
    'Dorinda' , 
    'Jenae' , 
    'Janee' , 
    'Twana' , 
    'Yee' , 
    'Frederic' , 
    'Jaqueline' , 
    'Shelby' , 
    'Trista' , 
    'Daron' , 
    'Nikita' , 
    'Cristi',  
    'Margrett' , 
    'Chanel  '
    ]

const lastname = [
    'Wilkins',
    'Santana',
    'Henderson',
    'Sosa',
    'Price',
    'Church',
    'Branch',
    'Spencer',
    'Sampson',
    'Burton',
    'Baker',
    'Lin',
    'Sheppard',
    'Bray',
    'Haney',
    'Morales',
    'Gilbert',
    'Rosario',
    'Rocha',
    'Copeland'
]
const address = ['Ciudad', 'Mixco', 'Villa Nueva', 'Amatitlan', 'Atitlan', 'Retaulehu']
const phones = ['Cloud Phone',
    'Flair Phone',
    'Ware Phone',
    'Doup Phone',
    'Point Phone',
    'Rediscover Phone',
    'Dona Phone',
    'Picks Phone',
    'Dreamer Phone',
    'Zing Phone',
    'Nirvana Phone',
    'Maniac Phone',
    'Kid Phone',
    'Stake Phone',
    'Mafia Phone',
    'Lung Phone',
    'Ape Phone',
    'Hail Phone',
    'Dream Phone',
    'Botanica Phone',
    'Camelot Phone',
    'Freedom Phone',
    'Rainbow Phone'
    ]


export default {
    name: 'Simulate',
    data() {
        return {
            simulationDate: '',
            limit: 0,
            userList: [],
            productList: []
        }
    },
    mounted() {
        this.$q.loading.show()
        const get = this.$http.get
        get(
                '/admin/cust'
            ).then(results => {
                this.userList = results.data
            }).catch(error => {
                this.$q.notify('Error')
            })

        get(
            '/product'
        ).then(results => {
                this.productList = results.data
        }).catch(error => {
            this.$q.notify('Error')
        })
        this.$q.loading.hide()
    },
    methods: {
        userGenerator() {
            const post = this.$http.post
            var nit = Math.floor(Math.random()) + 1234567
            var telefono = Math.floor(Math.random()) + 24353026
            const userNumber =  Math.floor(Math.random() * (30) ) + 10
            for(var i = 0; i < userNumber; i++){
                 var nameIndex = Math.floor(Math.random() * (nameList.length) ) -1
                 var lastnameIndex = Math.floor(Math.random() * (lastname.length) ) -1
                 var addrIndex = Math.floor(Math.random() * (address.length ) ) -1
                 var nombre = nameList[nameIndex] + ' ' + lastname[lastnameIndex]
                 var direccion = address[addrIndex]
                 nit += 1
                 telefono += 1
                 post(
                     '/admin/cust/add',
                     {
                         nit: nit,
                         nombre: nombre,
                         telefono:telefono,
                         direccion: direccion
                     }
                 ).catch(error => {
                     this.$q.notify('Error')
                 })
             }
            this.$q.notify('Finzalizado')
        },

        productGenerator() {
            this.$q.loading.show()
            const post = this.$http.post
            var productNumber = Math.floor(Math.random() * (30) ) + 10
            for (var i = 0; i < productNumber; i++){
                var nombreIndex = Math.floor(Math.random() * (phones.length ) ) -1
                var nombre = phones[nombreIndex]
                var precio = Math.floor(Math.random() * 1000)
                post(
                    '/product/add',
                    {
                        nombre: nombre,
                        precio: precio,
                        descripcion: 'Telefono',
                        idCat: 1
                    }
                ).then(results => {
                    console.log(results)
                }).catch(error => {
                    console.log
                    this.$q.notify('Error')
                })
            }
            this.$q.loading.hide()
            this.$q.notify('Finalizado')
        },

        invoiceGenerator(){
            this.$q.loading.show()
            const post = this.$http.post
            const date = this.simulationDate
            const limit = this.limit

            for(var y = 0; y < limit; y++){
                var time = Math.floor(Math.random() * 24) + ':' + Math.floor(Math.random() * 60) + ':' + Math.floor(Math.random() * 60)
                var dateTime = date + ' ' + time
                var index = Math.floor(Math.random() * this.userList.length)
                var nit = this.userList[index].nit
                post(
                    '/invoice/add',
                    {
                        fecha: dateTime,
                        nit: nit,
                        idvendedor: 1,
                        idtienda: (Math.floor(Math.random() * 100) + 5)
                    }
                ).then(results => {
                    var purchasedProducts = []
                    for (var x = 0; x < Math.floor(Math.random() * 10); x++){
                        purchasedProducts.push(this.productList[Math.floor(Math.random() * this.productList.length)])
                    }
                    var numFact = results.data[0].numfactura
                    for(var i = 0; i < purchasedProducts.length; i++){
                        post(
                            '/invoice/add/details',
                            {
                                precioProd: purchasedProducts[i].precio_producto,
                                numFact: numFact,
                                idProd:purchasedProducts[i].id_producto
                            }
                        ).catch(error => {
                            console.log(error)
                            this.$q.notify('Error')
                        })
                    }
                }).catch(error => {
                    this.$q.notify('Error')
                    console.log(error)
                })
            }
            this.$q.loading.hide()
            this.$q.notify('Finalizado')
        }
    }
}
</script>
