
    const numberButtons = document.querySelectorAll('[data-number]');
    const operationButtons = document.querySelectorAll('[data-operation]');
    const equalButton = document.querySelector('[data-equals]');
    const AcButton = document.querySelector('[data-AC]');
    const cancelButton = document.querySelector('[data-clear]');
    const prevDisplay = document.getElementById('data-prev-operand');
    const currDisplay = document.getElementById('data-curr-operand');



    class Calculator{

       constructor(prevDisplay, currDisplay){
            this.prevDisplay = prevDisplay
            this.currDisplay = currDisplay
            this.clear()
       }

       clear(){
            this.prevOperand = ''
            this.currOperand = ''
            this.operation = undefined
       }

       delete(){
         this.currOperand = this.currOperand.toString().slice(0, -1)
       }

       appendNumber(number){
         if (number === '.' && this.currOperand.includes('.')) return
         this.currOperand =  this.currOperand.toString() + number.toString()
         
         
       }

       chooseOperation(operation){
          if (this.currOperand === '') return 
          if (this.prevOperand !== '') {
             this.compute()
          }
         this.operation = operation
         this.prevOperand = this.currOperand 
         this.currOperand = ''
       }

       updateDisplay(){
         this.currDisplay.innerText = this.currOperand
         this.prevDisplay.innerText = this.prevOperand
      
       }

       compute(){
          let computation;
          const prev = parseFloat(this.prevOperand)
          const curr = parseFloat(this.currOperand)
          //if theres no prev or curr value
          if(isNaN(prev) || isNaN(curr)) return

         switch (this.operation){
            case '+':
               computation = prev + curr
               break;

            case 'x':
               computation = prev * curr
               
               break;

            case '/':
               computation = prev / curr
            break;

            case '-':
               computation = prev - curr
            break;

            default : return
         }
         this.currOperand = computation
         this.operation = undefined
         this.prevOperand = ''
       }
    }

    const calculator = new Calculator (prevDisplay, currDisplay)

   numberButtons.forEach(button => {
    
        button.addEventListener('click', () => {
           calculator.appendNumber(button.innerText)
           calculator.updateDisplay()
        })
     
   })
 
  operationButtons.forEach(button => {
    
      button.addEventListener('click', () => {
         calculator.chooseOperation(button.innerText)
         calculator.updateDisplay()
      })
   
 })

 equalButton.addEventListener('click', button => {
    calculator.compute()
    calculator.updateDisplay(

    )
 })
   
 AcButton.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
 })

 cancelButton.addEventListener('click', button => {
   calculator.delete()
   calculator.updateDisplay()
})