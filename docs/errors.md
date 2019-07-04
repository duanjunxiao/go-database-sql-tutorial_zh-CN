---
title: 错误处理
type: tutorial
order: 8
---

几乎所有`database/sql`操作返回的参数的最后一个均是`error`类型.你应该经常检查这些错误,而不是忽略它们.

只有少数几个地方得到的错误是例外,或者你可能需要知道更多的东西.

遍历结果集时得到的错误
================================

考虑一下下面的代码:

```go
for rows.Next() {
	// ...
}
if err = rows.Err(); err != nil {
	// handle the error here
}
```

`rows.Err()`中的错误可能是遍历`rows.Next()`时得到的各种错误.循环可能因一些原因会比预计提前退出,所以你必须检查循环是否正常结束.异常终止会自动调用`rows.Close()`,而且,它多次调用也是无害的.

关闭结果集时得到的错误
==============================

如前面所述,当你提前退出循环时,你应该显示地关闭`sql.Rows`.如果循环是正常或碰到错误退出时,其会自动关闭,但你可能会错误地这么做:

```go
for rows.Next() {
	// ...
	break; // whoops, rows is not closed! memory leak...//哎呦,rows没有关闭!内存泄露...
}
// do the usual "if err = rows.Err()" [omitted here]...//像平常一样,"if err = rows.Err()"[这里省略]
// it's always safe to [re?]close here://这里通常能安全地执行rows.Close():
if err = rows.Close(); err != nil {
	// but what should we do if there's an error?//但是如果碰到错误那要怎么做?
	log.Println(err)
}
```

`rows.Close()`返回的错误是一般规则(最好要捕获和检查所有数据库操作的错误)的唯一的例外情况.如果`rows.Close()`返回一个错误,目前还没有明确的做法来处理这个错误.记录错误消息或引发panic可能是唯一的明智之举，如果你认为这不可取，那么也许你应该忽略这个错误.

运行QueryRow()时得到的错误
======================

请考虑如下获取单行的代码:

```go
var name string
err = db.QueryRow("select name from users where id = ?", 1).Scan(&amp;name)
if err != nil {
	log.Fatal(err)
}
fmt.Println(name)
```

如果没有`id = 1`的用户呢?那么结果集就会是空的.而且`.Scan()`也就不能将查询结果存入变量`name`.这又会引发什么呢?

Go中定义了一个名为`sql.ErrNoRows`的特殊错误常量.当结果集为空时,`QueryRow`就会返回它.这需要作为大多数情况中的特例来处理.一个空的结果集往往不应该被认为是应用的错误.如果你不检查这个特例的错误,那么将会引发应用出错,而这并不符合你的预期.

查询的错误会延迟到调用`Scan()`时才返回.所以上面的代码最好这样写:

```go
var name string
err = db.QueryRow("select name from users where id = ?", 1).Scan(&amp;name)
if err != nil {
	if err == sql.ErrNoRows {
		// there were no rows, but otherwise no error occurred
	} else {
		log.Fatal(err)
	}
}
fmt.Println(name)
```

有人可能会问,为什么空结果集会被当作一个错误来看待.空结果集本身没错.原因在于,`QueryRow()`方法需要使用这个特例来告诉调用者其是否确实返回了一行.没有它,`Scan()`将不做任何事,而你也不会意识到你的变量根本没从数据库中获取到任何值.

只有当你使用`QueryRow()`时,才会碰到这个错误.如果你在其他地方碰到了,那说明你在哪里做错了.

定义针对特定数据库的错误
====================================

你很容易像下面那样写代码:

```go
rows, err := db.Query("SELECT someval FROM sometable")
// err contains:
// ERROR 1045 (28000): Access denied for user 'foo'@'::1' (using password: NO)
if strings.Contains(err.Error(), "Access denied") {
	// Handle the permission-denied error
}
```

不要这样做.例如,该string的值可能会根据数据库采用不同的语言(中/英语)来发送错误信息而改变.最好和特定错误中预先定义的数值编号比较.

然而,这种机制在驱动之间是有所差异的.这是因为驱动并不是`database/sql`本身的一部分.在使用本教程的MySQL驱动时,你可以这么做:

```go
if driverErr, ok := err.(*mysql.MySQLError); ok { // Now the error number is accessible directly
	if driverErr.Number == 1045 {
		// Handle the permission-denied error
	}
}
```

同样,这里的`MySQLError`类型是由该特定驱动提供的,而且`.Number`字段在不同驱动间可能不同.数值是从MySQL的错误信息中提取的,因此是数据库特有的,而不是驱动.

这代码还是丑陋的.相对于1045,一个特殊的数值,这是代码味道(术语).一些驱动(尽管不包括MySQL的驱动,至于原因那就离题了)会提供错误标识符的列表.例如Postgres的驱动`pq`就有,在[error.go](https://github.com/lib/pq/blob/master/error.go)中.扩展包[MySQL错误码](https://github.com/VividCortex/mysqlerr)是由VividCortex维护的.使用这些列表,上面的代码最好这样写:

```go
if driverErr, ok := err.(*mysql.MySQLError); ok {
	if driverErr.Number == mysqlerr.ER_ACCESS_DENIED_ERROR {
		// Handle the permission-denied error
	}
}
```

处理连接错误
==========================

如果你的连接被丢弃,杀死或者出错了呢?

发生时,你无需实现任何逻辑,只要重新尝试失败的语句即可.[连接池](connection-pool.html)作为`database/sql`的一部分,内置了错误处理.如果你执行一个查询或其他语句时,底层连接出现了问题,Go会重新打开一个新连接(或使用连接池中的其他连接)再次尝试,且至多尝试10次.

然而,这也会导致一些意想不到的情况.当一些错误发生时,某些错误可能会被重试.这可能也是驱动的一种特性.其中一个发生在MySQL驱动中的例子就是,当使用`KILL`去取消一个不想要的语句(比如一个长查询)时,可能会被重试多达10次.