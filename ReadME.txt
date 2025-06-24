First import data from WebDevDB.sql into my SQL workbench
Then in web dev folder, navigate to api/connect.js and change user, password to your user password in MySQL
Third, in order to activate web services and admin app, open 2 terminal
	one terminal CLI argument is:
		cd api
		npm start
	another one is:
		cd client
		npm run dev
Finally, if you want to run the admin side app, remember to finish the above step and run gradle task "run" to run the app