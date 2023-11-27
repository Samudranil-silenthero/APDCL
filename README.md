# APDCL(Assam Power Distribution Company Limited)
<ul>
  <li>People having smart meter (powered by apdcl) can check their remaining balance through this app.
  <li>Can add upto 10 favourites smart meter number for viewing the balance easily. 
  <li>Can see the last 5 transactions/recharge done. 
  <li>Can download the monthly bill by selecting month and year. 
  <li>Login, Signup, Forget password features are there.
  <li>Jwt is used for additional security. 
  <li>MongoDB is used as database. Front end is made using ReactJS and CSS. Backend is made using NodeJS and expressJS.
</ul>

<h3>The different pages available are:</h3>
<li>Signup Page: https://github.com/Samudranil-silenthero/APDCL/assets/64492700/ceb23832-d978-4839-8314-3ac0ac1b5264
<br><br>
<img src="https://github.com/Samudranil-silenthero/APDCL/assets/64492700/ceb23832-d978-4839-8314-3ac0ac1b5264" width="600" height="300"><br><br>
<li>Login Page: https://github.com/Samudranil-silenthero/APDCL/assets/64492700/64f5b032-e401-420c-83a1-b71b1490c96b <br><br>
<img src="https://github.com/Samudranil-silenthero/APDCL/assets/64492700/64f5b032-e401-420c-83a1-b71b1490c96b" width="600" height="300"><br><br><br>
<li>Reset/Forget Password Page: https://github.com/Samudranil-silenthero/APDCL/assets/64492700/a14b9303-bc71-4557-96e5-3b0a003bac5b
 <br><br>
<img src="https://github.com/Samudranil-silenthero/APDCL/assets/64492700/7f558c19-4252-4160-b3fc-8a09b163eb12" width="600" height="300"><br><br><br>
<li>Favorite Page: https://github.com/Samudranil-silenthero/APDCL/assets/64492700/7d569c4e-696a-46c1-8ae7-e91485e86c49
<br><br>
<img src="https://github.com/Samudranil-silenthero/APDCL/assets/64492700/7d569c4e-696a-46c1-8ae7-e91485e86c49" width="600" height="300"><br><br><br>
<li>View Balance Section: https://github.com/Samudranil-silenthero/APDCL/assets/64492700/b9e0189a-74c4-4ed8-9e85-e2d3f5291f0a
<br><br>
<img src="https://github.com/Samudranil-silenthero/APDCL/assets/64492700/b9e0189a-74c4-4ed8-9e85-e2d3f5291f0a" width="600" height="300"><br><br><br>
<li>Last 5 recharges: https://github.com/Samudranil-silenthero/APDCL/assets/64492700/120e89e7-f323-40fd-8833-95b71445d3df 
<br><br>
<img src="https://github.com/Samudranil-silenthero/APDCL/assets/64492700/120e89e7-f323-40fd-8833-95b71445d3df" width="600" height="300"><br><br><br>
<li>Download the monthly bill by selecting month and year:https://github.com/Samudranil-silenthero/APDCL/assets/64492700/12638d60-b7bd-4b00-b291-25e5c50a07fe 
<br><br>
<img src="https://github.com/Samudranil-silenthero/APDCL/assets/64492700/12638d60-b7bd-4b00-b291-25e5c50a07fe" width="600" height="300"><br><br><br>
  
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
