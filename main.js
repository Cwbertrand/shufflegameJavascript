/*
	let list = document.querySelector("ul");
	let listElements = list.querySelectorAll('li');

	//console.log('la liste', list);
	//console.log('les éléments', listElements);

	listElements.forEach(function(element){
		console.log(element);
		element.style.color = 'red' // this performs a loop and enables to loop through each li
	})

	// Là où console.log() présenterait l'élément de manière interactive, à la manière de l'inspecteur 
	// d'éléments du navigateur, console.dir() listera ses composantes d'objet JavaScript
*/

/*
	//=============THIS IS THE FIRST METHOD TO MAKE THE SHUFFLEING OF NUMBERS ====================//


	const box = document.createElement('div') // here you create a div with [createlement] function
	box.classList.add('box') // You add a class into the div

	const board = document.querySelector('#board')
	//board.appendChild(box) 
	// With the appendchild function, it places the class "box" div into the id "board div as a child"
	// appendChild() est une méthode qui place un élément du DOM à la fin du contenu de l'élément visé. 
	// Pour ajouter du contenu au début, on utilisera la méthode prepend().
	//box.innerText = 1;

	for (let i = 1; i <= 10; i++) {
		let newbox = box.cloneNode() //this clones the clas box then multiples it to 10 boxes
		newbox.innerText = i //this sets the numbers into the box from 1-10
		board.appendChild(newbox)// this finally appends(joins) the class
		
	}

	// Randomly shuffling the numbers at any moment of refresh
	let i = board.children.length, k, temp
	while (--i > 0) {
		// On boucle tant que 1 oté de i est toujours positif
		// k stocke un nombre aléatoire basé sur i
		k = Math.floor(Math.random() * (i + 1))
		// temp pointe temporairement lélément à la position k dans board
		temp = board.children[k]
		// replace l'élément à la position k par l'élément à la position i
		board.children[k] = board.children[i]
		// Place l'élément k pointé temporairement à la fin du contenu de board
		board.appendChild(temp)
	}
*/

//=============THIS IS THE SECOND METHOD TO MAKE THE SHUFFLEING OF NUMBERS ====================//
function suffleNumbers(parent) {
	let children = parent.children
	let i = children.length, k, temp
	while (--i > 0) {
		k = Math.floor(Math.random() * (i + 1))
		temp = children[k]
		children[k] = children[i]
		parent.appendChild(temp)

	}
}

//the function shows us the box reaction when it's clicked
function showReaction(type, clickedBox){ // the two parameters are 1. (type) corresponding to the type of reaction desired, 2. (clickedBox) being the box on which the effect will be applied
	clickedBox.classList.add(type)
	if(type !== 'success'){ // This implies that when success class is = to type, then the effect of 'type stays there until the page is refreshed
		setTimeout(function(){ // this function displays the duration the effect of 'type' will have on a given box
			clickedBox.classList.remove(type)
		}, 800)
	}
}

const box = document.createElement('div')
box.classList.add('box')
const board = document.querySelector('#board')

let nb = 1	//une variable nb qui représentera le numéro de la boite attendue et qui s'incrémentera en cas de clic valide!

for (let i = 1; i <= 10; i++) {
	let newbox = box.cloneNode() //this clones the clas box then multiples it to 10 boxes
	newbox.innerText = i //this sets the numbers into the box from 1-10
	board.appendChild(newbox)// this finally appends(joins) the class
	
	newbox.addEventListener('click', function(){ // this function permits you to click the box and something happens

		if(i == nb){	//on vérifie d'abord si la boite sur laquelle le clic s'effectue possède le même numéro que ce que contient la variable nb
			
			newbox.classList.add('box-valid') //Si c'est le cas, on ajoute la classe CSS "box-valid" et on incrémente nb
			
			// si nb est égal au nombre de boites du jeu, c'est que le dernier clic étqit sur la dernière boite - victoire du joueur
			if(nb == board.children.length){
				board.querySelectorAll('.box').forEach(function(box){
					showReaction('success', box)
				})
			}
			nb++
		}

		//si le numéro de la boite est supérieur à nb c'est que le joueur a cliqué une boite trop élevée ->game over!
		else if(i > nb){
			showReaction('error', newbox)
			nb = 1
			board.querySelectorAll('.box-valid').forEach(function(validBox){// this function restarts the game when you click the 'alert button' OK
				validBox.classList.remove('box-valid') // IT just removes the css styles
			})
		}
		

		//Dernière possibilité; le joueur a cliqué sur une boite déjà grisée. On l'informe simplement de cela, le jeu ne redémarre pas.
		else{
			showReaction('notice', newbox)
		}

	})
}

suffleNumbers(board)
