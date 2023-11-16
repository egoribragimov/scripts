function isDigit(char) {
  return char >= '0' && char <= '9';
}

const operators = "+-*/^";

function isOperator(char) {
  return operators.includes(char);
}

function infixToRPN(expression) {
  // Операторы и их приоритеты
  const precedence = {
    "^": 4,
    "*": 3,
    "/": 3,
    "+": 2,
    "-": 2,
    "(": 1,
  };

  const stack = []; // Стек для операторов
  const output = []; // Стек для выходного ОПЗ

  // Функция для проверки, имеет ли оператор `op1` более высокий или равный приоритет, чем `op2`
  function hasHigherPrecedence(op1, op2) {
    return precedence[op1] >= precedence[op2];
  }

  for (let i = 0; i < expression.length; i++) {
    let token = "";
    // Считываем символы, пока они составляют число (включая десятичные точки)
    while (i < expression.length && (isDigit(expression[i]) || expression[i] === ".")) {
      token += expression[i];
      i++;
    }
    if (token !== "") {
      // Если токен - число, добавляем его в выходной стек
      output.push(token);
      i--; // Возвращаемся на один символ назад, чтобы не пропустить следующий символ
    } else {
      token = expression[i];
      if (token === "(") {
        // Если токен - открывающая скобка, добавляем ее в стек операторов
        stack.push(token);
      } else if (token === ")") {
        // Если токен - закрывающая скобка
        while (stack.length > 0 && stack[stack.length - 1] !== "(") {
          // Переносим операторы из стека операторов в выходной стек
          output.push(stack.pop());
        }
        stack.pop(); // Удаляем открывающую скобку из стека
      } else if (isOperator(token)) {
        // Если токен - оператор
        while (
          stack.length > 0 &&
          isOperator(stack[stack.length - 1]) &&
          hasHigherPrecedence(stack[stack.length - 1], token)
        ) {
          // Пока операторы в стеке имеют более высокий приоритет, переносим их в выходной стек
          output.push(stack.pop());
        }
        stack.push(token); // Добавляем текущий оператор в стек операторов
      }
    }
  }

  while (stack.length > 0) {
    // Переносим оставшиеся операторы в выходной стек
    output.push(stack.pop());
  }

  return output; // Возвращаем ОПЗ
}


function evaluateRPN(rpn) {
  const stack = [];

  for (let token of rpn) {
    if (isDigit(token)) {
      stack.push(parseFloat(token));//parseFloat преобразовывает строку в дробное число
    } else if (isOperator(token)) {
      const b = stack.pop();
      const a = stack.pop();
      switch (token) {
        case "+":
          stack.push(a + b);
          break;
        case "-":
          stack.push(a - b);
          break;
        case "*":
          stack.push(a * b);
          break;
        case "/":
          stack.push(a / b);
          break;
        case "^":
          stack.push(Math.pow(a, b));
          break;
      }
    }
  }

  return stack[0];
}

function rpnToInfix(rpn) {
  const stack = [];

  for (let token of rpn) {
    if (isDigit(token)) {
      stack.push(token);
    } else if (isOperator(token)) {
      const b = stack.pop();
      const a = stack.pop();
      const expr = `(${a} ${token} ${b})`;
      stack.push(expr);
    }
  }

  return stack[0];
}

const inputExpression = "2 ^ 2 + 30 * (2 - 1) / 0";
const rpn = infixToRPN(inputExpression);
console.log("Входное выражение:", inputExpression);
console.log("Обратная польская запись:", rpn.join(" "));

const result = evaluateRPN(rpn);
console.log("Результат:", result);

const infixResult = rpnToInfix(rpn);
console.log("Восстановленное выражение:", infixResult);
