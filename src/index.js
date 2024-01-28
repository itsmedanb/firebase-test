import {initializeApp} from 'firebase/app'
import{
    getFirestore, collection, onSnapshot, docs, addDoc, deleteDoc, doc
} from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyAhH5IlTwV0kiggM4Bzul9dbSr8b_rpt34",
    authDomain: "test-1c332.firebaseapp.com",
    projectId: "test-1c332",
    storageBucket: "test-1c332.appspot.com",
    messagingSenderId: "400154491290",
    appId: "1:400154491290:web:98c5566deca26386992223",
    measurementId: "G-RCYWVNEQ5H"
  };

  //init firebase app
  initializeApp(firebaseConfig)

  //init services
  const db = getFirestore()

  //collection ref
  const collectionReference = collection(db, 'test')

  //real time collection data
    onSnapshot(collectionReference, function(snapshot){
        let people = []
        let peopleDisplay = ''
        snapshot.docs.forEach( (doc) => {
            people.push({...doc.data(), id: doc.id})
        })
        console.log(people)
        for(let i = 0; i < people.length; i++){
            peopleDisplay += `
            <p>${people[i].id}:  ${people[i].name}</p>
            `
        }
        document.querySelector(".people-list").innerHTML = peopleDisplay

        // document.querySelector(".people-list").innerHTML += `
        //     <p>${person.name}</p>
        //     `
        
    })

    //adding documents
    const addPersonForm = document.querySelector(".add")
    addPersonForm.addEventListener("submit", function(e){
        e.preventDefault()
        addDoc(collectionReference, {
            name: addPersonForm.name.value,
            age: addPersonForm.age.value,
        })
        .then(() => {
            addPersonForm.reset()
        })
    })

    //deleting documents
    const deletePersonForm = document.querySelector(".delete")
    deletePersonForm.addEventListener("submit", function(e){
        e.preventDefault()

        const docRef = doc(db, 'test', deletePersonForm.id.value)

        deleteDoc(docRef)
            .then(() => {
                deletePersonForm.reset()
            })
    })



    