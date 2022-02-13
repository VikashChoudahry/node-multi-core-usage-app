A sample app to validate the multiple CPU cores usage for a node.js app

# Steps to start the node.js app
1. Clone the repo
2. Run `npm install`
3. Run `npm start`

# Postman collection
Import the shared collection (Learning.postman_collection.json). It contains the following endpoints:

1. `match-operations`
2. `reports`

**Note:**
- `reports` controller contains two changes:
  - Block #1 - To block the process execution. This is the quickest way I found to test the multiple CPU core usage using `cluster` module.
  - Block #2 - To return a simple response as a text/csv response.