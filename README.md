# codebase_backend
codebase_backend

# Description
In the back end, there are two APIs: "/shortUrl" and "/redirect". The "/shortUrl" API takes the long URL, generates a shortened URL, and saves both URLs in the MongoDB database. The "/redirect" API takes the shortened URL from the request and fetches the corresponding long URL from the database. Finally, it redirects the user to the long URL.
