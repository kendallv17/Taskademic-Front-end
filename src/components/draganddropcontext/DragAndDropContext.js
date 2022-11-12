import { DragDropContext } from 'react-beautiful-dnd';
import DroppableColumn from '../droppableColumn/DroppableColumn';
import { updateTaskStatus } from '../../services/TaskService'
export default function DragAndDropContext({columData, setData, SupabaseClient}){
    const onDragEnd = async(result) => {
        const { source, destination, draggableId } = result;
        if (!destination || (destination.droppableId === source.droppableId && destination.index === source.index)) return
        else {
            const sourceCol = columData[source.droppableId]
            const destinationCol = columData[destination.droppableId]
            let newSourceTasks = Array.from(sourceCol.tasks)
            if (sourceCol === destinationCol){ //Misma columna
                newSourceTasks.splice(source.index, 1)
                newSourceTasks.splice(destination.index, 0, Number(draggableId))
                setData({
                    ...columData,
                    [source.droppableId]: {
                        ...sourceCol, 
                        'tasks': newSourceTasks
                    }
                })
            } else {//Diferente columna
                let newDestinationTasks = Array.from(destinationCol.tasks)
                newSourceTasks.splice(source.index, 1)
                newDestinationTasks.splice(destination.index, 0, Number(draggableId))
                setData({
                    ...columData,
                    [source.droppableId]: {
                        ...sourceCol,
                        'tasks': newSourceTasks
                    },
                    [destination.droppableId]: {
                        ...destinationCol,
                        'tasks': newDestinationTasks

                    }
                })
            }
            await updateTaskStatus(SupabaseClient, draggableId, destination.droppableId)
        }
    } 

    return(
    <DragDropContext onDragEnd={ onDragEnd }>
        <div className="sm:grid md:flex justify-center pt-5">
                <DroppableColumn data={ columData['todo'].tasks.map( taskId => columData.tasks.find( ({ task_id }) => task_id === taskId)) } id={ columData.todo.columnId } tittle="To Do"/>
                <DroppableColumn data={ columData['inProgress'].tasks.map( taskId => columData.tasks.find( ({ task_id }) => task_id === taskId)) } id={ columData.inProgress.columnId  } tittle="In Progress"/>
                <DroppableColumn data={ columData['reviewing'].tasks.map( taskId => columData.tasks.find( ({ task_id }) => task_id === taskId)) } id={ columData.reviewing.columnId  } tittle="Reviewing"/>
                <DroppableColumn data={ columData['done'].tasks.map( taskId => columData.tasks.find( ({ task_id }) => task_id === taskId)) } id={ columData.done.columnId  } tittle="Done"/>
        </div>
    </DragDropContext>)
}
