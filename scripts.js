const draggables = document.querySelectorAll(".draggable");
const containers = document.querySelectorAll(".container");

console.log("script is load");

draggables.forEach( draggable=> {
	draggable.addEventListener('dragstart',()=>{
		draggable.classList.add("dragging");
	})


	draggable.addEventListener( 'dragend' , ()=>{
		draggable.classList.remove("dragging");
	})

});

containers.forEach( container=> {
	container.addEventListener('dragover' , e=>{
		container.classList.add("draggedContainer")
		e.preventDefault();
		const afterElement = getDragAfterContainer(container,e.clientY);
		const draggable=document.querySelector('.dragging');

		if(afterElement==null){
			container.appendChild(draggable);

		}
		else{
			container.insertBefore(draggable, afterElement);
		}

	} )

	container.addEventListener('dragleave' , ()=>{
		container.classList.remove('draggedContainer');
	})

	container.addEventListener('dragend', ()=>{
		container.classList.remove('draggedContainer');
	}   )

}

);


function getDragAfterContainer(container , y){
	const draggableElements=[...container.querySelectorAll('.draggable:not(.dragging)')]



	return draggableElements.reduce( (closest , child)=>{
		const box = child.getBoundingClientRect();
		const offset= y - box.top-box.height/2;
		if(offset<0 && offset > closest.offset) {return {offset:offset , element:child}} 
		else { return closest} 

	} , {offset:Number.NEGATIVE_INFINITY }).element;

}