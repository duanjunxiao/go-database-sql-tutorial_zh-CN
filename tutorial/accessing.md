# 访问数据库

现在,你已经导入了驱动package,那么你就可以创建一个数据库对象了,即`sql.DB`.

为了创建`sql.DB`,你可使用`sql.Open()`,它返回一个`*sql.DB`.

```go
func main() {
	db, err := sql.Open("mysql",
		"user:password@tcp(127.0.0.1:3306)/hello")
	if err != nil {
		log.Fatal(err)
	}
	defer db.Close()
}
```

下面是示例的一些说明:

1. `sql.Open`的第一个参数是驱动的名称.这是驱动注册自己到`database/sql`时所使用的字符串.为了避免混淆,通常是与驱动的包名相同.例如,`mysql`用于[github.com/go-sql-driver/mysql](github.com/go-sql-driver/mysql).但也有一些驱动名称不遵循约定(使用数据库名称),比如,`sqlite3`用于[github.com/mattn/go-sqlite3](https://github.com/mattn/go-sqlite3), `postgres`用于[github.com/lib/pq](https://github.com/lib/pq).
2. 第二个参数是驱动的特定语法,用来告诉驱动如何去访问数据库.在这个例子中,我们是连接到了本地MySQL实例中的"hello"数据库.
3. 通常你应该(绝大多数情况下)检查和处理`database/sql`所有操作返回的`error`.我们将在以后讨论在特定条件下也可不处理的情况.
4. 通常情况下,`sql.DB`的生命周期不会超出`function`的范围,此时应该添加`defer db.Close()`

与直觉不同,`sql.Open()`并不会建立任何与数据库的连接,也不验证驱动的连接参数.它只是简单地准备好数据库抽象以备后用.第一个实际意义上的与数据库的连接会被延迟到第一次使用时才建立.如果你想立刻检查数据库是否可用(比如,检查你是否可以建立网络连接并登入数据库),可使用`db.Ping()`,且记得检查`error`.

```go
err = db.Ping()
if err != nil {
	// do something here
}
```

虽然习惯上,当使用完数据库时需`Close()`掉数据库,然而,**`sql.DB`对象是被设计成支持长连接的**.请不要频繁地`Open()`和`Close()`数据库.相反,为每一个需要访问的数据库创建**一个**其独有的`sql.DB`对象,在程序访问完数据库前一直持有它.在需要时传递它,或让它全局可用,但是要确保是打开的.还有,不要在短暂的function中使用`Open()`和`Close()`,而是通过将`sql.DB`作为参数传入短暂function的方式代替.

如果不将`sql.DB`视为长期对象,你将会碰到诸如此类的问题,比如无法复用和共享连接,网络资源失控,因为许多tcp连接停留在`TIME_WAIT`状态而导致间断性失败.此类问题意味着你没用按照`database/sql`的设计意图来使用它.

现在是时候使用`sql.DB`对象了.