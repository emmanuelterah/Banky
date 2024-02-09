import TransactionTable from "./TransactionTable";
import AddTransactionForm from "./AddTransactionForm";
import SearchBar from "./SearchBar";
import {useState, useEffect} from 'react';
import UpdateForm from './UpdateForm'; // Adjust the path as needed 





function Home() {
  // state to hold transactions 
  const [transactions, setTransactions] = useState([]);
  //using a copy of the search value
  const [term,setTerm] = useState('');
  const [sortType, setSortType] = useState(null); 

  // as the component mounts , this will run initially 
  useEffect(() => 
  {
      fetchTransaction();
  }, []);


  const fetchTransaction = async () => {
        try {
           const response = await fetch("http://localhost:8001/transactions");
           const data = await response.json()
           setTransactions(data);
           console.log(data)
           console.log(transactions)
        } catch(error) {
            console.log("Error fetching transaction " , error);
        }
  }

  const handleSearch = async (searchValue) => {
    // console.log("from app.js " , searchValue)
    setTerm(searchValue)
    console.log(term)
    // from using the search value to filter my shared transactions
  }


  const filteredTransactions = transactions.filter((transaction) => 
       transaction.description.toLowerCase().includes(term.toLowerCase())
  );

  const addTransaction = async (newTransaction) => {
      try {
          const response = await fetch("http://localhost:8001/transactions", {
             method: 'POST',
             headers: {
              'Content-Type' : 'application/json'
             },
             body: JSON.stringify(newTransaction)
          });
          if(response.ok){
                //re render 
                fetchTransaction(); 
          }else {
               console.log('Error adding transaction ' , response.statusText)
          }
      }catch(error) {
        console.error("error adding transaction " , error)
      }
  }



  const handleDelete = async (id) => {
    try {
        const response = await fetch(`http://localhost:8001/transactions/${id}`, {
           method: 'DELETE'
                  });
        if(response.ok){
            setTransactions(transactions.filter((transaction) => transaction.id !== id ))               
        }else {
             console.log('Error deleting transaction ' , response.statusText)
        }
    }catch(error) {
      console.error("error deleting transaction " , error)
    }
}

const handleEdit = async (id, updatedTransaction) => {
  try {
    const response = await fetch(`http://localhost:8001/transactions/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedTransaction),
    });
    if (response.ok) {
      // Assuming the response returns the updated transaction data,
      // you can replace the existing transaction with the updated one
      fetchTransaction();
    } else {
      console.log('Error editing transaction: ', response.statusText);
    }
  } catch (error) {
    console.error('Error editing transaction: ', error);
  }
}

//sort function 
const handleSort = (type) => {
   if(sortType === type){
         setSortType(null);
   } else {
    setSortType(type);
    // making a copy of the transactions array to be used for sorting purposes as per the type 
    const sortedTransactions = [...transactions]

    if(type === 'category'){
       sortedTransactions.sort((a,b) => a.category.localeCompare(b.category));
    } else if(type === 'description'){
      sortedTransactions.sort((a,b) => a.description.localeCompare(b.description));
    }
    setTransactions(sortedTransactions)

   }


}
const [updateId, setUpdateId] = useState("")
const [updateAmount, setUpdateAmount] = useState('');
const [updateCategory, setUpdateCategory] = useState("");
const [updateDate, setUpdateDate] = useState("")
const [updateDescription, setUpdateDescription] = useState("")


const getUpdateID = (e) => {
  const value = e.target.value;
  setUpdateId(value)
}

const getUpdateAmount = (e) => {
  const value = e.target.value;
  setUpdateAmount(value);
}

const getUpdateCategory = (e) => {
  const value = e.target.value;
  setUpdateCategory(value)
}

const getUpdateDate = (e) => {
  const value = e.target.value;
  setUpdateDate(value)
}

const getUpdateDescription = (e) => {
  const value = e.target.value;
  setUpdateDescription(value)
}

function handleUpdate () {
    const updatedTransaction = {
      description: updateDescription,
      amount: updateAmount,
      date: updateDate,
      category: updateCategory
    }

    setTransactions(transactions.map((transaction)=>{
        if(transaction.id === parseInt(updateId)){
            return updatedTransaction
        } else{
          return transaction
        }
      }))

      handleEdit(updateId, updatedTransaction);
  }




  return (
    <div className="App">
        <h2>Bank Of FlatIron</h2>
        <br></br>
        <button style={{
          margin: 10
        }} className='btn btn-primary' onClick={() => handleSort(null)}>Clear Sort</button>
        <button  style={{
          margin: 10
        }} className='btn btn-primary' onClick={() => handleSort('category')}>Sort by Category</button>
        <button  style={{
          margin: 10
        }} className='btn btn-primary' onClick={() => handleSort('description')}>Sort by Description</button>
        <SearchBar onSearch={handleSearch} />
        <TransactionTable transactions={filteredTransactions} onDelete={handleDelete} onEdit={handleEdit}/>
        <AddTransactionForm onAdd={addTransaction}/>
        <UpdateForm getUpdateID={getUpdateID} getUpdateAmount={getUpdateAmount} getUpdateDescription={getUpdateDescription} getUpdateDate={getUpdateDate}getUpdateCategory={getUpdateCategory} handleUpdate={handleUpdate}/>
    </div>
  );
}

export default Home;


