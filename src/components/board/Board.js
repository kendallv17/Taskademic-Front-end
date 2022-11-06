import DragAndDropContext from "../draganddropcontext/DragAndDropContext"
import { useState, useEffect } from "react"
import { Modal } from "flowbite-react"
import { createTask, fetchTasks } from "../../services/TaskService"
import { readSession } from "../../utils/SessionManager"
import { fetchCurrentPeriod } from "../../services/PeriodService"
export default function Board({SupabaseClient}){
    const [showModal, setShowModal] = useState(false)
    
    const [data, setData] = useState();
    useEffect(()=> {
        const fetchPeriodData = async () => {
            try{
                const currentPeriod = await fetchCurrentPeriod(SupabaseClient, readSession().user.id);
                const tasks = await fetchTasks(SupabaseClient, currentPeriod[0].id);
                console.log(tasks)
                setData({
                    "period_id":currentPeriod[0].id,
                    "courses":currentPeriod[0].Period_Courses,
                    "tasks":tasks,
                    "todo": {
                        columnId: "todo",
                        tasks:tasks.filter((task) => task.status === 'todo' ? task : null).map(({task_id})=>task_id)
                    },
                    "inProgress":{
                        columnId: "inProgress",
                        tasks:[        
                        ]
                    },
                    "reviewing":{
                        columnId:"reviewing",
                        tasks:[
                        ]
                    },
                    "done":{
                        columnId:"done",
                        tasks:[
                        ]
                    }
                })
            } catch(error) {
                alert(error)
                return null;
            }
        };
        fetchPeriodData();
    }, [])
    const handleOnSubmit = async(e)=> {
        try{
            e.preventDefault()
            let newData = { ...data }
            let newTask = {
                tittle:e.target.taskname.value,
                course_id:e.target.courses.value, 
                period_id: data.period_id,
                status:"todo"
            }
            console.log(newTask)
            const newTaskResponse = await createTask(SupabaseClient, newTask);
            console.log(newTaskResponse)
            newData.tasks.push(newTask)
            newData.todo.tasks.push(`${newData.tasks.length}`)
            setData(newData)
            console.log(data)
            alert("New Task added")
            setShowModal(false)
            e.target.reset();
        } catch(error) {
            alert(error)
        }
    }
    return (
        (data !== undefined && data.tasks.length) ? 
            <div>
            <div className="flex flex-col">
                <div className="flex flex-row-reverse pr-2 pt-3">
                    <button className="flex-0 bg-bright-turquoise-700 hover:bg-bright-turquoise-800 rounded text-lg px-5 text-mercury-50 " onClick={ () => setShowModal(true) }>
                        Add new task
                    </button>
                </div>
                <DragAndDropContext columData={ data } setData={ setData }/>
            </div>
              <Modal show={ showModal } onClose={ () => setShowModal(false)}
              >
                <Modal.Header>
                  Pls fill in the required information
                </Modal.Header>
                <form onSubmit={ handleOnSubmit }>
                    <Modal.Body>
                    <div className="space-y-6">
                        <label htmlFor="courses" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Please select the course</label>
                        <select id="courses" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        { data.courses.map(course => <option key={ course.id } value={ course.id }>{ course.Course_Name }</option>)}
                        </select>
                    </div>
                    <div className="mb-6">
                        <label htmlFor="taskname" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Base input</label>
                        <input type="text" id="taskname" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
                    </div>
                    </Modal.Body>
                    <Modal.Footer>
                    <button className="px-5 bg-radical-red-400 rounded text-lg text-mercury-50" onClick={ () => setShowModal(false)}>
                        Cancel
                    </button>
                    <button type="submit" className="px-5 bg-bright-turquoise-700 rounded text-lg text-mercury-50">
                        Add new task
                    </button>
                    </Modal.Footer>
                </form>
              </Modal>
        </div>:null
    )
}