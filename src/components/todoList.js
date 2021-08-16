import React ,{useState,useEffect} from 'react'
import "../App.css"
function TodoList() {

const getlocal=()=>{
    const list= localStorage.getItem("Todos")
    if(list)
    return JSON.parse(list)
    else return []
}

    const [inputData,setInputData]= useState("")
    const [items,setitems]= useState(getlocal)
    const [editedTodo ,setEditedTodo] =useState("")
    const [toggleEdit ,setToggleEdit] =useState(false)
    // ADD Todo
    const addData =()=>{
        if(!inputData) alert("Please Enter Todo")
        else if(inputData && toggleEdit){
            setitems( items.map((currElem)=>{
                if(currElem.id===editedTodo){
                    return {...currElem,item:inputData}}
                    else return currElem;
                })
                )
                setInputData("");
                setToggleEdit(false);
                setEditedTodo(null);
            }
            
            
            else{
                const itm ={
                    id:new Date().getTime().toString(),
                    item:inputData
                }
                setitems([...items,itm])
                setInputData("")
            }
        }
        // Delete Todo
        const delTodo=(index)=>{
            const delList = items.filter((currElem)=>{
                return currElem.id !== index;
            })
            setitems(delList)
        }
        // Edit Todo
        const editTodo=(index)=>{
            const editedlist = items.find((currElem)=>{
                return currElem.id===index;
            })
            setInputData(editedlist.item);
            setToggleEdit(true);
            setEditedTodo(index);
            
        }
        useEffect(() => {
            localStorage.setItem("Todos",JSON.stringify(items))
        }, [items])
        return (
            <>
            <div className="container">
                <div className="todoCard">
                    <h3 className="h33">ADD TODO</h3>
                    <form>
                        <div className="mb-3">
                            <input type="email" className="form-control input" placeholder="Enter Todo" value={inputData} onChange={(e)=>{setInputData(e.target.value)}}/>
                        </div>
                        <div className="d-grid gap-2 col-6 mx-auto">
                            <button type="button" className="btn btn-success addBtn" onClick={addData} >ADD TODO</button>
                        </div>
                    </form>
                    <div className="show">
                        <h3 className="text-center">TODOS</h3>
                        <ol className="list-group list-group-numbered">{
                            items.map((currElem,index)=>{
                                return <>
                            <li className="list-group-item" key={index}>{currElem.item}
                                <button type="button" className="btn btn-danger delBtn" onClick={()=>{delTodo(currElem.id)}}>DEL</button>
                                <button type="button" className="btn btn-warning editBtn" onClick={()=>{editTodo(currElem.id)}}>EDIT</button>
                            </li>
                            </>
                            })
                            }
                        </ol>
                    </div>
                </div>
            </div>
        </>
    )
}

export default TodoList
