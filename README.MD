# Features

### User authentication and managing account (UserFlow)

- User can create account with email and password(firstName, lastName).(Create) ✅
- User can login with email and password registered ✅
- Owner can see own user's information.(Read) ✅
- Owner can update own account profile.(Update) ✅
- Owner can change password ✅
- Owner can deactivate own user's account(Delete) ✅

### Managing Cart (CartFlow)

- User can add a product to Cart. (Create) ✅
- User can see a list products in Cart. (Read) ✅
- User can update products in Cart. (Update) ✅
- User can delete products in cart. (Delete) ✅

### Managing Order (OrderFlow)

- Owner can create a order with products (Create) ✅
- Owner can see history order
- Owner can cancel order created (Delete)✅

### Managing products (productFlow)

- User can see list products ✅
- User can find products by name ✅
- User can filter products by catagories ✅
- User can see information of a products by id ✅

# Project setup

1. Generate express boiler plate

```js
npx express-generator --no-view
npm install
touch .gitignore .env
```

2. Install project dependencies

```js
npm i nodemon cors bcryptjs dotenv
npm i jsonwebtoken mongoose
```

3. Add dev script

```js
{
    "scripts":{
        ...
        "dev":"nodemon ./bin/www"
    }
}
```

4. Environment variable config (JSK, MURI) In .env

```js
JWT_SECRET_KEY=someKey
MONGO_DEV_URI=mongodb://localhost:27017/
MONGO_PRO_URI=mongodb_srv://atlas.com/
```

In .gitignore

```js
node_modules.env;
```

### The End
