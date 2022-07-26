import React, { useRef, useState } from "react"
import { DragDropContext, Draggable, Droppable, DropResult } from "react-beautiful-dnd"
import "./App.css"
import ContentList from "./components/ContentList";
import InputField from "./components/InputField";
import { v4 as uuid } from 'uuid';


const listItems = [
	{
	  id: '1',
	  name: "Apt Date"
	},
	{
	  id: '2',
	  name: "Apt Time"
	},
	{
	  id: '3',
	  name: "Location"
	},
	{
	  id: '4',
	  name: "Patient Name"
	}
  ];

const columnList = [
	{
		[uuid()]: {
			name: 'Column1',
			items: [listItems]
		}
	}
]
  

const getItemStyle = (isDragging: boolean, draggableStyle: any) => ({
	width: "30%",
	margin: `0 50px 15px 50px`,
	background: isDragging ? "#4a2975" : "white",
	color: isDragging ? "white" : "black",
	border: `1px solid black`,
	fontSize: `10px`,
	borderRadius: `5px`,

	...draggableStyle
})

const App: React.FC = () => {
	
	const [content, setContent] = useState<string>("");
	const [columns, setColumns] = useState(columnList);
	const [ todo, setTodo ] = useState(listItems)

	const handleContent = (e: React.FormEvent) => {
		e.preventDefault();
	  }	

	const onDragEnd = (result: DropResult) => {
		const { source, destination } = result
		if (!destination) return

		const items = Array.from(todo)
		const [newOrder] = items.splice(source.index, 1)
		items.splice(destination.index, 0, newOrder)

		setTodo(items)
	}

	const onDragEnd2 = (result: DropResult) => {
		console.log(result);
	}

	console.log(content);
	
	return (
		<div className="App">
			<div className='heading'>What would you like to say?</div>
			<InputField content={content} 
			setContent={setContent}
			handleContent={handleContent}/>

			<ContentList/>

			{/* <DragDropContext onDropEnd = {onDragEnd2}>
				{
					Object.entries(columns).map(([id,column])) => {
						return (
							<Droppable droppableId ={id}>
								{(provided, snapshot) => {
									return (
										<div
										{...provided.droppableProps}
										ref= {provided.innerRef}
										
									)
								}}

							</Droppable>
						)
					}
				}
			</DragDropContext>
 */}
			
			<div className="DragDrop">
			<DragDropContext onDragEnd={onDragEnd}>
				
				<Droppable droppableId="todo">
					
					{(provided) => (
						<div className="todo" {...provided.droppableProps} ref={provided.innerRef}>
							{todo.map(({ id, name }, index) => {
								return (
									<Draggable key={id} draggableId={id} index={index}>
										{(provided, snapshot) => (
											<div
												ref={provided.innerRef}
												{...provided.draggableProps}
												{...provided.dragHandleProps}
												style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}
											>
												{name}
											</div>
										)}
									</Draggable>
								)
							})}
							{provided.placeholder}
						</div>
					)}
					
				</Droppable>
			</DragDropContext>
			</div>
			
		</div>
	)
}

export default App
