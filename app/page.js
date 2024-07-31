'use client'
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { collection, addDoc, getDoc, query, onSnapshot, querySnapshot, deleteDoc, doc } from "firebase/firestore";
import {db} from './firebase'

export default function Home() {
  const [items, setItems] = useState([
    { name: "Coffee", price: 9.95 },
    { name: "rice", price: 2.25 },
    { name: "movie", price: 30.20 }
  ])
  const [newItem, setNewItems] = useState({ name: '', price: '' })
  const [total, setTotal] = useState(0)

  // Add new items to the db
  const addItem = async (e) => {
    e.preventDefault();
    if (newItem.name != '' && newItem.price != '') {
      setItems([...items, newItem]);
      await addDoc(collection(db, "items"), {
        name: newItem.name.trim(),
        price: newItem.price
      })
      setNewItems({name: '', price: ''})
    }
  }

  // read from the db
  useEffect(() => {
    const q = query(collection(db, 'items'))
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let itemsArr = []
      querySnapshot.forEach((doc) => {
        itemsArr.push({...doc.data(), id: doc.id})
      })
      setItems(itemsArr)

      // calculating total
      const calculateTotal = () => {
        const totalPrice = itemsArr.reduce((sum, item) => sum + parseFloat(item.price), 0)
        setTotal(totalPrice)
      }
      calculateTotal()
      return () => unsubscribe()
    })
  }, [])

  // deleting from db
  const deleteItem = async (id) => {
    await deleteDoc(doc(db, 'items', id))
  }
  return (
    <main className="relative w-full h-screen bg-black">
      <div className="absolute top-5 left-1/2 -translate-x-1/2 mt-5 w-1/2 bg-black">
        <h1 className="text-white text-center font-mono text-5xl">Expense Tracker</h1>
        <div className="bg-slate-800 p-4 rounded-lg mt-[30px]">
          <form className="grid grid-cols-6">
            <input 
              value={newItem.name}
              onChange={(e) => setNewItems({...newItem, name:e.target.value})}
              className="col-span-3 p-3" 
              type="text" 
              placeholder="Enter item"></input>
            <input
              value={newItem.price}
              onChange={(e) => setNewItems({...newItem, price:e.target.value})} 
              className="col-span-2 ml-6 p-3" 
              type="number" 
              placeholder="Enter Price"></input>
            <button 
              onClick={addItem}
              className="text-white text-center text-4xl bg-slate-950 p-2 ml-6 hover:bg-slate-900">+</button>
          </form>
          <ul>
            {items.map((item, id) => (
              <li 
                key={id} 
                className="capitalize flex bg-slate-950 my-4 rounded-lg text-white text-xl w-full justify-between">
                <div className="flex w-full p-5 pr-10 justify-between">
                  <span>{item.name}</span>
                  <span>${item.price}</span>
                </div>
                <button 
                  onClick={() => deleteItem(item.id)}
                  className="w-20 hover:bg-slate-900">X</button>
              </li>
            ))}
          </ul>
          {items.length < 1 ? ('') : (
            <div className="flex justify-between text-white p-5 text-2xl">
              <span>Total</span>
              <span>${total}</span>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
