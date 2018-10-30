const router = require('express').Router();
const passport = require('passport')


//Login Route
router.get('/login', (req, res) => {
    res.render('login', {user:req.user})
})

//auth with google
router.get('/google', passport.authenticate('google', {
    scope:['profile']
}))

//auth log out
router.get('/logout', (req, res) => {
   //handel with oassport
   req.logout()
   res.redirect('/')
})

//callback route for google to redirect
router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
   // res.send(req.user)
   res.redirect('/profile')
})

module.exports = router;