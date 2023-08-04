const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/fsm-db?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false');

 
const Cat = mongoose.model('Cat', { name: String });

const kitty = new Cat({ name: 'Billy Mausi' });
kitty.save().then(() => console.log('meow'));

