# 使用Null

可空类型列是恼人的,它会导致代码变得丑陋.如果可以,你应该尽量避免.如果不行,那你应该使用`database/sql`中定义的特殊类型或自定义类型来处理.

bool,string,integers(数值),floats(浮点数)类型都有对应的空类型.下面是如何使用它们:

```go
for rows.Next() {
	var s sql.NullString
	err := rows.Scan(&s)
	// check err
	if s.Valid {
	   // use s.String
	} else {
	   // NULL value
	}
}
```

不光可空类型的局限性,为了让人避免使用可空类型列,就需要更多令人信服的理由:

1. 没有`sql.NullUint64`和`sql.NullYourFavoriteType`类型,你需要自己定义这些.
1. 空特性相当棘手,也是不可预期的.如果你认为它不可能是null,那你就错了,而你的程序则会崩溃,也许在碰到它们之前你很少能够发现这种错误.
1. Go有一个很好的特性就是每个变量都有一个可用的默认零值.这对可空类型却行不通.

如果你需要用自定义类型来处理可空类型列,那么你可复制`sql.NullString`的设计来实现它.

如果你的数据库无法避免使用`NULL`,那么你就应该使用大多数数据库都支持的`COALESCE()`. 以下可能就是你可以使用的东西，它不会引入`sql.Null`类型.

```go
rows, err := db.Query(`
	SELECT
		name,
		COALESCE(other_field, '') as other_field
	WHERE id = ?
`, 42)

for rows.Next() {
	err := rows.Scan(&name, &otherField)
	// ..
	// If `other_field` was NULL, `otherField` is now an empty string. This works with other data types as well.
}
```