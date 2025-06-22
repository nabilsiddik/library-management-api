import { model, Schema } from 'mongoose';
import { Iborrow } from '../interfaces/borrow.interface';

const borrowSchema = new Schema<Iborrow>({
    book: {
        type: Schema.Types.ObjectId,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    dueDate: {
        type: Date,
        required: true
    }
}, {
    timestamps: true,
    versionKey: false
});

borrowSchema.pre('save', function(){
    console.log('Middle ware worked before saving the borrow');
});
borrowSchema.post('save', function(doc){
    console.log('Middle ware worked after saving the borrow and doc is: ', doc );
});
const Borrow = model('borrow', borrowSchema);
export default Borrow;