import React from 'react'
import Parse from 'parse'
import StatementCard from './statementCard.jsx'
import { useState } from 'react'
import NameDate from './NameDate.jsx'


const Dashboard = () => {
    // Your Parse initialization configuration goes here
    const PARSE_APPLICATION_ID = 'topZ6KC1SfsK0vTE0ZlCPjdUxKBrYiPDaOQA7hfJ';
    const PARSE_HOST_URL = 'https://parseapi.back4app.com/';
    const PARSE_JAVASCRIPT_KEY = '8zZbgRtcQifYJvYkIwpVFNsFgNGEdsx6yor1XuJb';
    Parse.initialize(PARSE_APPLICATION_ID, PARSE_JAVASCRIPT_KEY);
    Parse.serverURL = PARSE_HOST_URL;

    const [myName, setName] = useState('')
    const [myRent, setRent] = useState(0)
    const [mySavings, setSavings] = useState(0)
    const [myGas, setGas] = useState(0)
    const [myEntertainment, setEntertainment] = useState(0)

    const [myTotal, setTotal] = useState(0)

    async function getBag() {
        getUser()
        const BlueBag = Parse.Object.extend('BlueBag');
        const query = new Parse.Query(BlueBag);
        // You can also query by using a parameter of an object
        // query.equalTo('objectId', 'xKue915KBG');
        try {
            const results = await query.find();
            for (const object of results) {
                // Access the Parse Object attributes using the .GET method

                const username = object.get('username')
                const RentTemp = object.get('Rent')
                const SavingsTemp = object.get('Savings')
                const GasTemp = object.get('Gas')
                const EntTemp = object.get('Entertainment')

                setName(username)
                setGas(parseInt(GasTemp))
                setRent(RentTemp)
                setSavings(SavingsTemp)
                setEntertainment(EntTemp)
                setTotal(myGas + myRent + mySavings + myEntertainment)
                console.log(myTotal)
            }
        } catch (error) {
            console.error('Error while fetching BlueBag', error);
        }
    }

    async function getUser() {
        try {
            let user = await Parse.User.logIn('Mitchell', 'password');
            const currentUser = Parse.User.current();
            console.log('Current logged in user', currentUser['username']);
        } catch (error) {
            console.error('Error while logging in user', error);
        }
    }

    async function updateBag(selection, add) {
        // let value;
        const BlueBag = Parse.Object.extend('BlueBag');
        const query = new Parse.Query(BlueBag);

        try {
            // here you put the objectId that you want to update
            const object = await query.get('NM0vaIXEF8');
            if (add) {
                if (selection === "Savings") {
                    let value = parseInt(document.getElementById("savings").value);
                    let newVal = value + mySavings
                    object.set('Savings', newVal);
                    setSavings(newVal)
                } else if (selection === "Rent") {
                    let value = parseInt(document.getElementById("rent").value);
                    let newVal = value + myRent
                    object.set('Rent', newVal);
                    setRent(newVal)
                } else if (selection === "Gas") {
                    let value = parseInt(document.getElementById("gas").value);
                    let newVal = value + myGas
                    object.set('Gas', newVal);
                    setGas(newVal)
                } else if (selection === "Entertainment") {
                    let value = parseInt(document.getElementById("entertainment").value);
                    let newVal = value + myEntertainment
                    object.set('Entertainment', newVal);
                    setEntertainment(newVal)
                }
            } else {
                console.log('subtracting')
                if (selection === "Savings") {
                    let value = parseInt(document.getElementById("sub-savings").value);
                    if (value) {
                        let newVal = mySavings - value
                        object.set('Savings', newVal);
                        setSavings(newVal)
                    }

                } else if (selection === "Rent") {
                    let value = parseInt(document.getElementById("sub-rent").value);
                    if (value) {
                        let newVal = myRent - value
                        object.set('Rent', newVal);
                        setRent(newVal)
                    }

                } else if (selection === "Gas") {
                    let value = parseInt(document.getElementById("sub-gas").value);
                    if (value) {
                        let newVal = myGas - value
                        object.set('Gas', newVal);
                        setGas(newVal)
                    }

                } else if (selection === "Entertainment") {
                    let value = parseInt(document.getElementById("sub-entertainment").value);
                    if (value) {
                        let newVal = myEntertainment - value
                        object.set('Entertainment', newVal);
                        setEntertainment(newVal)
                    }
                }


            }


            try {
                const response = await object.save();
                setName(response.get('Username'))
                setGas(response.get('Gas'))
                setRent(response.get('Rent'))
                setSavings(response.get('Savings'))

                console.log('BlueBag updated', response);
            } catch (error) {
                console.error('Error while updating BlueBag', error);
            }
        } catch (error) {
            console.error('Error while retrieving object BlueBag', error);
        }

        updateTotal()
    }

    async function updateTotal() {
        setTotal(myGas + myRent + mySavings + myEntertainment)
    }


    return (
        <div className='mx-8 max-w-6xl'>
            <NameDate name={myName} />
            <div>
                <button onClick={getBag} className='mt-4 px-4 py-2 text-lg rounded bg-blue-500 hover:bg-blue-400 trasition'>Open BlueBag</button>

                <div className="mt-4 grid md:grid-cols-4 sm:grid-cols-2 gap-4 mb-4">
                    <StatementCard title={"Savings"} value={mySavings} total={myTotal} />
                    <StatementCard title={"Rent"} value={myRent} total={myTotal} />
                    <StatementCard title={"Gas"} value={myGas} total={myTotal} />
                    <StatementCard title={"Entertainment"} value={myEntertainment} total={myTotal} />
                </div>

                <div className="mt-4 grid md:grid-cols-2 sm:grid-cols-2 gap-4 mb-4">
                    <div href="#" className="block w-[50%] p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                        <div className='mb-4'>
                            Add funds to savings
                            <input id="savings" className='ml-4 px-2 border border-gray-200 rounded'></input>
                            <button className="ml-4 px-2 bg-blue-500 rounded hover:bg-blue-400 transition" onClick={() => updateBag("Savings", true)}>+</button>
                        </div>
                        <div className='mb-4'>
                            Add funds to rent
                            <input id="rent" className='ml-4 px-2 border border-gray-200 rounded'></input>
                            <button className="ml-4 px-2 bg-blue-500 rounded hover:bg-blue-400 transition" onClick={() => updateBag("Rent", true)}>+</button>
                        </div>
                        <div className='mb-4'>
                            Add funds to gas
                            <input id="gas" className='ml-4 px-2 border border-gray-200 rounded'></input>
                            <button className="ml-4 px-2 bg-blue-500 rounded hover:bg-blue-400 transition" onClick={() => updateBag("Gas", true)}>+</button>
                        </div>
                        <div className='mb-4'>
                            Add funds to entertainment
                            <input id="entertainment" className='ml-4 px-2 border border-gray-200 rounded'></input>
                            <button className="ml-4 px-2 bg-blue-500 rounded hover:bg-blue-400 transition" onClick={() => updateBag("Entertainment", true)}>+</button>
                        </div>
                    </div>

                    <div href="#" className="block w-[50%] p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                        <div className='mb-4'>
                            Remove funds from savings
                            <input id="sub-savings" className='ml-4 px-2 border border-gray-200 rounded'></input>
                            <button className="ml-4 px-2 bg-blue-500 rounded hover:bg-blue-400 transition" onClick={() => updateBag("Savings")}>-</button>
                        </div>
                        <div className='mb-4'>
                            Remove funds from rent
                            <input id="sub-rent" className='ml-4 px-2 border border-gray-200 rounded'></input>
                            <button className="ml-4 px-2 bg-blue-500 rounded hover:bg-blue-400 transition" onClick={() => updateBag("Rent")}>-</button>
                        </div>
                        <div className='mb-4'>
                            Remove funds from gas
                            <input id="sub-gas" className='ml-4 px-2 border border-gray-200 rounded'></input>
                            <button className="ml-4 px-2 bg-blue-500 rounded hover:bg-blue-400 transition" onClick={() => updateBag("Gas")}>-</button>
                        </div>
                        <div className='mb-4'>
                            Remove funds from entertainment
                            <input id="sub-entertainment" className='ml-4 px-2 border border-gray-200 rounded'></input>
                            <button className="ml-4 px-2 bg-blue-500 rounded hover:bg-blue-400 transition" onClick={() => updateBag("Entertainment")}>-</button>
                        </div>
                    </div>
                </div>

                {/* <div className='grid md:grid-cols-2'>
                    <PieChart savings={mySavings} rent={myRent} gas={myGas} ent={myEntertainment} />
                </div> */}

            </div>

        </div >
    )
}

export default Dashboard