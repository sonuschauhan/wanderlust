const mongoose=require("mongoose");
const Schema=mongoose.Schema;
const Review=require("./review");

let defaultImageUrl="https://images.unsplash.com/photo-1617079114138-9cf245e006c4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"


const listingSchema =new Schema({
    title:{
        type:String,
        required:true,
    },
    description:String,
    image:{
        filename: {
        type:String,
        default:"listingimage"},
        url:{
        type:String,
        default:defaultImageUrl,
        set:(v)=>v===""?`${defaultImageUrl}`:v,
    }
    },
    price:Number,
    location:String,
    country:String,
    reviews:[
        {
            type:Schema.Types.ObjectId,
            ref:"Review"
        }
    ],
    owner:{
        type:Schema.Types.ObjectId,
        ref:"User"
    }
});

listingSchema.post("findOneAndDelete",async(listing)=>{
    if(listing){
    await Review.deleteMany({_id:{$in:listing.reviews}});
    }
});

const Listing= mongoose.model("Listing",listingSchema);

module.exports=Listing;