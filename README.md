

Anyone, even without an account will be able to browse - you will be gated by having to click a button that says continue as guest vs login
as a user we will be able to see different colleges and the posts made to the college in which another user is selling an item

landing page with info on project and a login/create new user section /home
  a brief description of what the app does with some image

    logging in - (user_name) + (password) - submit button
    on submit - query the database and find_by(user_name)where(password == password)?

    def login(user_name, password) test user - kota - password = 12345
     first check the username exists // if username spelled wrong return "no such user exists, please check spelling and try again"
     check the users table and find_by(name) to return user_name if exists

     then if username does exist, check the password entered == user_name.password // if password does not match user_name.password return "incorrect password"

      if user_name = find_by(user_name)where(user_name == user_name)
    end

  from the backend there will be a landing page endpoint and once a user logs in that will take them to a new endpoint specific to that users id 
  /home/:id
  if you create a new account, this will also take you to a new landing page for the new created id /home/:id

once logged in you will be able to see a list of your posts, as well as your digital wallet for monies earned by selling / buying stuff.
you will be able to browse posts on different colleges and make a new post that is selling an item or click on an existing post to see its information
and from that post choose if you would like to purchase the item.  if the item is purchased it will change ownership from current owner to you via changing the posts user_id and subtracting the monies from your digital wallet.  we will prevent people from being able to buy items from posts if they do not have enough money in thier wallet.  we will add a feature to add money to your digital wallet.  everyone will be initailized with money for the purpose of this demo so when you make an account you have the ability to purchase an item and see the transaction happen.

extra deliverable - upload an image from your own computer inside the craete new post form