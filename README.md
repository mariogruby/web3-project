# web3-project
## backend

### model user
* email
* password
* username
* cart !!!
* user role 
* user image 
* phone number 
* verified ???
- FALTAN MAS //

### model track (admin)
* track name 
* track description
* track price
* track category
* track images
* track ratings reviews (array)
* track status 
* track url(mp3 cloudinary tipo string y unico)
* track author (user id del productor -> admin por el momento)
* track bmp
* track cover ? // pendiente de definir 

### cart model (el modelo de carrito lo incluimos dentro del modelo de user para evitar tocar las auth.routes)(client)
* trackId 
* track name 
* track price

### modelo de tracks comprados(nombre por definir)
* alltracks(array con object id )
* user (object id con el usuario que compro el track)
* amount (precio pagado por los tracks)
* transactionID (conectar al sistema web3.0 de solana y otros metodos, tipo string)
* phone number del usuario 

### customize model(admin)
* por definir .............

### modelo de categories 
* categories name 
* categoreis descrption 
* categories image ?
* categories status 

## rutas backend
* auth routes
* user routes (admin and client)
* track routes 
* categories routes
* admin routes 
* payments routes (solana payments->confirmado, braintree o stripe)



