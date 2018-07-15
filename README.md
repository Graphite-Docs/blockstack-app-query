## Blockstack App Query
This is a React-based, client-side script to check the number of users who have at least logged into any Blockstack app.

This script will output results in the console, but it will also update the UI with the count. Criteria for a user of a Blockstack app is simple: They must have a Blockstack ID/Username and they must have logged into the app in question.

This script does not provide any personally identifying information. This script also does not provide any additional analytics outside of count of users who have logged into a given app. This script does not save the results, so you will want to either write it down or save it some other way.

### Quick Start  
Clone the repository:  
`git clone https://github.com/Graphite-Docs/blockstack-app-query.git`

CD into the app directory:  
`cd blockstack-app-query`

Install dependencies:  
`npm install`  

Launch it:  
`npm run start`   

App will be running on http://localhost:8080. Once running, all you have to do is enter your full app origin domain (ex: https://app.domain.com) and click Start Query.    

**Note: This script takes a LONG time to run. If you lose internet connection, close the window, or turn off your computer, the script will stop and you will need to start again.**
