# forumFullStack
# proyecto_fullstack

Front end : 

Vite 
Tailwind 
font awesome ( https://fontawesome.com/)  , svg icon  (https://www.svgrepo.com/) 
React hook forms ( https://react-hook-form.com/) para el registro de usuario, foro y  post de foro 
cloudinary  o AWS S3 bucket 
Vercel	- 
socketIO - chat en tiempo real 


Category de foros : 

Tech	
Games 
Estilo de vida 
Memes 



Design  : 



 
Back end : 

Node --- instalado
Express --- instalado
MongoDB
Mongoose --- instalado
nodemon ( dev) --- instalado
Env --- instalado
Render -- pendiente
socketIO - chat en tiempo real --- pendiente



Esquema 

Collection  (Foros)   - > sub colección  foro - >   ( post ) 
Comentarios	- >  ref usuario - > req foro 
Users - > nombre,correo, password, comentario de colección comentarios , ref a id amigos 
Amigos - user name -  id amigo 
Chats 


Rutas 

Home / populares 
Home/nombre de foro 
Home/nombre de foro/post id 




Proyecto2:
- App creadora de foros (reddit)
- Los usuarios registrados pueden crear foros
- Los usuarios registrados pueden hacer comentarios o publicaciones en los foros
- Se pueden subir imágenes en las publicaciones
- Likes en publicaciones
- Chat en tiempo real con los miembros conectados del foro ( multer	) 
Recursos: 
- https://socket.io/how-to/use-with-react
- https://www.npmjs.com/package/multer
- https://www.npmjs.com/package/multer-storage-cloudinary
- https://cloudinary.com/
- https://docs.aws.amazon.com/es_es/sdk-for-javascript/v2/developer-guide/s3-example-creating-buckets.html

Recomendaciones: 
- usar multer para aceptar img o archivos para las publicaciones
- pensar muy bien la forma en la que guardan los likes
- para el chat en tiempo real usar socket.io
- para separar el chat por foro usar rooms de socker.io
