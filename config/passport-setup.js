const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20')
const keys = require('./keys')
const User = require('../models/user-model')

passport.serializeUser((user, done) => {
    done(null, user.id);
})

passport.deserializeUser((id, done) => {
    User.findById(id)
    .then((user) =>{
        done(null, user);
    })
    
})



passport.use(
        new GoogleStrategy({
            //options for strategy
            callbackURL: '/auth/google/redirect',
            clientID: keys.google.clientID,
            clientSecret:keys.google.clientSecret
        }, (accessToken, refreshToken , profile, done) => {
            // check if user exists in the db

            User.findOne({
                googleid: profile.id
            }).then((curentUser)=>{
                if(curentUser){
                    // alredy has user
                    console.log('user is ',  curentUser)
                    done(null, curentUser)
                } else {
                    //if not create user in our db
                    new User({
                        username: profile.displayName,
                        googleid: profile.id,
                        thumbnail:profile._json.image.url
                    }).save()
                    .then((newUser) => {
                        console.log('new user created')
                        done(null, newUser)
                    })
                }

            })
            
           
        })

)