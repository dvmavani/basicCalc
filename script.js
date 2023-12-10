class Calculator{
    constructor(prevOperand, currOperand){
        this.prevOperandElem=prevOperand
        this.currOperandElem=currOperand
        this.clear()
    }
    clear(){
        this.currOperand=""
        this.prevOperand="" 
        this.operation=undefined
        this.prevOperandElem.innerText=''
        this.currOperandElem.innerText=''
    }
    delete(){
        this.currOperand=this.currOperand.toString().slice(0,-1)
    }
    addNum(number){
        if(number==='.' && this.currOperand.includes('.')){
            return
        }
        this.currOperand=this.currOperand.toString()+number.toString()
    }
    chooseOperarion(operation){
        if(this.currOperand==='')return
        if(this.prevOperand!==''){
            this.compute()
        }
        this.operation=operation
        this.prevOperand=this.currOperand
        this.currOperand=''
    }
    compute(){
        let res 
        const prev = parseFloat(this.prevOperand)
        const curr = parseFloat(this.currOperand)
        if(isNaN(this.prevOperand) || isNaN(this.currOperand)){
            return
        }
        switch(this.operation){
            case '+':
                res=prev+curr
                break
            case '-':
                res=prev-curr
                break
            case '*':
                res=prev*curr
                break
            case '÷':
                res=prev/curr
                break
            default:
                return
        }
        this.currOperand=res
        this.operation=undefined
        this.prevOperand=''

    }
    getDisplay(number){
        const stringNum = number.toString()
        const intNum = parseFloat(stringNum.split('.')[0])
        const deciNum = stringNum.split('.')[1]
        let intToDisplay
        if(isNaN(intNum)){
            intToDisplay=""
        }else{
            intToDisplay=intNum.toLocaleString('en',{maximumFractionDigits:0})
        }
        if(deciNum!=null){
            return `${intToDisplay}.${deciNum}`
        }else{
            return intToDisplay
        }
    }

    updateDisplay(){
        this.currOperandElem.innerText=this.getDisplay(this.currOperand)
        if(this.operation!=null){
            this.prevOperandElem.innerText=`${this.getDisplay(this.prevOperand)} ${this.operation}`
        }
    }
}

const numberButtons = document.querySelectorAll('[data-number]')
const numberOperations = document.querySelectorAll('[data-operations]')
const buttonEqual = document.querySelector('[data-equals]')
const buttonDelete = document.querySelector('[data-delete]')
const allClear = document.querySelector('[data-allclear]')
const operandPrev = document.querySelector('[data-prev]')
const operandCurr = document.querySelector('[data-curr]')

const calculator = new Calculator(operandPrev,operandCurr)
numberButtons.forEach(
    button=>{
        button.addEventListener('click',()=>{
            calculator.addNum(button.innerText)
            calculator.updateDisplay()
        })
    }
)
numberOperations.forEach(
    button=>{
        button.addEventListener('click',()=>{
            calculator.chooseOperarion(button.innerText)
            calculator.updateDisplay()
        })
    }
)
allClear.addEventListener('click',button=>{
    calculator.clear()
})
buttonEqual.addEventListener('click',button=>{
    calculator.compute()
    calculator.updateDisplay()
})
buttonDelete.addEventListener('click',button=>{
    calculator.delete()
    calculator.updateDisplay()
})

