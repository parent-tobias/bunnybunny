module.exports = function(config, mongoose, nodemailer){
  let crypto = require('crypto'),
      AccountSchema = new mongoose.Schema({
        email:      { type: String, unique: true },
        password:   { type: String },
        name: {
          first:    { type: String },
          last:     { type: String }
        },
        birthday: {
          day:      { type: Number, min: 1, max: 31, required: false },
          month:    { type: Number, min: 1, max: 12, required: false },
          year:     { type: Number }
        },
        photoUrl:   { type: String },
        about:      { type: String }
      }),
      Account = mongoose.model('Account', AccountSchema),
      
      registerCallback = function(err){
        if(err){
          return console.error(err.stack);
        }
        return console.info("Account was created.");
      },
      
      changePassword = function(accountId, newPassword){
        let shaSum = crypto.createHash('sha256');
        shaSum.update(newPassword);
        let hashedPassword = shaSum.digest('hex');
        Account.update({_id: accountId}, {$set: {password: hashedPassword}}, {upsert: false},
                      function changePasswordCallback(err){
                       if(err){
                         console.error(err.stack);  
                       }
                       console.log('Change password done for account '+accountId);
        });
      },
      
      forgotPassword = function(email, resetPasswordUrl, callback){
        let user = Account.findOne({email: email}, function findAccount(err, doc){
          if(err){
            // Email addy is not valid
            callback(false);
          } else {
            var smtpTransport = nodemailer.createTransport('SMTP', config.mail);
            resetPasswordUrl += '?account='+doc._id;
            // LEFT OFF HERE -- page 54, Building Node Applications
          }
        })
      }
}