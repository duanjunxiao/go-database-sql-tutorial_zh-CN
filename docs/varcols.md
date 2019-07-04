---
title: 使用未知列
type: tutorial
order: 10
---

`Scan()`函数需要传入和目标变量数目相应匹配的数量.但当你不知道查询将返回什么时该怎么办?

如果你不知道查询将返回多数列时,你可使用`Columns()`来得到列名的列表.再通过检查列表的长度来得到其总共查询到了多少列,然后你可以将一个正确长度的slice传入`Scan()`.例如,一些MySQL的分支在使用`SHOW PROCESSLIST`命令时会返回不同的列数,所以你必须为此做好准备否则你会碰到错误.下面是这么做的方法之一,当然还有其他的:

```go
cols, err := rows.Columns()
if err != nil {
	// handle the error
} else {
	dest := []interface{}{ // Standard MySQL columns
		new(uint64), // id
		new(string), // host
		new(string), // user
		new(string), // db
		new(string), // command
		new(uint32), // time
		new(string), // state
		new(string), // info
	}
	if len(cols) == 11 {
		// Percona Server
	} else if len(cols) &gt; 8 {
		// Handle this case
	}
	err = rows.Scan(dest...)
	// Work with the values in dest
}
```

如果你不知道定义该列用的类型,那么应该使用`sql.RawBytes`.

```go
cols, err := rows.Columns() // Remember to check err afterwards
vals := make([]interface{}, len(cols))
for i, _ := range cols {
	vals[i] = new(sql.RawBytes)
}
for rows.Next() {
	err = rows.Scan(vals...)
	// Now you can check each element of vals for nil-ness,
	// and you can use type introspection and type assertions
	// to fetch the column into a typed variable.
}
```