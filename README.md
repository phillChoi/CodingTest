# CodingTest
 Project made by Phillip Choi for TeleResult Technical Test. Program has been created for use in Node.js.

## Requirements
**Node.js** needs to be installed on device to run the program. Download can be found [here](https://nodejs.org/en/).

## Installation
### Instructions for MacOS
1. Download and unzip or clone the project at: https://github.com/phillChoi/CodingTest
2. Find the location path of the project on your computer. You can do this by locating the folder of the project, **right-click the folder**, **hold** the **option** key then **left-click** the option that says **"Copy "CodingTest" as Pathname**.
3. Open the **Terminal** application and type: `cd ` then press **⌘ + V**  or **right-click** and **paste**. The result should look something like this:

>$ cd /Users/Phillip/Desktop/GithubRepos/CodingTest
4. Press the **return** key. This should now have the project directory opened in **Terminal**.
5. Type `npm install` then press the **return** key and it will download the dependencies for the project.
6. You are now ready to run the project.
## Getting Started
### Starting the program
Having installed the project and still having the the directory opened in **Terminal** (refer to steps 2-4 in Installation), you can start the project by typing `node index.js` into the **Terminal** and pressing **return**.
You will receive a prompt in the **Terminal** saying: `server started`.
Navigate to the webpage by typing into your web browser: `localhost:8000` then pressing the **return** or **enter** key on your keyboard.
You will now see a basic webpage with a Post Form displayed. 
 
 ![image](https://user-images.githubusercontent.com/60904690/137745846-a373e106-5831-44b6-a742-dac0db550899.png)

### Post Form
When the user fills in the form and submits it, it will navigate the user to `/orders` and show the user the details of the order. When an order is posted, the program will also create a `orders.json` file inside the  `output` folder of the project if `orders.json` does not exist. The user can enter multiple orders by going back to the homepage and submitting another order. Each time an order is added, `orders.json` will update with the new order to simulate a database.

### Get order based off ID
The user can get the information for a specfic order ID by entering into the address bar `localhost:8000/orders/{id}`. An example of this is `localhost:8000/orders/2`. If you have forgotten about the details of the orders created, you can open `orders.json` located in the `output` folder of the project. It will return the query on the webpage and also in **Terminal**.

### Get order based off type and date
Similarly to the previous GET, type into the address bar the type and date of the order `localhost:8000/{type}/{date}`. The date is formatted as `YYYYMMDD`. An example of this is `localhost:8000/GalaxyS20/20211019`. This will count all orders for the GalaxyS20 on 19-10-2021, list the order id's and each unique customer. It will return the query on the webpage and also in **Terminal**.

## Technologies
* Javascript
* HTML
	### Dependencies 
	* [Express](https://www.npmjs.com/package/express) - Backend framework
	* [fs](https://nodejs.org/api/fs.html) - Node's inbuilt file system
	* [nodemon](https://www.npmjs.com/package/nodemon) - Restarts application when changes have been made. For developer purposes.
