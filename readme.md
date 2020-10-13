初衷：这是一个Babel练手的项目，用来写一些简单的demo，并了解Babel的转换原理。

每一层结构也被叫做 节点（Node）

一个 AST 可以由单一的节点或是成百上千个节点构成。 它们组合在一起可以描述用于静态分析的程序语法。

每一个节点都有如下所示的接口（Interface）：

interface Node {
  type: string;
}

每一个节点都会有 start，end，loc 这几个属性。

Babel 的处理步骤

Babel 的三个主要处理步骤分别是： 解析（parse），转换（transform），生成（generate）。.

解析步骤分为两个阶段： 词法分析 和 语法分析

词法分析:

词法分析阶段把字符串形式的代码转换成 令牌token 流

```
  n * n;
[
  { type: { ... }, value: "n", start: 0, end: 1, loc: { ... } },
  { type: { ... }, value: "*", start: 2, end: 3, loc: { ... } },
  { type: { ... }, value: "n", start: 4, end: 5, loc: { ... } },
  ...
]
```

语法分析:

语法分析阶段会把一个令牌流转化成AST的形式,这个阶段会使用令牌中的信息把它们转换成一个 AST 的表述结构，这样更易于后续的操作

于是我们从 FunctionDeclaration 开始并且我们知道它的内部属性（即：id，params，body），所以我们依次访问每一个属性及它们的子节点。

接着我们来到 id，它是一个 Identifier。Identifier 没有任何子节点属性，所以我们继续。

之后是 params，由于它是一个数组节点所以我们访问其中的每一个，它们都是 Identifier 类型的单一节点，然后我们继续。

此时我们来到了 body，这是一个 BlockStatement 并且也有一个 body节点，而且也是一个数组节点，我们继续访问其中的每一个。

这里唯一的一个属性是 ReturnStatement 节点，它有一个 argument，我们访问 argument 就找到了 BinaryExpression。.

BinaryExpression 有一个 operator，一个 left，和一个 right。 Operator 不是一个节点，它只是一个值因此我们不用继续向内遍历，我们只需要访问 left 和 right。.

Babel 的转换步骤全都是这样的遍历过程。