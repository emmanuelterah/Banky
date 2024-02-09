export default function UpdateForm({getUpdateID, getUpdateAmount, getUpdateDescription, getUpdateDate, getUpdateCategory, handleUpdate}){

    return (
       <>
         <div >
           <h2>Update Transaction</h2>
           <form>
               <label htmlFor="description">Description</label>
               <input
               type="text"
               id="description"
               name="description"
               onChange={getUpdateDescription}                
               />
               <label htmlFor="amount">Amount</label>
               <input
               type="number"
               id="amount"
               name="amount"
               onChange={getUpdateAmount}                
               />
               <label htmlFor="date">Date</label>
               <input
               type="date"
               id="date"
               name="date"
               onChange={getUpdateDate}                
               />
              <label htmlFor="category">Category</label>
               <input
               type="text"
               id="category"
               name="category"
               onChange={getUpdateCategory}                
               />
               <label htmlFor="ID" >ID</label>
               <input
               type="number"
               id="updateId"
               name="updateId"
               onChange={getUpdateID}                
               />
               <br></br>
               <button type="button" onClick={handleUpdate} className="btn btn-success">Update Transaction</button>
           </form>
         </div>
       </>
    )
}
