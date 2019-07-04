(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{195:function(t,s,a){"use strict";a.r(s);var e=a(0),n=Object(e.a)({},function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("p",[t._v("为了使用"),a("code",[t._v("database/sql")]),t._v(",你不仅需要这个package本身,还需要针对特定数据库的驱动.")]),t._v(" "),a("p",[t._v("通常情况下,你无需直接使用驱动包,虽然有些驱动会鼓励你这么做.(在我看来,这不是一个好主意).相反,如果可以的话,你应该只引用"),a("code",[t._v("database/sql")]),t._v("中定义的类型.这可以避免你的代码依赖该驱动,而你只需修改少量代码就可使用其他驱动去访问你的数据库了.")]),t._v(" "),a("p",[t._v("在这个文档中, 我们将使用@julienschmidt和@arnehormann提供的优秀的"),a("a",{attrs:{href:"https://github.com/go-sql-driver/mysql",target:"_blank",rel:"noopener noreferrer"}},[t._v("MySQL驱动"),a("OutboundLink")],1),t._v("来演示.")]),t._v(" "),a("p",[t._v("将下面的代码添加到你的Go源码文件的顶部:")]),t._v(" "),a("div",{staticClass:"language-go extra-class"},[a("pre",{pre:!0,attrs:{class:"language-go"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("\n\t"),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"database/sql"')]),t._v("\n\t"),a("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("_")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"github.com/go-sql-driver/mysql"')]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n")])])]),a("p",[t._v("注意,我们通过"),a("code",[t._v("_")]),t._v("别名,以匿名方式导入驱动,所以在我们的代码中,驱动的导出名称是不可见的.暗地里,驱动将自己注册到"),a("code",[t._v("database/sql")]),t._v(",但一般而言,驱动不会再做其它事情了, 除了运行"),a("code",[t._v("func init()")]),t._v(".")]),t._v(" "),a("p",[t._v("现在你已经准备好去访问数据库了.")])])},[],!1,null,null,null);s.default=n.exports}}]);