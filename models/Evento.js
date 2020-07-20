

const{Schema,model} =require('mongoose');

const EventoSchema = Schema({
    title:{
        type:String,
        required:true
    },
    notes:{
        type:String
    },
    start:{
        type:Date,
        required:true
    },
    end:{
        type:Date,
        required:true
    },
    user:{
        type:Schema.Types.ObjectId,
        ref:'Usuario',
        required:true
    }

});

//para serializar caundo se llama de labas de datos

EventoSchema.method('toJSON',function(){

    const {__v,_id,...object}=this.toObject(); //para extare _v, id_ y todo lo demas
    object.id=_id;
    return object; //solo paara ostar los datos la base de  datos sigue igual



});


module.exports=model('Evento',EventoSchema);