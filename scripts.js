
const weaknessList=["Not taking criticism well" , "Impatient" , "Lazy", 
"Victimize yourself", "Easily bored", "Procastinate", "Without etiquete",
"Takes things personally" , "Hard headed", "Passive" , "Hates conflict",
"Shy", "Lethargic", "Propense to drink" , "Propense to do drugs", 
"Too strict" , "Short-sighted" , "Selfish", "Control freak", "Takes blame for others",
"Blunt", "Greedy", "Righteous", "Stubborn", "Multitasker", "Suppress emotions" , "Impulsive","Bossy","Takes on Too Much"
,"Aggressive","Critical of Others","Unfulfilled with Life","Fearful","Self Critical","Trouble With Teams","Close-Minded","Disorganized",
"Hateful","Over Spender","Untrustworthy","Sarcastic","Complaining",
"Arrogant","Lier","Self Destructive","Grouchy","Innapropiate","Always Thinking About Something Else"];



const weaknessesDrag=document.querySelector("#weaknessesDrag");

weaknessList.forEach(element=>{
			let node=document.createElement("P");
			node.setAttribute("draggable","true");
			node.classList.add("draggable");
			let textInner=document.createTextNode(element);
			node.appendChild(textInner); 
			weaknessesDrag.appendChild(node);
})


const draggables = document.querySelectorAll(".draggable");
const containers = document.querySelectorAll(".container");
const strengthsContainer = document.querySelector("#strengths");
const actionsContainer = document.querySelector("#actions");
let draggablesStates={};
let strengths={};
let actions={};

console.log("script is load");

draggables.forEach( draggable=> {
	draggable.addEventListener('dragstart',()=>{
		draggable.classList.add("dragging");

	})


	draggable.addEventListener( 'dragend' , ()=>{
		draggable.classList.remove("dragging");
	})


	draggablesStates[draggable.textContent]= "0";


});

containers.forEach( container=> {
	container.addEventListener('dragover' , e=>{
		container.classList.add("draggedContainer")
		e.preventDefault();
		//const afterElement = getDragAfterContainer(container,e.clientY);
		const draggable=document.querySelector('.dragging');
		//if(afterElement==null){
			container.appendChild(draggable);

		// }
		// else{
		// 	container.insertBefore(draggable, afterElement);

		// }

	} )

	container.addEventListener('dragleave' , ()=>{
		container.classList.remove('draggedContainer');
	})

	container.addEventListener('dragend', e=>{
		container.classList.remove('draggedContainer');
		// if an element is dropped in the drops, generate a new strength
		
		if (container.id=="weaknessesDrop"){
			if(draggablesStates[e.srcElement.lastChild.textContent]!==1){
			
			draggablesStates[e.srcElement.lastChild.textContent]=1;
			let node=document.createElement("P");
			node.setAttribute("contentEditable","true");
			node.setAttribute("placeholder","write a strength");
			node.classList.add("strengthInput");
			strengthsContainer.appendChild(node);
			strengths[e.srcElement.lastChild.textContent] = node;

			node=document.createElement("P");
			node.setAttribute("contentEditable","true");
			node.setAttribute("placeholder","write an action");
			node.classList.add("actionInput");
			node.addEventListener('input', e=>{
				const el=e.srcElement;
				const index = [...el.parentElement.children].indexOf(el);
				resizeElements(index);				
			})


			actionsContainer.appendChild(node);
			actions[e.srcElement.lastChild.textContent] = node;


			}


		}
		else{
			if(draggablesStates[e.srcElement.lastChild.textContent]===1){
				strengths[e.srcElement.lastChild.textContent].remove();
				actions[e.srcElement.lastChild.textContent].remove();
			}
			draggablesStates[e.srcElement.lastChild.textContent]=0;

		}

		})

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


function resizeElements(index){
	let size=Math.max(strengthsContainer.children[index].offsetHeight , weaknessesDrop.children[index].offsetHeight ,actionsContainer.children[index].offsetHeight );
	// strengthsContainer.children[index].style.minHeight=size+"px";
	// weaknessesDrop.children[index].style.minHeight=size+"px";
	// actionsContainer.children[index].style.minHeight=size+"px";
	console.log(size);
}


// ------------------------------- S A V E    T O      P D F ---------------------------------------------
 function genPDF()
  {
  	document.querySelector("#weaknessesDrag").style.display = 'none';	
	html2canvas(document.querySelector(".bigContainer")).then(function (canvas) {

	var img = canvas.toDataURL("image/png");
	var doc = new jsPDF();


	const imgProps= doc.getImageProperties(img);
	const pdfWidth = doc.internal.pageSize.getWidth();
	const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
	doc.addImage(img, 'JPEG', 0, 0, pdfWidth, pdfHeight);
	doc.save('test.pdf');        
	});
	document.querySelector("#weaknessesDrag").style.display = 'inline';	
 }