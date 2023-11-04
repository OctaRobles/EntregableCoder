import mongoose from 'mongoose';

const URI = 'mongodb+srv://morgadonazareno:vjUsUjQwwh4R2lSj@entregables.6ebvcie.mongodb.net/entregables?retryWrites=true&w=majority&appName=AtlasApp';

mongoose.connect(URI)
    .then(() => console.log("DB Conectada..."))
    .catch((error) => console.log(error));