import React, { useEffect, useState } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import _ from 'lodash';
import { v4 } from "uuid";
import { Droppable } from 'react-beautiful-dnd';
import "../styles/dragdrop.css";
import { Draggable } from 'react-beautiful-dnd';
import { useSelector, useDispatch } from 'react-redux';
import { addddataAction, addtodoAction } from '../actions/draganddrop';
export default function Draganddrop() {
    const [topic, setTopic] = useState('');
    const [description, setDescription] = useState("");
    const currentuseremail = localStorage.getItem('currentuseremail');
    const dragDropList = localStorage.getItem('dnd') ? JSON.parse(localStorage.getItem('dnd')) : []
    var prevUserDetials = {};
    var userReducerData = {};
    var updatedState = {};
    var prevPos = null;
    var action = "add";
    var userReducer = useSelector((state) => state.DragDropReducer);
    userReducerData = userReducer.userdetials;
    console.log("---------userReducer-----userReducerData----", userReducer, userReducerData);
    if (userReducer.dragdropLists) {
        userReducer.dragdropList.map((user, index) => {
            if (user.useremail === currentuseremail) {
                prevPos = index;
                // console.log("pp", prevPos);
            }
        })
    }


    dragDropList.map((user) => {
        if (user.useremail === currentuseremail) {
            prevUserDetials = user.state;
        }
    })
    const dispatch = useDispatch();

    const item1 = {
        id: v4(),
        topic: "dashboard",
        description: "all data innit",
    }
    const item2 = {
        id: v4(),
        topic: "product",
        description: "verfied",
    }

    const intialState = (Object.keys(prevUserDetials).length === 0) ? {
        "Todo": {
            title: "Todo",
            items: []
        },
        "Inprogress": {
            title: "Inprogress",
            items: []
        },
        "Completed": {
            title: "Completed",
            items: []
        },
        "Tested": {
            title: "Tested",
            items: []
        }
    } : prevUserDetials

    const [state, setState] = useState(
        intialState
    )
    useEffect(() => {
        const updatedList = [];
        updatedState = {
            useremail: currentuseremail,
            state,
        }
        // console.log("----reducer list--------------", dragDropList)
        if (dragDropList.length === 0) {
            // console.log("----empty list we can push daata", dragDropList);
            updatedList.push(updatedState);

        }
        else {
            var newUser = true;
            dragDropList.map((user) => {
                if (user.useremail === currentuseremail) {
                    newUser = false;
                    updatedList.push(updatedState)
                }
                else {
                    updatedList.push(user)
                }
            })
            userReducerData = updatedState;
            // console.log("-- redcuer-----userdetials---------------", userReducerData);
            if (newUser) {
                // console.log("------------------new user---", updatedState);
                updatedList.push(updatedState);
            }
        }
        if (action === "add") {
            var addData = {
                prevPos: prevPos,
                updatedState
            }
            dispatch(addtodoAction(addData))
        }

        localStorage.setItem('dnd', JSON.stringify(updatedList))

    }, [state])

    const handleTodo = () => {
        const data = {
            id: v4(),
            topic: topic,
            description: description,
        }
        setState(prev => {
            return {
                ...prev,
                Todo: {
                    title: 'Todo',
                    items: [{
                        id: v4(),
                        topic: topic,
                        description: description,
                    }, ...prev.Todo.items]

                }
            }
        });

        action = "add";

        setTopic("");
        setDescription("")
    }

    const handleDragEnd = ({ destination, source }) => {
        if (!destination) {
            console.log("---------outiside drop");
            return;
        }
        if (destination.index === source.index && destination.droppableId === source.droppableId) {
            console.log("---------same place drop");

            return;
        }
        const itemCopy = state[source.droppableId].items[source.index];

        setState(
            prev => {
                prev = { ...prev }
                //   remving element from source
                prev[source.droppableId].items.splice(source.index, 1);
                //   adding elelement to destination
                prev[destination.droppableId].items.splice(destination.index, 0, itemCopy);
                return prev
            }
        )

    }
    const handleRemove = (e) => {
        // console.log(e.target.id);
        var deleteList = e.target.id.split('@');
        // console.log("deletelist", deleteList);
        var colTitle = deleteList[0];
        var deleteData = {
            id: deleteList[1],
            topic: deleteList[2],
            description: deleteList[3],
        }
        console.log(state[colTitle].items);
        var newArray = state[colTitle].items.filter((item) => item.id != deleteData.id);
        // console.log("rsulted array", newArray);
        var dupState = { ...state };
        // console.log("----before dup state", dupState);
        dupState[colTitle].items = newArray;
        // console.log("-------dup state--", dupState);
        setState(dupState);


    }
    return (
        <div>
            <div>
                <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
                    Add TO DO
                </button>
                <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLabel">Add To Do</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                <div className="">
                                    <p>Enter Title</p>
                                    <input type="text" class="form-control" placeholder="enter title" onChange={e => setTopic(e.target.value)} value={topic} />
                                    <p>Enter Description</p>
                                    <textarea type="text" class="form-control" placeholder="enter description" onChange={e => setDescription(e.target.value)} value={description} />
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-dismiss="modal" onClick={handleTodo}>Add</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='App'>


                    <DragDropContext onDragEnd={handleDragEnd}>
                        {_.map(state, (data, key) => {
                            return (
                                <div className='column'>
                                    <h4>{data.title}</h4>
                                    <Droppable droppableId={key}>
                                        {(provided) => {
                                            return (
                                                <div
                                                    // provided,innerref shows which area is droppable
                                                    ref={provided.innerRef}
                                                    {...provided.droppableProps}
                                                    className={"droppable-col"}
                                                >
                                                    {data.items.map((el, index) => {
                                                        return (
                                                            <Draggable key={el.id} index={index} draggableId={el.id} >
                                                                {(provided) => {
                                                                    // console.log(el, data);
                                                                    return (
                                                                        <div
                                                                            className={"item"}
                                                                            ref={provided.innerRef}
                                                                            {...provided.draggableProps}
                                                                            {...provided.dragHandleProps}
                                                                        >
                                                                            <div className="info-area">
                                                                                <p >{el.topic} <span id={data.title + "@" + el.id + "@" + el.topic + "@" + el.description} value={data} className='close' style={{ color: "red", display: "inline", marginRight: ' 5px' }} onClick={handleRemove}>x</span> </p>
                                                                                <span>{el.description}</span>
                                                                            </div>

                                                                        </div>

                                                                    )
                                                                }}
                                                            </Draggable>
                                                        )
                                                    })}
                                                    {/* it wil create a space while dropping  */}
                                                    {provided.placeholder}
                                                </div>

                                            )
                                        }}
                                    </Droppable>

                                </div>
                            )
                        })}
                    </DragDropContext>
                </div>
            </div>
        </div>
    )
}
