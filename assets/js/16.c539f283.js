(window.webpackJsonp=window.webpackJsonp||[]).push([[16],{198:function(t,s,a){"use strict";a.r(s);var n=a(0),e=Object(n.a)({},function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("p",[t._v("尽管,一旦你适应"),a("code",[t._v("database/sql")]),t._v("后就会觉得它挺简单的,但你也会对它所支持的一些用例的精妙之处感到惊叹,而这对Go的核心库来说太常见了.")]),t._v(" "),a("h1",{attrs:{id:"资源耗尽"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#资源耗尽","aria-hidden":"true"}},[t._v("#")]),t._v(" 资源耗尽")]),t._v(" "),a("p",[t._v("正如前面提到的,如果你不慎重地使用"),a("code",[t._v("database/sql")]),t._v(",你就会自找麻烦.常见的问题有消耗更多的资源和资源无法有效的重复利用:")]),t._v(" "),a("ul",[a("li",[t._v("打开和关闭数据库连接时可能会导致资源枯竭.")]),t._v(" "),a("li",[t._v("读取所有行失败或调用"),a("code",[t._v("rows.Close()")]),t._v("失败会一直占用池里的连接.")]),t._v(" "),a("li",[t._v("使用"),a("code",[t._v("Query()")]),t._v("来执行一些不会返回行的语句会一直占用池里的连接.")]),t._v(" "),a("li",[t._v("不清楚"),a("router-link",{attrs:{to:"/prepared.html"}},[t._v("预编译语句")]),t._v("如何工作会导致数据库执行很多额外的操作.")],1)]),t._v(" "),a("h1",{attrs:{id:"大uint64值"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#大uint64值","aria-hidden":"true"}},[t._v("#")]),t._v(" 大uint64值")]),t._v(" "),a("p",[t._v("这里有一个奇怪的错误.如果一个大容量的无符号整数的高字节有内容时,你就不能将其作为参数传入语句.")]),t._v(" "),a("div",{staticClass:"language-go extra-class"},[a("pre",{pre:!0,attrs:{class:"language-go"}},[a("code",[a("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("_")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" err "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":=")]),t._v(" db"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("Exec")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"INSERT INTO users(id) VALUES"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" math"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("MaxUint64"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// Error")]),t._v("\n")])])]),a("p",[t._v("这里会抛出一个错误.使用"),a("code",[t._v("uint64")]),t._v("时请小心,开始时参数数值很小,不会引发错误,随着时间推移,终会碰到错误.")]),t._v(" "),a("h1",{attrs:{id:"连接状态不匹配"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#连接状态不匹配","aria-hidden":"true"}},[t._v("#")]),t._v(" 连接状态不匹配")]),t._v(" "),a("p",[t._v("一些操作会改变连接的状态从而引发问题,比如下面的两个原因:")]),t._v(" "),a("ol",[a("li",[t._v("连接的状态,比如是否在事务中运行,可以通过修改Go变量来实现.")]),t._v(" "),a("li",[t._v("你可能会假定你的查询是在同一个连接上进行的,实际却不是.")])]),t._v(" "),a("p",[t._v("例如,很多人习惯于通过"),a("code",[t._v("USE")]),t._v("语句来指定当前要操作的数据库.但在Go中,它只会影响到你正在使用的那个连接.除非在事务中,否则你认为跑在同一个连接上的语句,实际上可能跑在从连接池中取得的不同连接上,只是程序不会感知到这些变化罢了.")]),t._v(" "),a("p",[t._v("此外,如果你修改了连接的状态,当它返回连接池时可能会潜在地污染其他代码(连接再次被使用时,其状态已改变).这也是为什么你不应该在SQL命令中直接使用"),a("code",[t._v("BEGIN")]),t._v("或"),a("code",[t._v("COMMIT")]),t._v("语句的原因之一.")]),t._v(" "),a("h1",{attrs:{id:"数据库的特定语法"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#数据库的特定语法","aria-hidden":"true"}},[t._v("#")]),t._v(" 数据库的特定语法")]),t._v(" "),a("p",[a("code",[t._v("database/sql")]),t._v("的API提供了对关系型数据库的抽象,但在特定的数据库和驱动的操作和语法上还是存在差异,比如"),a("router-link",{attrs:{to:"/prepared.html"}},[t._v("预编译语句")]),t._v(".")],1),t._v(" "),a("h1",{attrs:{id:"多结果集"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#多结果集","aria-hidden":"true"}},[t._v("#")]),t._v(" 多结果集")]),t._v(" "),a("p",[t._v("Go的驱动不支持任何形式的在单个查询中获得多个结果集的功能,即使有批量操作的"),a("a",{attrs:{href:"https://github.com/golang/go/issues/5171",target:"_blank",rel:"noopener noreferrer"}},[t._v("功能需求"),a("OutboundLink")],1),t._v("被提出,比如批量复制.")]),t._v(" "),a("p",[t._v("此外这意味着,当一个存储过程返回多个结果集时,程序就不能正常运行了.")]),t._v(" "),a("h1",{attrs:{id:"调用存储过程"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#调用存储过程","aria-hidden":"true"}},[t._v("#")]),t._v(" 调用存储过程")]),t._v(" "),a("p",[t._v("调用存储过程是驱动的一种特性(但目前在MySQL的驱动上还不能工作).其意味着你可通过调用一个简单的存储过程来得到一个结果集,比如执行如下代码:")]),t._v(" "),a("div",{staticClass:"language-go extra-class"},[a("pre",{pre:!0,attrs:{class:"language-go"}},[a("code",[t._v("err "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":=")]),t._v(" db"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("QueryRow")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"CALL mydb.myprocedure"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("Scan")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("&")]),t._v("amp"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("result"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// Error")]),t._v("\n")])])]),a("p",[t._v("实际上它不能正常运行.你会得到这样的错误:"),a("code",[t._v("_Error 1312: PROCEDURE mydb.myprocedure can't return a result set in the given context_")]),t._v(".这是因为MySQL需要将连接设置成multi-statement模式,即使只是为了得到一个结果集,还有目前驱动不推荐这么做(可查看"),a("a",{attrs:{href:"https://github.com/go-sql-driver/mysql/issues/66",target:"_blank",rel:"noopener noreferrer"}},[t._v("这个issue"),a("OutboundLink")],1),t._v(").")]),t._v(" "),a("h1",{attrs:{id:"多语句支持"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#多语句支持","aria-hidden":"true"}},[t._v("#")]),t._v(" 多语句支持")]),t._v(" "),a("p",[a("code",[t._v("database/sql")]),t._v("没有明确的多语句支持,这意味着操作是否支持取决于后端(数据库).")]),t._v(" "),a("div",{staticClass:"language-go extra-class"},[a("pre",{pre:!0,attrs:{class:"language-go"}},[a("code",[a("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("_")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" err "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":=")]),t._v(" db"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("Exec")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"DELETE FROM tbl1; DELETE FROM tbl2"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// Error/unpredictable result")]),t._v("\n")])])]),a("p",[t._v("数据库会按照自己的方式解析语句,比如是返回一个错误,是只执行第一个语句还是两个都会执行.")]),t._v(" "),a("p",[t._v("同样,没法在事务中执行批量操作.在事务中,语句会被串行执行,在连接被释放给另一个语句使用前,执行得到的结果集必须被处理或关闭.不用事务的处理方式与这不同.在这种情况下,执行查询,遍历结果集和在循环中再次执行查询完全可能使用到一个新连接.")]),t._v(" "),a("div",{staticClass:"language-go extra-class"},[a("pre",{pre:!0,attrs:{class:"language-go"}},[a("code",[t._v("rows"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" err "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":=")]),t._v(" db"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("Query")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"select * from tbl1"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// Uses connection 1")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("for")]),t._v(" rows"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("Next")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n\terr "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" rows"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("Scan")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("&")]),t._v("myvariable"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\t"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// The following line will NOT use connection 1, which is already in-use")]),t._v("\n   db"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("Query")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"select * from tbl2 where id = ?"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" myvariable"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),a("p",[t._v("但因为事务只有一个绑定的连接,所以上面的情况不会在事务中发生.")]),t._v(" "),a("div",{staticClass:"language-go extra-class"},[a("pre",{pre:!0,attrs:{class:"language-go"}},[a("code",[t._v("tx"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" err "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":=")]),t._v(" db"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("Begin")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\nrows"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" err "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":=")]),t._v(" tx"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("Query")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"select * from tbl1"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// Uses tx's connection")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("for")]),t._v(" rows"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("Next")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n\terr "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" rows"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("Scan")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("&")]),t._v("myvariable"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\t"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// ERROR! tx's connection is already busy!")]),t._v("\n   tx"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("Query")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"select * from tbl2 where id = ?"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" myvariable"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),a("p",[t._v("虽然,Go不会尝试阻止你这样做.出于这个原因,在你尝试执行另一个语句前,如果没有释放执行上一个语句所占用的资源和清理自身,你最终可能会损坏这个连接.这也意味着事务中每一条语句的执行结果是通过一组独立的网络与数据库交互的.")])])},[],!1,null,null,null);s.default=e.exports}}]);