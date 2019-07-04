---
title: 导入数据库驱动
type: tutorial
order: 3
---

为了使用`database/sql`,你不仅需要这个package本身,还需要针对特定数据库的驱动.

通常情况下,你无需直接使用驱动包,虽然有些驱动会鼓励你这么做.(在我看来,这不是一个好主意).相反,如果可以的话,你应该只引用`database/sql`中定义的类型.这可以避免你的代码依赖该驱动,而你只需修改少量代码就可使用其他驱动去访问你的数据库了.

在这个文档中, 我们将使用@julienschmidt和@arnehormann提供的优秀的[MySQL驱动](https://github.com/go-sql-driver/mysql)来演示.

将下面的代码添加到你的Go源码文件的顶部:

```go
import (
	"database/sql"
	_ "github.com/go-sql-driver/mysql"
)
```

注意,我们通过`_`别名,以匿名方式导入驱动,所以在我们的代码中,驱动的导出名称是不可见的.暗地里,驱动将自己注册到`database/sql`,但一般而言,驱动不会再做其它事情了, 除了运行`func init()`.

现在你已经准备好去访问数据库了.