# 获取结果集

有几种常用的操作来从数据库中获取结果集:

1. 执行一个查询,返回结果行
2. 预编译一个可重复使用的`statement`,多次执行它,然后销毁它.
3. 执行一个一次性的`statement`,因不会重复使用而无需预编译.
4. 执行一个查询返回仅且返回一行.这是某些情况下的快捷方法.

Go的`database/sql`的函数名称是有实际意义的."**如果函数名称包含`Query`,则它被设计成向数据库发送一个请求,然后返回一个行的集合**,即使它是空集合.那些不会返回行的语句应该使用`Exec()`,而不是`Query`"

从数据库获取数据
===============================

让我们看一个如何查询数据库并处理结果的例子.我们查询`users`表中`id`为1的用户,并打印出该用户的`id`和`name`.使用`rows.Scan()`时,我们会将结果赋值给变量,一行一次.

```go
var (
	id int
	name string
)
rows, err := db.Query("select id, name from users where id = ?", 1)
if err != nil {
	log.Fatal(err)
}
defer rows.Close()
for rows.Next() {
	err := rows.Scan(&amp;id, &amp;name)
	if err != nil {
		log.Fatal(err)
	}
	log.Println(id, name)
}
err = rows.Err()
if err != nil {
	log.Fatal(err)
}
```

下面是关于上面代码的说明:

1. 我们使用`db.Query()`发送查询给数据库,需像平时一样检查错误.
2. 使用defer `rows.Close()`.这一步很重要.
3. 使用`rows.Next()`来遍历结果集.
4. 使用`rows.Scan()`来读取每一行的列,将结果放到变量中.
5. 在遍历完结果集后仍需检查错误.

在Go中,这几乎是获取数据的唯一操作方式了.例如,你不能以一个map类型的形式去获得一行的数据.这是因为Go中所有的类型都是强类型.如上面代码所示,你需要创建正确类型的变量再传入其指针.

这里有部分内容很容易出错,会引发不好的后果.

* 在`for rows.Next()`循环结束后你应该检查错误.如果在循环中碰到错误,你也不能忽略.记住,不要假设你的程序可以在循环中遍历完所有的行.
* 其次,只要有任一`rows`的结果集被打开,那么这个连接就是被占用的,不能再用于其他查询.这意味着在连接池中不能再使用它.如果你用`rows.Next()`遍历所有行时,在读取最后一行后,`rows.Next()`将会碰到一个内部错误名为EOF,然后为你调用`rows.Close()`[注:go1中存在相关代码,go1.4.2中已删除].但是,如果出于某种原因退出了循环,比如,程序过早`return`等等,那么`rows`就不会被关闭,导致连接还是打开状态.(尽管`rows.Next()`碰到错误会返回false且会自动关闭`rows`).这很容易引发资源失控.
* 如过rows已关闭,那么再调用`rows.Close()`将是一个无害的空操作,所以你可以重复调用.注意,为了避免`runtime panic`,我们应该先检查错误,无错时再调用`rows.Close()`.
* 你应该**总是使用`defer rows.Close()`**,即使你在循环结束后会显示的调用`rows.Close()`,这将是一个不错的习惯.
* 请不要在循环中使用`defer`,`defer`语句会延迟到函数结束时才执行,所以不要在耗时的函数中使用它.如果你这样做了,你的程序将会逐渐消耗内存.如果你要在循环中重复查询并使用结果集,那么循环中你应该使用`rows.Close()`而不是`defer rows.Close()`

Scan()如何工作
================

当你遍历行,将所得内容放入指定变量时,Go已经在幕后帮你做了类型转换的工作.它是基于目标变量的类型.了解到这一点可以帮你理清你的代码,并且有助于避免重复性的工作.

例如,假如你选择表中的一些行,其包含定义类型是string的列,比如`VARCHAR(45)`或其他类似的列.然而你碰巧知道,该表总是包含了数字.如果你传入一个string类型的指针,Go将会把bytes转换为string.现在你可使用`strconv.ParseInt()`或类似的方法将string转成数值了.你必须检查SQL操作中的错误,以及转换成整数时的错误.这是复杂而单调乏味的工作.

或者,你只要将一个整数类型的指针传入`Scan()`.Go会检测到并调用`strconv.ParseInt()`来处理.如果转换时碰到了一个错误,那么`Scan()`将返回它.你的代码可以更加短小精悍.这是`database/sql`推荐使用的方法.

预编译查询
=================

通常,为了可重复使用,你应该预编译一个查询.预编译好一个查询的结果就是一个预编译的"statement",执行语句时可用占位符绑定你提供的参数.这可比将参数拼接成字符串好多了,其可避免一些常见的问题(比如SQL注入)

在MySQL中,参数的占位符是`?`,而在PostgreSQL中是`$N`,其中N是一个数值.SQLite两种都支持.在Oracle中占位符以冒号开头紧接着的是名称,比如`:param1`.这里我们使用`?`,因为我们是使用MySQL做演示的.

```go
stmt, err := db.Prepare("select id, name from users where id = ?")
if err != nil {
	log.Fatal(err)
}
defer stmt.Close()
rows, err := stmt.Query(1)
if err != nil {
	log.Fatal(err)
}
defer rows.Close()
for rows.Next() {
	// ...
}
if err = rows.Err(); err != nil {
	log.Fatal(err)
}
```

在底层,`db.Query()`其实依次完成了预编译,执行和关闭一个预编译的`statement`,即与数据库交互了三次.如果你一不小心,
你的程序与数据库的交互将增至3倍.有些驱动可避免这种情况,但不是所有的驱动都会这样做.更多内容请看[预编译语句](prepared.html).

单行查询
==================

如果只查询至多一行时,你可以使用一个快捷方式来避免冗长的样板代码.

```go
var name string
err = db.QueryRow("select name from users where id = ?", 1).Scan(&amp;name)
if err != nil {
	log.Fatal(err)
}
fmt.Println(name)
```

查询时的错误会延迟到调用`Scan()`后才返回.你也可以在预编译`statement`后调用`QueryRow()`.

```go
stmt, err := db.Prepare("select name from users where id = ?")
if err != nil {
	log.Fatal(err)
}
var name string
err = stmt.QueryRow(1).Scan(&amp;name)
if err != nil {
	log.Fatal(err)
}
fmt.Println(name)
```