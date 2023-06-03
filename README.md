# APDCL(Assam Power Distribution Company Limited)
<ul>
  <li>People having smart meter (powered by apdcl) can check their remaining balance through this app.
  <li>Can add upto 10 favourites smart meter number for viewing the balance easily. 
  <li>Login, Signup, Forget password features are there.
  <li>Jwt is used for additional security. 
  <li>MongoDB is used as database. Front end is made using ReactJS and CSS. Backend is made using NodeJS and expressJS.
</ul>

<h3>The different pages available are:</h3>
<li>Signup Page: https://github.com/Samudranil-silenthero/APDCL/assets/64492700/96c69134-b6d7-44a1-95c6-4d7d09ab0a56<br><br>
<img src="https://github.com/Samudranil-silenthero/APDCL/assets/64492700/0ca1a8f4-6b6c-40df-a744-b99f614e3b2d" width="600" height="300"><br><br>
<li>Login Page: https://github.com/Samudranil-silenthero/APDCL/assets/64492700/bc6b4b4f-f2c4-4c23-b68e-692aec1db0df<br><br>
<img src="https://github.com/Samudranil-silenthero/APDCL/assets/64492700/bc6b4b4f-f2c4-4c23-b68e-692aec1db0df" width="600" height="300"><br><br><br>
<li>Reset/Forget Password Page: https://github.com/Samudranil-silenthero/APDCL/assets/64492700/8e34660e-5f9e-45ed-be52-f14126941218<br><br>
<img src="https://github.com/Samudranil-silenthero/APDCL/assets/64492700/8e34660e-5f9e-45ed-be52-f14126941218" width="600" height="300"><br><br><br>
<li>Favorite Page: https://github.com/Samudranil-silenthero/APDCL/assets/64492700/c27d2209-3b0f-47ba-8a30-b47ec2362039<br><br>
<img src="https://github.com/Samudranil-silenthero/APDCL/assets/64492700/c27d2209-3b0f-47ba-8a30-b47ec2362039" width="600" height="300"><br><br><br>
<li>View Balance Section: https://github.com/Samudranil-silenthero/APDCL/assets/64492700/c5167d3b-ff75-4ba8-bca9-4887371c4c72<br><br>
<img src="https://github.com/Samudranil-silenthero/APDCL/assets/64492700/c5167d3b-ff75-4ba8-bca9-4887371c4c72" width="600" height="300"><br><br><br>
  
<h3>How to run it?</h3>

## You need the following installations:
- MongoDB
- Node
- npm

Note that client (my-app) and server (api) needs to run concurrently in different terminal session so that they can communicate with each other.
     
## Client-side (PORT: 3000)
     
```terminal
$ cd my-app
$ npm i   
$ npm start
     
```
## Server-side (PORT: 5000)

### Configure your .env file

Configure MONGO_URL, PORT=5000, USER_MAIL (mail from where admin will be sending OTPs), MAILPSWD and JWT_KEY. MAILPSWD is to be genrated. Follow this link (https://www.getmailbird.com/gmail-app-password/)

```terminal
$ cd api 
$ npm i    
$ npm run 
```
