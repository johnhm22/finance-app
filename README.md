## Finance App

##  Purpose  
The app was built partly as a training exercise, partly as a demonstration to potential employers of what I can do and partly to allow a family member to record his shareholdings rather than relying on the traditional pen and paper.

Next.js 13 had come out recently and I was keen to use this, make lots of mistakes, get confused and so learn. Also, I had not used Tailwind to any great degree so this was a great opportunity to do so. In addition, having recently worked on a team building an app that took a thoroughly professional approach in terms of code structure and user verification I was keen to replicate it.

## What does the app do? 
The core functionality allows a user to add into a table shares they own, inserting purchase price, and quantity. The app will then retrieve the closing price from the previous trading day (end-of-day) and display the value of each shareholding. A summary table shows the total value and cost and the overall profit/loss.

To use the above, the user needs to create an account; just a simple username, first and last name, and password. For some wanting to have the price of an invdividual share, and avoid account creation, there is a soon-to-be-released 'quick quote' feature where the user searches for the company stock and a price is displayed.  

Below are a few screen shots of the key pages:  

Welcome page
![image](https://github.com/johnhm22/finance-app/assets/71333679/0acaf27d-f63d-4d05-b303-76e150d0d43c)

Create account
![image](https://github.com/johnhm22/finance-app/assets/71333679/e8de222e-f019-4b7d-8bd6-e044248867a8)

Share portfolio
![image](https://github.com/johnhm22/finance-app/assets/71333679/22e3670c-029a-4867-b961-f1ab8879d06a)


## Tech Framework
The key elements are:  
* Next.js v13
* Tailwind
* TypeScript/JavaScript
* Prisma ORM
* PostgreSQL

The app has been deployed on Vercel which owns Next.js.
The database is also provided by Vercel and works well with Prisma. [Click here for details](https://vercel.com/docs/storage/vercel-postgres)

Two external apis are used. One is from [marketstack](https://marketstack.com/) where the stock data is obtained. The other is from [ExchangeRateApi](https://www.exchangerate-api.com/) for the currency rates displayed on the welcome page. One drawback with marketstack is that, on its free package, it doesn't allow calls from http only https. Thus working from your local machine poses a problem.

It was hard to find a suitable api for shares. There are many available, but each seemed to have something missing. Finally, I settled with marketstack as a compromise. However, due to the way it presents its data, I had to restrict the portfolio table to the London Stock Exchange. It does not provide the currency symbol or currency reference in either share or stock exchange data. Therefore, if a user has shares from different exchanges there is no simple way of separating these out into their relevant currencies.

## Installation
This shouldn't be too complicated.
* Clone the repository on to your local machine.    
* Run npm install to install all necessary packages  
* Create an account with the api providers (note comments about marketstack above)  
* Create a .env file (or .env.local which Next.js uses) and add in your personal data. An example .env file is provided in the repository so you know which variables are required  
* Generate an access token secret for the json web token as shown below  
* Install PostgreSQL locally or find a suitable remote alternative (see below)
* Check the Prisma docs for migrating the Prisma schema to your PostgreSQL database. I used the command 'npx prisma migrate dev' and then added the name of the migration when prompted.
* Once all completed, run 'npm run dev' in the terminal and navigate to 'localhost:3000'  

### Creating the access token secret
This was done quite simply by using the node crypto package. The command is shown below
![image](https://github.com/johnhm22/finance-app/assets/71333679/d903d9ee-cc32-432e-a440-01fa105be606)

## Setting up a PostgreSQL database
In the past, I have used [elephantsql](https://www.elephantsql.com/) as a remote PostgreSQL database and found it straight forward and easy to use.  
Unfortunately, when using Prisma during development, a shadow database needs to be defined and elephant don't offer this on their free packages. As a result, I used a locally installed 
PostgreSQL database. This wasn't difficult as I was used to working with a local database it was just a bit annoying.

## Next.js 13
- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

## [Prisma ORM](https://www.prisma.io/)
I like it. Quite easy to use and clear docs.  
Click on the title to be taken to their webpage.


## Problems
As mentioned above, I was disappointed not to be able to use elephantsql, but a local db worked out fine.  

Deploying to Vercel, a seamless process I had understood, was frustrating. Vercel offers their Edge Network which "enables you to store content and run compute in regions close to your customers or your data, reducing latency and improving end-user performance". However, with Edge, you cannot use Node.js apis in Edge functions.  

I only found this out when confronted with errors during the build process. This meant re-writing some of the code.  
The two main victims of this were the debounce function from lodash and the jsonwebtoken package which had a dependency on lodash. To overcome these problems I ended up using the packages 'debounce-promise' and 'jose' respectively.

## Where next?
I'd like to find a workaround to the currency issue of displaying shares from exchanges in different countries. Then expand to the portfolio to include other investments such as gilts, bonds and trusts. Presenting further data (historical, financial results, broker predictions) for each investment also sounds fun  

Of course, I also need to add a full suite of tests.

## Credits
The "look and feel" design was inpsired by [Intereactive Investor](https://www.ii.co.uk/)

