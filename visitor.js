var babel = require("babel-core");
var t = require("babel-types");

const visitor = {
  // 自定义的一个方法
  BinaryExpression(path) {
    let result;
    let node = path.node;
    let leftNode = node.left;
    let rightNode = node.right;
    // 判断表达式两边是否都是数字
    if (t.isNumericLiteral(leftNode) && t.isNumericLiteral(rightNode)) {
      // 获取操作运算符
      let operator = node.operator;
      switch (operator) {
        case "+":
          result = leftNode.value + rightNode.value;
          break;
        case "-":
          result = node.left.value - node.right.value;
          break;
        case "*":
          result = node.left.value * node.right.value;
          break;
        case "/":
          result = node.left.value / node.right.value;
          break;
        case "**":
          let i = node.right.value;
          while (--i) {
            result = result || node.left.value;
            result = result * node.left.value;
          }
          break;
        default:
      }
    }
    if(result !== undefined){
      path.replaceWith(t.numericLiteral(result));
      let parentPath = path.parentPath;

      // 向上遍历父级节点
      parentPath && visitor.BinaryExpression.call(this, parentPath);
    }
  },
};

module.exports = function (babel) {
  return {
    visitor,
  };
};
