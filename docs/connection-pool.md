---
title: 连接池
type: tutorial
order: 11
---

`database/sql`包中有一个基础的连接池,但并没有很好的方法去控制和监控它,然而下面的一些知识还是会对你有所帮助:

* 连接池意味着在一个数据库中执行两个连续的语句时,可能会打开两个连接并分别执行它们.这是程序员相当常见的困惑,"为什么他们的代码执行不正确".例如,`LOCK TABLES`后紧跟的一个`INSERT`操作会被阻塞,因为`INSERT`是在一个没有持有表锁的连接上.
* 在需要时,且当前池中没有可用的连接时,连接池会新建连接.
* 默认时,连接池没有数量限制.如果你试图一次做很多事时,你可以创建任意数量的连接.这可能会导致数据库返回像"too many connections."这样的错误.
* 在Go1.1及以后版本中,可使用`db.SetMaxIdleConns(N)`来限制连接池中空闲连接的数量.但这不会限制连接池的大小.
* 在Go1.2.1及更新版本中,可`db.SetMaxOpenConns(N)`来限制连接池中可用连接的数量. 但在1.2版本中使用`db.SetMaxOpenConns(N)`会碰到一个[死锁bug](https://groups.google.com/d/msg/golang-dev/jOTqHxI09ns/x79ajll-ab4J) ([fix](https://code.google.com/p/go/source/detail?r=8a7ac002f840)).
* 连接的回收速度相当快.通过将`db.SetMaxIdleConns(N)`设置为一个较高值可以缓解这个现象,有助于连接的复用.
* 保持空闲连接过久会碰到问题(比如在微软Azure上的MySQL上的这个[issue](https://github.com/go-sql-driver/mysql/issues/257)).如果你遇到由于连接空闲太久而引发超时时,试试`db.SetMaxIdleConns(0)`.
* 你也可以通过`db.SetConnMaxLifetime(duration)`来设置连接的超时时间(时间应小于数据库配置的连接超时时间),因为重用已长期存在的连接可能会导致网络问题.该参数会延迟关闭未使用的连接,即关闭已超时的连接可能会延迟.