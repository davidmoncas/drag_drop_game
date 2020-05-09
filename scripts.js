
const weaknessList=["Not Taking Criticism Well","Impatient","Lazy","Feel Like a Victim","Easily Bored","Procrastinate","Takes Things Personally","Hard Headed",
"Passive","Passive Agressive","Shy","Lethargic","Propensity to Drink","Propensity to do Drugs","Too Strict","Short-Sighted","Selfish","Control Freak"
,"Not Taking Responsibility","Too Blunt","Greedy","Righteous","Stubborn","Multitasking","Suppress Emotions","Impulsive","Bossy","Takes on Too Much",
"Aggressive","Critical of Others","Unfulfilled with Life","Fearful","Self Critical","Trouble With Teams","Close-Minded","Disorganized","Hateful","Over Spender","Untrustworthy",
"Sarcastic","Complaining","Arrogant","Lier","Self Destructive","Grouchy","Innapropiate","Always Thinking About Something Else"];



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

let draggablesStates={};


let tableGame=document.querySelector("#tableGame");
let tableContainer=document.querySelector("#tableContainer");

let rowIndexToDelete;

tableContainer.addEventListener('dragover',e=>{		// change the style when dragging an object inside
	e.preventDefault();
	tableContainer.classList.add("containerShaded");
})

tableContainer.addEventListener("dragleave" , ()=>{
	tableContainer.classList.remove("containerShaded");
})


tableContainer.addEventListener('drop' , ()=>{		// drop an element inside the table
	const draggable=document.querySelector('.dragging');
	if(draggablesStates[draggable.textContent]==0){
	let row = tableGame.insertRow(-1);
	let col1=row.insertCell(0);
	let col2=row.insertCell(1);
	let col3=row.insertCell(2);
	col1.appendChild(draggable);

			
	let node=document.createElement("P");
	node.setAttribute("contentEditable","true");
	node.setAttribute("placeholder","write a strength");
	node.classList.add("strengthInput");
	col2.appendChild(node);


	node=document.createElement("P");
	node.setAttribute("contentEditable","true");
	node.setAttribute("placeholder","write an action");
	node.classList.add("actionInput");

	col3.appendChild(node);
	draggablesStates[draggable.textContent]=1;
}

	tableContainer.classList.remove("containerShaded");

})

tableContainer.addEventListener('dragstart', ev=>{		// save the position of the row in the table, to delete it later
	rowIndexToDelete=ev.srcElement.parentNode.parentNode.rowIndex;
})


draggables.forEach( draggable=> {
	draggable.addEventListener('dragstart',()=>{
		draggable.classList.add("dragging");
	})


	draggable.addEventListener( 'dragend' , ()=>{
		draggable.classList.remove("dragging");
	})


	draggablesStates[draggable.textContent]= "0";
});


weaknessesDrag.addEventListener('drop', ()=>{		// drop an element in the list of weakness
	const draggable=document.querySelector('.dragging');

	if(draggablesStates[draggable.textContent]===1){
		draggablesStates[draggable.textContent]=0;
		tableGame.deleteRow(rowIndexToDelete);
	}		
	weaknessesDrag.classList.remove('draggedContainer');
	weaknessesDrag.appendChild(draggable);
})

weaknessesDrag.addEventListener('dragover', (e)=>{
	weaknessesDrag.classList.add("draggedContainer")
		e.preventDefault();
		const draggable=document.querySelector('.dragging');
})

weaknessesDrag.addEventListener('dragleave' , ()=>{
	weaknessesDrag.classList.remove('draggedContainer');
})



// ------------------------------- S A V E    T O      P D F ---------------------------------------------




 function genPDF()
  {
	const doc = new jsPDF()
	let data=[]
	let weaknessDrop=document.querySelector("#weaknessesDrop");
	// if (weaknessDrop.childElementCount<4) return;
	// for(let i=3;i<weaknessDrop.childElementCount;i++){
	// 	data.push([weaknessDrop.children[i].textContent ,strengthsContainer.children[i].textContent ,actionsContainer.children[i].textContent  ])
	// }

	for(let i=2;i<tableGame.rows.length;i++){
		data.push([tableGame.rows[i].cells[0].innerText , tableGame.rows[i].cells[1].innerText , tableGame.rows[i].cells[2].innerText]);
	}



	var img = new Image();
	img.src= 'Website-Logo.jpg';
	
	doc.addImage(img, 'JPEG', 100, 10,30,17)  

	doc.autoTable({
	styles: {halign: 'center', textColor: '#000000' , lineColor: '#ffffff' , lineWidth:1 , minCellHeight:5 , font:'Lato-Regular'},
	columnStyles: { 0: { fillColor: '#7EBEC5' } }, 
	margin: { top: 35 },
	headerStyles:{font:'Lato-Bold' , fillColor:'#ffffff'},
	head: [['Weakness', 'Strength', 'Action']],
	body: data
	})

	doc.save('table.pdf')

 }