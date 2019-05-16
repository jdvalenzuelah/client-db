<template>
<div>
    <q-btn @click="userGenerator"/>
    <q-date/>
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
export default {
    name: 'Simulate',
    
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
                 ).then(() => {
                     console.log('Added')
                 }).catch(error => {
                     console.log('Error')
                 })
             }
        }
    }
}
</script>
