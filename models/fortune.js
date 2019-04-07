let fortuneSchema = new mongoose.Schema({
  text: String
});

let Fortune = mongoose.model('Fortune', fortuneSchema);

export default Fortune;