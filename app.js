/**Class alımı yapacağız */
const display = document.querySelector('.calculator-input');
const keys = document.querySelector('.calculator-keys');

/**input içinde ki 0 yazısını bu şekilde input'a veriyoruz */
let displayValue = '0';
let firstValue = null;
let operator = null;
let waitingForSecondValue = false;

updateDisplay();

function updateDisplay(){
    display.value = displayValue;
}

//*butonların tıklanması için addEventListener veriyoruz click ile *//
keys.addEventListener('click', function(e) {
    const element = e.target;
    const value = element.value;

    if (!element.matches('button')) return;

    switch(value){
        case '+':
            case '-':
                case '*':
                    case '/':
                        case '=':
                            handleOperator(value);
                            break;
                        case '.':
                            inputDecimal();
                            break;
                        case 'clear':
                            clear();
                            break;
                        default:
                            //*Şimdi ise consoleda görünme yerine input içinde ekranda görüntüleme yapacağız *//
                            inputNumber(element.value);
                    
    }

    // /**Operatör tıklanmaları için */
    // if(element.classList.contains('operator')){
    //     // console.log('operator', element.value);
    //     handleOperator(element.value);
    //     updateDisplay();
    //     return;
    // }

    // /**Rakamlar ve nokta için ise */
    // if(element.classList.contains('decimal')){
    //     inputDecimal(); //*inputDecimal böyle çağırıyoruz*//
    //     updateDisplay();
    //     // console.log('decimal', element.value);
    //     return;
    // }

    // /**Clear butonu için */
    // if(element.classList.contains('clear')){
    //     clear(); //*clear böyle çağırıyoruz*//
    //     updateDisplay();
    //     // console.log('clear', element.value);
    //     return;
    // }

    // console.log('number', element.value);

    
    //*updateDisplayi çağırmalıyız ki her defasında işlemi sayfa içinde görelim *//
    updateDisplay();
});

function inputNumber(num) {
/**İkinci bir sayı girdiğimizde inputNumber değerini çalıştırmalıyız */
    if(waitingForSecondValue) {
        displayValue = num;
        waitingForSecondValue = false;
    } else {
        /**sıfır'a eğer eşitse? num: eğer sıfıra eşit değilse + num; */
    displayValue = displayValue === '0'? num: displayValue + num;
    }
    //*console'da test edebiliyoruz bu kod ile çalışıp çalışmadığını*//
    console.log(displayValue, firstValue, operator, waitingForSecondValue);
}

//*Nokta işlemi*//
function inputDecimal() {
    if(!displayValue.includes('.')){ /**iki defa tıklanmasını engelliyor */
        displayValue += '.';
    }
    
}

//*Şimdi ise silme butonunu aktifleştireceğiz*//
function clear(){
    displayValue ='0'
}


//*ŞİMDİ İSE OPERATOR BUTONLARININ İŞEVLERİNİ HAZIRLAYACAĞIZ + - * / gibi *//

//*Yarattığımız handleOperatoru fonksiyon yapıyoruz*//
//*Yukarıda yarattığımız let'in altına hemen let firstValue = null yapıyoruz *//
//*Ardından hemen altına let operator = null; yapıyoruz *//
//* daha sonra ise let waitingForSecondValue = false; açıyoruz ki yaptığımız işlemler sistemin arkasında tutulsun ki sonuç alalım*//
function handleOperator(nextOperator) {
    /**Bu kod ile hesap makinesine girilen değer nediri bilmek için yapıyoruz */
    const value = parseFloat(displayValue);

/**eşittir operatörününü güncelliyoruz */
    if(operator && waitingForSecondValue){
        operator = nextOperator;
        return;
    }

/**firstvalue eşit eşit null ise value' aktarıyoruz */
    if (firstValue === null) {
        firstValue = value;
    } else if (operator) {
        const result = calculate(firstValue, value, operator);

        /**Yapılan işlem sonucu ile gelen değeri ekrana bu kodla yazdırıyoruz */
        /**$parseFloat ve .toFixed(7) ile girilen rakam sayısını belirliyoruz ki inputtan taşmıyor */
        displayValue = `${parseFloat(result.toFixed(7))}`;
        /**Sonucuda böyle aktarıyoruz */
        firstValue = result;
    }

/** waitingforsedoncvalue ise true olacak ve bununla da ikinci değeri bekleyeceğimiz için işliyoruz buraya */
    waitingForSecondValue = true;
    operator = nextOperator;

    //*console'da test edebiliyoruz bu kod ile çalışıp çalışmadığını*//
    console.log(displayValue, firstValue, operator, waitingForSecondValue);
}

//*TOPLAMA İŞLEMİ İÇİN İSE;
function calculate(first, second, operator) {
    /**eğer operator işlemi toplanıyorsa; */
    if(operator === '+'){
        return first + second;
    /**Eğer çıkarma işlemi ise */
    } else if (operator === '-'){
        return first - second;
    /**Eğer çarpma ise */
    } else if (operator === '*'){
        return first * second;
    /**eğer bölme ise */
    } else if (operator === '/') {
        return first / second;
    }
    return second;
}